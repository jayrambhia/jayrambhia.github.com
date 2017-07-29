---
category: Blog
tag: Computer Vision
comments: true
date: 2012-05-25 10:52:10
layout: post
slug: opentld-georg-nebehays-version-of-opentld-in-opencv-2-3-1-and-towel-day
title: OpenTLD - Georg Nebehay's version of OpenTLD in OpenCV 2.3.1 and Towel Day
---

**Happy Towel Day, froods. DON'T PANIC!**

Coding period has already started and I'm a bit behind my schedule. Here's a basic task list that I'll follow.


### Task list:
	
  * Get https://github.com/gnebehay/OpenTLD this up and running on your machine

	
  * Learn how it works, what variables can be tweaked and decide if any of SimpleCV's functionality could be used to improve it

	
  * Port it directly to SimpleCV


So, I got Georg Nebehay's OpenTLD version up and running on my machine with Ubuntu 12.04 and OpenCV 2.3.1. I tried installing it via Ubuntu Software Center, but it showed me there were some conflicts and few libraries missing. I removed all the conflicts and installed libhigui2.3, but it still asked me to install libhighui>=2.0.
I tried installing it manually. First of all, I had to install cmake.

    sudo apt-get install cmake

    cd ~/Downloads/gnebehay-OpenTLD-b1c1e88 # to the directory
    cmake
    make

Since this OpenTLD version is made for OpenCV2.0, it gave me error because all the headers included were of OpenCV2.0 and I have OpenCV2.3.1. So, I manually changed all the header files to OpenCV2.3.1 header files. After successfully building from the source, I tried it. It's working well.

<iframe width="420" height="315" src="http://www.youtube.com/embed/ylKg8klW_L8" frameborder="0" allowfullscreen></iframe>

To get more details on OpenTLD version of [Georg Nebehay](http://gnebehay.github.com/OpenTLD/).

**P.S. Always keep your towel with you. Digital watches are appreciated. Thanks for everything, Douglas Adams.**
