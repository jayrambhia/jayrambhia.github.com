---
category: Event
tag: Computer Vision
comments: true
date: 2012-08-23 03:12:25
layout: post
slug: the-end-google-summer-of-code-2012
title: 'The End: Google Summer of Code 2012'
---

**This is the end, beautiful friend**

**-The End by The Doors**


[Katherine Scott](http://www.kscottz.com/), [Anthony Oliver](http://www.anthonyoliver.net/), [Victor](http://www.notvictor.com/) and [Vijay](http://genericpointer.tumblr.com/), it has been a pleasure working with you guys. So after exactly three months, Google Summer of Code 2012 has come to an end. It has been a wonderful summer spent in surreal universe of Computer Vision.

Right from the beginning, it has been a rocky journey with lots of ups and down. From Discrete Fourier Transform (Gaussian, Butterworth filters, etc), Median Flow Tracker, Machine Learning, Detection in OpenTLD, boost::python bindings of OpenTLD, Sobel Operator to CAMShift Tracker and Lucas Kanade Tracker with Kalman Prediciton, it has been a great expedition of coding, nail biting, colorful characters on white background, a transperent black screen of terminal, Octocat of GitHub, merges and pulls on git, and Lenna. How can I forget Lenna!

I have gained immense knowledge during these three months. How not to suck at using git, Python PEP-8 Documentation, CamelCase, Python decorators, C++, Image Processing, Computer Vision, Machine Learning(little bit), Importance of GUI, How To contribute to an Open Source program, Open Source Licensing, unit tests, issues, pulls. And some things that I did not learn. HoughLines, PHP, Java, and the list goes on.

It all started in March 2012 when GSoC announced the organizations list. I was quite disheartened by the fact that there was no organization with Python as a keyword as I only knew Python. The problem was that they hadn't announced all the organziations. I saw SimpleCV after 2-3 hours. Downloaded xchat and joined #simplecv on freenode. There were few students and two mentors chatting. After taking few tips from them I started tweaking around with OpenCV python. As I was learning DFT in my Image Processing class, I implemented a filter and showed it to Kat. I got positive feedback. After proposing four different topics for the project and being asked to do better, I came up with [**Automatic segregation of conveyor belt items using SimpleCV**](http://www.google-melange.com/gsoc/proposal/review/google/gsoc2012/jayrambhia/1) and submitted it. After waiting for some 20 odd days, results were out. I couldn't see my name on the list. Crushed.

A New Hope.Someone told me they had selected around 1200 students and the list only showed 800. Heart Pounding. I couldn't wait anymore. Refreshed. And there it was. I cried out loud. Magical moment, it was.

Coding period was a month away. Meanwhile, I started learning few things about Computer Vision and managed to screw up my finals. Starting with OpenTLD, I learned C++ and its Object Oriented Concepts. Ported it to python in 2-3 weeks with very poor accuracy. Realised Python is damn slow so tried multiprocessing and multithreading but managed to make it worse. Learned about GIL, the hard way. Started working on boost::python to make bindings for OpenTLD, simultaneosuly. Wasted a lot of time on that with no real results. Trashed it and started working on improving SimpleCV and adding more features to it. I made couple of installation scripts for SimpleCV and OpenCV, tweaked VirtualCamera, added couple of functions in Color and ImageClass, resolved the problem of quitting pygame, and majorly implemented CAMShift Tracking and Lucas Kanade Tracker with Kalman Filter prediction in SimpleCV.

Here are the blog posts that I added during my summer.


  * [Install OpenCV 2.3.1 and SimpleCV in Ubuntu 12.04 Precise Pangolin, Arch Linux](/blog/install-opencv-2-3-1-and-simplecv-in-ubuntu-12-04-precise-pangolin-arch-linux/)


  * [Beginning OpenCV](/blog/beginning-opencv/)


  * [Capture Images and Video from Camera in OpenCV 2.3.1](/blog/capture-images-and-video-from-camera-in-opencv-2-3-1/)


  * [GSoC 2012 Package Arrived](/blog/gsoc-2012-package-arrived/)


  * [OpenTLD – Georg Nebehay’s version of OpenTLD in OpenCV 2.3.1 and Towel Day](/blog/opentld-georg-nebehays-version-of-opentld-in-opencv-2-3-1-and-towel-day/)


  * [Median Flow Tracker using SimpleCV/OpenCV – GSoC week 1 and 2](/blog/median-flow-tracker-using-simplecvopencv-gsoc-week-1-and-2/)


  * [Tracking in OpenTLD aka Predator](/blog/tracking-in-opentld-aka-predator/)


  * [Install OpenCV 2.4.* in Ubuntu 12.04 Precise Pangolin](/blog/install-opencv-2-4-in-ubuntu-12-04-precise-pangolin/)


  * [Get data from Mat / cv::Mat in OpenCV](/blog/get-data-from-mat-cvmat-in-opencv/)


  * [Configuring Boost::Python and Hello Boost](/blog/configuring-boostpython-and-hello-boost/)


  * [Boost::Python with OpenCV](/blog/boostpython-with-opencv/)


  * [Sobel Operator](/blog/sobel-operator/)


  * [Face Tracking with CAMShift using OpenCV/SimpleCV](/blog/face-tracking-with-camshift-using-opencvsimplecv/)


  * [CAMShift with SimpleCV](/blog/camshift-with-simplecv/)


  * [Kalman Filter](/blog/kalman-filter/)


  * [Lucas Kanade Tracker](/blog/lucas-kanade-tracker/)

And here are few videos that I uploaded.
**OpenTLD on Towel Day**

<iframe width="420" height="315" src="http://www.youtube.com/embed/ylKg8klW_L8" frameborder="0" allowfullscreen></iframe>

**Face Tracking with CAMShift**

<iframe width="420" height="315" src="http://www.youtube.com/embed/QnwT9QQPQow" frameborder="0" allowfullscreen></iframe>

**CAMShift Tracking of two objects**

<iframe width="420" height="315" src="http://www.youtube.com/embed/rl8C4yxtJD4" frameborder="0" allowfullscreen></iframe>

**Kalman Filter Prediction**

<iframe width="420" height="315" src="http://www.youtube.com/embed/eG585vx2cig" frameborder="0" allowfullscreen></iframe>


<iframe width="420" height="315" src="http://www.youtube.com/embed/ZGhGeKQMyVA" frameborder="0" allowfullscreen></iframe>

**Lucas Kanade Tracker**

<iframe width="420" height="315" src="http://www.youtube.com/embed/Yw7IcttYRuY" frameborder="0" allowfullscreen></iframe>


This sums up almost all my work. So the journey ends here.

I'll see you in the dark side of the moon.
