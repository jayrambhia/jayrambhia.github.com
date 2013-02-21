---
category: Blog
tag: Computer Vision
comments: true
date: 2012-05-08 12:26:00
layout: post
slug: beginning-opencv
title: Beginning OpenCV
---

I assume that you have installed OpenCV on your Linux machine. If you are having any problems installing OpenCV 2.3.1 you can view my [previous post](/blog/install-opencv-2-3-1-and-simplecv-in-ubuntu-12-04-precise-pangolin-arch-linux/) or  [this](http://www.marcolancini.it/other/opencv_install_231.php).

I would recommend you to go through OpenCV documentation.

- [C/C++](http://opencv.willowgarage.com/documentation)
- [Python](http://opencv.willowgarage.com/documentation/python/cookbook.html)

### C

**Load images in C**

    
    #include
    #include<opencv2/highgui/highgui.hpp>
    
    int main()
    {
        IplImage* img = cvLoadImage("/home/jay/Pictures/python.jpg",CV_LOAD_IMAGE_COLOR);
        cvNamedWindow("opencvtest",CV_WINDOW_AUTOSIZE);
        cvShowImage("opencvtest",img);
        cvWaitKey(0);
        cvReleaseImage(&img);
        return 0;
    }




To compile C program,
Let's assume the file is opencvtest.c

    gcc -ggdb `pkg-config --cflags opencv` -o `basename opencvtest.c .c` opencvtest.c `pkg-config --libs opencv`

    ./opencvtest



### C++


**Load images in C++**

    #include<opencv2/highgui/highgui.hpp>
    using namespace cv;
    
    int main()
    {
    
        Mat img = imread("/home/jay/Pictures/python.jpg",CV_LOAD_IMAGE_COLOR);
        imshow("opencvtest",img);
        waitKey(0);
    
        return 0;
    }


To compile C++ program,
Let's assume the file is opencvtest.cpp

    $ g++ -ggdb `pkg-config --cflags opencv` -o `basename opencvtest.cpp .cpp` opencvtest.cpp `pkg-config --libs opencv`

    $ ./opencvtest

**Note: Always include OpenCV header files in C and C++ as**

    
    #include "opencv2/core/core_c.h"
    #include "opencv2/core/core.hpp"
    #include "opencv2/flann/miniflann.hpp"
    #include "opencv2/imgproc/imgproc_c.h"
    #include "opencv2/imgproc/imgproc.hpp"
    #include "opencv2/video/video.hpp"
    #include "opencv2/features2d/features2d.hpp"
    #include "opencv2/objdetect/objdetect.hpp"
    #include "opencv2/calib3d/calib3d.hpp"
    #include "opencv2/ml/ml.hpp"
    #include "opencv2/highgui/highgui_c.h"
    #include "opencv2/highgui/highgui.hpp"
    #include "opencv2/contrib/contrib.hpp"




**Note: Never compile a file in the following manner.

    $ gcc -ggdb `pkg-config --cflags opencv` -o `basename opencvtest.c` opencvtest.c `pkg-config --libs opencv``
It will make your .c file to output file.


To avoid any problems like this, I have made a bash script to compile opencv programs.
**Making a Bash Script to Compile OpenCV:**

It's kind of boring typing all this stuff. So, I created a bash file to compile OpenCV programs.
Name it **.compile_opencv.sh** and keep it in your home directory.

    
    echo "compiling $1"
    if [[ $1 == *.c ]]
    then
        gcc -ggdb `pkg-config --cflags opencv` -o `basename $1 .c` $1 `pkg-config --libs opencv`;
    elif [[ $1 == *.cpp ]]
    then
        g++ -ggdb `pkg-config --cflags opencv` -o `basename $1 .cpp` $1 `pkg-config --libs opencv`;
    else
        echo "Please compile only .c or .cpp files"
    fi
    echo "Output file => ${1%.*}"




Add an **alias** in **.bashrc** or **.bash_aliases**

    alias opencv="~/.compile_opencv.sh"`**`****`

Open new terminal.

    $ opencv opencvtest.c
    $ ./opencvtest

### Python


**Loading images in Python**

    
    from cv2.cv import *
    
    img = LoadImage("/home/jay/Pictures/python.jpg")
    NamedWindow("opencv")
    ShowImage("opencv",img)
    WaitKey(0)

Run the program.

    $ python filename.py

P.S. Finals getting over soon. Excited to go home.
