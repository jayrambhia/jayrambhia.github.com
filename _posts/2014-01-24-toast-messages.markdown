---
category: Notes
tag: Android
comments: true
date: 2014-01-24 16:00:00
layout: post
slug: toast-messages
title: Working with Toast Messages
---

I was working on an android application where I required some notification kind of thing. I was looking into popups but it didn't really work out. Then I stumbled on to [_Toast Messages_](http://developer.android.com/guide/topics/ui/notifiers/toasts.html).

A toast provides simple feedback about an operation in a small popup. It only fills the amount of space required for the message and the current activity remains visible and interactive.

### The Basics

First, instantiate a Toast object with one of the _makeText()_ methods. This method takes three parameters: the application _Context_, the text message, and the duration for the toast. It returns a properly initialized Toast object. You can display the toast notification with _show()_.

{% highlight java %}
Context context = getApplicationContext();
CharSequence text = "Hello toast!";
int duration = Toast.LENGTH_SHORT;

Toast toast = Toast.makeText(context, text, duration);
toast.show();
{% endhighlight %}

The values of _LENGTH_SHORT_ and _LENGTH_LONG_ are 0 and 1. This means they are treated as flags rather than actual durations so I don't think it will be possible to set the duration to anything other than these values.

### Problem

I wanted to reduce the the duration of the toast message. I needed it even lesser than _LENGTH_SHORT_.

### Solution

[Stackoverflow post](http://stackoverflow.com/a/9715422/891373)

_Toast.cancel()_ can be used to shorten the duration of the toast message.

{% highlight java %}

final Toast toast = Toast.makeText(ctx,
                        "This message will disappear in 1 second",
                        Toast.LENGTH_SHORT);
toast.show();

Handler handler = new Handler();

handler.postDelayed(new Runnable() {
    @Override
    public void run() {
        toast.cancel(); 
        }
    }, 1000); // time in milliseconds

{% endhighlight %}

P.S. Adding small notes is quite fun and helpful.