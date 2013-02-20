---
category: Blog
tag: Computer Vision
comments: true
date: 2012-05-10 16:10:13
layout: post
slug: capture-images-and-video-from-camera-in-opencv-2-3-1
title: Capture Images and Video from Camera in OpenCV 2.3.1
wordpress_id: 569
categories:
- Computer Vision
- Daily Posts
- open source
- Python
- Technical
tags:
- camera
- capture
- frame
- image
- opencv
- python
- video
---

OpenCV 2.3.1 python bindings have **ctypes** and no longer support swig bindings. OpenCV 2.3.1 python bindings are quite stable and much faster than OpenCV 2.1 swig bindings. Although OpenCV 2.3.1 has many new features, it still supports some of OpenCV 2.1's functions. Moving on to capturing images from camera.
[![](http://www.jayrambhia.com/blog/wp-content/uploads/2012/05/captured_from_camera_opencv.png)](http://www.jayrambhia.com/blog/wp-content/uploads/2012/05/captured_from_camera_opencv.png)


#### 


****
**

#### CaptureFromCAM

**


##### Capturing a single frame:


    
    from cv2.cv import *
    # Initialize the camera
    capture = CaptureFromCAM(0)  # 0 -> index of camera
    if capture:     # Camera initialized without any errors
       NamedWindow("cam-test",CV_WINDOW_AUTOSIZE)
       f = QueryFrame(capture)     # capture the frame
       if f:
           ShowImage("cam-test",f)
           WaitKey(0)
    DestroyWindow("cam-test")




To capture video, capture frames in a loop with appropriate waitkey. This method of capturing frames is similar to that of OpenCV 2.1



#### **VideoCapture**




##### Capturing a single frame:


    
    from cv2 import *
    # initialize the camera
    cam = VideoCapture(0)   # 0 -> index of camera
    s, img = cam.read()
    if s:    # frame captured without any errors
        namedWindow("cam-test",CV_WINDOW_AUTOSIZE)
        imshow("cam-test",img)
        waitKey(0)
        destroyWindow("cam-test")




This method is most extensively used to capture frames in OpenCV 2.3.1.

P.S. Studying Thermodynamics. We Mech people also study cool stuff.
