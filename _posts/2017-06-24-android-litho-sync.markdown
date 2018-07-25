---
category: Blog
tag: Android
comments: true
image:
 twitter: /assets/images/litho-demo-1.jpg
 facebook : /assets/images/litho-demo-1.jpg
 height: 270
 width: 180
date: 2017-06-24 16:00:00
layout: post
slug: android-litho-sync
title: Synchronizing state between different components in Litho
description: Use events to synchronize state between different components in Litho, Propagate state changes in Litho
keywords: [android, android development, androiddev, dev, litho, react, ui, gif, gifs, search, engine, facebook, open source, recyclerview with Litho, props in Litho, state in Litho, events with Litho, custom events in Litho, propogate state changes in Litho, synchronize state in Litho]
category_tag: [Android, Litho]
---

This is the fifth post in the series - Exploring Litho. In the first post - [Android GIF search engine with Litho](/blog/android-litho-gifs), we explored some key aspects of Litho - LayoutSpec, MountSpec, Use Glide to load images, Update RecyclerView data, etc. In the second post - [Managing State in Litho](/blog/android-litho-state), we dabbled around with state in Litho components. In the third post - [Navigation with Litho](/blog/android-litho-navigation), we used `LithoView` and components to navigate instead of an Acitivity or a Fragment. If you're not familiar with Litho, I would suggest you to go through the previous posts. We explored Events and how to use them to propogate changes in the fourth post - [Using Events in Litho](/blog/android-litho-events).

We are going to explore some ways using which we can synchronize and update component state. When we like a GIF in full screen and come back, we need to update the state of that component in RecyclerView. As we have seen in the previous posts, that updating a component's state from outside is not possible. So we somehow need to use the component to update its state. We are going to achieve this with the help of Events.

Let's add an event `FavChangeEvent` which we'll use to update the state of `GifItemView` component. We'll call this event from outside of GitItemView component. We already have `LikeChangeEvent` which we use internally to update the state of `liked` and invoke callback to update our local database.

{% highlight java %}
@Event
public class FavChangeEvent {
	public boolean isLiked;
	public String gifId;

	public FavChangeEvent(boolean isLiked, String gifId) {
		this.isLiked = isLiked;
		this.gifId = gifId;
	}
}
{% endhighlight %}

We want to listen to `FavChangeEvent` and update state. This event should not invoke callback to update database. Let's add this event to `GitItemViewSpec`.

{% gist jayrambhia/65d11ade3bfe49f7ceaafdf746f968d6 GifItemViewSpec.java %}

You can find complete code here - [GifItemViewSpec](https://github.com/jayrambhia/LithoGifSearch/blob/v6-state-sync/app/src/main/java/com/fenchtose/lithogifsearch/components/GifItemViewSpec.java).

Now, we can use onFavChanged to update `isLiked` State. Let's modify `FullScreenComponentSpec` so that it can send `FavChangeEvent` when like button is clicked.

{% gist jayrambhia/65d11ade3bfe49f7ceaafdf746f968d6 FullScreenComponentSpec.java %}

You can find complete code here - [FullScreenComponentSpec](https://github.com/jayrambhia/LithoGifSearch/blob/v6-state-sync/app/src/main/java/com/fenchtose/lithogifsearch/components/FullScreenComponentSpec.java).

When we receive `ClickEvent`, onLikeButtonClicked method will be invoked. We need to do 3 things here.

 1. Update `isLiked` state of FullScreenComponent.
 2. Update database.
 3. Send an event so that `isLiked` state of GifItemView component is also updated.

 - `FullScreenComponent.updateLikeButtonAsync(c, !isLiked)` will update its own `isLiked` state.
 - `FullScreenComponent.dispatchLikeChangeEvent(FullScreenComponent.getLikeChangeEventHandler(c), !isLiked, gif.getId())` will update the database. We can use a simple callback here instead of Event. And it's recommended to use a callback because working with Event generates a lot og boilerplate code.
 - `EventHandler<FavChangeEvent> handler = GifItemView.onFavChanged(c)` will create FavChangeEvent which we will dispatch to update GifItemView state.

So let's try it out.

**Did not work!**

## Debugging

At the time, I had no clue why it did not work. So I started debugging and added bunch of breakpoints all over the place especially in `GifItemView#dispatchOnEvent()`. That method has switch case based on event id and calls appropriate methods. I started debugging and realized that after dispatching event from FullScreenComponent, GifItemView is never receiving the event to dispatch. That seems odd. What could be the reason for this?

 1. How does FullScreenComponent know which GifItemView component to send the event to?
 2. Does it work like EventBus? Litho component listens to the events and there's a central dispatcher which sort of broadcasts events? That seems unlikely.

I needed to debug more to understand how these events are sent. I added breakpoints to FullScreenComponent generated class and started debugging again. I realized that `FullScreenComponent#dispatchOnEvent` was being called when we were dispatching FavChangeEvent. After digging further, I realized that the `EventHandler` was created using `ComponentContext` of FullScreenComponent and hence the `EventDispatcher` used by that EventHandler also belonged to FullScreenComponet's ComponentContext and it would send the event to that component itself!

**Wow! Such intricate architecture!** I'm so happy.
<br/>
![Pikachu Gif - from giphy](http://i.imgur.com/OXlfqkj.gif)

## ComponentContext

Litho is so context aware! In this series, we have found some things which just don't work if you don't have the correct context. Let's add this to the list. Being so context aware is really a great thing and I can only wonder and admire the thoughts that went into building such complex yet so easy to use framework.

Each component has its own context and even context of the same component class are useless. We need the context of that component!

So let's get back to fixing the issue.

## ContextAwareEventHandler

We need `GifItemView` component in FullScreenComponet for state synchronization to work. So let's pass it as a `@Prop`.

{% gist jayrambhia/65d11ade3bfe49f7ceaafdf746f968d6 FullScreenComponentSpec-1.java %}

You can find complete code here - [FullScreenComponentSpec](https://github.com/jayrambhia/LithoGifSearch/blob/v6-state-sync/app/src/main/java/com/fenchtose/lithogifsearch/components/FullScreenComponentSpec.java).

For this, we also need to update some other code and we need to pass GifItemView component in callback.

{% gist jayrambhia/65d11ade3bfe49f7ceaafdf746f968d6 GifItemViewSpec-1.java %}

You can find complete code here - [GifItemViewSpec](https://github.com/jayrambhia/LithoGifSearch/blob/v6-state-sync/app/src/main/java/com/fenchtose/lithogifsearch/components/GifItemViewSpec.java).

Now, that we have updated the callback and we are passing `GifItemView` as @Prop, we also need to update some other files.

You can find complete code here - [MainActivity](https://github.com/jayrambhia/LithoGifSearch/blob/v6-state-sync/app/src/main/java/com/fenchtose/lithogifsearch/MainActivity.java)

<br/>

Let's try it out! Yes, and it does work!

We have also fixed the issue where if user opnes a big view from a smaller view and updates like, etc, we can easily propogate those changes back to the smaller component. Small things as these are really a great UX win!

## Code

You can find current code here - [LithoGifDemo - v6-state-sync](https://github.com/jayrambhia/LithoGifSearch/tree/v6-state-sync)

You can find the latest code (keeps updating) here - [LithoGifDemo](https://github.com/jayrambhia/LithoGifSearch)

In the next post, we will explore how we can use MVP architecture with Litho to build an application that can scale. Litho components are really declerative and can be an ideal View in MVP.

P.S. My experience with Litho has been amazing. It has great potential and if we can make a scalable MVP using Litho, it would be a great step in validating Litho. Of course, Facebook uses it in the Android app so we really don't need a better validation than that.

## Series

 1. [Android GIF search engine with Litho](/blog/android-litho-gifs)
 2. [Managing State in Litho](/blog/android-litho-state)
 3. [Navigation with Litho](/blog/android-litho-navigation)
 4. [Events with Litho](/blog/android-litho-events)
 5. Synchronizing state between different components
