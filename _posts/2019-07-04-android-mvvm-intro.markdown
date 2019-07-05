---
category: Blog
tag: Android
comments: true
date: 2019-07-04 15:00:00
layout: post
image:
  twitter: /assets/images/mvvm-flow.png
  facebook: /assets/image/mvvm-flow.png
  height: 220
  width: 120
slug: android-mvvm-intro
title: Introduction to MVVM architecture in Android
description: Learn about best practices of MVVM architecture in Android. Implement a bug-free unidirectional architecture for your app.
keywords: [android, android development, androiddev, mvvm architecture, immutable state, live data, pure functions, reactive functional android, redux reducers, mvvm in kotlin]
category_tag: [Android, Kotlin, MVVM]
---

MVVM stands for **Model-View-ViewModel**. Google has started recommending usage of this architecture to develop android apps and have provided a lot of new tools and frameworks to support implementation of this architecture. `ViewModel` and `LiveData` being the basics to implement it. Google is also working towards providing support to integrate these components seamlessly with android activity and fragment lifecycles. Although the current state of these tools is not ideal, it's pretty stable and works well.

## Understanding MVVM

Here, I have added a diagram of the MVVM pattern flow and how it binds everything together.

<p align="center">
    <img src="/assets/images/mvvm-flow.png" alt="MVVM flow diagram" title="MVVM pattern flow" style="width: 80%;" />
    <b>MVVM flow diagram</b>
</p>

 - ViewModel interacts with the Model (API, database, etc) to get the necessary data and updating it if required.
 - ViewModel exposes data streams of the **state**. Any component can subscribe to the stream and receive updates regarding the _state_. Here, a view component (activity, fragment, viewgroup, etc) will subscribe to the exposed data streams. On every update, the view component will render itself.
 - When user takes a certain action (eg. save a note, etc), the view would ask the ViewModel to perform certain actions. The ViewModel would update the Model, create a new **state** and dispatch it to the data streams.
 - View component would receive the update and render the updated **state**.

The idea behind MVVM pattern is quite simple but the implementation is bit nuanced which we will dive into the upcoming posts.

## Advantages of MVVM

Before the introduction of MVVM, a lot of apps were developed using MVP architecture. Although MVP is okay, MVVM has significant advantages over MVP pattern. Here are some of the key advantages of MVVM over MVP.

### Coupling

View and Presenter are tightly coupled in MVP. As per the pattern, both View and Presenter have a contract (usually defined via interfaces). It's difficult to _reuse_ these contracts with other views or presenters. This problem does not arise in MVVM pattern as ViewModel exposes only data streams and it's up to the view to decide how to use this data. With this pattern, a view can easily use multiple view models and a view model can be _reused_ with multiple views.

### Unit testing

Unit testing in Android is usually quite painful. To make the MVP unit-testable, we create an interface for the View and use a mocked instance for unit tests. Since a ViewModel is not tied to any View component in MVVM, it's much easier to unit test the ViewModel without having to worry about the view. Since Google is supporting MVVM officially, they have also provided a lot of tools to perform unit tests with MVVM and LiveData so that's a plus.

### Unidirectional

There's a bi-directional data flow between View and Presenter in MVP. To set the data to the view, it usually calls `view.setUser(user)` and to update certain data, view would call `presenter.update(data)` which creates a bi-directional data flow. In MVVM, we would still require to call some method on the ViewModel when the user interacts with the View, but we can create an indirect link which does not directly interact with the ViewModel. Instead of calling `viewModel.update(data)`, we can use `viewModel.dispatch(action)` and the ViewModel or some other component inside the ViewModel handles the action and updates the state. With a _Redux like_ approach, we can make MVVM unidirectional.

### Reactive

MVP is passive so any change in model has to be manually updated by the Presenter. On the other hand, the recommended approach with MVVM is to expose data stream (eg. `LiveData`). Once the data is updated, all the subscribers of the data stream will receive the updates.

Apart from these benefits, one of the major benefit is that Google is officially supporting MVVM architecture pattern and actively providing better tools and frameworks.

## References

Here are some useful links that talk about MVVM architecture pattern.

 - [upday devs - Introduction to MVVM](https://medium.com/upday-devs/android-architecture-patterns-part-3-model-view-viewmodel-e7eeee76b73b)
 - [ViewModel official docs](https://developer.android.com/topic/libraries/architecture/viewmodel)
 - [AndroidPub - MVVM over MVP](https://android.jlelse.eu/why-to-choose-mvvm-over-mvp-android-architecture-33c0f2de5516)
