---
category: Blog
tag: Android
comments: true
image:
 twitter: /assets/images/litho-navigation-1.jpg
 facebook : /assets/images/litho-navigation-1.jpg
 height: 270
 width: 180
date: 2017-04-26 16:00:00
layout: post
slug: android-litho-navigation
title: Navigation with Litho
description: Navigate to different screens and components with Litho - Android
keywords: [android, android development, androiddev, dev, litho, react, ui, gif, gifs, search, engine, facebook, open source, recyclerview with Litho, props in Litho, state in Litho, navigation with Litho]
---

This is the third post in series of exploring Litho. In the first post - [Android GIF search engine with Litho](/blog/android-litho-gifs), we explored some key aspects of Litho - LayoutSpec, MountSpec, Use Glide to load images, Update RecyclerView data, etc. In the second post - [Managing State in Litho](/blog/android-litho-state), we dabbled around with state in Litho components. If you're not familiar with Litho, I would suggest you to go through the previous posts.

In this brief post, we will see how we can easily navigate using Litho. In our main component - HomeComponent, we display a grid of GIFs. Now, we will create another component - FullScreenComponent to display the GIF in full screen mode. For navigation, we'll use Litho components instead of different acitivites or fragments.

# LithoView
As you would have seen the first post, we create a view - `LithoView` and set it as the content of our MainActivity. LithoView is a special `ViewGroup` tailored to handle `Component` and `ComponentTree`. We can easily switch components of this view and we are going to use this property for navigation. When the user clicks on a GIF, we will create a new FullScreenComponent and set it in our root (LithoView) and when the user pressed back, we will catch it in `onBackPressed` and update root with the HomeComponent.

# FullScreenComponent
We would like to display the GIF in its proper aspect ratio and make it acquire as much screen space as required. We would also have a like button to show whether the user has liked the GIF or not. We'll also introduce a state so that user can like/dislike the GIF from FullScreenComponent also.

The component needs to show GIF so we will reuse `GifImageView` component with a bit of modification in LayoutSpec. We also need to update `GifItem` model to include width and height of the image in order to properly measure its layout.

## GifItem
{% gist jayrambhia/cecafd7daf1bf6fc0a528c16ae2dddc6 GifItem.java %}
code - [GifItem](https://github.com/jayrambhia/LithoGifSearch/blob/v4-navigation/app/src/main/java/com/fenchtose/lithogifsearch/models/GifItem.java)

We now have small and normal image. We will show small image in the recyclerview and original image in FullScreenComponent. Also, since we have square grids in recyclerview, for layout measurement we will use aspect ratio as 1 but for FullScreenComponent we will use aspect ratio as **width/height**.

## GifImageView
{% gist jayrambhia/cecafd7daf1bf6fc0a528c16ae2dddc6 GifImageViewSpec.java %}
code - [GifImageViewSpec](https://github.com/jayrambhia/LithoGifSearch/blob/v4-navigation/app/src/main/java/com/fenchtose/lithogifsearch/components/GifImageViewSpec.java)

We have updated GifImageView component in order to use in FullScreenComponent as well as GifItemView component. We have introduced an optinal `@Prop boolean isFullScreen`. Since it's optional we do not need to provide it in GifItemView. We can just pass `.isFullScreen(true)` in FullScreenComponent. Based on this prop, it decides the aspect ratio for layout measurement and whether to load small image or original image.

## FullScreenComponent
{% gist jayrambhia/cecafd7daf1bf6fc0a528c16ae2dddc6 FullScreenComponentSpec.java %}
code - [FullScreenComponentSpec](https://github.com/jayrambhia/LithoGifSearch/blob/v4-navigation/app/src/main/java/com/fenchtose/lithogifsearch/components/FullScreenComponentSpec.java)

Creating layouts with Yoga is a bit difficult as you can't see the changes until you run the app. I would suggest you to play around with it. `ClickEvent` is same as what we did in the previous post.

# Navigation
To handle click event and navigation, we will need to update `GifItemView` component and `MainActivity`. We need to update the callback in order for MainActivity to know that user has clicked on the GIF. We also need to update MainActivity to include FullScreenComponent and add navigation logic as well as backstack logic.

## GifItemView
{% gist jayrambhia/cecafd7daf1bf6fc0a528c16ae2dddc6 GifItemViewSpec.java %}
code - [GifItemViewSpec](https://github.com/jayrambhia/LithoGifSearch/blob/v4-navigation/app/src/main/java/com/fenchtose/lithogifsearch/components/GifImageViewSpec.java)

We created another event handler `@OnEvent(ClickEvent.class) onViewClicked` to handle the events when the user clicks on the GIF. To listen to the clicks we added `.clickHandler(GifItemView.onViewClicked(context))` to the Column. When the user clicks on the GIF, callback will be received by MainActivity and we need to create FullScreenComponent and navigate to it.

## MainActivity
{% gist jayrambhia/cecafd7daf1bf6fc0a528c16ae2dddc6 MainActivity.java %}
code - [MainActivity](https://github.com/jayrambhia/LithoGifSearch/blob/v4-navigation/app/src/main/java/com/fenchtose/lithogifsearch/MainActivity.java)

**`LithoView.setComponent()`** methods updates the component in the view and creates a new component tree. This is similar to FragmentTransactions to replace one fragment with another but much simpler. When the user presses back, we check if `isFullScreen` true or not. If it's true, we set HomeComponent to the root and change `isFullScreen` to false.

If you noticed, we are setting **`.key(gif.getId())`** to FullScreenComponent. This is very important. Litho differentiates within same types of components based on this key. If we do not provide different keys for different GIF items, it will reuse the same component and `@OnCreateInitialState` is never invoked and the user will see the GIF is liked even though the user did not like the GIF but opened a GIF (the first GIF that was opened in the session) which they had liked.

Now, if you run the app and click on this funny batman GIF, you'll find this!
![Litho Navigation](/assets/images/litho-navigation-1.jpg)

And if you press back, you're back on the main screen which shows a grid of GIFs.

This looks great but if you open a GIF and change `isLiked` state and come back to the recyclerview, you'll notice that `isLiked` state for that GIF is not updated. We need to make sure that when we come back the state of GifItemView component is also correctly updated. We will cover this in upcoming posts.

## Code

You can find current code here - [LithoGifDemo - v4-navigation](https://github.com/jayrambhia/LithoGifSearch/tree/v4-navigation)

You can find the latest code (keeps updating) here - [LithoGifDemo](https://github.com/jayrambhia/LithoGifSearch)

In the next post, we will explore **`Events with Litho`**

P.S. Litho docs are very short, informative but vague and you tend to miss some things. I have read the docs a lot of times and every time I read a particular section again, I learn some new things.

## Series

 1. [Android GIF search engine with Litho](/blog/android-litho-gifs)
 2. [Managing State in Litho](/blog/android-litho-state)
 3. Navigation with Litho
 4. [Events with Litho](/blog/android-litho-events)