---
category: Blog
tag: 
comments: true
date: 2012-05-12 20:57:08
layout: post
slug: wireless-firmware-missing-in-linux
title: Wireless Firmware missing in Linux
---

It's been a year since I started using Linux. The first problem that I faced was my **Wireless Firmware** was missing. I never bothered to do anything about it until now. My brother installed a router at my place and to access the Internet, I had to install the missing firmware. I had tried doing this couple of times before, but couldn't find a solution.


###### 


I found this really helpful post on **Linux Mint Forums**. http://forums.linuxmint.com/viewtopic.php?f=53&t=89410

**Installing b43 Linux Wireless Driver:**

I read somewhere that to install b43 in Ubuntu, all you need to do is 
`**$ sudo apt-get install firmware-b43-installer`**
And it will take care of the rest. But that didn't work for me.
I found this on the above mentioned forum page.


> 
Download **http://dl.dropbox.com/u/10573557/b43_firmware/b43.zip**
Extract it.
Move the folder to **/lib/firmware**
`**$ mv b43 /lib/firmware`**
After moving the folder, do
`**$ sudo modprobe -v b43`**





###### 


This worked like a charm. Posting this using WiFi. 
Read more about b43 Linux Wireless Driver http://linuxwireless.org/en/users/Drivers/b43


###### 


P.S. I'm back home. Feels great.
