---
category: Blog
tag: 
comments: true
date: 2011-02-26 00:18:25
layout: post
slug: problem-1-solved
title: Problem 1 solved...
wordpress_id: 47
categories:
- Daily Posts
- Technical
tags:
- disabled
- linux mint
- Network management
---

It feels really great to solve a problem in Linux on your own that too for the first time !!  

I was having troubles connecting the network. Previously, it was working just great. But when I switched to Windows 7 and then back to Mint, I could not connect the network. :( I tried Windows 7 again and then Ubuntu, connection was fine. But no connectivity in Mint. Maybe it happened because earlier this evening BITS Internet as usual **gg**. I tried many different things. I went to Advanced System Hardware Settings and changed network management from NetworkManager 0.7 to wicd and then to fake net but nothing worked. I rechecked proxy settings. Even tried my great Airtel Mobile Internet but no use ! Then at last ... Like a lightning a thought struck to my mind "**Google**" ! And that was it. After trying few links, I found the solution !




[Solution on kde forums](http://forum.kde.org/viewtopic.php?f=18&t=89863)




So whenever you find that your network manager is disabled, you must try this. And remember to change the properties of **NetworkManager.state** to writable via giving **ownership to user** in root actions.  

And set the value from false to true. And then reboot.  

Your problem will get solved !! :D  

That's all for now.  

Adios.  

P.S. I'm getting too much trouble in downloading packages due to authentication issues. So please help me out !!



