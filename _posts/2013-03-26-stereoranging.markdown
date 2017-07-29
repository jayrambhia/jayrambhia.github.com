---
category: Blog
tag: Computer Vision
comments: true
date: 2013-03-26 15:00:00
layout: post
slug: stereoranging
title: 'Stereo Ranging'
keywords: [learn opencv, what is stereo rangin, stereo randing with opencv, find real distance]
---

Recently, I have been working on Stereoscopy, disparity and depth maps, and my primary objective being getting depth, height of the object. In a nutshell, I am working on obtaining 3 dimensional data from the scene. As I was a bit swamped with all the work, I didn't get time to write about it. I will describe and elaborate more on stereoscopy in upcoming posts.

### What is Stereoscopy?

In brief, stereoscopy or 3D Imaging is a technique to percieve depth in a scene using stereopsis of binocular vision. Our human vision and depth perception is based on the same technique. Left eye grabs a scene and right eye grabs a slightly different scene. Both these images are processed and depth is percieved. Even humans can't percieve depth with one eye. Try to pick some object with your hand keeping one of the eyes shut. Further detailing in upcoming posts. Moving on to Stereo Ranging.

### What is Stereo Ranging?

Stereoscopic Ranging is a very old and yet effective technique to accurately calcuate the range to an object. Basically, you grab to images (one from left camera and other from right camera) and find the horizontal distance (in pixels) between the object in two images and use simple calculations to obtain the depth of the object from the camera.

### How to Calcluate Depth using Stereo Ranging?

First of all, you will need two identical cameras. Level your cameras. Find the `baseline`. Baseline is the horizontal distance between two cameras. Check your camera's specifications and note down `focal length`.

![Baseline](/assets/images/ranging2.jpg)

Now, you need to find out or calculate **sensor pixel density** of your camera. It is the number of pixels per millimetre on the sensor chip.
Keep an object at a known distance, say `x mm` and find out disparity in pixels.

    focal_length_pixels = distance_mm * disparity_pixels / basline_mm

#### What is Disparity?
The disparity of a feature is the difference in its horizontal position as observer from left and right cameras. So, here disparity_pixels would be the difference in horizontal pixels in left and right image. Following images are scaled down to half of its original size.

![Disparity](/assets/images/ranging1.jpg)

#### Calculating Sensor Pixel Density
{% highlight cpp %}
    sensors_pixels_per_mm = focal_length_pixels / focal_length_mm
{% endhighlight %}

After getting the required data, you can feed this into your program as constants and find the depth of the object easily.

#### Calculating Depth
{% highlight cpp %}
    focal_length_pixels = focal_length_mm * sensor_pixels_per_mm
    distance_mm = baseline_mm * focal_length_pixels / disparity_pixels
{% endhighlight %}

**distance_mm** is the depth of the object from the camera.

I have kept an object at around 150 mm distance from the camera. Using the two images, I have disparity in pixel = 300 pixels. My cameras have focal length 2.5 mm
{% highlight cpp %}
    disparity_pixel = 300
    focal_length_mm = 2.5
    focal_length_pixels = distance_mm * disparity_pixels / basline_mm
                        = 150 * 300 / 72
                        = 625
    
    sensors_pixels_per_mm = focal_length_pixels / focal_length_mm
                          = 625/2.5
                          = 250
{% endhighlight %}

Now, you have the necessary data to proceed. Just to double check, as you can see a poster box in the left of the images, I will try to figure out depth of the end part of it.
{% highlight cpp %}
    distance_mm = baseline_mm * focal_length_pixels / disparity_pixels

    disparity_pixels = 60
    basline_mm = 72
    focal_length_pixels = 625

    distance_mm = 750
{% endhighlight %}

Distnace calculated is 70 cm and actual distance is 80 cm so that is a bit erroneous but we can work with that as this is the fastest and easiest way to do it.

P.S. I made my first OpenCV based Android Application which computes Disparity.
                



