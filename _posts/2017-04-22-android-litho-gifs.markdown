---
category: Blog
tag: Android
comments: true
image:
 twitter: /assets/images/litho-demo-1.jpg
 facebook : /assets/images/litho-demo-1.jpg
 height: 270
 width: 180
date: 2017-04-22 22:00:00
layout: post
slug: android-litho-gifs
title: Android GIF search engine with Litho
description: Build an android GIF search engine with Litho by engine and giphy
keywords: [android, android development, androiddev, dev, litho, react, ui, gif, gifs, search, engine, facebook, open source, recyclerview, props, states]
---

I recently tried my hands with [React](https://facebook.github.io/react/) - A Javascript library for building user interfaces. I started following this amazing tutorial - 
[React 101](https://blog.tighten.co/react-101-building-a-gif-search-engine) by [Tighten](http://blog.tighten.co/). I had just finished building my first GIF search engine
and Facebook open sourced [Litho](http://fblitho.com/) - A declarative UI framework for Android. Well, Litho takes a lot of inspiration from React. I had just started to get my hands dirty with React (and liked it), I thought I give Litho a try. So what should I do? GIF search engine for Android using Litho!

![Litho Giphy Demo](/assets/images/litho-demo-1.jpg)

# Litho
I am not going to talk about what Litho or React is. Well, as the website says Litho is a declerative UI framework for Android. It uses [Yoga](https://facebook.github.io/yoga/) - cross-platform layout engine which uses Flexbox like styling. If you are not from a web development background, a lot of things are going to sound strage and yes, I also find it strage but then again I try to learn other things to know what good stuff they have. Flexbox is good and so seems Yoga. Before, proceeding further, I would suggest that you go through [Getting Started](http://fblitho.com/docs/getting-started) and [Tutorial](http://fblitho.com/docs/tutorial) of Litho.

Since Litho seems to be inspired from React, it uses `Components` and you can make a great UI with adding bunch of components and those components are reusable! Facebook has spent a lot of time and resources in making Litho efficient. It wants to be so efficient that it generates most of its own code. As a end user, you can not create a Component (You can but it would not be efficent). You write a `ComponentSpec` and Litho will generate all the code for you. Have you used Dagger 2? Yes, it's that amount of generated code so I guess method count is going to go sky high! There are two types of CompoentSpec.

	1. LayoutSpec
	2. MountSpec

MountSpec is if you want to customize a lot of things. We'll talk about it later. LayoutSpec - quoting from the docs,

	A layout spec is the logical equivalent of a composite view on Android. It simply groups existing components together in an immutable layout tree.

Less talk, more code!

Let's just dive into it.

# GIF search engine App
It's just a simple one screen - no navigation (yet) app to search GIFs from [Giphy](http://giphy.com/). It's a glorified search engine. I have used Retrofit to fetch data and Glide to load gifs, but I won't be discussing it in this post.

Since it's a simple app, all we need is an `EditText` and a `RecyclerView`. Conventionally, we would use a `LinearLayout` with vertical orientation and add an EditText and a RecyclerView in XML. But we're going to talk Litho and bit of React. In Recat, these things are considered components. So Let's start there.

## Components
As you can easily figure out, we would need one component to hold EditText and RecyclerView. Let's call it `HomeComponent`.

### HomeComponent
To generate HomeComponent, we require a HomeComponent Spec which would look something like this.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a HomeComponentSpec.java %}

Litho will generate HomeComponent class which you can use. If you notice, we are using `@Prop String hint`. **`@Prop`** comes from React where you can pass some properties to components. We do not require this property, but we are going to use it anyway. We take this property and set it as EditText's hint. We need to stack the views horizontally, so we'll use `Column` as it stacks the views horizontally. We can add views with `child` method.

Note: EditText is a litho's widget. It is **to be confused** with Android's EditText because litho's EditText renders Android's EditText.

To display HomeComponent on the screen, we will modify `MainActivity`.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a MainActivity.java %}

If you run the app now, you'll just see an EditText at the top. We have not added any data/views to the RecyclerView component. So Let's add some data.

### GifItemViewComponent
As we discussed, all the views are components. Each item in the RecyclerView will also be a component. We need to make a component for that.
Since we are going to show a gif, let's name it GifItemViewComponent. We will need to write a Component Spec. Here, we are just going to show a simple title.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a GifItemViewSpec.java %}

Now, we need to add some dummy data so that we can see something on the screen. We need to update `HomeComponentSpec.getRecyclerComponent`.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a HomeComponentSpec-Recycler.java %}

`RecyclerBinder` is sort of a super RecyclerView Adapter which takes care of creating views. It's supposed to be highly optimised. RecyclerView Adapter recycles ViewHolders but RecyclerBinder recycles each view. It will recycle and use `Text`, `Image`, etc even for different components in the RecyclerView.

`binder.insertItemAt(position, ComponentInfo)` is used to add Component at a specified position.

Now, you'll see a list of huge "Hello World" on your screen. Let's try to change that and get more dynamic content. We can do this by sending title as a prop.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a GifItemViewSpec-1.java %}

We also need to update our binder insert method, otherwise we'll get a runtime exception as we did not pass `@Prop String title` to GifItemView.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a HomeComponentSpec-Recycler-1.java %}

Now, we have different data on the screen. But, how would we update it in case we get some different data? 

### States
Litho has something called `@State` where you can define and update the states of the component. But it's not so easy. There is some pre-defined APIs that are available and in `protected` scope so can't be called from outside. (eg. Activity). You could add a static methodin your Spec class which would trigger state update but it requires a `ComponentContext` and you could pass it from activitybut it would not work because it doesn't have any component bound to it. There aren't many (or any) example
which would show how to update recyclerview's (adapter) data dynamically.

### Dynamic Updates
After a lot of trial and erros, I figured out a better way to do it. Since we use `RecyclerBinder` to add/remove components, we just need access to that. So I decided to pass binder as a prop.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a HomeComponentSpec-1.java %}

We'll update **MainActivity** to load data after 2 seconds.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a MainActivity-1.java %}

If we can do this, it means that we can update the data from an API response.

### Query
We have established that, we can update data dynamically. The next part is to listen to changes in the EditText. For this we'll use an interface and pass an implementation as a prop. We need to listen to EditText updates so we will create an interface `onQueryUpdateListener` and pass it as a prop to HomeComponent. It has an `@OnEvent(TextChangedEvent.class)` method which when hooked to `EditText.textChangedEventHandler()`, it will start giving us updates.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a HomeComponentSpec-2.java %}

We have passed `@Prop OnQueryUpdateListener listener` in `onQueryChanged`. Litho will detect this and add it as a prop.

We will update **MainActivity** and pass listener prop to HomeComponent.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a MainActivity-query.java %}

To summarize,

	1. We can listen to EditText updates.
	2. We can update data dynamically.

And there's only one (major) part remaining. **Showing Gifs**!

### Image
I think this was the most difficult part of this project. Litho provides `Image` widget but it's not as flexible as `ImageView`. You can't use `setBitmap` or hook it directly into Glide. It just takes a drawable. So it would be super difficult to keep track of downloaded bitmaps and have state in the component and update it, oh and did I tell you that there isn't a direct easy way to update states from outside? So I started digging into litho's sample code and they have used Fresco with some other
library. It should not be that difficult to display an image, right?

But then I noticed that they have used **`@MountSpec`** which is basically used for custom views and drawables. So I started looking for some docs and examples but the only one they have of ColorDrawable is super easy and it's difficult to figure out the lifecycle and how things are working.

[MountSpec doc](http://fblitho.com/docs/mount-specs). After reading through the fine print, I realized that I can return a View or a Drawable in `@onCreateMountContent`. As the name suggests, you create a content to display. So anyway, after couple of hours, I finally got it right. Let's just start small.

Let's update **GifItemViewSpec**

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a GifItemViewSpec-2.java %}

We have updated GifItemViewSpec from `LayoutSpec` to `MountSpec` so that we can draw an image. **`@onMeasure`** is called when the layout needs to be measured. If you don't provide this method, it may not draw the view as width and height will be 0. **`@onCreateMountContente`** is called when the view is going to mount and needs the content which is going to be rendered. You can not pass any `@Prop` in this method. Since we removed `@Prop String title`, you will need to update some code. I'll also update the binder so that it shows a grid of 3 columns.


{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a MainActivity-grid.java %}

Now, you'll see something like this.

![Litho Giphy Demo](/assets/images/litho-demo-2.jpg)

So now we can use `ImageView` and if we can use ImageView, we can also use Glide or Piccasso or any other image loading library to display images. So let's start!

### Boilerplate
I am using `Retrofit` to fetch data from Giphy search API and loading it in the RecyclerView. I am going to skip that part. We also don't want to make API calls for every characeter that user enters so to make things easy I have kept a limit of 6 letters - because **Batman**.

So here's how things will look.

**GifItem** is the model class which we will pass as a `prop` to `GifItemView`.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a GifItem.java %}

We need to update `GifItemViewSpec` so that it will use Glide to load the GIF.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a GifItemViewSpec-3.java %}

**`@onMount`** is called when the view is mounted. We should call Glide here. In `onMount` method we get ComponentContext and the value which we returned in `@onCreateMountContent` so we'll have access to the ImageView. We pass `GifItem` as a prop in this method.

In **MainActivity** after hooking everything together, we'll use `OnQueryUpdateListener` to get data and call API using Retrofit and once we get the data, we will hook the data to binder.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a MainActivity-2.java %}

`GifProvider` takes care of initializing retrofit and when `search(String query)` is called, it will make an API request and return `List<GifItem>` in `ResponseListener` callback. We could have used RxJava but it seemed out of scope for this demo.

I think everything is in place and if you search for batman now, you should get this!

![Litho Giphy Demo](/assets/images/litho-demo-1.jpg)

There are some optimizations that you can do. Instead of calling `Glide.with(context)` in GifItemViewSpec, you can pass `Glide.RequestManager` as a prop.

So your GIF search engine powered by Litho (and Giphy) is ready! I'll explore more about states, good practices, and other awesome features in upcoming posts.

It's fun to work with Litho. The API is quite easy but there is some learning curve and if you want customize it or have some weird states, you're in for a roll.

Here's the [GitHub Repository](https://github.com/jayrambhia/LithoGifSearch).

P.S. I do not (yet) fully understand Litho, States, Yoga, Flexbox so feel free to suggest updates and best practices.

