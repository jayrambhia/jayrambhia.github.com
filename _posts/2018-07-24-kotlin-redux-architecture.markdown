---
category: Blog
tag: Android
comments: true
date: 2018-07-24 17:00:00
layout: post
slug: kotlin-redux-architecture
image:
  twitter: https://raw.githubusercontent.com/reduxjs/redux/master/logo/apple-touch-icon.png
  facebook: https://raw.githubusercontent.com/reduxjs/redux/master/logo/apple-touch-icon.png
  height: 240
  width: 240
title: Write your own Redux implementation in Kotlin
description: Do you want to learn how Redux works? There's no better way than implementing your own Redux architecture. This is a must read guide to write Redux implementation in Kotlin for your android apps. The article covers intricate details of redux store, dispatcher, reducers and middleware.
keywords: [android, android development, androiddev, dev, redux, kotlin, redux architecture, immutable state, redux clean architecture, write your own redux, redux data flow, redux middleware android, builds, pure functions, reactive functional android, redux reducers, redux store in kotlin, redux middleware, redux middleware for network calls, middleware in android redux, redux middleware chain]
category_tag: [Android, Kotlin, Redux]
---

In the previous articles, I talked about **[Redux architecture](/blog/android-redux-intro)** and the **[Role of middleware in Redux](/blog/android-redux-middleware)**. There's no better way to learn something than implementing it yourself. We are going to write a very lightweight implementation of Redux architecture in Kotlin which can be used for our android app.

<p align="center">
  <img alt="redux logo" title="Redux logo" src="https://raw.githubusercontent.com/reduxjs/redux/master/logo/logo-title-dark.png"/>
</p>

## Quick Recap

**Redux** is an architecture for predictable state container and state management. It is inspired from Flux and uses some of its components.
Let's go through the important components of Redux in brief.

### State

State in Redux describes your app's state at any given time. State is an immutable object which holds the information about the 'current state' of the app.

### Action

Action is an object which describes a change in the state. Action may have some payload which is used to update the state.

### Reducer

Reducer is a pure function which changes the app state from State A to State B for a given action.

### Store

Store is at the center of Redux architecture. A store stores the app state and manages it. Once an action is dispatched, the stores updates the app state with the help of reducers.

### Listener

A listener subscribes to the store to receive updates when the app state is updated. In your android app, a typical listener is your Activity, Fragment or View which receives the updated state and `renders` a new UI.

### Middleware

Middleware are essential in Redux architecture to handle side effects which include logging, IO calls, network calls, etc. When an action is dispatched, the store sends the action to the middleware. The middleware does something (api call, etc) and updates the action and sends it back to the store.

For more details about the components of Redux, I would recommend that you check out the previous articles in the series.

 - [Introduction: Redux architecture for android apps](/blog/android-redux-intro)
 - [Middleware: Introduction and implementation](/blog/android-redux-middleware)

Now that we are familiar with Redux, let's start writing our own implementation.

## Implement Redux Architecture in Kotlin

Kotlin is a feature rich language which gives it significant advantage over Java. Kotlin is now an official language for Android application development so it make sense to learn more about it and start writing our apps in Kotlin.

Let's begin by defining our components. For convenience and ease of writing the code, we are going to use Kotlin's higher order functions to represent some of the components.

In Kotlin, `Type aliases` provide alternative names for existing types. If the type name is too long you can introduce a different shorter name and use the new one instead. So we are going to use `typealias` to define Reducer.

### Define components

{% highlight kotlin %}
{% endhighlight %}

{% highlight kotlin %}
interface Action

typealias Reducer<State> = (State, Action) -> State

typealias Subscription<State> = (State) -> Unit

interface Store<State> {
  fun getState(state: State)
  fun dispatch(action: Action)
  fun subscribe(subscription: Subscription)
  fun unsubscribe(subscribe: Subscription)
}
{% endhighlight %}

#### Breakdown

 - `Action` is just an interface. All our actions will implement the empty interface.
 - `Reducer` is a pure function. So we use typealias to define a method definition which takes `State` and `Action` as input and returns `State`.
 - `Subscription` is a typealias for a function which takes `State` as input parameter. It does not return anything. This will be our `render` function.
 - We defined an interface for `Store` with a generic `State`. In Redux, the whole app will have one instace of store and one App state tree object.

### Store implementation

Let's implement the store.

{% highlight kotlin %}
abstract class SimpleStore<Store>(
  private val initialState: State,
  private val reducers: List<Reducer<State>>): Store<State> {

  private var state: State = initialState
  private val subscriptions = arrayListOf<Subscription<State>>()

  override fun getState() = state

  override fun dispatch(action: Action) {
    val new = applyReducers(state, action)
    if (new == state) {
      // No change in state
      return
    }

    state = new
    subscriptions.forEach { it(state) }
  }

  private fun applyReducers(current: State, action: Action): State {
    var new = current
    for (reducer in reducers) {
      new = reducer(new, action)
    }

    return new
  }

  override fun subscribe(subscription: Subscription<State>) {
    subscriptions.add(subscription)
    // notify subscription of the current state
    subscription(state)
  }

  override fun unsubscribe(subscription: Subscription<State>) {
    subscriptions.remove(subscription)
  }
}
{% endhighlight %}

{% gist jayrambhia/45f88628444952bacd674b24d0605bda reduxstore1.kt %}

#### Breakdown

 - `SimpleStore` is an abstract class which takes generic `State`. To initialize a new instance, we pass an initial state and a list of reducers.
 -
