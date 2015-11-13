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

Here's the GitHub Repo - https://github.com/jayrambhia/CropperNoCropper

### How To Use In My Android Project

Just add the following dependency in your `build.gradle` file.

    dependencies {
        compile 'com.fenchtose.nocropper:nocropper:0.1.1'
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

**Check GitHub for the latest version of the library**

P.S. This is quite exciting for me.
