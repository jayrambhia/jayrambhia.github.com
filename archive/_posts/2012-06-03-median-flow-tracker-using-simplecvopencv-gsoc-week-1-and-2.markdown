---
category: Blog
tag: Computer Vision
comments: true
date: 2012-06-03 19:35:18
layout: post
slug: median-flow-tracker-using-simplecvopencv-gsoc-week-1-and-2
title: Median Flow Tracker using SimpleCV/OpenCV - GSoC week 1 and 2
---

Work in the first two weeks of my Google Summer of Code had been quite slow. I couldn't find much time as I was busy with travel and some college stuff.
I have finished making a Median Flow Tracker for OpenTLD. I am trying to port OpenTLD to python. I am working with George Nebehay's version of OpenTLD.https://github.com/gnebehay/OpenTLD .

Finished Tasks:



	
  * Get [https://github.com/gnebehay/OpenTLD](https://github.com/gnebehay/OpenTLD) this up and running on your machine

	
  * Learn how OpenTLD works.

	
  * Make MF Tracker (needs improvement)



I have tweaked gnebehay's OpenTLD to version to make it compatible with OpenCV 2.3.1 and higher (only Linux, I guess) https://github.com/jayrambhia/OpenTLD

Median Flow Tracker -> https://github.com/jayrambhia/MFTracker

[youtube=http://www.youtube.com/watch?v=z55Ew2vCV8o]
I will add a setup.py file soon. Meanwhile, If you want to test this, try this example. https://github.com/jayrambhia/MFTracker/tree/master/mftracker/examples . I have put all the files from MF Tracker in this one file. I'll add documentation soon.

Task List for next week:

       
  * Improve MF Tracker

       
  * Learn more about "Learning" of OpenTLD

       
  * Implement "Learning" part



P.S. Back home. Having fun with OpenCV/SimpleCV.

**EDIT**:

I have added **setup.py** file. Now it's a complete package. **[Download ](https://github.com/jayrambhia/MFTracker/downloads/tarball/master)**

