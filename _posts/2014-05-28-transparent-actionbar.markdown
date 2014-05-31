---
category: Notes
tag: Android
comments: true
date: 2014-05-28 15:00:00
layout: post
slug: transparent-actionbar
title: Make Action Bar Transparent
---

I have been working on an app which produces long exposure effect. As of now, we are almost ready with the free version of the app. For this, I got some feedback from some of the users. One of them said that we should make the action bar transparent and since it's a camera app, it'd look great if it's interface looked similar to that of Google Camera app. We are nowhere near that app, but we thought of giving it a try. Plus, making the Action Bar transparent gives more space for the camera preview.

To make this happen, I looked around a lot. Found many answers on stackoverflow, but none of them really worked. But it was a simple solution.

Following are some files that I changed.

### styles.xml

{% highlight xml %}
<resources>
    <style name="AppBaseTheme" parent="android:Theme.Holo.Light"/>
    <style name="AppTheme" parent="AppBaseTheme">
        <item name="android:windowActionBarOverlay">true</item>
        <item name="android:actionBarStyle">@style/Widget.ActionBar</item>
        <item name="android:actionMenuTextColor">#fff</item>
    </style>

    <style name="Widget.ActionBar" parent="@android:style/Widget.Holo.Light.ActionBar.Solid.Inverse">
        <item name="android:background">@android:color/transparent</item>
    </style>

    <style name="Widget.ActionBar.Transparent">
        <item name="android:background">@android:color/transparent</item>
    </style>
</resources>

{% endhighlight %}

### themes.xml

I may have repeated things here.

{% highlight xml %}
<resources>
    <style name="Theme.TranslucentActionBar" parent="@android:style/Theme.Holo.Light.DarkActionBar">
        <item name="android:actionBarStyle">@style/Widget.ActionBar</item>
        <item name="android:windowActionBar">true</item>  
        <item name="android:windowBackground">@android:color/transparent</item> 
        <item name="android:windowContentOverlay">@null</item>
    </style>

    <style name="Theme.TranslucentActionBar.ActionBar" />

    <style name="Theme.TranslucentActionBar.ActionBar.Overlay">
        <item name="android:actionBarStyle">@style/Widget.ActionBar.Transparent</item>
        <item name="android:windowActionBarOverlay">true</item>
    </style>
</resources>
{% endhighlight %}

### In MainActivity

This may not have played a role in it.

{% highlight java %}
    ActionBar actionBar = getActionBar();
    actionBar.setDisplayShowTitleEnabled(false);
    actionBar.setDisplayShowHomeEnabled(false);
{% endhighlight %}

### AndroidManifest.xml

Now, this is the most important part. I spent over an hour to make it transparent and this was the solution.

{% highlight xml %}

<application 
    .
    .
    some stuff here

    android:theme="@style/Theme.TranslucentActionBar" >

    . 
    .
    some more stuff here
</application>
{% endhighlight %}

And here's a screenshot of the app that I am working on

![screenshot](/assets/images/actionbar-1.png)

Low light and low res of the front camera. Still working on the UI.

P.S. Releasing Lenx next week.