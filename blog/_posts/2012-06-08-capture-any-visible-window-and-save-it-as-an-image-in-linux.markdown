---
category: Blog
tag: Python
comments: true
date: 2012-06-08 16:57:51
layout: post
slug: capture-any-visible-window-and-save-it-as-an-image-in-linux
title: Capture any visible window and save it as an image in Linux
wordpress_id: 635
categories:
- Daily Posts
- Linux
tags:
- image
- import
- linux
- ubuntu
- x server
---

Out of nowhere, I found this out. I thought I was in IPython shell and I did **import cv2**. A crossbar showed up. So, I moved it around for a while and then clicked. Nothing happened. I did **import mftracker**. Again a crossbar showed up. When I clicked, nothing happened. After few moments, I realized I was in Terminal and not in IPython shell.

After few hours, I opened my home directory and found out that there were two images named cv2 and mftracker. It just struck me. I opened the terminal and once again -**$ import cv2 **. A crossbar showed up. I clicked on some other window, and that window got saved as an image.

**$ man import**


> 
       import  -  saves any visible window on an X server and outputs it as an
       image file. You can capture a single window, the entire screen, or  any
       rectangular portion of the screen.




So, to save any visible window as an image
**$ import foo.jpg**

P.S. **[pyOpenTLD](https://github.com/jayrambhia/pyOpenTLD) - Python port of OpenTLD. 60% complete.
