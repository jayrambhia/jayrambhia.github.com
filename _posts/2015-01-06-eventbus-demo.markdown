---
category: Blog
tag: Android
comments: true
date: 2015-01-16 13:00:00
layout: post
slug: eventbus-demo
title: EventBus Demo
---

I have started working on a new application and for this I was looking for ways to communicate between Service and Activity. I found out about **[EventBus](https://github.com/greenrobot/EventBus)**. Eventbus is really easy to use and can be used to communicate between any Objects. EventBus communication happens by posting parcelable classes around. I will not beat around the bush much and jump in the vague details.

### Application
To try out EventBus, I made a small demo application. Activity sends data to a background service using EventBus. The service running in background process the data sends the result to the Activity. This turned out to be very easy.

### Notes about EventBus
Before I bagan, I jotted down few important things about EventBus.

 - If you want to receive some event, you need to register your class with EventBus.
 - If you have registered your class with EventBus, you must have a method `public void onEvent(SomeEventType event)` where SomeEventType is what you are expecting.
 - Unregister your class when not required.
 
### Actiivty

Get text from EditText and send to Service.

{% gist jayrambhia/096daab360b9250c61e4 MainActivity.java %}

### Service
Process incoming data and send result to Activity

{% gist jayrambhia/096daab360b9250c61e4 ResponderService.java %}

This was fairly easy. You can get demo application source here. [EventBusDemo](https://github.com/jayrambhia/EventBusDemo)

P.S. A lot of new things to learn ahead.
