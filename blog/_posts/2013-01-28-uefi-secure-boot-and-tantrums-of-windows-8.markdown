---
category: Blog
tag: 
comments: true
date: 2013-01-28 15:20:57
layout: post
slug: uefi-secure-boot-and-tantrums-of-windows-8
title: UEFI, secure boot and tantrums of Windows 8
wordpress_id: 998
categories:
- Daily Posts
- Linux
- open source
- Technical
tags:
- '12.04'
- envy
- hp
- linux
- secure boot
- ubuntu
- uefi
---

I recently purchased a new laptop. As a HP fan, I was biased to buy some HP laptop and this piece of slim beauty caught my eye. [HP Envy 4 1025tx](http://www.flipkart.com/hp-envy-4-1025tx-sleekbook-3rd-gen-ci5-4gb-500gb-win7-hb-2gb-graph/p/itmdafk6vtvreq3z?pid=COMDAFK3KXAKBZZD&ref=e4f98a62-3628-4632-96cd-8749d73c8a57&srno=t_1&otracker=from-search&query=hp%20envy%204-1025tx%20sleekbook%203rd%20gen%20ci5%204gb%20500gb%20win7%20hb%202gb%20graph). It seemed compatible with Linux so it was a plus point. But since it was out of stock and I was reluctant to buy Asus or Lenovo (Dell is out of the question), I stuck to hp and bought [HP Envy 4 1104tx](http://www.flipkart.com/hp-envy-4-1104tx-ultrabook-3rd-gen-ci5-4gb-500gb-win8-2gb-graph/p/itmdesfqy5fbxn7f?pid=COMDESFPHP4TZVX9&otracker=from-search&srno=t_1&query=hp+envy+4-1104tx+ultrabook+%283rd+gen+ci5%2F+4gb%2F+500gb%2F+win8%2F+2gb+graph%29&ref=693de271-b319-4548-b122-eecf117d3d04). People ask me why I didn't but Envy 6. I never liked big laptop with big screens. 14 inches screen is perfect. I'm not going to list the specifications and stuff.

With the new laptop came Windows 8 (preinstalled). With preinstalled Windows 8 came **UEFI**, **Secure Boot** and other random tatnrums of Windows 8.

**UEFI**:

The Unified Extensible Firmware Interface (UEFI) is a specification that defines a software interface between an operating system and platform firmware. UEFI is meant as a replacement for the Basic Input/Output System (BIOS) firmware interface, present in all IBM PC-compatible personal computers.

A BIOS or Basic Input-Output System is the very first program that is executed once the system is switched on. After all the hardware has been initialized and the POST operation has completed, the BIOS executes the first boot code in the first device in the device booting list.

UEFI firmware does not support booting through the above mentioned method which is the only way supported by BIOS. UEFI has support for reading both the partition table as well as understanding filesystems. The commonly used UEFI firmwares support both MBR and GPT partition table.

Read more about UEFI.
1. [Wikipedia](http://en.wikipedia.org/wiki/Unified_Extensible_Firmware_Interface)
2. [Arch Linux wiki](https://wiki.archlinux.org/index.php/Unified_Extensible_Firmware_Interface)

**Secure Boot**:
The UEFI 2.2 specification adds a protocol known as Secure boot, which can secure the boot process by preventing the loading of drivers or OS loaders that are not signed with an acceptable digital signature. My laptop came with secure boot and I could only boot Windows 8.

**Windows 8**:
Windows 8 comes with something called as **fast boot**. This makes the boot very fast. Windows 8 doesn't really shut down, it just hibernates and hence it starts really fast. Plus, my laptop came with some Norton antivirus thing which hogs my internet. It was kind of difficult to figure out how to use Windows 8 for a couple of days. I don't know how that kid did it. I was using Windows 8 because I somehow couldn't install Ubuntu and I was desparate to install it.

**Ubuntu with UEFI**:
Latest releases of Ubuntu are shipped with UEFI support. They say Ubuntu 12.04 LTS doesn't really support UEFI but it worked for me. Ubuntu 12.10 has better UEFI support.

**Install Ubuntu 12.04 LTS**:
Restart your computer. Change the boot settings. Turn secure boot OFF (Disable) and keep legacy mode disabled. Get 64 bit 12.04 iso (32 bit iso won't work with UEFI). Use a better tool to make a LiveUSB. I tried UnetBootin 583 and it didn't work for me (neither 12.04 nor 12.10). I was cursing Microsoft for that but it turned out that there was some problem with bootloader. Got a LiveUSB of 12.04 from a friend. Installed it with the usual procedure. Voila! Ubuntu 12.04 on my new laptop.

P.S. Few more posts coming on MIT Media Lab Design Innovation Workshop, USB modem, wifi firmware, etc

