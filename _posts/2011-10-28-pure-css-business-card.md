---
author: Aniket
title: Pure CSS Business Card
layout: post
type: post
category: notes
tags:
  - business card
  - CSS
  - pure
---
I remember it was 2-3 days back when I was talking to a friend, and he was making this design for his theme on tumblr.

From what he had made, it was lots of things, like his desk and he had a business card sort of thing on it. So, I asked him that was he going to use CSS to recreate it. And to that, he said that he’ll be using it as an image.

Because of what I saw, I got an idea to make something of this sort.

So, I’ll move ahead and show you the code of how to make this nifty **Pure CSS Business Card**.

Here goes the HTML for it.

    <div class="business-card">
    <header>
    ☆
    › Your Name ‹
    </header>
    <footer>
    <span class="contact-title">
    Contact Me
    </span>
    <ul>
    <li>Say hi at hello@your-domain.com</li>
    <li>your-domain.com</li>
    <li>(+91) 987-654-3210</li>
    </ul>
    </footer>
    </div>
    

And here is the simple CSS.

    /*-- The Card --*/
    @import url(http://fonts.googleapis.com/css?family=Monoton);
    @import url(http://fonts.googleapis.com/css?family=Kreon:400,700);
    .business-card {
    margin: 0 auto;
    position: relative;
    width: 500px;
    height: 300px;
    background: #488CC7;
    box-shadow: 0 0 10px #999;
    overflow: hidden;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    }
    .business-card .background-stripes {
    position: relative;
    background: #fff;
    }
    .business-card .background-stripes .stripe {
    position: absolute;
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-transform-origin: 100% 100%;
    -moz-transform-origin: 100% 100%;
    -o-transform-origin: 100% 100%;
    -ms-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
    box-shadow: 0 0 2px #999;
    }
    .business-card .background-stripes .stripe-1 {
    width: 250px;
    height: 40px;
    left: -100px;
    top: -60px;
    background: #eee;
    }
    .business-card header {
    text-align: center;
    position: relative;
    font-size: 3em;
    z-index: 999;
    font-family: 'Monoton';
    color: #222;
    text-shadow: 0 1px 0 rgba(255,255,255,0.25), 0 -1px 0 rgba(0,0,0,0.25);
    }
    .business-card footer {
    text-align: center;
    position: relative;
    bottom: -35px;
    font-family: 'Kreon';
    letter-spacing: 1px;
    }
    .business-card footer span.contact-title {
    background: rgba(255,255,255,0.5);
    margin-top: 20px;
    box-shadow: 0 0 2px #ccc, inset 0 0 0px #aaa;
    padding: 5px;
    }
    .business-card footer ul {
    list-style: none;
    padding: 0;
    }
    .business-card footer ul li {
    text-shadow: 0 1px 0 rgba(255,255,255,0.25), 0 -1px 0 rgba(0,0,0,0.25);
    }