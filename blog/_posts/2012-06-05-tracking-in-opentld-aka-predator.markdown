---
category: Blog
tag: Computer Vision
comments: true
date: 2012-06-05 16:53:41
layout: post
slug: tracking-in-opentld-aka-predator
title: Tracking in OpenTLD aka Predator
wordpress_id: 608
categories:
- Computer Vision
- Daily Posts
- GSoC
- open source
- Python
- Technical
tags:
- computer vision
- forward backward error
- gsoc
- lucas kanede
- median flow
- opencv
- openTLD
- simplecv
- tracking
---

As my Google Summer of Code 2012 project, I have to port OpenTLD to python using OpenCV and SimpleCV. OpenTLD a.k.a. Predator was first made by **[ Zdenek Kalal ](http://info.ee.surrey.ac.uk/Personal/Z.Kalal/)** in MATLAB. **[OpenTLD](https://github.com/zk00006/OpenTLD/)**. It is one of the most reliable algorithms to track objects. The algorithm include **on-line** training and learning.
The algorithm which consists of **off-line** training take days and lots of data to train and learn.

Here's my brief understanding of how OpenTLD algorithm works.

As the name suggests, it consists of three main parts.



	
  * **Tracking**

	
  * **Learning**

	
  * **Detection**


[![OpenTLD](http://www.jayrambhia.com/blog/wp-content/uploads/2012/06/tld-algo.jpg)](http://www.jayrambhia.com/blog/wp-content/uploads/2012/06/tld-algo.jpg)


###### **Tracking**:


Adaptive Tracking is used in OpenTLD. A Median Flow Tracker is made using Lucas-Kanede Tracker with pyramids and with the help of Forward-Backward error, and focusing on 50% of the most reliable points.
As Zdenek Kalal quoted in his GoogleTech Talk about Predator


"**Every tracker eventually fails and requires a detector**."





###### 




###### **Detection**:


Classifiers are continuously trained from each and every frame. For every frame, Classifiers are evaluated. Errors are estimated via feedback. According to the feedback, classifiers are updated to detect more efficiently.
Ensemble classifier and 1NN classifier are used in detection.


###### [![feedback in openTLD](http://www.jayrambhia.com/blog/wp-content/uploads/2012/06/feedback.jpg)](http://www.jayrambhia.com/blog/wp-content/uploads/2012/06/feedback.jpg)




###### **Learning**:


The tracker learns using P-N learning (Positive-Negative) which learns an object classifier and labels all the patches as "object"(positive) and "background"(negative).It uses a tracker for providing positive and detector for negative training examples.

[![PN Learning - OpenTLD](http://www.jayrambhia.com/blog/wp-content/uploads/2012/06/pn.jpg)](http://www.jayrambhia.com/blog/wp-content/uploads/2012/06/pn.jpg)


###### 



I have started working on OpenTLD for couple of weeks now. I have made a Median Flow tracker for "Tracking" part of OpenTLD. Here's how the "Tracking" part works in OpenTLD.


###### 


This is how Median Flow Tracker works:



**
  * Initialize points to a grid
**
**[ Get Filled points in the Bounding Box ](https://github.com/jayrambhia/MFTracker/blob/master/mftracker/bb.py#L21)**

**
  * Track points between frame
**
Points are tracked using **[Lucas-Kanede Tracker](https://github.com/jayrambhia/MFTracker/blob/master/mftracker/lk.py)** with pyramids.
**
  * Estimate reliability of the points
**
To get reliable points, Forward-Backward error method is used. In FB method, points are tracked twice.
tracked points for **current image -> previous image**
tracked points for **previous image -> current image**
So, intersection of both of point sets would give me reliable tracked points.
**[Forward-Backward Error](https://github.com/jayrambhia/MFTracker/blob/master/mftracker/fbtrack.py)**

**
  * Filter out 50% of the outliers
**
50% of the points are filtered out using median filter. First the median is calculated for the vector of points, and most reliable points are chosen. 

**
  * Estimate the new bounding box
**
New bounding box is estimated based on all relative distance changes of all points to every point. The median of the relative value is used for calculation. **[Predict Bounding Box**](https://github.com/jayrambhia/MFTracker/blob/master/mftracker/bb.py#L123)



###### **[MF Tracker GitHub](https://github.com/jayrambhia/MFTracker)**



[youtube=http://www.youtube.com/watch?v=z55Ew2vCV8o]

P.S. Now working on **Learning** part.

