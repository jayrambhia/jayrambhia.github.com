---
category: Blog
tag: Android
comments: true
date: 2015-12-23 17:00:00
layout: post
slug: custom-views-part1
title: Custom Views Part 1 - Horizontal TextViews
---

I have started working at [Elanic](http://elanic.in/) and it is about time we make app perform better and much more responsive. Elanic is image centric app and it can be very intensive to scroll and load all the products so we are trying to reduce layout draws as much as possible. I have started working on that and have implemented some custom views which I'll be talking about in this series.

The most basic problem we encountered was how to put two TextViews horizontally in a Vertical LinearLayout. There are two options. 1. Add Horizontal LinearLayout and then add two textviews in it. 2. Use RelativeLayout. I'm not a big fan of RelativeLayout and try avoid it as much as possible as it takes at least two passes for measuring and drawing the views. Adding extra Horizontal LinearLayout would work fine if I would just require one or two such views but I use them in RecyclerView and hierarchies affect the performance a lot. So I decided to use a custom view where I can put two textviews horizontally. I landed up on this amazing blogpost - [Multiple Text Layout](https://sriramramani.wordpress.com/2014/08/14/multiple-text-layout/). It talks about how we can use `StaticLayout` to put two different texts in one TextView.

I didn't have much idea about StaticLayout at that time so I started reading about it. As the article suggests, we can use StaticLayout, BoringLayout or DynamicLayout to write texts in views. As the article shows, I also started using StaticLayout to achieve the desired result. I should give BoringLayout a try and benchmark its performance against the one that I currently made. As we are using this textview in Elanic app at a lot of places, I have gone further and implemented styleables and some more modifications to improve performance and support RecyclerViews.
