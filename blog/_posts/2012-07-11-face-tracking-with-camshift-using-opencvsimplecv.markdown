---
category: Blog
tag: Computer Vision
comments: true
date: 2012-07-11 16:20:51
layout: post
slug: face-tracking-with-camshift-using-opencvsimplecv
title: Face Tracking with CAMShift
---

**CAMShift** stands for **C**ontinuously **A**daptive **M**ean Shift. It is the basis for the **face-tracking** algorithm in OpenCV. It combines the basic **Mean Shift** algorithm with an adaptive region-sizing step. The kernel is a simple step function applied to a skin-probability map. The skin probability of each image pixel is based on color using a method called **histogram backprojection**. Color is represented as Hue from the HSV color model.

<iframe width="420" height="315" src="http://www.youtube.com/embed/QnwT9QQPQow" frameborder="0" allowfullscreen></iframe>

**Face Tracking with CAMShift**
    
    import cv2
    import cv2.cv as cv
    
    def camshift_tracking(img1, img2, bb):
            hsv = cv2.cvtColor(img1, cv.CV_BGR2HSV)
            mask = cv2.inRange(hsv, np.array((0., 60., 32.)), np.array((180., 255., 255.)))
            x0, y0, w, h = bb
            x1 = x0 + w -1
            y1 = y0 + h -1
            hsv_roi = hsv[y0:y1, x0:x1]
            mask_roi = mask[y0:y1, x0:x1]
            hist = cv2.calcHist( [hsv_roi], [0], mask_roi, [16], [0, 180] )
            cv2.normalize(hist, hist, 0, 255, cv2.NORM_MINMAX);
            hist_flat = hist.reshape(-1)
            prob = cv2.calcBackProject([hsv,cv2.cvtColor(img2, cv.CV_BGR2HSV)], [0], hist_flat, [0, 180], 1)
            prob &= mask
            term_crit = ( cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 10, 1 )
            new_ellipse, track_window = cv2.CamShift(prob, bb, term_crit)
            return track_window
    
    def face_track():
        cap = cv2.VideoCapture(0)
        img = cap.read()
        bb = (125,125,200,100) # get bounding box from some method
        while True:
            try:
                img1 = cap.read()
                bb = camshift(img1, img, bb)
                img = img1
                #draw bounding box on img1
                imshow("CAMShift",img1)
            except KeyboardInterrupt:
                break




In **SimpleCV**,
    
    from SimpleCV import Image, Camera
    cam = Camera()
    img = cam.getImage()
    time.sleep(0.4)
    # Move your face in some direction
    img1 = cam.getImage()
    bb = (100,200,100,100) # get Bounding Box from some method
    new_bb = img1.track(img,"camshift",bb)
    # do this in loop.

It seems that CAMShift is quite efficient and fast. I'll add Lucas Kanede Tracker, Median Flow Tracker, Forward-Backward Error Tracker soon. And to top it all, I will add OpenTLD to SimpleCV.

P.S. Down with throat infection. Waiting for SimpleCV t-shirt and my Mid-Term evaluation.
