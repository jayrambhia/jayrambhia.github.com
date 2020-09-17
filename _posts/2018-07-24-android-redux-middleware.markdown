---
category: Blog
tag: Android
comments: true
date: 2018-07-24 16:00:00
layout: post
slug: android-redux-middleware
image:
  twitter: https://raw.githubusercontent.com/reduxjs/redux/master/logo/apple-touch-icon.png
  facebook: https://raw.githubusercontent.com/reduxjs/redux/master/logo/apple-touch-icon.png
  height: 240
  width: 240
title: Middleware in Redux architecture for android application
description: Are you having a hard time figuring out how middleware works in Redux architecture? This articles goes in-depth of Redux and explains what exactly a middleware is and how it is used in Redux. The article also helps you write your own middleware for Redux in Kotlin for your android apps.
keywords: [android redux, redux in kotlin, redux architecture, immutable state, redux clean architecture, write your own redux, redux data flow, redux middleware android, builds, pure functions, reactive functional android, redux reducers, redux store in kotlin, redux middleware, redux middleware for network calls, middleware in android redux, redux middleware chain]
category_tag: [Android, Kotlin, Redux]
series: redux-android
series_title: Understanding Redux Middleware
series_description: Go one step further and explore how Middleware is used in Redux architecture. The article explains the flow in detail and helps you implement middleware for your android app.
---
In the previous article, I wrote about Redux architecture and how it can be used in an android app - **[Redux architecture for android apps](/blog/android-redux-intro)**. At the end of the article, I briefly talked about `Middleware`. I found Middleware to be the most confusing part about the Redux architecture and none of the posts about Redux architecture talk about much about it so it's quite difficult to wrap your mind around it.

<p align="center">
  <img alt="redux logo" title="Redux logo" src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo-title-dark.png"/>
</p>

## What is Middleware?

Middleware is a software or piece of code that acts as a bridge between between two different software or two different pieces of code. eg. A middleware could be a bridge between operating system and the database. Or in our case, a middleware could be a bridge between our Redux store and our db, network api calls.

This definition still seems very vague. From the redux website, **A middleware provides an extension point between dispatching an action, and the moment it reaches the reducer.** In Redux, middlewares are used for logging, crash reporting, connecting to an API, routing and other stuff.

## How does middleware work in Redux?

From my understanding, a middleware or a list of middleware, changes the action that is dispatched to the store, before it reaches the reducers. Have a look at the flow diagram that I have made.

<p align="center">
	<img alt="redux flow with middleware" title="Redux unidirectional flow with Middleware" src="/assets/images/redux-flow-middleware-diagram.png"/>
</p>

## What happens inside the store with the middleware?

The above diagram is a bit simplified. The simplified version is - The dispatched action is sent to the middleware. The middleware acts on the input and decides if it wants to change the action. It then calls the second middleware in the chain with the updated action and so on. The last middleware then dispatches the action to the store.

Let's look at an example of how an API middleware will work. According to the docs, a middleware takes AppState and Action as input and returns Action (same or new).

{% highlight kotlin %}
interface Middleware {
  fun applyMiddleware(state: AppState, action: Action): Action
}

class SearchApiMiddleware: Middleware {
  override fun applyMiddleware(state: AppState, action: Action): Action {
    when(action) {
      is Search -> {
         // This will make an api call in background
        Api.search(action.query)
        // A new action that we created.
        // This action will tell the reducer that search results are being loaded
        return LoadingSearchResult
      }
      else -> return action
    }
  }
}
{% endhighlight %}

This is the simplest form of Middleware. Action A1 is dispatched. Middleware M1 changes the action A1 to A2. Middleware M2 does nothing and returns A2. Middleware M3 changes the action A2 to A3. The store calls the reducers to reduce app state with action A3. Once the search results are loaded, `Api` will dispatch `SearchResultLoaded` action to the store on the main thread.

## Is there something more to the middleware than this?

Yes. The structure and logic of middleware in Redux is bit more complicated than this. Let's do a deep dive to understand more. The middleware acts like a chain. It depends on the middleware if it wants other middleware in the chain to be invoked or not. The middleware can do following things.

 1. Do something (api call, db call, etc) or do not do anything.
 2. Update the given action or do not update it and pass it to the next in the chain and return the action that the chain returns.
 3. Update the given action or do not update it. Return the updated / non-updated action and ignore the chain.

Note: By updating the action, I mean creating a new instance of the same action or creating a new instance of another action. It's better to have immutable actions.

Based on the above mentioned responsibilities, let's update our definition and implementation of the middleware.

{% highlight kotlin %}
interface Next {
  fun next(store: Store, action: Action): Action
}

interface Middleware {
  fun apply(store: Store, action: Action, next: Next): Action
}

class SearchApiMiddleware: Middleware {
  override fun apply(store: Store, action: Action, next: Next): Action {
    when(action) {
      is Search -> {
        Api.search(action.query, store)
        return LoadingSearchResult
      }

      is Paginate -> {
        Api.search(action.query, action.page, store)
        return next.next(store, LoadingMore)
      }

      else -> return next.next(store, action)
    }
  }
}
{% endhighlight %}

With Kotlin, all these interfaces can be written as higher order functions and the code becomes much more cleaner. Let's not dwell on that right now. `Api` is just some class that calls the api. We pass the `store` to it because, it will call `Store.dispatch(SearchResultLoaded(movies))`.

## How does next work and who calls the middleware?

The implementation of Middleware is a bit confusing so let's add some more details to our store and maybe it becomes clearer.
{% highlight kotlin %}

class NextMiddleware(val middleware: Middleware, val next: Next): Next {
  override fun next(store: Store, action: Action): Action {
    return middleware.apply(store, action, next)
  }
}

class EndOfChain: Next {
  override fun next(store: Store, action: Action): Action {
    return action
  }
}

class AppStore(val initialState: AppState, val reducers: List<Reducer>, val middlewares: List<Middleware>): Store {
  override fun dispatch(action: Action) {
    val newAction = applyMiddleware(action)
    val newState = applyReducers(newAction)
    // ... call listeners to notify state change.
  }

  private fun applyMiddleware(action: Action) {
    val chain = createNext(0)
    return chain.next(this, action)
  }

  private fun createNext(index: Int): Next {
    if (index == middlewares.size) {
      return EndOfChain()
    }

    return NextMiddleware(middleware[index], createNext(index + 1))
  }
}
{% endhighlight %}

This code is a bit tricky and involves recursion. We create first link of chain. When creating the first link of chain, it needs the next link, so it calls the recursive method to create the next link which in turn calls the function again to create the next link. Each link consists of `NextMiddleware` (weird name?) which has reference to a middleware. When we are out of middleware, we add `EndOfChain`. It does not require a next and it just returns the action as is. As you can see, the order of the middleware matters here.

## Redux flow with Middleware

Let's go over the flow once again.

 1. `SearchScreen` dispatches `Search(query="batman")` action by calling `store.dispatch(action)`
 2. Store creates the chain of `Middleware` and calls the first link of the chain.
 3. The first chain is a Logger. It logs the action that it receives and calls the next link of the chain with the same action.
 4. The next link is `SearchApiMiddleware`. It receives `Search(query="batman")` action. It makes an API call in the background and returns `LoadingSearchResult` action.
 5. The previous link, ie. Logger, receives `LoadingSearchResult` action as return value from the second chain. It logs this new action and returns it.
 6. The store gets `LoadingSearchResult` action. It passes this action to the reducers.
 7. `SearchScreenReducer` reduces `SearchState` to `SearchState.copy(loading = true)` and returns it.
 8. No other reducer further changes the state.
 9. The store gets a new state and it notifies all the listener.
 10. `SearchScreen` being one of the active listeners, receives the new state and decides to show a loading spinner.
 11. Meanwhile, the api returns a response in 200 ms. The Api.search() method having a reference to the store, dispatches `SearchResultLoaded(movies)` action.
 12. The store creates a chain of the middleware and calls the first chain.
 13. None of the middlewares update the action and return it as is.
 14. The store gets `SearchResultLoaded` action and it calls the reducers. `SearchScreenReducer` updates the SearchState to `SearchState.copy(loading = false, movies=action.movies)` and returns the new state. No other reducer updates the state.
 15. The store gets a new state and it notifies all the listener.
 16. `SearchScreen` receives the update. It hides the loading spinner and show the list of movies.

 Check out this really helpful video by Shazam's tech team which explains how a middleware works - [Middleware demo](https://www.youtube.com/watch?v=ORGEI9slOhM). Also, here's the article where I found the video - [Android.apply{ Redux }](https://blog.shazam.com/android-apply-redux-2ad0f7355e0).

 I hope this was helpful and you have more understanding of `Middleware` in Redux than before. In the next article, I will write about implementing the complete Redux architecture in Kotlin with higher order functions to make it look cool.

## Redux architecture series

 1. [Introduction: Redux architecture for android apps](/blog/android-redux-intro)
 2. Middleware: Introduction and implementation
 3. [Write your own Redux implementation in Kotlin](/blog/kotlin-redux-architecture)
 4. [Add Middleware to your Redux implementation](/blog/kotlin-redux-middleware)
 5. [Build Battleship Game with Redux - Groundwork](/blog/battleship-kotlin)
 6. [Implement the Battleship gameplay with Redux](/blog/battleship-redux)
