---
category: Blog
tag: Android
comments: true
date: 2014-08-29 16:00:00
layout: post
slug: facebook-android-sdk
title: Facebook Android SDK
---

Every app needs user data and facebook and twitter are the most convinient and used social networks to get the user data from. In our app, we have given the facility for the user to sign up and log in using their facebook or twitter credentials.

Facebook has a really great guide to get started with Facebook SDK for Android. You can find it [here](https://developers.facebook.com/docs/android/getting-started). We used this guide to build the basic authentication steps.

After registering your app with facebook, you can test your app. Facebook SDK for Android is really easy to use and it handles everything from async reuqests, callbacks to threads. So we need not worry about it at all.

We used [Session.openActiveSession](https://developers.facebook.com/docs/reference/android/3.0/class/Session/#openActiveSession) method to create a new session and we passed the key parameters for which we required the data. Once the seesion is active, it calls the callback method where we create a Request to get `GraphUser`. Once the request goes through, it returns the GraphUser and Response.

{% gist jayrambhia/e5161d5a0b027c1d2776 SignUpActivity.java %}

<br/>

Once we obtain the facebook ID of the user, we can easily get the user's profile picture with a simple `HTTPGet` request.

{% gist jayrambhia/e5161d5a0b027c1d2776 displaypicture.java %}

<br/>

We just link the facebook id to the user and can directly log the user in based on the facebook id.

P.S. Next post on Twitter.