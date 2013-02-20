---
category: Blog
tag: Computer Vision
comments: true
date: 2012-04-10 01:56:24
layout: post
slug: integrating-opencv-with-pygtk
title: Integrating OpenCV with pygtk
wordpress_id: 389
categories:
- Computer Vision
- Daily Posts
- Python
- Technical
tags:
- GUI
- image
- opencv
- openTLD
- pygtk
- python
- swig
---

I am currently working on an undisclosed project with a senior. It requires a GUI, and bunch of OpenCV codes. We started using pygtk, and openCV. python wrapper for openCV is literally slow and we need a much better performance than that. So, after some tests, we found out that we could use **swig** bindings. At first, we thought to make swig bindings ourselves, but as we started doing it, we realized it isn't that easy to bind complete OpenCV library in swig. Hence, we started looking at some other options. os.system() seemed useless.

After looking on the internet for couple of days, we realized that openCV 2.1 provides swig bindings for python in the package. We tried, and it worked. That gave us some relief. We still had a huge problem. We had to show two different windows, one for GUI, and one for OpenCV. I tried many things including multithreading, multiprocessing, etc, but nothing seemed to be working. We were stuck again. I once **crashed** my Ubuntu as I encountered an infinite loop in openCV.

After a session of brainstorming, and testing for performance, we decided to show images in GUI itself. This was quite new for me. I had never converted an IplImage object to gtk.Image object. We had another option. We could save the image and then load it in GUI, but it seemed pointless as it took more time and memory. We badly wanted to find a way to convert IplImage object to gtk.Image object. After looking at dozens of codes, I stumbled upon a code on [stackoverflow,](http://stackoverflow.com/questions/1188665/how-can-i-display-an-opencv-iplimage-in-gtk-gtkmm) which converted IplImage* object to gtk.Image object in C++. I tried to implement that in python. It took me some time to understand C++ code, as I have never done anything in C++.

So here is how I implemented it. And it is working fine.

    
    img_pixbuf = gtk.gdk.pixbuf_new_from_data(img.imageData,
                                              gtk.gdk.COLORSPACE_RGB,
                                              False,
                                              img.depth,
                                              img.width,
                                              img.height,
                                              img.widthStep)
    image = gtk.image_new_from_pixbuf(img_pixbuf)




**NOTE: IplImage has colorspace BGR, but there is no BGR colorspace in gtk. So you need to change colorspace of image from BGR to RGB.**

    
    new_img = cvCreateImage(cvGetSize(img), img.depth, img.nChannels)
    cvCvtColor(img,new_img,CV_BGR2RGB)




You can find corresponding documents regarding pixbuf, gtk.gdk.pixbuf_new_from_data from **[pygtk tutorial page](http://www.pygtk.org/docs/pygtk/class-gdkpixbuf.html#function-gdk--pixbuf-new-from-data).**

Using this, we have made some fine codes which use openCV and display is show on pygtk GUI.

We have also started working on [**openTLD**](http://info.ee.surrey.ac.uk/Personal/Z.Kalal/tld.html). We are trying to port it to python. We spent complete day on it. At the end, we settled on os.system() for running openTLD in C++. We can't port it to python in 3-4 days, so os.system() seemed the best option. We have added multiprocessing, and it is working really well.

P.S. openTLD is simply awesome.
