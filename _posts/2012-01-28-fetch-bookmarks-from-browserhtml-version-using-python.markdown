---
category: Blog
tag: 
comments: true
date: 2012-01-28 02:45:39
layout: post
slug: fetch-bookmarks-from-browserhtml-version-using-python
title: Fetch bookmarks from browser(html version) using Python
wordpress_id: 260
category: Blog
tags:
- beautifulsoup

- bookmark

- browser

- html

- python

---

**Tags** : **Python**, **BeautifulSoup**, **bookmark**, **browser**, **html**


# [bookmark.py gist](https://gist.github.com/1690395)


[Priyans Murarka](http://twitter.com/priyansm) was having troubles managing his bookmarks. He wanted to keep all the bookmarks from all the browsers from all the OSes in one place. So, I suggested him to use [rowz](http://rowz.in/) . It's a really good website to keep your bookmarks at one place and also you can view others' bookmarks also. Recently, they added a new feature, using which one could import the bookmarks from the browser. What they do is they ask you to export your bookmarks in an HTML file and upload it on the site. So, I see an HTML file, and all I can think of is **BeautifulSoup**. So, I open the HTML file. And.. OK! it's damn easy!
**Importing Modules**

    
    from BeautifulSoup import BeautifulSoup
    import time




<!-- more -->



Get the HTML file for the bookmark.
Go to Browser > Bookmarks > Show All Bookmarks > Import and Backup > Export Bookmarks to HTML
Save the HTML file.
All the bookmark details are given in a <dt> tag. So just parse the HTML with BeautfulSoup, look up for <dt> and get relevant information.
**Fetching Bookmark details**

    
    f = open('bookmarks.html','r')
    soup = BeautifulSoup(f.read())
    f.close()
    
    dt=[]
    for d in soup.findAll('dt'):
      dt.append(d)
    
    for i in range(len(dt)):
      if dt[i].contents[0].has_key('href') and dt[i].contents[0].has_key('add_date'):
        uri =  dt[i].contents[0]['href']
        title = dt[i].contents[0].contents[0]
        add_date = time.ctime(int(dt[i].contents[0]['add_date']))
        last_modified = time.ctime(int(dt[i].contents[0]['last_modified']))




It's so simple doing anything in Python!
So, this has kind of a set back since an HTML bookmark file needs to be provided. I went to the Mozilla folder and checked few things up. I found out that firefox keeps few backup files for the bookmarks encoded in json! I never learned to use json! But then, today I learned it! It's easy! And, I have successfully managed to extract bookmark information from the backup files. I would post about it later as it needs a finishing touch.

P.S. Things are looking good and easy with Python!
