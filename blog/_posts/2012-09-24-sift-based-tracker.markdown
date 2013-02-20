---
category: Blog
tag: Python
comments: true
date: 2012-09-24 02:07:12
layout: post
slug: sift-based-tracker
title: SIFT based Tracker
wordpress_id: 951
categories:
- c++
- Computer Vision
- Daily Posts
- open source
- Technical
tags:
- computer vision
- cpp
- descriptor
- dmatch
- FLANN
- keypoints
- matching
- nearest neighbor
- opencv
- SIFT
- tracker
- tracking
---

**Scale-invariant feature transform** (or SIFT) is an algorithm in computer vision to detect and describe local features in images. The algorithm was published by David Lowe in 1999.SIFT is a method to detect distinct, invariant image feature points, which easily can be matched between images to perform tasks such as object detection and recognition, or to compute geometrical transformation between images.

SIFT keypoints of objects are first extracted from a set of reference images and stored in a database. An object is recognized in a new image by individually comparing each feature from the new image to this database and finding candidate matching features based on Euclidean distance of their feature vectors.

Lowe's method for image feature generation transforms an image into a large collection of feature vectors, each of which is invariant to image translation, scaling, and rotation, partially invariant to illumination changes and robust to local geometric distortion.

The scale invariant features are efficiently identified by using a staged filter approach. The first stage identifies key locations in scale space by looking for locations that are maxima or minima of a difference of-Gaussian function. Each point is used to generate a feature vector that describesthe local image region sampled relative to its scale-space co-ordinate frame.

The SIFT keys derived from an image are used in a nearest-neighbour approach to indexing to identify candidate object models. Collections of keys that agree on a potential model pose are first identified through a Hough transform hash table, and then through a least-squares fit to a final estimate of model parameters. When at least 3 keys agree on the model parameters with low residual, there is strong evidence for the presence of the object.

For detailed information about SIFT, visit **[aishack](http://www.aishack.in/2010/05/sift-scale-invariant-feature-transform/)**.

**Finding KeyPoints using SIFT in OpenCV**:
OpenCV has a good support for SIFT. Read more about [SIFT-OpenCV](http://docs.opencv.org/modules/nonfree/doc/feature_detection.html?highlight=sift).
Include libraries and other stuff
    
    #include<opencv2/opencv.hpp>
    #include<opencv2/features2d/features2d.hpp>
    #include<opencv2/imgproc/imgproc_c.h>
    #include<opencv2/nonfree/nonfree.hpp>
    using namespace cv;
    using namespace std;




Find and draw KeyPoints
    
    VideoCapture cap = VideoCapture(0);
    Mat img, descriptors;
    SIFT sift;
    vector<KeyPoint> keypoints;
    
    cap >> img;
    
    sift(img, Mat(), keypoints, descriptors); /* find keypoints */
    drawKeypoints(img, keypoints, img); /* draw keypoints */
    imshow("image",img);




**KeyPoints Matching using FLANN**:
After successfully finding SIFT keypoints in an image, we can use these keypoints to match the keypoints from other image.

1. Select ROI in the image. Slice the image and extract the ROI.
2. Find SIFT Keypoints in ROI image.
3. Find SIFT Keypoints in the image.
4. Match Keypoints using FLANN.
5. Predict new bounding box/ ROI and repeat.

**FLANN**:
Fast Library for Approximate Nearest Neighbors is a library that contains a collection of algorithms optimized for fast nearest neighbor search in large datasets and for high dimensional features. Read more about FLANN [here](http://people.cs.ubc.ca/~mariusm/index.php/FLANN/FLANN).

**Implementing FLANN using OpenCV**:
OpenCV has a good support for FLANN. It has FLANN based Matcher which can be used to match two sets of keypoints.

    
    SIFT sift;
    vector keypoints_roi, keypoints_img;
    Mat descriptor_roi, descriptor_img;
    FlannBasedMatcher matcher;
    vector<DMatch> matches;
    
    /* get keypoints of ROI image */
    sift(roiImg, Mat(), keypoints_roi, descriptor_roi);
    /* get keypoints of the image */
    sift(img, Mat(), keypoints_img, descriptor_img);
    /* Match keypoints using FLANN */
    matcher.match(descriptor_roi, descriptor_img, matches);




After getting the matched keypoints based on K-nearest neighbor, you might want to filter out points with greater euclidean distance. You can easily do this by accessing the DMatch.

FlannBasedMatcher stores the result in DMatch which is a class for matching keypoint descriptors. Read more about DMatch [here](http://docs.opencv.org/modules/features2d/doc/common_interfaces_of_descriptor_matchers.html?highlight=dmatch#DMatch).

**DMatch**:
As I mentioned above, DMatch is a class for matching keypoint descriptors. It has following parameters.
    
    int queryIdx; // query descriptor index
    int trainIdx; // train descriptor index
    int imgIdx; // train image index
    
    float distance;




**distance** - K-means distance between the matched keypoints
**queryIdx** - Index of query descriptor keypoint.
**trainIdx** - Index of train descriptor keypoint

So, this can be simplified as (in the above reference), **keypoints_roi[match[i].queryIdx]** is a match for **keypoints_img[match[i].trainIdx]**
By using DMatch, we can easily access matched keypoints.

**Filter out matches by taking the k-means distance**:
    
    vector<DMatch> good_matches;
    double min = 200.0;
    for (int i=0; i<descriptor_roi.size(); i++)
    {
        if(matches[i].distance < min)
        {
            good_matches.push_back(matches[i]);
        }
    }




**Draw matched keypoints**:
    
    Mat img_matches;
    drawMatches(roiImg, keypoints_roi, img, keypoints_img,
                good_matches, img_matches, Scalar::all(-1),
                Scalar::all(-1), vector(),
                DrawMatchesFlags::NOT_DRAW_SINGLE_POINTS);




**Draw matched keypoints on image**:
    
    vector<KeyPoint> keypoints1;
    for (i=0; i<good_matches.size(); i++)
    {
         keypoints1.push_back(keypoints_img[good_matches[i].trainIdx]);
    }
    drawKeypoints(img, keypoints1, img,
                  Scalar::all(-1),
                  DrawMatchesFlags::NOT_DRAW_SINGLE_POINTS);




**Draw matched keypoints on ROI image**:
    
    vector<KeyPoint> keypoints2;
    for (i=0; i<good_matches.size(); i++)
    {
        keypoints2.push_back(keypoints_roi[good_matches[i].queryIdx]);
    }
    drawKeypoints(roiImg, keypoints2, roiImg,
                  Scalar::all(-1),
                  DrawMatchesFlags::NOT_DRAW_SINGLE_POINTS);




**Show Everything**:
    
    imshow("image", img);
    imshow("roi", roiImg);
    imshow("SIFT", img_matches);




And this is how it looks,
[![](http://www.jayrambhia.com/blog/wp-content/uploads/2012/09/Screenshot-from-2012-09-23-141503.png)](http://www.jayrambhia.com/blog/wp-content/uploads/2012/09/Screenshot-from-2012-09-23-141503.png)

**Prediction of the new Bounding Box / ROI**:
I'm still weak in this part. My prediction algorithm is really stupid and doesn't work well. I need to learn math. So if you have a good prediction algorithm to predict new ROI/BB using keypoints difference or something, you can make an efficient SIFT based tracker.

Other Important Links:
1. SIFT - [http://www.cs.ubc.ca/~lowe/keypoints/](http://blogs.oregonstate.edu/hess/code/sift/)
2. SIFT code - [http://blogs.oregonstate.edu/hess/code/sift/](http://blogs.oregonstate.edu/hess/code/sift/)
3. FLANN - [http://mloss.org/software/view/143/](http://mloss.org/software/view/143/)

You can find the complete source code of the SIFT based tracker on [GitHub](https://github.com/jayrambhia/Vision/blob/master/OpenCV/C%2B%2B/sift_tracker.cpp).

P.S. Finally made my [Resume](https://docs.google.com/document/d/1vYA-OCUkCLZvJE8ZTGgQ0MOcoEmYAq3rfPs-s0t6XM0/edit).
