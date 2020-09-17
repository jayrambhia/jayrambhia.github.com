---
category: Blog
tag: Android
comments: true
date: 2018-08-04 16:00:00
layout: post
slug: kotlin-redux-middleware
image:
  twitter: https://raw.githubusercontent.com/reduxjs/redux/master/logo/apple-touch-icon.png
  facebook: https://raw.githubusercontent.com/reduxjs/redux/master/logo/apple-touch-icon.png
  height: 240
  width: 240
title: Add Middleware to your Redux architecture implementation
description: Are you having a hard time figuring out how middleware works in Redux architecture? This article talks about adding middleware to your Redux implementation. This is the missing piece for having a great Redux implementation.
keywords: [android redux, kotlin redux, redux architecture, immutable state, redux clean architecture, write your own redux, redux data flow, redux middleware android, builds, pure functions, reactive functional android, redux reducers, redux store in kotlin, redux middleware, redux middleware for network calls, middleware in android redux, redux middleware chain]
category_tag: [Android, Kotlin, Redux]
series: redux-android
series_title: Middleware implementation in Redux
series_description: You're almost there! Add middleware support in your Redux implementation and see how effortless android programming becomes.
---

Middleware is a crucial part of Redux architecture. It helps you have side effects in your Redux architecture - making asynchronous API calls, querying your database, handling navigation, logging, etc. No Redux implementation is complete without side effects or middleware. It's what drives your app.

In the previous article, we went through an intense journey of writing our own implementation of **[Redux architecture in Kotlin](/blog/kotlin-redux-architecture)**. In this article, we implement the middleware and finish the working Redux implementation.

### Recap

In the 2nd article of this series - **[Middleware in Redux architecture for android application](android-redux-middleware)**, we go through the definition of Middleware and see how it fits in the Redux unidirectional flow. After getting to know the concept, we implemented a rough schema of the middleware and we'll improve upon it below. I would advise you to go through the article if you haven't.

### Define Middleware

As discussed in the previous articles, `Middleware` is a bridge between two parts of the software. Here, Middleware is the bridge between `Redux` and `Side effects`.

A middleware takes `State` and `Action` as input parameters and returns `Action` (same as input parameter or some different action). The middleware does not update the state but may update the action.

{% highlight kotlin %}
typealias Middleware<State> = (State, Action, Dispatch) -> Action
{% endhighlight %}

We pass reference of `Dispatch` to the middleware because we want to dispatch some action when asynchronous work is finished.

### Middleware chain

Redux supports multiple middleware which do different stuff for different actions. So in this implementation of Redux, we are going to create a chain of Middleware. In this chain, Redux store calls the first middleware. The first middleware calls the second one and so on. This is similar to `OkHttp` where you have a chain and you may update the request and call chain.next() to send it forward.

{% highlight kotlin %}
typealias Next<State> = (State, Action, Dispatch) -> Action
typealias Middleware<State> = (State, Action, Dispatch, Next<State>) -> Action
{% endhighlight %}

We redefine Middleware to include `Next`. Middleware does not know what `Next` is. It's just supposed to invoke it and return its result (if need be).

This is how a Middleware implementation would look like.

{% highlight kotlin %}
fun searchMiddleware(state: AppState, action: Action, dispatch: Dispatch, next: Next<AppState>): Action {
  return when(action) {
    is Search -> {
      SearchApi.search(action.query)
      LoadingSearch
    }
    else -> next(state, action, dispatch)
  }
}
{% endhighlight %}

Here, the search middleware calls our search API when it receives `Search` action. We decided that we do not want to call the rest of the chain, so we return `LoadingSearch` action. If this action is something else, the middleware just calls `next` and returns the value.

### Add Middleware to the Store

We'll create a chain of middleware and apply it before we reduce the state.

{% gist jayrambhia/45f88628444952bacd674b24d0605bda reduxstore3.kt %}

The code may look confusing for a bit. But it's actually quite easy. We create a chain using recursion.

`next(index)` method creates `Next<State>` for the middleware with the index in the list of middleware. It's a higher order function which when invoked should apply the middleware. But the middleware requires `Next` to continue the chain. So we call `next(index+1)` to get the next middleware chain.

So we start with `next(0)`. It returns a function which would invoke the first middleware and continue the chain with `next(1)`. `next(1)` would invoke the second middleware and continue the chain with `next(2)` and so on. When we run out of middleware, we just return a function which returns action as is.

The middleware chain may alter the action and we reduce the state with the altered action.

### Middleware examples

This would get easier if we work through couple of examples of middleware.

#### Logger

{% highlight kotlin %}
fun loggerMiddleware(state: AppState, action: Action, dispatch: Dispatch, next: Next<AppState>): Action {
  Log.d("middleware", "action in <-- $action")
  val newAction = next(state, action, dispatch)
  Log.d("middleware", "action out --> $newAction")
  return newAction
}
{% endhighlight %}

We will make sure to add this middleware first in the list so it always gets called.

#### Search API
{% highlight kotlin %}
fun searchMiddleware(state: AppState, action: Action, dispatch: Dispatch, next: Next<AppState>): Action {
  return when(action) {
    is Search -> {
      SearchApi.search(query, dispatch)
      LoadingSearch
    }
    else -> this
  }
}

class SearchApi {
  fun search(query: String, dispatch: Dispatch) {
    doAsync {
      val result = magicSearch.search(query)
      uiThread {
        if (!result.success) {
          dispatch(SearchError)
        } else {
          dispatch(SearchResultsLoaded(result))
        }
      }
    }
  }
}
{% endhighlight %}

Redux does not support multithreading so `dispatch` must be called on UI thread.

### Middleware integration

Let's add these two middleware to our store.

{% gist jayrambhia/45f88628444952bacd674b24d0605bda appstore2.kt %}

It's quite easy now. In Redux, thanks to Kotlin, everything is a higher order function and it may have a steep learning curve but it gets easier and quite fun.

### Summary

Our Redux architecture is quite complete now. It doesn't involve crazy hacks, weird syntax and other complexities. You should be able to integrate this implementation in your app.

An example article is coming up. In the next article, I will focus on using this Redux implementation with a complex app so that you can do it yourself too for your own app.

## Redux architecture series

 1. [Introduction: Redux architecture for android apps](/blog/android-redux-intro)
 2. [Middleware: Introduction and implementation](/blog/android-redux-middleware)
 3. [Write your own Redux implementation in Kotlin](/blog/kotlin-redux-architecture)
 4. Add Middleware to your Redux implementation
 5. [Build Battleship Game with Redux - Groundwork](/blog/battleship-kotlin)
 6. [Implement the Battleship gameplay with Redux](/blog/battleship-redux)
