---
category: Notes
tag: Android
comments: true
date: 2014-04-13 18:30:00
layout: post
slug: static-linking-opencv
title: Static Linking of OpenCV with Android
---

I have been working on this android application for long exposure shots and want to put it on Google Play Store. Since I have included OpenCV, the application needs OpenCV Manager to run. Now, this can be demotivating for the users to download another app to run my app. So I looked around and there's a way to do the static linking of OpenCV modules. And, it's pretty easy too.

#### [OpenCV Application Development With Static Initialization](http://docs.opencv.org/doc/tutorials/introduction/android_binary_package/dev_with_OCV_on_Android.html#application-development-with-static-initialization)

You just need to add following lines in Android.mk file.

{% highlight make %}
OPENCV_CAMERA_MODULES:=on # If you want Camera module
OPENCV_INSTALL_MODULES:=on
{% endhighlight %}

In Java, Add following in the static section of the Activity class.

{% highlight java %}
static {
    if (!OpenCVLoader.initDebug()) {
        // Handle initialization error
    }
    else {
        System.loadLibrary("jni_part"); // load other native libraries
    }
}

{% endhighlight %}

That's it. Now, the application doesn't require OpenCV Manager to run. Although, APK size increases due to installing the modules.

P.S. Static Initialization might be slowing down the opencv processing part.