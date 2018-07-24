---
category: Blog
tag: Android
comments: true
date: 2018-07-23 16:00:00
layout: post
image:
  twitter: https://raw.githubusercontent.com/reduxjs/redux/master/logo/apple-touch-icon.png
  facebook: https://raw.githubusercontent.com/reduxjs/redux/master/logo/apple-touch-icon.png
  height: 240
  width: 240
slug: android-redux-intro
title: Redux architecture for android apps
description: What is Redux architecture? Learn about Redux and how to use it in your android app. Update your MVP/MVVM architecture to Redux and have a bug free app. Learn about actions, reducers, state management and redux store in-depth and write your own Redux implementation in Kotlin.
keywords: [android, android development, androiddev, dev, redux, kotlin, redux architecture, immutable state, redux clean architecture, write your own redux, redux data flow, redux middleware android, builds, pure functions, reactive functional android, redux reducers, redux store in kotlin]
category_tag: [Android, Kotlin, Redux]
---

I'm sure you must have heard about Redux architecture from your front end colleagues and friends and maybe from someone who is an app developer. [Redux](https://redux.js.org/) is a very popular framework for a predictable state container for Javascript apps. It has become quite ubiquitous in its usage with [React](https://github.com/reduxjs/react-redux) to develop scalable web apps. Redux is inspired from [Flux](https://facebook.github.io/flux/) architecture which emphasizes on **unidirectional** data flow. Redux takes some good parts from Flux - store, actions, dispatcher, **unidirectional** data flow and improves upon it to.

<p align="center">
  <img alt="redux logo" title="Redux logo" src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo-title-dark.png"/>
</p>

## Redux Concepts

The Redux architecture is not very complicated but it has a steep learning curve especially for Java programmers. Redux focuses more on functional programming with some reactive elements as compared to run of the mill Java apps which are more object oriented. Redux is also different from architectures such as MVP, MVC or MVVM as `View` is a significant part of these architectures and sometimes heavily tied. eg. `view.showLoading()`, etc. Where as Redux does not know and does not care about `View`.

Let's go over the components that make Redux. I'll explain some details with an example of an app where users can search for a movie.

### State

State in Redux describes your app's state at any given time. State is an immutable object which holds the information about the 'current state' of the app. In Redux, state is immutable and can not be changed. To update the state, a copy or a new object must be created. Based on the requirements of your app, your state can have many `sub-state` or `child state`. Your state should be as small and flat as possible. If you have a deeply nested state, it can be very difficult to manage it. Let's look at an example.

{% highlight kotlin %}
data class AppState(val searchState: SearchState)
data class SearchState(val query: String, val movies: List<Movie>)
{% endhighlight %}

Here, we have a data class `AppState` which represents the state of the whole app. `SearchState` represents the state of the search (or search screen, but we are not going to focus on the view right now). `query` is the search term entered by the user and `movies` is the list of movies that search returned.

`data class` in Kotlin are very helpful as they are immutable and easy to copy so it makes sense to use it for our app's state.

### Action

In Redux, `Action` describes the change in the state. Usually, action has a name and some payload attached to it. But we can do without the name field. Here's an example.

{% highlight kotlin %}
interface Action

object ClearSearch: Action
data class Search(val query: String): Action
data class (val movies: List<Movie>): Action
{% endhighlight %}

 - `ClearSearch` : This action describes that the query and search results should be cleared.
 - `Search` : This action describes that a search should be made based on the given query.
 - `SearchResultLoaded` : This action describes that search result should be loaded to the state.

So each of these actions will transform the state to a new one.

### Reducer

Reducers are an integral part of the Redux architecture. As the name suggests, a Reducer reduces (changes) the current state to a new state (based on the given action). In Redux, reducers are pure functions and they should not have any side effects. A pure function will give the same output for the same inputs no matter how many times you run it or when you run it. A pure function should not have something like `time.getTime()` or `Random.getRandom()` because we can't predict the outcome in absolute values. Reducers should not have any side effects, eg. logging, making an api call, etc.

Let's write a reducer for `AppState` which modifies `SearchState` and in turn `AppState`.

{% highlight kotlin %}
fun reduce(state: AppState, action: Action): AppState {
  return when(action) {
    is ClearSearch -> state.copy(searchState = SearchState(query = "", movies = listOf()))
    is Search -> state.copy(searchState = state.searchState.copy(query = action.query))
    is SearchResultLoaded -> state.copy(searchState = state.searchState.copy(movies = action.movies))
    else -> state
  }
}
{% endhighlight %}

This reducer will change the state for `ClearSearch`, `Search` and `SearchResultLoaded` actions only. For other actions, it will simply return the state as is.

### Store

Until now, `State`, `Action` and `Reducer` are just there and you may be wondering how are these things related and tied together to make it work. That's where `Store` comes in. Store is at the heart of Redux. The store has following responsibilities.

 - Store the state.
 - Provide access to the state.
 - Allow the state to be updated.
 - Notify the listeners about the change.

Let's see how the store is supposed to look.

{% highlight kotlin %}
interface Store {
  fun getState(): AppState
  fun dispatch(action: Action)
  fun subscribe(listener: StateChangeListener)
  fun unsubscribe(listener: StateChangeListener)
}

interface StateChangeListener {
  fun onUpdate(state: AppState)
}

class AppStore(val initialState: AppState, val reducers: List<Reducer>): Store {
  override fun dispatch(action: Action) {
    val newState = applyReducers(action)
    currentState = newState
    // .. notify listeners of the state change.
  }

  private fun applyReducers(action: Action): State {
    var state = currentState
    for (reducer in reducers) {
      state = reducer.reduce(state, action)
    }

    return state
  }
}
{% endhighlight %}

This is a very crude definition of the Store and we will improve it later to make it less verbose and more *closed*. `Reducer` is just some class that I have put here. We would replace it with higher order function later to make it cleaner. According to this implementation, the order of the reducers matters.

#### How does the store bind it all together?

 - The store is created with a default state and a list of reducers.
 - A component (usually the view) dispatches an action by calling `Store.dispatch(action)`.
 - The store iterates through all the reducers and asks them to reduce the current state to a new state based on the dispatched action.
 - Once the state is reduced to a new state, it will notify all the listeners via `listener.onUpdate(state)` if the state has actually updated.

#### Where does the view come in the picture?

The view subscribes to the store for state updates. Every time the state is updated, the store will notify the view and give it the new state. The view will render itself based on the new state. When user performs some action, eg. enter a search query, it will dispatch an action to the store.

#### Summary?

To summarize, when an action is dispatched, the store asks the reducers to reduce the current state to a new state based on the given action. The store then notifies all the listeners (views in our case) of the state change. Here's how the flow looks like!

<p align="center">
	<img alt="redux android flow" title="Redux unidirectional flow simplified" src="/assets/images/redux-flow-diagram.png"/>
</p>

#### Some code maybe?
Here's some sample code that our movie search app will use on its search screen.

{% highlight kotlin %}
class SearchFragment: Fragment {
  var listener: StateChangeListener? = null

  // ... setup your fragment

  override fun onViewCreated(View view) {
    super.onViewCreated(view)

    // ... initialize views

    searchButton.setOnClickListener {
      store.dispatch(Search(editText.text.toString()))
    }

    clearButton.setOnClickListener {
      store.dispatch(ClearSearch)
    }

    val listener = object: StateChangeListener {
      override fun onUpdate(state: AppState) {
        editText.setText(state.searchState.query)
        adapter.setMovies(state.searchState.movies)
      }
    }
    store.subscribe(listener)
    this.listener = listener
  }

  override fun onDestroyView() {
    super.onDestroyView()
    listener?.let {
      store.unsubscribe(it)
    }
  }
}
{% endhighlight %}

 - Create a `StateChangeListener` which listens to state updates from the store. This is your `render` function which would update the UI based on the state. Subscribe it to the store.
 - `searchButton` will dispatch `Search` action on click. The store will reduce the current state to the new state with the help of the reducers.
 - `clearButton` will dispatch `ClearSearch` action on click. The reducer will change the `SearchState` query to empty string and movies to empty list. The store will notify the listeners of the new state. Our render function will update the UI.

I hope the explanation has made some sense and you have a bit of a picture of different concepts of Redux. Let's go through the principles of Redux architecture.

## Redux Principles

Redux is described via these three fundamental principles.

### 1. Single source of truth.

The state of your whole application is stored in a single object (object tree) within a single store. It means that your app has only one store and one state object. Other states are stored in the app state object. A single state tree makes it easier to debug the application. The state of the application is single source of truth.

### 2. State is read-only.

The state is immutable and can only be changed via `dispatching` an action to the store. State immutability is very important as we know exactly which action updated the state. It also ensures that the views or the network calls can not change the state directly. All the changes are centralized via the store and happen one by one in an order which also helps us in avoiding race conditions.

### 3. Changes are made with pure functions.

Reducers are pure functions that take the previous state and an action, and return the next state. Reducers are *stateless* in a sense that they do not care about the history. They will change State A to state B with given action X every time. There are no exceptions to this. This makes the reducers really easy to unit test.

These 3 principles are very important and are core elements of the Redux architecture. Now, that you have learnt about Redux, let's see what are the reasons this could be beneficial in android application.

### How does Redux help with developing an android application?

Redux allows us to solve a lot of different potential problems.

 - **Single source of truth**: Redux has one state for the whole app. So if something somewhere in the far corners of our app tries to change something, we will know about it since it has to dispatch an action to the store.

 - **Immutability**: Redux state is immutable so we are very sure that it's not going to change randomly. We are confident about our state and UI.

 - **Single threaded**: Redux works on single thread only. All the actions must be dispatched on the same thread where the store was created. UI thread in case of android apps. The store notifies the listeners on the same thread. With this we avoid race conditions which are difficult to detect and fix.

 - **Time travel debugging**: Since the state is stored in the `Store` and can only be updated via dispatching an `Action`, we can have something like time travel debugging. Basically, we can go through the logs and see the state 10 actions before. We could also write some component which would change the app state to any of the previous states and the UI would just work.

 - **Separation of concerns**: In MVP or MVVM, the `view`,although passive, is still an integral part of the architecture. The presenter always calls method of the view / view interface. In Redux, the view is insignificant and is irrelevant for the Store and Reducers. This helps us in writing clean unit tests.

 - **Pure functions**: All the reducers are pure functions so it's so much easier to expect what the function is going to return for a set of inputs. Writing unit tests for pure functions and covering all the cases is much easier.

Redux also creates some problems for us, but if we are disciplined in writing the code, we can avoid them.

 - **Single source of truth**: It's a great pro but it can become a swirling abyss in no time. Since there is only one state tree, having complex multiple sub-states or child states can make our reducer logic go a bit haywire. Try to keep your state as flat and simple as possible.

 - **UI state**: The Redux generally does not care about the state, but we still have to add some UI state in our App state. This can also get complex very fast. So try to keep your UI state minimal.

 - **Steep learning curve**: Redux is based on functional paradigm and it takes some time to have that **Ahaa!** moment about Redux. Even though you don't use Redux in your app, you should try to learn and write your own implementation. It's really interesting.

There are more advantages and disadvantages of Redux architecture in an android app, but we will visit them in upcoming articles.

You must be wondering about `API calls` or `Database calls` which happen on IO thread and are technically not pure functions. Yes, Redux has taken care of it. These are `Effects` or `Side Effects` and can be integrated with the Store via `Middleware`. I'll write more about `Middleware` in the next article. We'll also write our own implementation of Redux architecture.

## Redux architecture series

 1. Introduction: Redux architecture for android apps
 2. [Middleware: Introduction and implementation](/blog/android-redux-middleware)
 3. [Write your own Redux implementation in Kotlin](/blog/kotlin-redux-architecture)
