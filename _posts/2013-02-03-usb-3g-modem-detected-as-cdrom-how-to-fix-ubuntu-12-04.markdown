---
category: Blog
tag: Linux
comments: true
date: 2013-02-03 02:14:44
layout: post
slug: usb-3g-modem-detected-as-cdrom-how-to-fix-ubuntu-12-04
title: USB 3G Modem detected as cdrom, How to fix, Ubuntu 12.04
---

I wanted to put this post up few days ago but couldn't get time to write. After installing Ubuntu 12.04 with UEFI switched off, I switched GPU off. I was expecting WiFi problems but I didn't expect any problems with USB 3G modem. I plugged it in. It showed green and blue light which meant it was intitialized but I couldn't access it. I looked up on the net and got various solutions but none of them worked. My HUAWEI 3G USB modem was getting detected as cdrom. Weird!

I want to keep this post short. The soultion is even shorted.

Get your modem's vendor and product id.

    $ lsusb

Copy down the vendor and prodcut id.

![output of lsusb](/assets/images/usb)

Once you get your vendor and product id, you need to add that in the driver file.

    $ sudo su
    $ echo 12d1 1436 > /sys/bus/usb-serial/drivers/option1/new_id

Restart the network manager.

    $ sudo service network-manager restart

Or even reboot will work. Now replug your USB modem and wait for 20-30 seconds for it to intialize.

If still you're having some trouble, refer [this](http://askubuntu.com/questions/143989/3g-usb-modem-not-working-in-12-04).

P.S. Conducting a Python hackathon.
