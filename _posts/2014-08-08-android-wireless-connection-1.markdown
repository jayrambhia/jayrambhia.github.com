---
category: Blog
tag: Android
comments: true
date: 2014-08-08 18:00:00
layout: post
slug: android-wireless-connection-1
title: Connect Two Android Devices over WiFi using Network Service Disocvery
---

We have started working on another Android app which lets user stream music on another Android device wirelessly. I'll keep adding posts as the app progresses. This is the first part of the series. This is a completely new territory for me as I have never worked with sockets, networks and in general most of the android. So there might be some issues, but we'll keep refining till we find the best way.

As the title suggests, we tried connecting two android devices to each other over WiFi using Network Service Discovery. This was suggested to us by one of our friends who is helping us with the app.

As mentioned on [Android Developers Website](http://developer.android.com/reference/android/net/nsd/NsdManager.html), 
<blockquote>

The Network Service Discovery Manager class provides the API to discover services on a network. As an example, if device A and device B are connected over a Wi-Fi network, a game registered on device A can be discovered by a game on device B. Another example use case is an application discovering printers on the network. 

<br/>

The API is asynchronous and responses to requests from an application are on listener callbacks on a seperate thread. 
</blockquote>

`NSD` API is really simple. First, you register the service on your server device. Set some service info so that you can broadcast it to the client devices.
Next, on your client device, set up a dicovery listener which would look for services and make a single asynchronous API call to `discoverServices()`.

### Server Device

 - setup NSD Manager
 - setup RegistrationListener
 - Register Service

{% gist jayrambhia/c2bcbdf8295fb0c90e99 ServerActivity.java %}

### Client Device

 - setup NSD Manager
 - setup DiscoveryListener
 - setup ResolveListener
 - Resolve Service if found
 - Get Server/Host IP Address and port

{% gist jayrambhia/c2bcbdf8295fb0c90e99 ClientActivity.java %}

Once the client resolves host's service and obtain its IP Address, it can start communicating with the server/host. You can find better resources on [Android Developers Website](http://developer.android.com/training/connect-devices-wirelessly/nsd.html#register)

P.S. This is just the first step.
