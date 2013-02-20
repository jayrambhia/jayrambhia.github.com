---
category: Blog
tag: Python
comments: true
date: 2012-04-27 23:48:37
layout: post
slug: precise-pangolin-ubuntu-12-04-lts
title: Precise Pangolin - Ubuntu 12.04 LTS
wordpress_id: 466
categories:
- Daily Posts
- Linux
- Technical
tags:
- arch linux
- linux
- precise pangolin
- ubuntu
---

**[Precise Pangolin](http://www.ubuntu.com/tour/en/)**, the long term support(LTS) version of Ubuntu, is released. As an ubuntu fanboy, I love to upgrade to new version ASAP. Every time I have tried to upgrade to a new version, I have faced many troubles and especially with GRUB and then I have to install complete new OS. I have been working on SimpleCV for a month now and I have a lot of important stuff going on, so I was hesitant to upgrade to 12.04.

After an hour, I started to upgrade my 11.10 to 12.04. I would like to add that I had already removed Unity from my Oneiric Ocelot. Well, let's face it. Unity is useless. I had GNOME3, lxde, openbox, and bunch of other stuff. Upgrading process took almost 3 hours or so. Meanwhile, I had talked to the AV unit guy so that I could get unrestricted internet connection for an hour in the evening as I had a google+ hangout with SimpleCV mentors and other students who also got selected for SimpleCV in GSoC 2012.

[caption id="attachment_469" align="aligncenter" width="300" caption="Precise Pangolin"][![](http://www.jayrambhia.com/blog/wp-content/uploads/2012/04/pango.jpg?w=300)](http://www.jayrambhia.com/blog/wp-content/uploads/2012/04/pango.jpg)[/caption]

Tried out everything and then removed everything except GNMOE. I didn't know that 12.04 had upgraded my GNOME 3.1 to GNOME 3.4. In the process, OpenCV 2.1 was replaced with Opencv 2.3.1. So, no python swig OpenCV bindings anymore. I started to upgrade GNOME from local ftp server, but it only added all those useless stuff like epiphany, gwibber, sudoku, etc. And when I thought it couldn't get worse, it changed my GRUB. After rebooting, I found out that my complete GNOME was changed for the worse. There is a close button in notifications! I don't want that. So, I removed GNOME. Reboot. And since then I am unable to boot Ubuntu. I am getting some error which says that unable to mount some disk (with UUID). If you know how to solve it, please let me know.

I tried using ubuntu fallback. But I think it's the worst one. You can't see what you are typing unless you hit return key. Network Manager was also removed, so couldn't install GNOME. Now, I am thinking of adding network to daemon and install gnome. But I would do it later (probably after my exams).

Panicked and anxious, I went back to Arch Linux. Installed google+ hangout plugin, OpenCV 2.3.1. And the best part is OpenCV 2.3.1 was added as a package in pacman. Just needed to isntall it. Tried python wrapper. worked. Finally some relief.

**
@[chait_bhatt](http://twitter.com/chait_bhatt): @[jayrambhia](http://twitter.com/jayrambhia) Hahaha. Your twitter timeline must read excited, exuberated, confused and finally, screwed :-P
**

Had a great hangout with Katherine, Anthony, Victor, Seunghoon, Vijay(Alas! he couldn't join). Mentors are really excited and supportive. I hope to have a great summer with SimpleCV.

P.S. It seems that I am back on Arch Linux.
