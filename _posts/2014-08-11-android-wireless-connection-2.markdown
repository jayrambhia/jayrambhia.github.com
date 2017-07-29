---
category: Blog
tag: Android
comments: true
date: 2014-08-11 15:00:00
layout: post
slug: android-wireless-connection-2
title: Transfer data from Client to Server using Sockets
keywords: [android development, android p2p tutorial, android wifi socket, socket programming, lan networking in android]
---

In the previous post - [Connect Two Android Devices over WiFi using Network Service Disocvery](/blog/android-wireless-connection-1), we showed how we used `Network Service Discovery` to connect two android devices over WiFi. In this post, we are going to show how we used this to our advantage to connect and send data to the server client.

We used the most basic thing that we found in the Android API - `Socket`. Socket class provides a client-side TCP socket. Socket binds destination IP Address and a port to local IP Address and a local port. Read more [here](http://developer.android.com/reference/java/net/Socket.html).

### How to Create Connection between Client and Server
 
 - Using NSD Manager, Client device should get server/host IP Address.
 - Send data to server using Socket.
 - Client should send its IP Address to server/host for bi-directional communication.

First step is done and we have obtained server's IP Address. Now, we need to send Client devices's IP Address to the server. For this we would use `JSONObject` as JSONObject can be easily converted to String and sent via Socket.

### Client Device

#### Obtain IP Address of Client's Device

{% highlight java %}

WifiManager wm = (WifiManager) getSystemService(WIFI_SERVICE);
String ipAddress = Formatter.formatIpAddress(
                    wm.getConnectionInfo().getIpAddress());

{% endhighlight %}

#### Connect to the Server and send IP Address using Socket
 
 - Resolve the service and call a function to connect to the server.
 - Create a JSONObject with fields `request` and `ipAddress`.
 - Create a new thread using `AsyncTask` for the Socket connection so that UI Thread doesn't hang
 - In AsyncTask thread, create Socket connection. Send JSONObject as String and wait for Server's repsonse.

{% gist jayrambhia/c2bcbdf8295fb0c90e99 ClientToServerConnection.java %}

<br/>

### Server Device

After setting up the service using NSD Manager, wait for the client to connect and send request with IP Address. For this we used `ServerSocket`. ServerSocket represents a server-side socket that waits for incoming client connections. A ServerSocket handles the requests and sends back an appropriate reply.

 - Create a Thread in background.
 - Initialize `ServerSocket` and wait for client to connect and send request.
 - Once client sends a request, perform some actions and give an appropriate response to the client.

{% gist jayrambhia/c2bcbdf8295fb0c90e99 ServerToClientConnection.java %}

This is how we connected Two Android devices over WiFi without having to enter any IP Address as it gets cumbersome.

We got a lot of help from [Android-er](http://android-er.blogspot.in/2014/02/android-sercerclient-example-client.html).

We plan to create a bi-directional connection and data service between Client and Server and both respond with appropriate data based on the query.

P.S. Configuring and testing all this took a lot of time, but these small things make me really happy. More post coming soon.
