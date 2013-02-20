---
author: Aniket
title: 'Code Igniter: Jquery Problem'
layout: post
type: post
category: notes
tags:
  - Codeigniter
  - Jquery
  - Problem
---
Yesterday, I was trying to run a jquery in my Code Igniter view and there was some problem.

It wasn’t working. I couldn’t figure out why. So I asked some friends of mine and they had no idea why it wasn’t working.

So, I posted on the CI forum. Here is the [link ][1]to my post.

Today, I was seeing a sample code and then I was something and everything was clear.

I had made the most idiotic error.

It should have been

    <script src="<?php echo base_url(); ?>public/js/jquery.js" type="text/javascript"></script>
    

rather than

    <script href="<?php echo base_url(); ?>public/js/jquery.js" type="text/javascript"></script>
    

I ended up wasting quite sometime because of this. After this, I realised that my Netbeans code template was written wrong :|

 [1]: http://codeigniter.com/forums/viewthread/194701/ "My Post"