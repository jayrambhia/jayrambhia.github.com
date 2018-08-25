---
category: Blog
tag: Android
comments: true
date: 2016-08-31 23:00:00
layout: post
slug: android-background-blur
title: Background Blur in Android
description: The background blur effect in iOS is breathtaking. I implemented the similar background blur effect using Renderscript in Android to have a really great user experience. Here's how you can do it too.
keywords: [blur in android, blur bitmap, android development, android tutorial, ios blur effect in android, blur using renderscript]
series: android-ui
series_title: Background blur effect using Renderscript
series_description: We have all seen the background blur effects in iOS and it illuminates the UI. In this article, I have written about how to achieve the similar effect in Android using Renderscript.
---

<p align="center">
	<img alt="android background blur" title="Blur Background using Renderscript in Android" src="/assets/images/android_blur_img1.png"/>
</p>

We have all seen the background blurring effects of iOS and have always wondered it does look great, it should be in Android also. I was wondering there could be an easier way to do this without actually blurring the image. Have you ever looked from blurred lens? You see blurry images. Well, that was it!

I thought if I could get a good blurry black and white image and I could just use it as an overlay and reduce opacity, it would work. I looked for images of gaussian filters in fourier space. It looked ideal for this. It sort of gave the background some gradient and vignette effect but not the blur. Frosted glass! That's what was on the list next. Found a nice image and applied it as overlay with 70% opacity. The screen just looked dirty. No blur effect.

I was wrong to begin with. Frosted glass and blurry lens product blurry images because they actually deflect light at different angles. So unless, there was some problem with my phone screen or glasses, this approach was not going to work.

So what's next? Well, I could actually try blurring the background. What do I need?

 - A bitmap of whatever is on the screen
 - Something to blur the bitmap

As far as the latter part is concerned, we can just easily use Renderscript. Android provides a blur script which we can use. Now, coming to the first part. How to get the view into a bitmap. We know two things.

 1. View uses `canvas` to draw
 2. A canvas can be created from Bitmap and anything we draw on the canvas will be drawn on the bitmap.

### Getting Bitmap Ready

{% gist jayrambhia/82e85f4bee9361dc8b9db6d0ea5e5cd5 BitmapUtils.java %}

This will give us the bitmap with the data that you actually see on the screen if you pass your rootview to it. Make sure that the view has been rendered, otherwise it will throw error as width and height would be zero.

### Blur it!

{% gist jayrambhia/82e85f4bee9361dc8b9db6d0ea5e5cd5 RSBlurProcessor.java %}

If you're not using support version of renderscript, blur scripts were included from API 17 so you need to check for that.

You can set the blurred bitmap to an ImageView or to a view's background via BitmapDrawable.

Here's the program in action.

Original                   |  Blurred
:-------------------------:|:-------------------------:
![Original](/assets/images/android_blur_img3.png)  |  ![Blurred](/assets/images/android_blur_img2.png)

P.S. A blogpost coming up about the cards viewpager in the image. It's up. Check it out - [ViewPager Cards](/blog/android-viewpager-cards-1).
