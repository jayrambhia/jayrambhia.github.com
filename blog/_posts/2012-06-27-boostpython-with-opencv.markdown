---
category: Blog
tag: Computer Vision
comments: true
date: 2012-06-27 16:15:06
layout: post
slug: boostpython-with-opencv
title: Boost::Python with OpenCV
---

In my previous post [Configuring Boost::Python and Hello Boost](http://jayrambhia.wordpress.com/2012/06/25/configuring-boostpython-and-hello-boost/), I have shown how to configure **Boost::Python**. I have managed to use OpenCV C++ with Python, using Boost::Python. I have been able to load and show an image successfully.



#### **OpenCV C++**:


First, write a simple function which will load and if required show an image using opencv. I have named it opencvtest.cpp
    
    #include<opencv2/highgui/highgui.hpp>
    using namespace cv;
    using namespace std;
    
    int load(string filename)
    {
    
        Mat img = imread(filename,CV_LOAD_IMAGE_COLOR);
        //imshow("opencvtest",img);
        //waitKey(0);
        return 1;
    }





#### **Wrapping**:


Wrap the above function using **Boost::Python**.
    
    #include<boost/python.hpp>
    using namespace boost::python;
    BOOST_PYTHON_MODULE(opencvtest)
    {
        def("load",load);
    }




Boost::Python wrapping is successfully done. I tried using bjam, but there were many complications. So, I am sticking to **make**.



#### **Makefile**:


    
    PYTHON_VERSION = 2.7
    PYTHON_INCLUDE = /usr/include/python$(PYTHON_VERSION)
    
    # location of the Boost Python include files and library
    
    BOOST_INC = /usr/include
    BOOST_LIB = /usr/lib
    
    # your filename here
    TARGET = opencvtest
    
    $(TARGET).so: $(TARGET).o
    	g++ -shared -Wl,--export-dynamic $(TARGET).o -L$(BOOST_LIB) -lboost_python -L/usr/lib/python$(PYTHON_VERSION)/config -lpython$(PYTHON_VERSION) -o $(TARGET).so `pkg-config --libs opencv` `pkg-config --cflags opencv`
    
    $(TARGET).o: $(TARGET).cpp
    	g++ -I$(PYTHON_INCLUDE) -I$(BOOST_INC) -fPIC -c $(TARGET).cpp



Notice **`pkg-config`** added in the Makefile.



> **$ make**



opencvtest.o and opencvtest.so binaries will be created.

Now, use the wrapper with Python.


#### **Python**:


    
    import time
    def timetest():
        image = "filename.jpg"
        t0 = time.time()
        from cv2.cv import LoadImage
        img = LoadImage(image)
        t1 = time.time()
        from opencvtest import load
        img2 = load(image)
        t2 = time.time()
        print "Time taken to load image using cv2.cv module:",
        print t1-t0
        print "Time taken to load image using boost wrapper:",
        print t2-t1
    
    timetest()



Notice the significant difference between run time span of both the methods.

Here's the complete [**gist**](https://gist.github.com/3003247).

Even I couldn't believe that I could easily wrap OpenCV functions using Boost::Python. Now, I am planning to use Boost::Python to wrap OpenTLD and make a python port as well as wrap some important and time consuming iterations, functions using boost so that run-time speed of [SimpleCV](http://simplecv.org/) can be increased.

P.S. Going to Hyderabad to meet my brother. This is going to be exciting.

