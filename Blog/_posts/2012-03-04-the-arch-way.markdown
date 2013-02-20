---
category: Blog
tag: 
comments: true
date: 2012-03-04 00:28:32
layout: post
slug: the-arch-way
title: The Arch Way
---

May [**The Guide**](https://wiki.archlinux.org/index.php/Beginners%27_Guide) be with you
I was supposed to install gentoo for this gentoo gsoc thing, I started to read about gentoo installation and stuff. Made a bootable liveUSB and booted it. Not to mention that couple of times I couldn't boot. And once I formatted usb and was unable to detect. Lots of madness.

Booting from liveUSB was easy. I have installed ubuntu and mint many times but never tried gentoo. BAM! no option to install gentoo. Well,quite odd for ubuntu user. Looked up on net. Found out that i need to download stage 3 tarball and extract it and something something. Asked for help on DC mainchat. A third year guy replied. Talked with him for some time. He suggested to go for arch linux first. Use it for a month or so and then install gentoo.

So there I was! A usb stick with arch linux iso mounted, bootable, and ready to install. (Well that's what I thought)

So within few seconds, got first error. Couldn't start tty. Job turned off. And sent me to a recovery terminal. Spent too much time on that error.

Solution :
`
**# ln -sf /dev/sdb1 /dev/disk/by-label/ARCH_201108**
`

And yes, If you are looking for solutions regarding arch linux installation. I would highly recommend you go visit **[Beginner's Guide](https://wiki.archlinux.org/index.php/Beginners%27_Guide)**

Somehow managed to install arch linux with only boot and swap.

The next thing that I was expecting was a GUI. But it's Arch way. So no GUI. Just command terminal.
Okay. Now comes **the Arch Way!**
It took me 5-6 hours just to configure the network thanks to BITS net! ping doesn't work.
I had to change proxy in /etc/wgetrc as well as export http_proxy.
So network problem was settled. Unaware of all the problems ahead, I started following post installation part of Beginner's guide and did as it said. (Not exactly. I think I forgot to update the complete system)

I encountered problems regarding multilib repositories. How DUMB of me! I am using 32 bit Arch. Hence I wasn't supposed to add multilib. Took me couple of hours to figure that out. Next thing was gpg key. It was just a result of not following the guide properly. Forgot to generate gpg key **pacman-key --init** after upgrading to pacman 4.
During pacman-key --init, it shows computer needs more random bytes. Do something else meanwhile to generate some entropy. I mean what the heck is that about! But humorous though.
installed x11. Installed gnome3. Got couple of errors.
**
udev: /lib/initcpio/hooks/udev exists in filesystem
uedv: /lib/initcpio/install/udev exists in filesystem
**
So what do I do! Instead of upgrading, I deleted both files. Installed gnome. Worked properly. And Yay moment.
And then, I rebooted.
**BAM**
**error: unable to find root**
Yeah! So remember never ever delete any files, if you don't know it's significance.

I re-installed Arch Linux.
Did everything as given in the guide.
Took a lot of help from IRC. #archlinux
Got myself a nice gnome desktop environment running successfully and also an lxde environment for other user.
The key part for successful installation was **pacman -Syy** and upgrading stuffs.

So after 4 days of constant pain, achieved salvation through Arch Linux!

P.S. **If it's not the Arch way, it's the wrong way.**
P.P.S. And yeah, Ubutnu is Linux for human beings. Well so is Windows(not linux though). And I am hitchhiker!
