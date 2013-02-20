---
category: Blog
tag: Python
comments: true
date: 2012-02-15 16:52:20
layout: post
slug: multithreading-in-pygtkgtk
title: Multithreading in pygtk/gtk+
wordpress_id: 319
categories:
- Daily Posts
- Python
- Technical
tags:
- gobject
- gtk
- GUI
- multiprocessing
- multithreading
- pygtk
- python
- twitter
---

I started making an application/desktop widget for twitter! I made this thing which I call "**tweetBox**"! It's just this widget/application written in python using pygtk/gtk+ for GUI, using which you can tweet! Only tweet!
It was easy. No messed up code. child's play.
Then I wanted an application which would also get the timeline. Okay so, I made it. Again! No big deal!
So, now the problem started. I did not want to add a button to get timeline. So I made an EventBox, and whenever mouse pointer moves out of the eventbox, it would fetch the timeline. Since BITS net is notorious for its slow connectivity and to add up to that, sometimes, twitter just stops responding to BITS public IP! Due to almost zero connectivity, I don't receive any data from twitter and my program is just stuck there. GUI hangs/crashes! And meanwhile, I don't know how many times mouse pointer must have came back and went out of the eventbox and it makes a loop to fetch data which I am never going to get!
To avoid this, I thought to use multiprocessing since as usual I thought gtk and multithreading don't go together!
Well, so after hours of hard work(yeah! coding is hard work and if your code just doesn't work then it's totally hard work!), I asked couple of question on Quora and stackoverflow and the answer just turned me upside down!
**[stackoverflow - How to modify a textview from a different process ?](http://stackoverflow.com/questions/9273476/how-to-modify-a-textview-from-a-different-process)**
Yeah, So, I found out that <del>gtk and multithreading don't go together!</del>
gtk and multithreading is the correct way.
So, After reading couple of blogs about gtk and multithreading, I made this GUI for application which I call "**twitterBox**" is working fine. Had some problems in the beginning, but now I'm quite comfortable with it.
**[Misconceptions about Multithreading and gtk](http://blogs.operationaldynamics.com/andrew/software/gnome-desktop/gtk-thread-awareness)**
<CONT>

<!-- more -->
From this blog, I found out that **all GTK calls must be made from main thread or to put it more appropriately all GTK calls must be made from the main Lock.**
And I was trying to make a different process and make GTK calls. Yeah! I'm insane. I know.
I learned a great deal of multithreading with pygtk/gtk+ from this blog
**[Toward a Secret Sky](http://unpythonic.blogspot.in/2007/08/using-threads-in-pygtk.html)**
It's nicely written and also explained in simple language!

I had to write all the tweets in the tweetview which is a gtk.TextView object using set_text(str) but since I was not in the main lock/thread, I could not do it. I could get text from the TextView using get_text(), but couldn't write.
After reading all these things, I finally made something which could do this. I used **gobject.idle_add()**.

    
    import pygtk
    pygtk.require('2.0')
    import gtk
    from threading import Thread
    import gobject
    gtk.gdk.threads_init()




Let's assume there is gtk.Window object and couple of gtk.HBox and gtk.VBox objects in it. And there is a gtk.TextView object

    
    self.eventbox = gtk.EventBox()
    self.eventbox.set_size_request(700,580)
    self.eventbox.connect('leave_notify_event',self.show_tweet)
    self.vbox.pack_start(self.eventbox, False, False, 2)
    self.eventbox.show()




here, vbox is just a gtk.VBox object (A vertical box) and I'm packing my event box in it.

    
    self.tweetview = gtk.TextView()
    self.tweetbuffer = self.tweetview.get_buffer()
    self.tweetbuffer.set_text('TwitterBoxnby:@jayrambhia')
    self.tweetview.set_editable(False)
    self.tweetview.show()
    self.sw.add(self.tweetview)




wherer sw is gtk.ScrolledWindow object. A scrollbar.

The eventbox in connected to show_tweet.

    
    def show_tweet(self, widget, data=None):
    	self.get_tweet_thread()
    
    def get_tweet_thread(self):
    	Thread(target=self.get_tweet).start()




so, get_tweet_thread() will create a new thread to execute get_tweet()

After getting tweets, to set text in tweetview, we need to use gobject.idle_add(), since The gobject.idle_add() function adds a function (specified by callback) to be called whenever there are no higher priority events pending to the default main loop.

    
    def get_tweet(self):
        ''' code to fetch timeline goes here
        After getting text, set text in tweetview
        '''
        gobject.idle_add(self.set_tweetview, tweet_str)




Now, gobject.idle_add() will add set_tweetview() function in the main loop and widget properties now can be changed.

    
    	def set_tweetview(self,text):
    		self.tweetbuffer.set_text(text)
    		return




Yeah, so, using something like this I made twitterBox. You can check it out on my github repo : [TwitterBox](https://github.com/jayrambhia/TwitterBox)

P.S. Multithreading and OAuth2 elude me!
