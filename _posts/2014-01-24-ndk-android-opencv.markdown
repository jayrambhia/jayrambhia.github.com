---
category: Blog
tag: Android
comments: true
date: 2014-01-24 13:00:00
layout: post
slug: ndk-android-opencv
title: Using C++ OpenCV code with Android
keywords: [android development, android camera app, android native programming, opencv C++ with android, opencv camera app, android ndk, android opencv ndk]
---

It's been five months since I have written a blog post. I was not too busy to write it, but just enjoying my last semester at the campus. I'm currently pursuing my thesis at Tesseract Imaging and have been working with Android OpenCV for some time. Although I don't know much about it, I know enough to do my work. I'm going to write about how to use Native Development Kit (NDK) to use C++ OpenCV code with Android. I keep having issues with my Linux distro and have to change it often so I have to reconfigure the whole Eclipse Android settings.

Here's the official OpenCV Page about NDK. [Using C++ OpenCV code with Android binary package](http://docs.opencv.org/doc/tutorials/introduction/android_binary_package/android_binary_package_using_with_NDK.html)

### Requirements

 - [Android NDK](http://developer.android.com/tools/sdk/ndk/index.html)
 - [Android SDK](http://developer.android.com/sdk/index.html)
 - [Eclipse IDE](http://www.eclipse.org/downloads/)
 - [ADT Plugin for Eclipse](http://developer.android.com/sdk/installing/installing-adt.html)
 - [OpenCV4Android SDK](http://sourceforge.net/projects/opencvlibrary/files/opencv-android/)

### Setting Up

It's really easy to set up all of these in Ubuntu. I am assuming that your ADT plugin is configured and only NDK is to be configured.
Extract Android NDK. And set `NDKROOT` as the folder path. If you want to get into more details about Native Development, you can read [this](http://docs.opencv.org/doc/tutorials/introduction/android_binary_package/android_dev_intro.html#android-application-structure).

### Important Aspects

Each Android Application with Native Code has a folder called *jni/*. It has your native source code and couple of other files. These other files are scripts which instructs the compiler to include certain files, libraries and modules.

#### Android.mk and Application.mk

Android.mk builds C++ source code of an Android Application.
Application.mk is used when STL and exceptions are used in C++.

{% gist 8593035 %}

#### JNI Part

**Java Native Interface (JNI)** helps code written in Java to interact with native code (C/C++). It's very useful for loading code from dynamic shared libraries. I'll show you a sample program which converts the image to gray image.

{% gist 8593232 %}

This was a small example of using native code with android. Now, I'll explain the code part by part.

##### extern "C":

To allow for overloading of functions, C++ uses something called ** name mangling **. This means that function names are not the same in C++ as in plain C. To inhibit this name mangling, you have to declare functions as extern "C".

##### JNIEXPORT jint JNICALL

This is the main function which interacts with Java code. JNIEXPORT void JNICALL passes a JNIENV pointer, a jobject pointer, and any Java arguments declared by the Java method. To define this function

 - The first item is **Java**
 - The second item is the name of the Java class where the method is declared.
 - Finally, the name of the method appears.

Each part is separated by underscores. And, the "." in class name is also replaced by "_".

So,

{% highlight C %}

Java_com_example_myapp_opencvpart_convertNativeGray
com.example.myapp is the application name
opencvpart is the class name where the method is declared.
convertNativeGray is the function name

{% endhighlight %}

##### Passing Java Arguments

To pass OpenCV's Mat from Java to Native code, we pass its address. This address is obtained using _getNativeObjAddr()_ function. New Mat are initialized based on native address and can be used normally in C++ code.

I have also shown a function which can be easily added in the JNI part.

#### Java Part

Now, we move on to Java part where we'll define the function and call it when required. We'll use _CvCameraViewListener2_ and simply show gray image on the screen.

{% highlight java %}

package com.example.myapp

// Add imports here

public class opencvpart extends Activity implements CvCameraViewListener2 {
    
    public native int convertNativeGray(long matAddrRgba, long matAddrGray);

    private Mat mRgba;
    private Mat mGray;

    // other part

    private BaseLoaderCallback mLoaderCallback = new BaseLoaderCallback(this) 
    {
        @Override
        public void onManagerConnected(int status) {
            switch (status) {
                case LoaderCallbackInterface.SUCCESS:
                {
                    System.loadLibrary("nativegray");// Load Native module
                    Log.i(TAG, "OpenCV loaded successfully");
                    mOpenCvCameraView.enableView();
                } break;
                default:
                {
                    super.onManagerConnected(status);
                } break;
            }
        }
    };

    // some more stuff

    public Mat onCameraFrame(CvCameraViewFrame inputFrame) {
        mRgba = inputFrame.rgba();
        convertNativeGray(mRgba.getNativeObjAddr(), 
                          mGray.getNativeObjAddr());
        return mGray;
    }
}

{% endhighlight %}

### How To Build Application using Eclipse (CDT Builder)

Follow these instructions step by step and it should be done.

[Building application native part from Eclipse (CDT Builder)](http://docs.opencv.org/doc/tutorials/introduction/android_binary_package/android_dev_intro.html#building-application-native-part-from-eclipse-cdt-builder)

### Small Stuff

You'll need to change layout.xml and AndroidManifest.xml file according to the requirements of the application.

### Deploy

Now, the application is ready to deploy on the phone!

### Final Application

I have made a sample application based on this which you can refer to. You can fork it.

## [nativecodeGray](https://github.com/jayrambhia/nativecodeGray). 

If you are trying this code, make sure that you set appropriate paths.

P.S. Didn't do much in past few months. Looking forward to a lot of work. Plus, I'll be busy on thursdays.