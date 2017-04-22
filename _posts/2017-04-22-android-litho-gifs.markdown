---
category: Blog
tag: Android
comments: true
image:
 twitter: /assets/images/litho-demo-1.jpg
 facebook : /assets/images/litho-demo-1.jpg
 height: 270
 width: 180
date: 2017-04-22 23:00:00
layout: post
slug: android-viewpager-cards-2
title: Android GIF search engine with Litho
description: Build an android GIF search engine with Litho by engine and giphy
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

> A layout spec is the logical equivalent of a composite view on Android. It simply groups existing components together in an immutable layout tree.

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

Litho will generate HomeComponent class which you can use. If you notice, we are using `@Prop String hint`. **`@Prop`** comes from React where you can pass some properties to components. We do not require this property, but we are going to use it anyway. We take this property and set it as EditText's hint.

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
