---
category: Blog
tag: Linux
comments: true
date: 2013-01-28 16:12:07
layout: post
slug: ati-radeon-7670m-turn-off-gpu-ubuntu-12-04
title: ATI Radeon 7670M | Turn off GPU | Ubuntu 12.04
---

After spending hours trying to figure out how to beat secure boot and UEFI to install Ubuntu 12.04 LTS, I made peace with it and installed (dual boot) Ubuntu 12.04 LTS. And as expected, there has to be some or other glitches with firmware and drivers. My previosu laptop (which by the way I still use) didn't have a dedicated 2 GB GPU so there was never a problem of power consumption and heating up (in Ubuntu 12.04 LTS). A guy had posted a review on HP Envy 4 1025tx about Linux and had managed to tune GPU.

Ubuntu ships fglrx (native driver for ATI Radeon GPU) which is by far the most annoying and broken driver I have seen. It broke my UI. Thankfully I had installed GNOME, as it wrecks Unity UI. [Gemaraju Sree Teja Simha](http://www.facebook.com/sree.simha) advised me about this. He had warned me about Catalyst (software which Ubuntu provides for AMD GPUs) that it will wreck my GUI and that's what happened. It took me around an hour to revert back. Few fglrx packages were still present and were hindering **vga_switcheroo**. I removed every bit of it using synaptic package manager.

**Hybrid Graphics**:
Ubuntu provides **vga_switcheroo** which is a kernel mechanism which allows you to switch between GPUs if your machine has a hardware mux. Some laptops come with two graphics cards: one for use in applications that require a lot of computing power and other that is less powerful, but conserves energy, called the integrated GPU. The integrated GPU is often embedded in the CPU, hence the name. This concept is called Hybrid Graphics.

**Manually Turn OFF GPU**:
    
    sudo su
    echo DIS>/sys/kernel/debug/vgaswitcheroo/switch
    echo OFF>/sys/kernel/debug/vgaswitcheroo/switch
    echo IGD>/sys/kernel/debug/vgaswitcheroo/switch
    echo ON>/sys/kernel/debug/vgaswitcheroo/switch




**echo OFF > /sys/kernel/debug/vgaswitcheroo/switch** turns off that is currently disconnected.
open **/sys/kernel/debug/vgaswitcheroo/switch** file and check whether this has worked or not. For DIS, instead of "**Pwr**", "**Off**" should appear. 

![vga_switcheroo](/assets/images/GPU-1.png)

This means that you have successfully turned your GPU off. Now you should restart the UI. Go to tty01 (ALT+CTRL+F1). Log in. sudo service lightdm restart. For some reasons, my laptop doesn't go any furhter, so I reboot. And it works. GPU is turned off. Now I get to enjoy 6+ hours of battery.

Read more about Hybrid Graphics on [Ubuntu's Community page](https://help.ubuntu.com/community/HybridGraphics).

P.S. Had an amazing week at Design Innovation workshop by MIT Media Lab with PESIT. A blog post coming soon.


