---
author: Aniket
title: >
  Hassled by Codeigniter but ended up
  writing a cool new code
layout: post
type: post
category: notes
tags:
  - Codeigniter
---
After months I am working on Codeigniter and I just found a cool new method which I didn’t think of before.

## The incredibly simple problem

The thing starts with modal windows. For my last project I was using modal windows for editing records.  
The place where I faltered was where the number of records on one page would go to a hundred or so. The method I was using was creation of that many modal windows on that page and calling the respective one.

So, take a case where I have 50 records on that page, then I will have that many modal windows created.

It not only sounds like a mess but also is one.

## The elegant solution

Solving this monster required nothing much other than one function and one view. That’s it!

All I was supposed to do was post a couple of value from the place where I was calling my modal and send them to my controller. Then I processed those values and called on a view. And inside that view I created the modal and wrote a simple ajax script for updating/editing the values.

## OMG! Another hitch

I encountered another worthless hitch on doing a post using $.post. Now, CI is quite awesome. If you have turned on a thing called as CSRF protection, then it will not allow you to POST anything which doesn’t contain a specific token.

The only way to go around it when using AJAX is by getting that value and passing that too via the $.post method.