---
category: Blog
tag: Computer Vision
comments: true
date: 2012-07-11 14:54:20
layout: post
slug: sobel-operator
title: Sobel Operator
---

The **Sobel Operator** is used in Image Processing to get the edges in the image. It is a **Discrete Differentiation Operator** which computes an approximation of the gradient of the image intensity function.The Sobel operator is based on convolving the image with a small, separable, and integer valued filter in horizontal and vertical direction and is therefore relatively inexpensive in terms of computations.
The sobel operator calculates the gradient of the image intensity at each point, giving the direction of the largest possible increase from light to dark and the rate of change in that direction.
Each image point, the gradient vector points in the direction of largest possible intensity increase, and the length of the gradient vector corresponds to the rate of change in that direction.

Mathematically, the operator uses two 3×3 kernels which are convolved with the original image to calculate approximations of the derivatives - one for horizontal changes, and one for vertical.



#### Sobel Operator with OpenCV:


This is an image of Lenna with Sobel Operator applied on it.
![Lenna](http://i.imgur.com/JF8UH.png)

OpenCV code:
    
    import cv2
    import cv2.cv as cv
    import numpy as np
    
    img = cv2.imread(&quot;filename&quot;, cv.CV_LOAD_IMAGE_GRAYSCALE)
    dst = cv2.Sobel(img, ddepth=cv.CV_32F, dx=1, dy=1, ksize=3)
    minv = np.min(dst)
    maxv = np.max(dst)
    cscale = 255/(maxv-minv)
    shift =  -1*(minv)
    sobel_img = np.zeros(img.shape,dtype='uint8')
    sobel_img = cv2.convertScaleAbs(dst, sobel_img, cscale, shift/255.0)
    cv2.imshow(&quot;sobel&quot;,sobel_img)
    cv2.waitKey(0)


In **SimpleCV**,
    
    from SimpleCV import Image
    img = Image(&quot;lenna&quot;)
    sobel_gray_img = img.sobel() #sobel applied on grayscale
    sobel_img = img.sobel(doGray=False) #sobel applied on color image
    sobel_gray_img.show()
    sobel_img.show()


In **cv2.Sobel**,
ddepth – Destination image depth. The following combination of src.depth() and ddepth are supported:
         CV_8U, CV_16U, CV_16S, CV_32F, CV_64F
dx – Order of the derivative x.
dy – Order of the derivative y.
ksize – Size of the extended Sobel kernel. It must be 1, 3, 5, or 7.

The cv2.Sobel operators combine Gaussian smoothing and differentiation, so the result is more or less resistant to the noise.

P.S. GSoC 2012 Mid-Term Evaluations are ongoing.
