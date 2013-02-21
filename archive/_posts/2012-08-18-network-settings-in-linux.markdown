---
category: Blog
tag: Linux
comments: true
date: 2012-08-18 02:51:48
layout: post
slug: network-settings-in-linux
title: Proxy settings in Linux
---

When [BITS Goa](http://www.bits-pilani.ac.in/goa/index.aspx) adapted [LDAP authentication](http://en.wikipedia.org/wiki/Lightweight_Directory_Access_Protocol), I had some problems configuring the proxy settings for apt-get. Many of my batchmates and juniors have faced similar problems so I decided to write a small blog post about it.

To set the System Proxy Settings, you can either change it using Network Proxy Settings GUI, or via terminal.

    
    export http_proxy=http://proxy:port/
    export https_proxy=https://proxy:port/


Users who have LDAP or some other authentication, Network Proxy Settings won't work for them. Proxy need to be exported manually.

    
    export http_proxy=http://username:password@proxy:port/
    export https_proxy=https://username:password@proxy:port/


You need to do this every time you log in. To avoid this, just open up your **.bashrc** file home directory and put the above **export** commands in it. **.bashrc** is executed every time you start a terminal.

To download something using apt-get or Software Center, you need to change the proxy settings in **apt.conf** file.
    
    cd /etc/apt/

Open up **apt.conf** file with admin permission(i.e. sudo). Delete or comment everything that's written in the file. Add following lines in apt.conf file.
    
    Acquire::http::proxy "http://username:password@proxy:port/";
    Acquire::https::proxy "https://username:password@proxy:port/";
    
If you're from BITS Goa, there's an internal repository set up for Ubuntu/Debian packages. So, you just need to add the following line and delete/comment everything else in apt.conf file.

    Acquire::http{Proxy "http://10.1.1.224:3142";};
    
P.S. GSoC is over. w00t.
