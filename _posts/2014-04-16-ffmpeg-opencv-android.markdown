---
category: Blog
tag: Android
comments: true
date: 2014-04-16 17:00:00
layout: post
slug: ffmpeg-opencv-android
title: FFmpeg with OpenCV on Android
keywords: [android development, android camera app, android ffmpeg tutorial, opencv with ffmpeg, android ffmpeg video, android native programming, opencv C++ with android, video editing with android, create videos with ffmpeg]
---

I am currently working on android application which takes a video file and processes each frame to create a long exposure effect. If you have worked with OpenCV on Android, you'd be aware of the face that OpenCV does not support FFmpeg on android yet. To do this one needs to manually build FFmpeg for android.

I required ffmpeg with android, binding opencv with ffmpeg in native code and displaying the resultant frame on the screen. I will not provide any guidelines about how to build ffmpeg for android and use in the native code as there is a good source available.

#### [How to Build FFmpeg For Android](http://www.roman10.net/how-to-build-ffmpeg-for-android/) by Roman10

I didn't have much experience with FFmpeg and avutils. Roman10 has provided a good tutorial in which the android application decodes each frame and shows it on the screen. The whole application was written very well, especially the native part. Native part calls the javaVM, creates surfaceview and bitmap and allocates data to it. I had never seen this happening before so it was quite impressing.

#### [Android FFmpeg Tutorial](https://github.com/roman10/android-ffmpeg-tutorial) by Roman 10

After testing this app, I wanted to just integrate OpenCV with it so that I can use it in some way. So I just used the same code and tried to add OpenCV code in it. I faced few issues as the native code was written in C, and for some reason I was getting errors of OpenCV's GPU module and other STL errors. So I decided to keep OpenCV code in separate C++ file. I just wanted to put the data in OpenCV Mat, process it (convert to gray), put data back so that it can be displayed on the screen (in gray). One small step, a big leap for video processing on android.

So if you'd follow the second tutorial on GitHub, here's a small guideline of how to integrate OpenCV with FFmpeg in native code.

### Integrate OpenCV with FFmpeg in native code

In **jni/tutorial02.c**, there is a function named __decodeAndRender__ which decodes the frame and passed the data to bitmap to be shown on the screen. In that function, once the frame is completely decoded and scaled to the bitmap size, I call a function which passes the raw data buffer and stores it in Mat for furhter processing. Since this was just for testing, I converted the Mat from **RGBA2GRAY** and back, i.e. **GRAY2RGBA** as the bitmap expects RGBA data. The new raw data would still be grayscale but in RGBA format.

Here's the C++ file.

#### opencv_part.cpp

{% gist jayrambhia/4ede34930c9a067ea3f8 opencv_part.cpp %}

#### opencv_part.h

{% gist jayrambhia/4ede34930c9a067ea3f8 opencv_part.h %}

Once this is done, call the function <strong>convGray()</strong> in <strong>decodeAndRender</strong> function. Also, include opencv_part.h. Now, we need to change the <strong>Android.mk</strong> file.

#### Android.mk

{% gist jayrambhia/4ede34930c9a067ea3f8 Android.mk %}

Now, there was an issue with this application. It worked well in portrait, but when I turned it to landscape mode, the frame would be highly distorted. After searching for some time, I found this [solution](https://github.com/roman10/android-ffmpeg-tutorial/issues/3). I tried it and it worked.

In decodeAndRender function,

change this

{% highlight c %}

    // memcpy(windowBuffer.bits, buffer, width * height * 4);

    int y=0;
    for(y=0; y<height; y++)
    {
        memcpy((uint8_t*)windowBuffer.bits+(y*windowBuffer.stride*4), buffer+y*width*4, width*4);
    }

{% endhighlight %}

This is a brilliantly written application. decodeAndCompare function runs in a thread and updates the frame on the screen simultaneoulsy. Here's the link to the combined gists for the jni part.

[Updated FFmpeg tutorial jni (with OpenCV)](https://gist.github.com/jayrambhia/4ede34930c9a067ea3f8)

P.S. Need to thorougly learn FFmpeg, AVutils and native programming for Java.