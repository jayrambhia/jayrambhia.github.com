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

{% gist jayrambhia/45f88628444952bacd674b24d0605bda reduxstore1.kt %}

#### Breakdown

 - `SimpleStore` is an abstract class which takes generic `State`. To initialize a new instance, we pass an initial state and a list of reducers.
 - When a subscription subscribes to the store, we add it to the list of subscriptions and notify it of the current state.
 - When an action is dispatched to the store, the store reduces the current state with the help of reducers and notifies all the subscriptions if there's a change in the state.

#### Example

Let's see an example of how our Redux architecture is going to work. For this example, I have chosen to go with an app that searches for movies. It has a `SearchFragment` where user can enter a query in the edit text and press a button to begin the search. While, the search is ongoing, the screen will show a spinner and disable the search button. Once the results are available, the screen will hide the spinner and show the list of movies. To keep it simple, we are not going to focus on errors at the moment.

Let's define a state for the search fragment. The actions associated with it and a reducer.

{% gist jayrambhia/45f88628444952bacd674b24d0605bda searchreducer1.kt %}

 - `SearchState` consists of `loading` - whether the app is loading results or not, `query` - query that the user entered, `movies` - list of movies when the results are loaded.
 - `ClearSearch` - action is dispatched when user clicks on the clear button.
 - `Search` - action is dispatched when user clicks on the search button. The action has `query` as the payload.
 - `LoadingSearch` - action is dispatched when the api starts loading results. This action will be dispatched by middleware, we'll implement it later.
 - `SearchResultsLoaded` - action is dispatched when the api returns results. It has payload of list of movies.
 - `reduceSearchState` is our reducer function associated with this state and the screen. You may have multiple reducers for one state. Typically, we would write a reducer for that state, eg. `SearchState`. But here, we have written it for `AppState` which is main state tree object and it contains `SearchState`.

As you can see, the reducer is not at all tied with the view and it's so much easier to write unit tests since it does not even depend on anything Android related.

Let's define our store which we will use in the app. There should be only one instance of the store so we are going to use a singleton.

{% gist jayrambhia/45f88628444952bacd674b24d0605bda appstore1.kt %}

 - `AppState` is our state tree object which contains the whole state of the app.
 - We create a new class `AppStore` which works with `AppState`. We provide an initial state and a list of reducers. We include `reduceSearchState` reducer in the list.

Let's move on to our View and write a render function.

{% gist jayrambhia/45f88628444952bacd674b24d0605bda searchfragment1.kt %}

 - We subscribe to the store in `onViewCreated` and unsubscribe in `onDestroyView`.
 - `render` method takes the state and updates the view.
 - The view sends appropriate actions when user performs some action.

We just created an implementation of **Redux architecture** in Kotlin. It's not complete, but we are getting there. Let's make it look more like Javascript? I never know if this is a good idea or not.

### Make the store more _closed_

Any piece of code can access `Store.instance` and dispatch some action or get the current state to update something else. This breaks the unidirectional flow of Redux. It would become difficult for debugging so it's better that we restrict the access to the store and its properties.

 - `Dispatch`: We want our store be a bit more restrictive and don't want it to be accessed from some corner of the app. Let's define Dispatch. It's a higher order function passed by the store to its subscribers.
 - `Unsubscribe`: Similarly, we do not want some other part of the code to call `unsubscribe()` to some other subscriber.
 - We also restrict the code to access the state. If some component wants to access the state, it can subscribe to the store.

{% highlight kotlin %}
typealias Dispatch: = (Action) -> Unit
typealias Subscription<State> = (State, Dispatch) -> Unit
typealias Unsubscribe = () -> Unit

interface Store<State> {
  fun subscribe(subscription: Subscription<State>): Unsubscribe
}
{% endhighlight %}

 - We updated the definition of `Subscription`. The method now takes `Dispatch` as a parameter which the store will pass to its subscribers.
 - When the view wants to unsubscribe from the store, it can just call `Unsubscribe()` or `Unsubscribe.invoke()`.
 - To dispatch an action, the component can now use `Dispatch(action)` or `Dispatch.invoke(action)`.

### Implement the new store

We have updated the definition of store and made it more restrictive. Let's modify the implementation.

{% gist jayrambhia/45f88628444952bacd674b24d0605bda reduxstore2.kt %}
