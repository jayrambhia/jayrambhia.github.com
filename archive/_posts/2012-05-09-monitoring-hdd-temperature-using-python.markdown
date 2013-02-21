---
category: Blog
tag: Linux
comments: true
date: 2012-05-09 20:42:56
layout: post
slug: monitoring-hdd-temperature-using-python
title: Monitoring HDD Temperature using python
---

I have an HP laptop. And if you have ever used an HP laptop, you must understand my situation. HP heats up a lot. There's no proper ventilation and heat sink. Despite of using a cooling pad, sometimes my laptop's core temperature reaches critical temperature value and shuts down. I think it's quite harmful. To avoid such situation, I always wanted something to measure the core temperature. One of my friends suggested me to use **lm-sensors**. It's not bad but it gives me temperature value only when do

    $ sensors

It's kind of irritating to do it constantly to check whether temperature is within range or not.

I wanted to make a python script which would check temperature every minute and warn me if it goes beyond acceptable limit. os.system() would never work. So, I kept looking for something which would give me temperature data. I found this [page.](https://bitbucket.org/tlynn/trypy/src/7796d8f4a8c1/munin-hddtemp.py)
It uses **hddtemp**. hddtemp sends data via socket **7643**(default) to **localhost**(default).
So, here's how I have worked it out.
    
    import socket
    import time
    import os
    
    port = 7634
    host = 'localhost'
    temp = 45
    
    os.system("notify-send "+"'checking hdd temp'")
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect((host,port))
    while True:
    	try:
    		data = s.recv(4096)
    		temp = int(data.split('|')[3])
    		if temp > 90:
    			notify_string = "'Critical Temp over 90 C."
    			os.system('notify-send '+notify_string)
    			time.sleep(60)
    		time.sleep(90)
    	except KeyboardInterrupt:
    		s.close()
    		break




**hddtemp**is a requirement. While configuring hddtemp, set it's port to 7634, which is default, or you can set it to anything you want. change it accordingly. And add it to the daemon. So that it starts at boot.

P.S. Screwed this sem's GPA.



#### Edit


I can't believe it that I never came across **popen2**. I feel so stupid now. Had I known earlier about popen2, I would have used it in many of my scripts. Anyway, better late than never.
So I found out about popen2. It's a good way to pipe the output of the command. Now, I can easily access the temperature without hddtemp. I pipe the output of lm-sensors to get temperature value.

    
    import popen2
    files = popen2.popen2("sensors")
    r = files[0].readlines()
    temp = int(r.split()[-4][1:3])            # unable to split using ""
    print temp

Read more about popen2 http://docs.python.org/library/popen2.html

P.S. I am so embarrassed. How could I not know about popen !

#### Edit


[@JabbaLaci](http://ubuntuincident.wordpress.com/) just told me that popen2 has been deprecated since python 2.6 and suggested me to use subprocess. And also that there are some problems with output of hddtemp. I have changed it.
Using **subprocess**:
    
    import subprocess
    
    process = subprocess.Popen(["sensors"],shell=False,stdout=subprocess.PIPE)
    data = process.communicate()    # returns tuple
    temp = int(data[0].split()[5][1:3])
    print temp

Read more about subprocess and Popen http://docs.python.org/library/subprocess.html

P.S. TIL about TIL and subprocess with pipe.
