---
category: Blog
tag: Computer Vision
comments: true
date: 2013-05-30 21:00:00
layout: post
slug: kinect-opencv
title: Kinect with OpenCV using Freenect
---
I recently got a Kinect to work on at my sumemr internship at [Ducere Technologies](http://duceretech.com/). Having heard so much about OpenNI, I tried installing it on my Ubuntu 12.04 LTS 64 bit machine. It took some time to configure, build and install it. I got help from few blogs. I managed to install it somehow. Connected the kinect and fired up the demo program and ran into troubles. I was getting following error.

`A timeout has occurred while waiting for new data`

I rebuilt OpenCV with OpenNI support but was facing the same problem. I spent a lot of time looking for it but couldn't find anything substantial. I removed and blacklisted the default kinect driver from the kernel, but the problem persisted. I was trying few things and somehow it worked for a moment. OpenCV grabbed the image and then again ran into same errors. I was fed up so I tried using kinect with SimpleCV. SimpleCV uses python bindings of **freenect** which I installed using apt-get.

    sudo apt-get install libfreenect-dev freenect python-freenect

I wrote a qucik three line code in SimpleCV shell.

    k = Kinect()
    k.getImage().show()
    Image(k.getDepthMatrix(), cv2image=True).show()

And it worked. Here's a demo video that I made using SimpleCV.

<iframe width="560" height="315" src="http://www.youtube.com/embed/sknRKhPaxCs" frameborder="0" allowfullscreen></iframe>

Here's the code.

    from SimpleCV import *

    k = Kinect()
    while True:
        try:
            img = k.getImage()
            depth = Image(k.getDepthMatrix(), cv2image=True)
            img.sideBySide(depth).show()
            time.sleep(0.2)
        except KeyboardInterrupt:
            break

This was really positive and motivated me to use freenect with OpenCV. I looked it up on Google and found few links.

 - [OpenKinect](http://openkinect.org/wiki/C%2B%2BOpenCvExample)
 - [Catatan Fahmi's Blob](http://fahmifahim.com/2011/05/16/kinect-and-opencv/)
 - [C++ program which uses OpenCV with freenect](http://pastebin.com/GJu9mnhJ)

The above code is written for `iplImage`, so I made few changes so that it supports the current C++ API. You can find it [here](https://gist.github.com/jayrambhia/5677608). This code uses OpenCV Mat structure and all the latest C++ API. As of now, I don't have much knowledege of threading, but I'll dig it up and try to improve this code if there's any scope.

I don't have any video of OpenCV with freenect. But I'll upload it first thing in the next week.

P.S. Google Summer of Code 2013.