---
category: Blog
tag: Computer Vision
comments: true
date: 2012-07-13 01:11:04
layout: post
slug: camshift-with-simplecv
title: CAMShift with SimpleCV
wordpress_id: 791
categories:
- Computer Vision
- Daily Posts
- GSoC
- Technical
tags:
- camshift
- computer vision
- gsoc
- opencv
- python
- simplecv
- tracking
---

GSoC 2012 Mid-Term evaluations are over and I passed. As usual we had a meeting on Wednesday 11:30 am EST on IRC where I and Kat discussed the tracking scenario of SimpleCV and how to implement different tracking algorithms with efficiency. She advised me that the tracking object should live in FeatureSet so that the tracked path can be stored in Features. So, it looks like this


> 
fs = img0.track(boundingbox)
fs = img1.track(fs)
.
.
fs = imgN.track(fs)



where fs is a FeatureSet. FeatureSet is basically a superset of **list**. Each element of FeatureSet is a TrackSet and superset of Feature. Each TrackSet object has image, x ,y, center, bounding box as its attributes. Since TrackSet has x, y, center, and bb, I can easily draw bounding box on image, draw a continuous track(path) of the object, instantaneous center of the object, etc.

I added this logic in SimpleCV with CAMShift as TrackSet (I will soon change this) and then there was this:

[youtube=http://www.youtube.com/watch?v=rl8C4yxtJD4]

Kat had told me to do tracking of two balls simultaneously. I had to put some thoughts into this since even in OpenTLD, we can't track more than one object. Something very funny and easy idea occurred to me. I thought of creating two different FeatureSets which come from the same image but with different bounding box. So, here's what I did.


> 
fs1 = img0.track(bb1)
fs2 = img0.track(bb2)
fs1 = img1.track(fs1) # fs1 will have object corresponding to bb1
fs2 = img1.track(fs2) # fs2 will have object corresponding to bb2
.
.
fs1 = imgN.track(fs1)
fs2 = imgN.track(fs2)



And then there was this:

[youtube=http://www.youtube.com/watch?v=eG585vx2cig]


I have added a function in FeatureSet(which I'll be moving to TrackSet) which draws the complete path of the object.


> 
fs.drawAll()



will draw the complete path of the object on the current image frame.

Initially there were some problems in tracking two objects (and in tracking one object also). Whenever two objects used to overlap each other, both the bounding box would become the same and eventually track only one object (even after they got separated). In Median Flow Tracker and OpenTLD, Zdenek Kalal has used Forward-Backward Error. In FB Error, you minimize your error in tracking by using the previous **n** frames to predict or using those frames to determine the position of the object accurately. I have also added FB Error in Tracking(CAMShift). That has improved the tracking for one object also.

I am planning to add more features to the TrackSet(CAMShift as of now) viz pixel velocity, Track Length, Track Images, BB Track, and most important of all Prediction using Kalman Filter. Kat advised me to add all this stuff and also suggested me that I should make it **2.5 D**. "**z**" will be the ratio of the size of the initial bounding box to the size of the current bounding box. I'm super excited to work on this. I'll try my best to finish this before 22nd July as it is the day when SimpleCV 1.3 is going to be released and also it's Kat's birthday.

P.S. My Twitter Bio after a year or so - **I track stuff**.
