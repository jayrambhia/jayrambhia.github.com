---
category: Blog
tag: Android
comments: true
date: 2014-08-19 16:00:00
layout: post
slug: android-custom-listview
title: Custom ListView in Android
keywords: [android development, android custom listview, music player tutorial, android playlist]
---

An application must have a good looking UI and to get that we implemented our own custom layout to the listview to show songs in a playlist. Android provides [ListView](http://developer.android.com/guide/topics/ui/layout/listview.html) and various adapters which can be attached to it. For our purpose, we are using [ArrayAdapter](http://developer.android.com/reference/android/widget/ArrayAdapter.html).

So to customize the listview, we need to have a customized ArrayAdapter. We would create a layout that we want each of the entry to have. We would override 

`getView(int position, View convertView, ViewGroup parent)` 

method and set our custom view.

### Creating the layout

We first created a rough layout that we seemed to like.

{% gist jayrambhia/70869c6f7c4ab2c47757 audio_object_layout.xml %}

<br/>

### Class that extends ArrayAdapter

{% gist jayrambhia/70869c6f7c4ab2c47757 PlayList.java %}

Here `AudioObject` is a class that we made to handle audio metadata and other utilities.

### A bit about ListView

ListView doesn't load all the views at once. It reuses already drawn views. If you scroll down, it would reuse the views and not create new ones. In the `getView` method, if `convertView` is null it means that android is creating a new view. Most of the time it is not null because it reuses the previously created views.

### Create Custom ListView

{% gist jayrambhia/70869c6f7c4ab2c47757 setAdapter.java %}

<br/>

A little more advanced version of it looks like this.

![playlist](/assets/images/playlist.png)

P.S. Working on UI can be hectic.
