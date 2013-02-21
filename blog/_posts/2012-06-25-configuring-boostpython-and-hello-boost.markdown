---
category: Blog
tag: Computer Vision
comments: true
date: 2012-06-25 18:05:53
layout: post
slug: configuring-boostpython-and-hello-boost
title: Configuring Boost::Python and Hello Boost
---

In my recent blog posts, I have mentioned that python is quite slow and I need to find an option to increase run-time speed of my python port of OpenTLD. I need to extend Python with C++ and hence I was looking at all the available options. I have once used **swig bindings**. I can't say anything about it's performance, but it was kind of boring to use swig. I had to make few files and then compile and make. So I started looking at other options. **Python/C API** is good but you need to pass pointer reference, objects and sometimes it just becomes messy. I have never tried **Cython**. I might give it a shot. 

Moving on to **Boost::Python**. Python already provides an API for gluing together Python and C. Boost::Python is a wrapper for Python/C API. Using the Python/C API, you have to deal with passing pointers back and forth between Python and C, and worry about pointers hanging out in one place when the object they point to has been thrown away.
Boost:Python takes care of all of that and lets you write operations on Python objects in C++ in OOP style.

For example, using the Python/C API, to do the C++ equivalent of "y = object_x[i]", you might do:

`y = PySequence_GetItem(object_x, i);`

By contrast, in Boost::Python, you can just do:

`y = object_x[i];`

Boost:Python makes it very easy to export C++ classes into Python. Boost::Python is designed in such a way that users never need to use **PyObject***



#### **Configure Boost::Python on Ubuntu 12.04**:



This is the official page of Boost about configuring Boost::Python http://www.boost.org/doc/libs/1_41_0/libs/python/doc/building.html . I tried to follow that, but couldn't understand much. I visited pages of pyopencv and pyopencl on code.google.com, where I found a very easy way to install and configure Boost::Python.



> **sudo apt-get install libboost1.48-all-dev**



That's it. Boost::Python is install and automatically configured. It also require some bjam library, but it turns out that either it's available in libboost1.48-dev or it has been obsoleted. No problems there.



#### **Hello Boost**:


I have found this link very helpful in making hello world program using Boost::Python. http://www.shocksolution.com/python-basics-tutorials-and-examples/linking-python-and-c-with-boostpython/

Writing a **Hello World** program using Boost::Python.

Create a file named **hello_ext.c**
    
    char const* greet()
    {
        return "hello, world";
    }
    
    #include<boost/python.hpp>
    
    BOOST_PYTHON_MODULE(hello_ext)
    {
        using namespace boost::python;
        def("greet",greet);
    }




After making the C++ file, we need to make .so file. For that we need to make it.
Create a **Makefile**
    
    PYTHON_VERSION = 2.7
    PYTHON_INCLUDE = /usr/include/python$(PYTHON_VERSION)
    
    # location of the Boost Python include files and library
    
    BOOST_INC = /usr/include
    BOOST_LIB = /usr/lib
    
    # compile mesh classes
    TARGET = hello_ext
    
    $(TARGET).so: $(TARGET).o
    	g++ -shared -Wl,--export-dynamic $(TARGET).o -L$(BOOST_LIB) -lboost_python -L/usr/lib/python$(PYTHON_VERSION)/config -lpython$(PYTHON_VERSION) -o $(TARGET).so
    
    $(TARGET).o: $(TARGET).c
    	g++ -I$(PYTHON_INCLUDE) -I$(BOOST_INC) -fPIC -c $(TARGET).c




**Makefile** is ready. Now, make it and import hello_ext in python.



> **make**



    
    import hello_ext
    print hello_ext.greet()




**This python file has to be in the same directory as that of hello_ext.so**.
Or, you can copy hello_ext.so to /usr/local/lib/python2.7/dist-packages/



> **sudo cp hello_ext.so /usr/local/lib/python2.7/dist-packages/**



Now, since you have added **hello_ext.so**to PYTHON_PATH, you can **import hello_ext**.

So, Hello Boost done. I'll move on to classes and other stuff. Final goal: Using Boost::Python to port OpenTLD to python.

P.S. I'll be getting SimpleCV t-shirt and stickers in few days. yay.
