---
author: Aniket
title: Lessons learnt from building TEDxBITSGoa 2012
layout: post
type: post
category: essays
tags:
  - TEDxBITSGoa
---
## How it all began?

It all started with a call. Nearly two months have passed when I was called by one of my college seniors and told about making the website for [TEDxBITSGoa 2012][1]. The moment I heard it, ideas filled me up and soon we were discussing how the site should look.

A month passed and it was November then. I was done with the site and it was done using static HTML pages.

## The perilous path

The problem which kept bugging me was that I had to post multiple speaker profiles and each speaker had one page. There were two ways to proceed on. One was to use CodeIgniter and make a custom CMS for it. And the other one was using WordPress, customizing it to my needs and get done with the work.

I ditched both of the ideas and planned that I would think of something when I will have to make those pages, because till then we needed only 4 static pages.

Soon, November was gone and late December, during my college’s winter vacation, I was asked to create a blog too.  
Being short of time, I was left with only one way. I had to build the website using WordPress.

## Work in progress

It took me two days (or was it three) to make up my mind about what all I would do.

Soon I had started and asked one of my friends about Custom Pages. I had seen the term so many times, had seen people using it but never bothered to learn it.  
It wasn’t a tough thing, and turned out to be identical to making a simple web page. I created a blank template for all my pages. And I made a post type for speaker which I would use to put in the data for each one of them. Next thing in line was a custom archive page. Made that and my website was ready.

## The challenge

The website was good to go by then but there were still some problems with it. I was using [Bones][2] as my framework (it’s my favorite).  
There were two major differences in the blank template I was using and what bones uses.

My template used 960.gs and reset.css. And Bones uses a custom version of 960.gs and normalize.css.  
These two things were enough to make me go wonky for a couple of days. Initially I left them as they were and went ahead with some other styling and layout changes. But I was sure of one thing, that one day I will have to make everything clean and similar.

A couple of days later, I sat down, decided what was required and started with the changes. To be frank they were not that difficult and in the end, I was done with 2 files and was left with using Bones the way it was. Earlier I had made my new theme devoid of Bones even though my theme was a child theme and I felt more and more guilt with each passing day. It was because I had committed a grave sin, by removing the existence of my parent theme.

Soon, everything was normal. But this normal part was like *the calm before the storm*.  
The biggest problem came then and I had to put an image slideshow. On hearing it I began testing multiple plugins. The first one which went under my scanner was NextGen. It is supposed to be one complete package for all such needs of yours, but to my disappointment, it didn’t work. Next was Orbit and it failed too.

After about 15 tires or so, I gave up and ended up using [Simple Slideshow][3] on my dad’s suggestion. It worked perfectly and integrated well. I am happy with it as of now. But I would be really glad to know the reason for the failure of Next Gen.

## The lessons learnt

1.  Never try destroying a parent theme.
2.  Create things which are reusable.
3.  Check for compatibility issues.
4.  Some things are sometimes hyped.
5.  Simplicity matters.

> I had a great time building the website. Learnt a lot of things that I have started including in my new projects.

On a brief note, there were quite a lot of new CSS tricks that I used.  
I am using **Web Symbols** font for the twitter and facebook icons on the left and using CSS animations on the right (that one is not working on webkit somehow)

If you like my post, please upvote on HN. Here’s the [link][4] to the discussion.

 [1]: http://tedxbitsgoa.com/2012/ "TEDxBITSGoa 2012"
 [2]: http://themble.com/bones/ "Bones Framework"
 [3]: http://wordpress.org/extend/plugins/simple-slideshow/ "Simple Slideshow - Plugin for WP"
 [4]: http://news.ycombinator.com/item?id=3475526 "HN Discussion: Lessons learnt from building TEDxBITSGoa 2012"