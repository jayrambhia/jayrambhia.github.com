---
category: Blog
tag: Computer Vision
comments: true
date: 2013-06-15 15:30:58
layout: post
slug: fingertips-kinect
title: Fingertips detection using Kinect
---

In my previous **[post]({% post_url 2013-05-30-kinect-opencv %})**, I have shown how to use Kinect with OpenCV using Freenect library.Siddharth and I have been working on Kinect for gesture recognition and so far we are able to detect fingertips using contours and hull.

First thing that you would want to do is segment out hands in the frame. [Siddharth](http://algorithmicthoughts.wordpress.com/) has worked out a depth based adaptive threshold algorithm which enables us to segment out the object which is a bit ahead of the whole body. The algorithm works on depth of the object and segments out object based on its relative depth from other objects. So here's how he has done it.

### Thresholding

{% gist 5788734 thresholding.cpp %}

This will give you the segmented hands and now you need to get contours of the hand.

![threshold](/assets/images/fingertips1.jpg)

### Get Contours

{% gist 5788734 contours.cpp %}

Once we got the contour and the hull points, we needed to classify hull points as points on the finger tips and other points. We did this using a simple method.
Generally the contour has a curvature near the finger tips and it attains a local maxima (if your hand posture is straight). So we took the angle between two vectors joining the fingertip. And based on the angle made by the vectors, we classified the hull point as fingertip points.

### Get hull points on fingertips

What we did is we took contour points near both the sides of the hull and made two vectors from them joining the hull point. We took the cross product of the vector, in turn, the angle between the vector. Since there is always a convex angle at such points, we can classify these points as points on the finger tips.

{% gist 5788734 hullPoints.cpp %}

### Get Exact fingertips

When we tried this we got a lot of points on one finger tips and we filtered them out using a simple algorithm which would check if any points exist in the vicinity of certain hull point and eliminate those points.

{% gist 5788734 filterhull.cpp %}

![fingertips](/assets/images/fingertips2.jpg)

So this is an inaccurate algorithm which we implemented to extract fingertips from the frame using Kinect and OpenCV and now we're going to work on gesture recognition.

P.S. Google Summer of Code's coding period starts from Monday. Look out for a lot of posts.
