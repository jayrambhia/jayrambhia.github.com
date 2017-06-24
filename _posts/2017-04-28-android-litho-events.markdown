---
category: Blog
tag: Android
comments: true
image:
 twitter: /assets/images/litho-demo-1.jpg
 facebook : /assets/images/litho-demo-1.jpg
 height: 270
 width: 180
date: 2017-04-28 16:00:00
layout: post
slug: android-litho-events
title: Using Events in Litho
description: Use events to send component updates in Litho instead of callbacks
keywords: [android, android development, androiddev, dev, litho, react, ui, gif, gifs, search, engine, facebook, open source, recyclerview with Litho, props in Litho, state in Litho, events with Litho, custom events in Litho]
---

This is the fourth post in the series - Exploring Litho. In the first post - [Android GIF search engine with Litho](/blog/android-litho-gifs), we explored some key aspects of Litho - LayoutSpec, MountSpec, Use Glide to load images, Update RecyclerView data, etc. In the second post - [Managing State in Litho](/blog/android-litho-state), we dabbled around with state in Litho components. In the third post - [Navigation with Litho](/blog/android-litho-navigation), we used `LithoView` and components to navigate instead of an Acitivity or a Fragment. If you're not familiar with Litho, I would suggest you to go through the previous posts.

In this small post, we will explore Litho's Events API and different uses of it. We have been using callback interface to send events from components to MainActivity. eg. `GifCallback`. This interface has two methods

 1. onGifLiked(String gifId, boolean isLiked);
 2. onGifSelected(GifItem gif);

We'll explore how Events work and replace this callback interface usage with Events.

# Events

Litho provides a general purpose API to connect components through events. We can use a POJO annotated with **`@Event`** as an event class. Let's write an event class for when the user clicks on like button.

{% gist jayrambhia/f44b18b528764bf7b9d5990cf6c15438 LikeChangeEvent.java %}

For Litho to use the event class, the variables must be declared `public`.

We'll also add an event class for when the user clicks on a GIF.

{% gist jayrambhia/f44b18b528764bf7b9d5990cf6c15438 GifSelectEvent.java %}

GifSelectEvent is used when the user clicks on a GIF (GifItemView component).

Let's integreate these events in GifItemView component.

{% gist jayrambhia/f44b18b528764bf7b9d5990cf6c15438 GifItemViewSpec.java %}

You can find complete code here - [GifItemViewSpec](https://github.com/jayrambhia/LithoGifSearch/blob/v5-events/app/src/main/java/com/fenchtose/lithogifsearch/components/GifItemViewSpec.java).

For the component to dispatch an event, we need to add the event class in annotation - **`@LayoutSpec(events = { LikeChangeEvent.class })`**. We can provide multiple events also. Once we have annotated it with the event, Litho will regenerate `GifItemView` component and add necessary code to dispatch the event.

We'll have `dispatchLikeChangeEvent` static method generated using which we can send the event and the required parameters. Litho also generates a static method - `getLikeChangeEventHandler`. To dispatch an event, we need to provide an `EventHandler`.

## EventHandler
EventHandler is a generic class which uses `HasEventDispatcher` interface to dispatch events.

## HasEventDispatcher
HasEventDispatcher is an interface to expose method to retrieve and `EventDispatcher`. I think it's a weird name.

## EventDispatcher
EventDispatcher is an interface to expose method to dispatch an `Event`.

`dispatchLikeChangeEvent` method calls `EventHandler` to get an `EventDispatcher` via `HasEventDispatcher`. Once it acquires an EventDispatcher, it calls `EventDispatcher.dispatchOnEvent(EventHandler, eventState)`. So to recieve this event, we need to create an `EventHandler` instance.

{% gist jayrambhia/f44b18b528764bf7b9d5990cf6c15438 EventHandler.java %}

We need to pass this EventHandler to GifItemView component via builder. If we have defined an event to be sent by a component, it is necessary for us to pass an EventHandler via builder. While creating an EventHandler we need to pass an id and Object[]. Due to lack of documentation, I don't know where these things are used.

Note: Litho is completely context aware and each component has its own context and context is also bound to component. So to get events, send events, update state values, we need to right context!

Let's hook up these events in our **MainActivity** and replace callbacks.

{% gist jayrambhia/f44b18b528764bf7b9d5990cf6c15438 MainActivity.java %}

As mentioned above, we need to pass the event handler in builder while creating components. For EventHandler id, you can have the same id as it does not seem to make any difference. This would be more clear once some docs are available. We need to update FullScreenComponentSpec also.

You can find complete code here - [MainAcitivity](https://github.com/jayrambhia/LithoGifSearch/blob/v5-events/app/src/main/java/com/fenchtose/lithogifsearch/MainActivity.java) and [FullScreenComponentSpec](https://github.com/jayrambhia/LithoGifSearch/blob/v5-events/app/src/main/java/com/fenchtose/lithogifsearch/components/FullScreenComponentSpec.java).

We have removed callback interfaces and using EventHandler so that components can send events to MainActivity.

## Code

You can find current code here - [LithoGifDemo - v5-events](https://github.com/jayrambhia/LithoGifSearch/tree/v5-events)

You can find the latest code (keeps updating) here - [LithoGifDemo](https://github.com/jayrambhia/LithoGifSearch)

In the next post, we will explore how we can use events to connect different components and synchronize states. Till now, our states are not synchronized and we will use events to update states.

P.S. Litho is a bit complicated to understand but it does solve a lot of issues and most specifically the state and props are immutable.

## Series

 1. [Android GIF search engine with Litho](/blog/android-litho-gifs)
 2. [Managing State in Litho](/blog/android-litho-state)
 3. [Navigation with Litho](/blog/android-litho-navigation)
 4. Events with Litho
 5. [Synchronizing state between different components](/blog/android-litho-sync)

