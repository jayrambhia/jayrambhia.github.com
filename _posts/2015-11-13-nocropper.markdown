---
category: Project
tag: Android
comments: true
date: 2015-11-13 16:00:00
layout: post
slug: nocropper-library
title: NoCropper - Android Library for Cropping
---

Finally, after more than a year of working with Android, I'm releasing my first Open Source Library for Android. As the title says, the library is named  NoCropper. It's a lightweight library for cropping images. Since it doesn't use any special features of Android, it is compatible with 11+ version of android (it uses ValueAnimator).

### What's So Special About It

Well, It's my first open source library. Apart from that, it's a simple image cropper which also lets user not crop the image and convert it to square with fancy animations.

### Demo

Here's a poorly made gif and YouTube video for you.

![cropper_demo](https://raw.githubusercontent.com/jayrambhia/CropperNoCropper/master/art/demo1.gif)

<iframe width="560" height="315" src="https://www.youtube.com/embed/OoYSt2vtdNs" frameborder="0" allowfullscreen></iframe>

### GitHub Repo

Here's the [GitHub Repo](https://github.com/jayrambhia/CropperNoCropper)

### How To Use In Your Android Project

Just add the following dependency in your `build.gradle` file.

    dependencies {
        compile 'com.fenchtose.nocropper:nocropper:0.1.3'
    }

Following repositories can be added

 **Maven**

    repositories {
        maven {
            url  "http://dl.bintray.com/jayrambhia/maven"
        }
    }

**JCenter**

    repositories {
        jcenter()
    }

**Code**

### Java

{% highlight java %}
    
    CropperImageView cropperView = (CropperView)findViewById(R.id.cropper_view);
    
    // Set Bitmap
    cropperView.setImageBitmap(bitmap);
    
    // Set Max and Min Cropping
    cropperView.setMaxZoom(1.5f);
    cropperView.setMinZoom(0.8f);
    
    // set centerCrop
    cropperView.cropToCenter();
    
    // Fit image to center
    cropperView.fitToCenter();
    
    // Get Cropped Bitmap
    Bitmap croppedBitmap = cropperView.getCroppedBitmap();
    
{% endhighlight %}

### XML Layout

{% highlight xml %}

    <?xml version="1.0" encoding="utf-8"?>
    <RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        xmlns:app="http://schemas.android.com/apk/res-auto">
        
        <com.fenchtose.nocropper.CropperView
            android:background="#ff282828"
            android:id="@+id/cropper_view"
            android:layout_width="match_parent"
            android:layout_height="0dp"
            app:grid_opacity="0.8"
            app:grid_thickness="0.8dp"
            app:grid_color="@color/colorAccent"
            app:padding_color="#ff282828"/>
            
    </RelativeLayout>        

{% endhighlight %}

Here's a **[sample](https://github.com/jayrambhia/CropperNoCropper/tree/master/sample)**

**Check GitHub for the latest version of the library**

P.S. This is quite exciting for me. Here's a [blogpost](http://www.jayrambhia.com/blog/cropper/) about it.
