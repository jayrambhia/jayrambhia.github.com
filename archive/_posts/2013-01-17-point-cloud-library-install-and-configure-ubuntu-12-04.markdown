---
category: Blog
tag: PCL
comments: true
date: 2013-01-17 02:35:12
layout: post
slug: point-cloud-library-install-and-configure-ubuntu-12-04
title: Point Cloud Library - Install and Configure - Ubuntu 12.04
---

A **Point Cloud** is a set of vertices in a three-dimensional coordinate system. As OpenCV is used to work with two dimensional objects(images), PCL is used to work with three dimensional objects(3D space). Vertices usually represent X, Y and Z coordinates of the external surface of an object.

**[Point Cloud Library](http://pointclouds.org/)** is a comprehensive BSD open source library for n-D Point Clouds and 3D geometry processing. It has great [documentation](http://pointclouds.org/documentation/) and [developer support](http://dev.pointclouds.org/projects/pcl/wiki).



## **Install PCL**:


I tried to install PCL using apt-get but there were some issues with it. First of all, it was 1.0.6 version(which is very old). Second, I couldn't find any .pc file for pkg-config and last but not the least, it wasn't included anywhere. So I asked my friend, [Salil](http://salilkapur.wordpress.com/), who has worked with PCL before and he gave me the best solution.

    
    sudo add-apt-repository ppa:v-launchpad-jochen-sprickerhof-de/pcl
    sudo apt-get update
    sudo apt-get install libpcl-all




That's it. Add ppa and install it. Now I have the latest version of PCL and I didn't need to worry about all the dependencies especially libboost. I somehow broke it. So moving on to configuring PCL and compiling PCL code.



## **Compile PCL**:


I am not a big fan of cmake/make and despise it a lot. I like to compile codes using gcc or g++. 


### **Cmake**:


If you want to write CMakeLists.txt and compile your code using cmake, here is how to do it.
Copy the [code](http://pointclouds.org/documentation/tutorials/writing_pcd.php#writing-pcd) and save it as pcd_write.cpp in a folder.
In the same folder, create a file named CmakeLists.txt and copy the following.

    
    cmake_minimum_required(VERSION 2.6 FATAL_ERROR)
    find_package(PCL 1.6 REQUIRED)
    include_directories(${PCL_INCLUDE_DIRS})
    link_directories(${PCL_LIBRARY_DIRS})
    add_definitions(${PCL_DEFINITIONS})
    add_executable(pcd_write pcd_write.cpp)
    target_link_libraries(pcd_write ${PCL_COMMON_LIBRARIES} ${PCL_IO_LIBRARIES})




Now compile it using cmake.
    
    cmake .
    make




**$ ./pcd_write**

Now, moving on to my favorite part. Compiling it using gcc/g++.



### **gcc/g++**:


As I know how many files I need to include to compile OpenCV code, I always take precautions and use **pkg-config**. It's a life saver. Here's my thing. I write a bash script to compile code, save it, use an alias to call it every time I want to compile a code. I have done it for OpenCV. See [Beginning OpenCV](http://jayrambhia.wordpress.com/2012/05/08/beginning-opencv/).

I did the same for PCL. Except this time, it took me more time to find all the files as unlike OpenCV, PCL doesn't keep all the files intact. Each module is separate. Here's the file. Name it **.compile_pcl.sh** and save it in your home directory.

    
    echo "compiling $1"
    if [[ $1 == *.c ]]
    then
        gcc -ggdb -I/usr/include/pcl-1.6 -I/usr/include/eigen3 -o `basename $1 .c` $1 `pkg-config --libs pcl_apps-1.6 pcl_common-1.6 pcl_features-1.6 pcl_filters-1.6 pcl_geometry-1.6 pcl_io-1.6 pcl_kdtree-1.6 pcl_keypoints-1.6 pcl_octree-1.6 pcl_registration-1.6 pcl_sample_consensus-1.6 pcl_search-1.6 pcl_segmentation-1.6 pcl_surface-1.6 pcl_tracking-1.6 pcl_visualization-1.6 flann`;
    elif [[ $1 == *.cpp ]]
    then
        g++ -ggdb -I/usr/include/pcl-1.6 -I/usr/include/eigen3 -o `basename $1 .cpp` $1 `pkg-config --libs pcl_apps-1.6 pcl_common-1.6 pcl_features-1.6 pcl_filters-1.6 pcl_geometry-1.6 pcl_io-1.6 pcl_kdtree-1.6 pcl_keypoints-1.6 pcl_octree-1.6 pcl_registration-1.6 pcl_sample_consensus-1.6 pcl_search-1.6 pcl_segmentation-1.6 pcl_surface-1.6 pcl_tracking-1.6 pcl_visualization-1.6 flann`;
    else
        echo "Please compile only .c or .cpp files"
    fi
    echo "Output file => ${1%.*}"




Did you get what I was saying? I had to include each package separately. 
Give execution permission with
**$ chmod +x .compile_pcl.sh**
Add following line in your **.bash_aliases** (which will be in your home directory. If you don't have one, make one)
    
    alias pcl="~/.compile_pcl.sh"




Now, compile that code using your new alias.
**$ pcl pcd_write.cpp**
**$ ./pcd_write**

If for some reasons, you get an error saying 
**/usr/bin/ld: cannot find -lflann_cpp-gd**,

Edit **/usr/lib/pkgconfig/flann.pc** in superuser mode and remove **-lflann_cpp-gd**. This will work perfectly.

Well, now you don't need to write crappy CMakeLists.txt files everytime and use cmake and make and stuff. Start looking into some tutorials.

P.S. Diving into 3D visualization and tracking.

