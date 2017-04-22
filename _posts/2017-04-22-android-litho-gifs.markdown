---
category: Blog
tag: Android
comments: true
image:
 twitter: /assets/images/android_blur_img1.png
 facebook : /assets/images/android_blur_img1.png
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