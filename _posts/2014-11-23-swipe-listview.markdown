---
category: Blog
tag: Android
comments: true
date: 2014-11-23 14:00:00
layout: post
slug: swipe-listview
title: Inbox Style Swipe ListView
---

Google's Inbox application has a really nice ListView where user could swipe right to mark the email done and swipe left to snooze the notification. I implemented something very similar to that using `ListView` and `ArrayAdapter`.

The method that I used here is quite simple. I created a RelativeLayout which would be used to display each item of the listview. This RelativeLayout has three different layouts. Top layout is the one that you would want to show. Each layers are stacked. The second layer shows delete option. Third layer shows share option.

When the user swipes right, the second layer starts showing from the left. But when the user swipes left, it should show the third layer, so we need to make second layer invisible. That's about it. Just a simple trick.

### Design Layout

As I said, we would create three different layers and add them to a RelativeLayout.

{% gist jayrambhia/429228d96d6f8bd73590 audio_object_layout.xml %}

<br/>

### ArrayAdapter

Now, we need to create a class which extends ArrayAdapter. Here, we will create a holder for each entry. We will also create a swipe detector which would be helpful in swiping the list items.

{% gist jayrambhia/429228d96d6f8bd73590 PlayListObject.java %}

<br/>

### Swipe Detector

Dectcting swipe movement is an important part here. We create a class which extends `View.onTouchListener` and attach it to the top most view of the layout. Now, all we need to do is animate the view as the user swipes it. It is not that difficult. As I have shown previously, that you can do this by changing left and right margin of the view by the same amount.

When it receives `ACTION_DOWN` event, we will store the x co-ordinate of the touch. And after which whenever it will receive `ACTION_MOVE` event, we will store the new x co-ordinate and calculate the difference between current co-ordinate and the initial touch co-ordinate. Based on this difference, we will change the margins of the top view, and hide second view (if swipe is in left direction).

{% gist jayrambhia/429228d96d6f8bd73590 SwipeDetector.java %}

<br/>

One might wonder why I have added something like `requestDisallowInterceptTouchEvent` in this code. I had not added it before. It was just simple code - swipe and be done with it. But I faced a problem. There was no issue if I swiped it properly, but if my finger accidentally swiped the item in vertical direction, the ListView would intercept that touch event and take control of it. So `onTouchListener` would give `ACTION_CANCEL` as the event. [Here](http://stackoverflow.com/a/11961033/891373) is a good stackoverflow answer which explains why this happens.

When `reqeustDisallowInterceptTouchEvent(true)` is called on the ListView, it doesn't intercept the vertical swipe gesture and the horizontal swipe works well. 
<br/>
<br/>Why have I used `MIN_LOCK_DISTANCE`?<br/>
<br/>
If I don't use that and just disallow intercepting the events, even ACTION_DOWN would disallow intercepting the event and hence disabling the vertical scrolling. You would never be able to scroll your list. Hence, if you keep a threshold of say, 20, then if you have swiped the list horizontally by a distance 20px, listview will stop intercepting the events and you'd get proper swipe interaction.

### Final Steps

One last step would be to set up the ListView and Adapter.

{% highlight java %}

    ListView playlistView = (ListView)findViewById(R.id.list);
    PlayListObject playList = new PlayListObject(this, R.layout.audio_object_layout);
    playlistView.setAdapter(playList);
    playList.setListView(playlistView);

{% endhighlight %}

And the final result looks something like this.

![swipe listview](/assets/images/swipelistview.jpg)

P.S. Working on UI is fun, but sometimes becomes a headache.