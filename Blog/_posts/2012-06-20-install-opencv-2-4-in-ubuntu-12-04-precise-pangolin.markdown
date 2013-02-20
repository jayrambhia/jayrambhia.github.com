---
category: Blog
tag: Computer Vision
comments: true
date: 2012-06-20 16:55:34
layout: post
slug: install-opencv-2-4-in-ubuntu-12-04-precise-pangolin
title: Install OpenCV 2.4.* in Ubuntu 12.04 Precise Pangolin
---

**[Install OpenCV 2.4.0](https://github.com/jayrambhia/Install-OpenCV/blob/master/Ubuntu/2.4/opencv2_4_0.sh)
[Install OpenCV 2.4.1](https://github.com/jayrambhia/Install-OpenCV/blob/master/Ubuntu/2.4/opencv2_4_1.sh)
[Install OpenCV 2.4.2](https://github.com/jayrambhia/Install-OpenCV/blob/master/Ubuntu/2.4/opencv2_4_2.sh)**

Remove any installed versions of ffmpeg and x264.


> **sudo apt-get remove remove ffmpeg x264 libx264-dev**



Install all the dependencies.


> **sudo apt-get install libopencv-dev
sudo apt-get install build-essential checkinstall cmake pkg-config yasm
sudo apt-get install libtiff4-dev libjpeg-dev libjasper-dev
sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev libdc1394-22-dev libxine-dev libgstreamer0.10-dev libgstreamer-plugins-base0.10-dev libv4l-dev
sudo apt-get install python-dev python-numpy
sudo apt-get install libtbb-dev
sudo apt-get install libqt4-dev libgtk2.0-dev
**


Download the latest version ox x264 from [x264 snapshots](ftp://ftp.videolan.org/pub/videolan/x264/snapshots/)


> **tar -xvf x264-snapshot-version.tar.bz2
cd x264-snapshot-version/
**


**If you are using 32 bit Linux**


> **./configure --enable-static**


**If you're using 64 bit Linux**


> **./configure --enable-shared --enable-pic**


Install it


> **make
sudo make install**



Download the latest version of ffmpeg from [ffmpeg Download](http://ffmpeg.org/download.html).


> **tar -xvf ffmpeg-version.tar.bz2
cd ffmpeg-version/**


**If you're using 32 bit Linux**


> **./configure --enable-gpl --enable-libfaac --enable-libmp3lame --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-libtheora --enable-libvorbis --enable-libx264 --enable-libxvid --enable-nonfree --enable-postproc --enable-version3 --enable-x11grab**


**If you're using 64 bit Linux or ARM**


> **./configure --enable-gpl --enable-libfaac --enable-libmp3lame --enable-libopencore-amrnb --enable-libopencore-amrwb --enable-libtheora --enable-libvorbis --enable-libx264 --enable-libxvid --enable-nonfree --enable-postproc --enable-version3 --enable-x11grab --enable-shared**


Install it


> **make
sudo make install
**


Download the latest image of v4l from [v4l-utils](http://www.linuxtv.org/downloads/v4l-utils/)


> **tar -xvf v4l-version.tar.bz2
cd v4l-version
make
sudo make install
**


**[Download OpenCV 2.4.0](http://sourceforge.net/projects/opencvlibrary/files/opencv-unix/2.4.0/OpenCV-2.4.0.tar.bz2/download)**
**[Download OpenCV 2.4.1](http://sourceforge.net/projects/opencvlibrary/files/opencv-unix/2.4.1/OpenCV-2.4.1.tar.bz2/download)**
**[Download OpenCV 2.4.2](http://sourceforge.net/projects/opencvlibrary/files/opencv-unix/2.4.2/OpenCV-2.4.2.tar.bz2/download)**

After downloading OpenCV 2.4.* package, untar it and make.


> **tar -xvf OpenCV-version.tar.bz2
cd OpenCV-version/
mkdir build
cd build
cmake -D CMAKE_BUILD_TYPE=RELEASE ..
**



Verify that the output of cmake includes the following text:



	
  * found gstreamer-base-0.10

        
  * GTK+ 2.x: YES

        
  * FFMPEG: YES

        
  * GStreamer: YES

        
  * V4L/V4L2: Using libv4l


**Build and Install OpenCV**


> **make
sudo make install
**



OpenCV 2.4.* is now installed. Just make sure that all the libraries are linked properly.
Go to samples directory in OpenCV package.
Change directory to C or C++.
You'll find a script there named **build_all.sh**.
Execute the script. It will make all the files. select any output file and run it. If it works then you are good to go.


> **sudo echo "/usr/local/lib" >> /etc/ld.so.conf
sudo ldconfig
**


Your OpenCV 2.4.* is installed and libraries are properly linked. If you don't have much experience with OpenCV, I would suggest you to go through this post. **http://jayrambhia.wordpress.com/2012/05/08/beginning-opencv/**. It shows how to make a script so that you don't need to add everything while compiling opencv codes.

P.S. My Python port of George Nebehay's OpenTLD Version is almost ready.
