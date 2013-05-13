---
category: Blog
tag: Computer Vision
comments: true
date: 2012-05-02 15:35:28
layout: post
slug: install-opencv-2-3-1-and-simplecv-in-ubuntu-12-04-precise-pangolin-arch-linux
title: Install OpenCV 2.3.1 and SimpleCV in Ubuntu, Arch Linux
---

After screwing up my Ubuntu [see previous post](http://jayrambhia.com/blog/precise-pangolin-ubuntu-12-04-lts/) and also my Arch Linux, I installed Ubuntu 11.10 and upgraded to 12.04.

### **Ubuntu 12.04 LTS - Precise Pangolin**


**Install OpenCV 2.3.1**

    sudo apt-get install libopencv-*
    sudo apt-get isntall python-opencv
    sudo apt-get install python-numpy


That's it! OpenCV 2.3.1 is installed completely in Ubuntu 12.04 (Thanks for the package).

**Install SimpleCV**.

    sudo apt-get install python-pygame python-scipy
    sudo apt-get install python-setuptools
    sudo apt-get install ipython ipython-netbook # Not a necessity


[Download the latest SimpleCV version from GitHub](https://github.com/sightmachine/SimpleCV/).
Extract it and change the directroy.


    sudo python setup.py install

### **Arch Linux**


**Install OpenCV 2.3.1**

    pacman -S python2-numpy
    pacman -S opencv 2.3.1_a-4


**Install SimpleCV**.

    pacman -S python-pygame python2-scipy
    pacman -S python2-setuptools
    pacman -S ipython2 # Not a necessity

[Download the latest SimpleCV version from GitHub](https://github.com/sightmachine/SimpleCV/).
Extract it and change the directroy.

    sudo python2 setup.py install

P.S. GNOME shell 3.4 is quite neat.
