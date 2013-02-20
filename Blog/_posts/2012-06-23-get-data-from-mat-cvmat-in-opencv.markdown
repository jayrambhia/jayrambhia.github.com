---
category: Blog
tag: Computer Vision
comments: true
date: 2012-06-23 15:59:54
layout: post
slug: get-data-from-mat-cvmat-in-opencv
title: Get data from Mat / cv::Mat in OpenCV
---

I have been working on George Nebehay's OpenTLD version to port it to python and it has given me a good amount of exposure to C++ and OpenCV with C++. I must confess that I never thought C++ would be so amazing. Despite of C++ being an intermediate-level language, I think it's better than Python. The usage of pointers and robustness/run-time speed are plus point of C++ over Python. Python may be a very high level language and easy to understand, I don't think it can be compared to C++ yet.

So, moving on to OpenCV. After getting a good amount of exposure to OpenCV C++, I would like to add a series of blog posts which would be based on my basic OpenCV knowledge. I have already written couple of posts about beginning OpenCV.



	
  * 


#### [Install OpenCV 2.3.1 and SimpleCV in Ubuntu 12.04 Precise Pangolin, Arch Linux ](http://jayrambhia.com/blog/2012/05/02/install-opencv-2-3-1-and-simplecv-in-ubuntu-12-04-precise-pangolin-arch-linux/)




	
  * 


#### [Install OpenCV 2.4 in Ubuntu 12.04 Precise Pangolin ](http://jayrambhia.com/blog/2012/06/20/install-opencv-2-4-in-ubuntu-12-04-precise-pangolin/)




	
  * 


#### [Beginning OpenCV ](http://jayrambhia.com/blog/2012/05/08/beginning-opencv/)




	
  * 


#### [Capture Images and Video from Camera in OpenCV 2.3.1 ](http://jayrambhia.com/blog/2012/05/10/capture-images-and-video-from-camera-in-opencv-2-3-1/)





Today, I found this question on stackoverflow http://stackoverflow.com/questions/11166760/how-to-improve-sorting-pixels-in-cvmat/11167045 . The guy was asking about how to access image pixels and sort them quickly. He was using **cvGetReal2D**. So, the problem here is **cvGetReal2D** is very slow and I found that out when I was making filters in Python OpenCV. Those filters are used to add or remove noise from the image and to make image sharp or smooth. So, back to accessing pixel values from the image in OpenCV. Few points you should always remember.



	
  * **cvGetReal2D is slow**

	
  * **IplImage is old. Stop using IplImage. Use cv::Mat (for C) or Mat (for C++)**

	
  * **Install OpenCV 2.3.1 or higher. I would suggest OpenCV 2.4**

	
  * **If you are using Visual Studio on Windows, please stop. Too much linking problems. Dual boot with a good Linux distro and install OpenCV.**


I wandered off again. Back to getting pixel values from Mat.

Load Image as Mat and get it's data pointer.

    
        Mat img = imread("filename.jpg",CV_LOAD_IMAGE_COLOR);
        unsigned char *input = (unsigned char*)(img.data);




Mat.data gives a pointer which refers to the original data matrix. In this data matrix, all the pixel values are stored in 1D array. i.e. b1,g1,r1,b2,g2,r2,...
Images in OpenCV are always stored in the format of BGR.

**Getting Pixel Values**:
Let's assume we have an image of size 512x512 pixels. Pixel in first row and first column will have some value (b00, g00, r00) and pixel in nth row and mth column will have value (bnm, gnm ,rnm).

    
    
        int i,j,r,g,b;
        for(int i = 0;i < img.rows ;i++){
    			for(int j = 0;j < img.cols ;j++){
                    b = input[img.step * j + i ] ;
                    g = input[img.step * j + i + 1];
                    r = input[img.step * j + i + 2];
                }
            }




To get pixel values of nth row and mth cloumn,
**b = input[img.step * m + n ]
g = input[img.step * m + n + 1]
r = input[img.step * m + n + 2]
**
So, to sum it all

    
    #include<opencv2/highgui/highgui.hpp>
    #include<stdio.h>
    using namespace cv;
    using namespace std;
    int main()
    {
        Mat img = imread("/home/jay/Pictures/python.jpg",CV_LOAD_IMAGE_COLOR);
        unsigned char *input = (unsigned char*)(img.data);
        int i,j,r,g,b;
        for(int i = 0;i < img.rows;i++)
        {
    	for(int j = 0;j < img.cols;j++)
            {
                b = input[img.step * j + i ] ;
                g = input[img.step * j + i + 1];
                r = input[img.step * j + i + 2];
                }
            }
        return 0;
    }




For detailed information about Mat data access - [Read this](http://answers.opencv.org/question/2531/image-data-processing-in-cvmat/).

P.S. I'm thinking of buying a domain.
