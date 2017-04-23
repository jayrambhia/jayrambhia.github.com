---
category: Blog
tag: Android
comments: true
date: 2014-04-12 19:00:00
layout: post
slug: android-camerapreview-opencv
title: Using OpenCV with Android CameraPreview
keywords: [android development, android camera app, android native programming, opencv C++ with android, opencv camera app]
---

I have been working on an android application for some time now. It's basically about getting long exposure shots. With not much experience with Android, I just started working with OpenCV's CamerBridgeViewBase. Everything was working fine. The only issue was that it was horribly slow. I hardly ever got more than 9 fps. I once tried OpenCV static linking in order to avoid downloading OpenCV's Android Manager, the results got pathrtically slower. I never even got 3 fps. I use a Nexus 4. I posted this issue on Stackoverflow as well as OpenCV's forum and yet haven't got any reply.

The solution was right around the corner but I was afraid to use it due to my unfamiliarity with Android. The solution is pretty straight forward. Use Android's own CameraPreview method, somehow pass raw data to native code and process it using OpenCV. I wrote a basic code for the implementation of CameraPreview, but it was a difficult task get the raw data from the callback. It isn't that difficult now that I'm familiar with it.

I found this very helpful blogpost about the same.

#### [Real Time Image Processing in OpenCV](http://ibuzzlog.blogspot.in/2012/08/how-to-do-real-time-image-processing-in.html)

This was matching my basic requirements. I had to change a lot of it later, but for testing purposes it worked perfectly. Here's the [Github Repo](https://github.com/ikkiChung/MyRealTimeImageProcessing)

Since this was written more than a year ago, it has legacy API in it. So I changed it's jni part for my usage and well, the long exposure shots were working.

The most important part in this code is the callback function - **onPreviewFrame**. The handler calls the function which in turn calls the native function to process the raw data. In most of the android based phones, raw data from camera comes in the format of NV21(YUV420). So it needs to be converted to RGBA as the bitmap config is ARGB8888.

Here's the modified native code.

{% gist jayrambhia/87a50054bfa189bc319d %}

This solution gives me around 18-20 fps which is pretty great compared to cameraBridgeViewBase.

P.S. Now need to configure FFmpeg for Android to do video processing.
