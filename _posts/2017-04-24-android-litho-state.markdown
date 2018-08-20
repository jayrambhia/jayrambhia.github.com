---
category: Blog
tag: Android
comments: true
image:
 twitter: /assets/images/litho-demo-1.jpg
 facebook : /assets/images/litho-demo-1.jpg
 height: 270
 width: 180
date: 2017-04-24 23:00:00
layout: post
slug: android-litho-state
title: Managing State in Litho
description: Update and manage state of components in litho - android
keywords: [android, android development, androiddev, dev, litho, react, ui, gif, gifs, search, engine, facebook, open source, recyclerview, props, state]
series: litho-android
series_description: This is a very important article in this series. We explore the immutable states in Litho and how to properly update them. We will power through some of the boilerplate code to implement like button for our GIFs.
---

This is the second post in series of exploring Litho. In the first post - [Android GIF search engine with Litho](/blog/android-litho-gifs), we explored some key aspects of Litho - LayoutSpec, MountSpec, Use Glide to load images, Update RecyclerView data, etc. If you're not familiar with Litho, I would suggest you to go through the first post.

In this brief post, we will see how we can manage and update state of components in Litho. We already have a list of gifs and now we'll see how useful component state are how we can use the immutability to our advantage. To demonstrate this, we will add a like/favorite button to gifs. We'll use **immutable** data (GifItem) and see how we need not update it to maintain state of components.

# State

A component can have `props` and `state` to define how it should be rendered, what it should render, etc. Props are immutable and can not be changed once set. State can be updated but it's tricky and since it's tricky it's good so that we won't mess it up. As a good practice, state should be immutable or at least thread safe. But we are not going to worry about it right now. We'll just have a boolean state to display whether the user has liked the gif or not.

Let's start coding. This is how our updated GifItem would look like.

{% gist jayrambhia/43aa40a26e9fc514e09681833e4c6c7c GifItem.java %}

We have included `isLiked` but as you can see the class is immutable.

We need to update how our component is going to be laid out. I'm changing previous post's **GifItemViewSpec** to **GifImageViewSpec**. And we are going to create a different GifItemView component which will have a square GIF image and a favorite button on top right corner.

{% gist jayrambhia/43aa40a26e9fc514e09681833e4c6c7c GifItemViewSpec.java %}

You can find **`GifImageViewSpec`** here - [GifImageViewSpec](https://github.com/jayrambhia/LithoGifSearch/blob/v2/app/src/main/java/com/fenchtose/lithogifsearch/components/GifImageViewSpec.java).

Yoga (Flexbox) doesn't work exactly like Android. To put the favorite button on top right corner, we need to use **`.positionType(YogaPositionType.ABSOLUTE)`** in combination with **`.alignSelf(YogaAlign.FLEX_END)`**. The first property gets us FrameLayout behavior and the second one makes it `layout_gravity=end`.

As you can see, **`isLiked`** is a state which would affect the drawable of the button.

`@OnCreateInitialState` is only called once for a component. This is where we need to set our state. We are using `@Prop boolean initLiked` to set the state. This method will never be invoked for the same component throught its lifecycle. After the state is initialized, lifecycle will call other methods. We access this state in `onCreateLayout` to set the correct drawable to the button. To update the state, we need create `@OnUpdateState` method. Litho will generate the code for us and then we can call that method to update the state.

We want to update the state of the button when the user clicks on it. We need to toggle `isLiked` and update the drawable. We need to add a `ClickEvent` which we will receive when the user clicks on the button. `@OnEvent(ClickEvent.class)` method will be invoked by the Click Handler. Litho internally does some magic to propagate events. I'll write about it in upcoming posts. We can get access to state and any props in event method.

Once we call `updateLikeButton` or `updateLikeButtonAsync`, Litho (magically) will call `@OnUpdateState` method and it will recreate the ComponentLayout and our drawable will be updated.

In our **MainActivity**, we'll need to make some changes to include `@Prop initLiked`.

{% gist jayrambhia/43aa40a26e9fc514e09681833e4c6c7c MainActivity.java %}

If you run it now, look for batman GIFs and hit button on some of the images, the state for those components will be updated. When you scroll up and down, you'll see that component state is still maintained without you having to set `liked` in GifItem.

![litho-state-gif](/assets/images/litho-state-demo.gif)

## Boilerplate
We can see that we can have immutable properties and still work very effectively with Litho. This is one of the main advantage of unidrecitonal data flow.

If you reopen the app and search for batman again, you would not have any liked GIFs. To fix that you can have a shared preferences which stores id of the gif as key and boolean as value. And every time you get new data, you can set `isLiked` by looking up values in shared preferences. Once you have your shared preferences or any other db set up, you can use an interface and pass it as a `@Prop` to GifItemView component and call the interface method in your `onEvent(ClickEvent.class)` method.

{% gist jayrambhia/43aa40a26e9fc514e09681833e4c6c7c GifItemViewSpec-1.java %}

Here we can have optional prop with **`@Prop(optional = true)`**. If a prop is optional, we need not pass it all the time. Here's the complete code - [GifItemViewSpec](https://github.com/jayrambhia/LithoGifSearch/blob/v2/app/src/main/java/com/fenchtose/lithogifsearch/components/GifItemViewSpec.java).

To save our data, we can use SharedPreferences.

{% gist jayrambhia/43aa40a26e9fc514e09681833e4c6c7c PreferenceLikeStore.java %}

`PreferenceLikeStore` implements `LikeStore` a basic interface. You can skip on the interface if you want. Here, we can remove gif id from shared preferences if it is unliked.
You can find complete code here - [LikeStore](https://github.com/jayrambhia/LithoGifSearch/blob/v2/app/src/main/java/com/fenchtose/lithogifsearch/models/db/LikeStore.java) and [PreferenceLikeStore](https://github.com/jayrambhia/LithoGifSearch/blob/v2/app/src/main/java/com/fenchtose/lithogifsearch/models/db/PreferenceLikeStore.java).

We need to update **`MainActivity`** in order to have the callback.

{% gist jayrambhia/43aa40a26e9fc514e09681833e4c6c7c MainActivity-1.java %}

As I had mentioned in the previous post, `GifProvider` class uses Retrofit to call API and provide `List<GifItem>`. Here, we are going to modify it a bit and pass `PrefernceLikeStore` to set whether the gif was liked by the user or not. You can find the code here - [GifProvider](https://github.com/jayrambhia/LithoGifSearch/blob/v2/app/src/main/java/com/fenchtose/lithogifsearch/models/api/GifProvider.java) and [MainActivity](https://github.com/jayrambhia/LithoGifSearch/blob/v2/app/src/main/java/com/fenchtose/lithogifsearch/MainActivity.java).

## Code
You can find current code here - [LithoGifDemo - v2](https://github.com/jayrambhia/LithoGifSearch/tree/v2)

You can find the latest code (keeps updating) here - [LithoGifDemo](https://github.com/jayrambhia/LithoGifSearch)

In the next post, we will see how we can implement **[navigation with Litho](/blog/android-litho-navigation)**!

P.S. Working with **State** is a bit more complicated than it seems but I have explored some ways using which we can synchronize states.

## Series

 1. [Android GIF search engine with Litho](/blog/android-litho-gifs)
 2. Managing State in Litho
 3. [Navigation with Litho](/blog/android-litho-navigation)
 4. [Events with Litho](/blog/android-litho-events)
 5. [Synchronizing state between different components](/blog/android-litho-sync)
