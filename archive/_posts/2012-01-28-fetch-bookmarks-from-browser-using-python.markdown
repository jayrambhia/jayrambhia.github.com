---
category: Blog
tag: Python
comments: true
date: 2012-01-28 13:28:19
layout: post
slug: fetch-bookmarks-from-browser-using-python
title: Fetch bookmarks from Browser using Python
---

### [bookmark_json.py gist](https://gist.github.com/1693109)

So, after making a python script for fetching bookmarks from the exported HTML files, I was wondering how to make it work automatically so that I don't need to give the HTML file every time. I started looking in firefox directory for some bookmark files which I could use. I found out that firefox keeps bookmark backups and they are encoded in json. I learned few things about json and started to write the script.
**Importing Modules**

    
    import json
    import os

Locate the directory in which the browser stores the bookmarks backup.

    
    directory = '/home/jay/.mozilla/firefox/qyrgphtu.default/bookmarkbackups' # bookmark backup directory
    if not os.path.isdir(directory):
      return
    for path, dirs, files in os.walk(directory):
    # If there are any other directory in the backup directory, we need to stop the process and get the backup files only
      if path == directory:
        break
    files = sorted(files) # sort all the backup files
    filename = files[-1] # Get the latest backup file
    file_path = os.path.join(directory, filename)
    f=open(file_path,'r')
    con = json.load(f) # Decode the file with json
    f.close()

It was all easy till here. No trouble getting the file. The next part was really time consuming.
It was difficult to find out how the bookmarks were stored in the file.
The main content had 4 children.

1. Bookmarks Menu

2. Bookmarks Toolbar

3. Tags

4. Unsorted Bookmarks

Bookmarks Menu has tags 'Mozilla Firefox', 'Ubuntu and Free Software links', and all the Unsorted bookmarks.
Bookmarks Toolbar has nothing substantial. It has 'Most Visited', 'Latest Headlines' which are not stored in the backup files.
Tags has all the subtags as it's children.
Unsorted Bookmarks has all the unsorted bookmarks as it's children.

    
    # Get Bookmarks Menu / Bookmarks toolbar / Tags / Unsorted Bookmarks
    con_list = con['children'] # this list will have all of the above mentioned things
    
    for i in range(len(con_list)):
      con_sub_list = con_list[i]['children']  # Access them individually
      for tags in con_sub_list:
        if tags.has_key('children'): # Accessing Tags # get tag list
          bookmarks = tags['children'] # get all the bookmarks corresponding to the tag
          if bookmarks:
            for bookmark in bookmarks: # Access each bookmark
              Tag = tags['title']
              uri = bookmark['uri']
              title = bookmark['title']
              dateAdded =  bookmark['dateAdded']
              # it gives a long int eg. 1326378576503359L
              add_date = dateAdded/1000000
              # The output of time.time() would be 1326378576.503359
              lastModified = bookmark['lastModified']
              # print date and time using time.ctime()
              modified_date = lastModified/1000000
        else:
            # Accessing Unsorted Bookmarks, etc
            # No need to access 'Recently Bookmarked', 'Recent Tags', 'Most Visited', 'Bookmarks Menu'
    
            if (tags['title'] != 'Recently Bookmarked'
                and tags['title'] != 'Recent Tags'
                and tags['title'] != 'Most Visited'
                and con_list[i]['title'] != 'Bookmarks Menu'):
    
              # Accessing Unsorted Bookmarks
              Tag = con_list[i]['title']
              title = tags['title']
              uri = tags['uri']
              dateAdded =  tags['dateAdded']
              add_date = dateAdded/1000000
              lastModified = tags['lastModified']
              modified_date = lastModified/1000000

Now, all the required information about bookmarks have been fetched. Now you can store it in database if you need. So using this script I can save all my bookmarks anytime!

Download the gist for complete code : **[bookmarks_json](https://gist.github.com/1693109)**

P.S. Yes! things are getting prettier and easier with Python!
