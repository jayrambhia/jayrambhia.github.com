---
category: Blog
tag: Android
comments: true
date: 2015-10-29 03:00:00
layout: post
slug: footer-loader
title: Footer Loader for infinite scrolling
---

I have been laying low for a while and have been pretty busy with my new workplace. I have started wokring at [Elanic](http://elanic.in/) and it's been a fun ride. I am just starting small before I go writing big posts again. This is a pretty easy concept and every developer should know these little tricks.

Infinite scrolling with loader views as footer are in fashion (in Android UI) now-a-days and every app has those. We at Elanic also use that design at a lot of places and so I thought to make a universal adapter which would do the trick and work for all sort of different data items. I just wrote a simple generic class for the adapter and made it abstract so that I could customize my data specific view holders. I don't know why but I gave funny names to the abstract methods and I think someone will kill me for this.

{% highlight java %}

public abstract long getYourItemId(int position);
public abstract RecyclerView.ViewHolder getYourItemViewHolder(ViewGroup parent);
public abstract void bindYourViewHolder(RecyclerView.ViewHolder holder, int position);

{% endhighlight %}

### What's the catch?

Well, there's no catch. It's just pretty simple. All you have to do is,

- Add Scroll Listener to the RecyclerView
- fire an event to load more data when the recyclerview scrolling reaches the end
- Show loader
- Call API to get the data
- Load data
- Hide loader

Here's a simple demo:

![demo gif](https://github.com/jayrambhia/FooterLoaderAdapterDemo/blob/master/demo.gif)

### Show me the Code

Well, here you go.

{% gist jayrambhia/6a982b0b94b45606fd0f FooterLoaderAdapter.java %}

FooterLoaderAdapter is an abstract template class which extends `RecylcerView.Adapter<RecyclerView.ViewHolder>`.
It has following methods which user can use conveniently to create their own Recycler Adapter.

    public abstract long getYourItemId(int position);
    public abstract RecyclerView.ViewHolder getYourItemViewHolder(ViewGroup parent);
    public abstract void bindYourViewHolder(RecyclerView.ViewHolder holder, int position);

This project also includes a RecyclerView ScrollListener which calls `onLoadMore()` when the recyclerview is
scrolled till the end. Once `onLoadMore()` is called, the app should call api to get more data. Meanwhile,
to show the loader as the footer, app must call, `FooterLoaderAdapter.showLoading(true)` and should also call
`notifyDataSetChanged()` to let the adapter know that it has to show the footer now.

Once the data is available, app should add the data to the adpater and call `FooterLoaderAdapter.showLoading(false)`
to hide the footer and `notifyDataSetChanged()` to let the adpater know that the data has changed.

This was pretty easy and can handle one type of data. If you have more than one types of data to bind to recyclerview, you may need to update this a bit to accomodate it.

### GitHub Repo

I have uploaded a demo app on Github. You may fork it **[here](https://github.com/jayrambhia/FooterLoaderAdapterDemo)**

P.S. Check out the elanic app that I have been working on. Here's the link to the **[playstore](https://play.google.com/store/apps/details?id=in.elanic.app&hl=en)**
