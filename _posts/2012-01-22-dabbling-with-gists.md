---
author: Aniket
title: Dabbling with gists
layout: post
type: post
category: notes
tags:
  - dabblet
  - patterns
---
For the last 3-4 days I have made a couple of gists using dabblet and to my surprise I have learnt a lot of things. Even though the things I have worked on are very basic but have helped me understand a couple of techniques.

## Background Patterns

The first thing I tried my hand at was CSS background patterns and I have been quite successful with working with them. Here’s are a few samples of what all I tried. I know they are not that impressive but are decent attempts.

_image missing_

What you see above was my first attempt and it turned out to be pretty decent. The code for it is really easy. Take a look at it.

    background: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,4,80,.5) 10px, rgba(255,4,80,.5) 20px),
    repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,4,80,.5) 10px, rgba(255,4,80,.5) 20px) #000;
    

Here is the [dabblet][2].

_image missing_

This one is a little more intricate than the previous one, but easy to understand.

    background-color: #000;
    background-image: repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255, 127, 0, 0.25) 50px, rgba(255, 127, 0, 0.25) 56px, transparent 56px, transparent 63px, rgba(255, 127, 0, 0.25) 63px, rgba(255, 127, 0, 0.25) 69px, transparent 69px, transparent 116px, rgba(255, 206, 0, 0.25) 116px, rgba(255, 206, 0, 0.25) 166px),
    repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255, 127, 0, 0.25) 50px, rgba(255, 127, 0, 0.25) 56px, transparent 56px, transparent 63px, rgba(255, 127, 0, 0.25) 63px, rgba(255, 127, 0, 0.25) 69px, transparent 69px, transparent 116px, rgba(255, 206, 0, 0.25) 116px, rgba(255, 206, 0, 0.25) 166px),
    repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(143, 77, 63, 0.25) 5px, rgba(143, 77, 63, 0.25) 10px),
    repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(143, 77, 63, 0.25) 5px, rgba(143, 77, 63, 0.25) 10px);
    

[Link][4]to the dabblet.

### The trick to understand background patterns

According to my understanding of background patterns from what I made and how I did it, it is an easy task. You start with repeating linear gradient and then you mention the angle of the gradient. After that you writing your gradients, whatever way you want to make them. In the checked pattern above I start with a blank strip (basically transparent) with a width of 50px. Then I give another color starting from 50px and end it at 56px. So, actually it’s a strip with width 6px. Then again a transparent strip and so on. This way we create multiple lines and then we replicate this in another direction.

## Smashing Magazine like menu

_image missing_

Checkout this [demo][6] I made replicating the new Smashing Magazine’s side menu.

The HTML goes like this.

    <ul class="mainlist">
        <li class="list">
            <a href="#" class="title">Title 1</a>
            <ul class="sublist">
                <li><a href="#">Link 1</a></li>
                <li><a href="#">Link 2</a></li>
                <li><a href="#">Link 3</a></li>
                <li><a href="#">Link 4</a></li>
            <!--<span class="hiddenSpellError" pre=""-->ul>
        </li>
        <li class="list">
            <a href="#" class="title">Title 2</a>
            <ul class="sublist">
                <li><a href="#">Link 1</a></li>
                <li><a href="#">Link 2</a></li>
                <li><a href="#">Link 3</a></li>
                <li><a href="#">Link 4</a></li>
            </ul>
        </li>
        <li class="list">
            <a href="#" class="title">Title 3</a>
            <ul class="sublist">
                <li><a href="#">Link 1</a></li>
                <li><a href="#">Link 2</a></li>
                <li><a href="#">Link 3</a></li>
                <li><a href="#">Link 4</a></li>
            </ul>
        </li>
    </ul>
    

And the CSS for it.

    @import url(http://fonts.googleapis.com/css?family=Open+Sans:400,700);
    
    a {
        display: block;
        text-decoration: none;
    }
    ul.mainlist {
    width: 300px;
    margin: 0 auto;
        font-family: 'Open Sans', sans-serif;
        list-style: none;
    }
    ul.mainlist li.list {
    margin: 0 0 20px;
    }
    ul.mainlist li a {
        margin: 0 30px 0;
        padding: 5px 50px;
        transition: all 250ms ease-in-out;
    }
    ul.mainlist li a:hover {
        background: rgba(255,255,102,1);
    }
    ul.mainlist li:hover a.title {
    border-color: rgba(229, 59, 44, 1);
    }
    ul.mainlist li a.title {
        color: #0af;
        text-transform: uppercase;
        font-weight: 700;
        letter-spacing: 0.25em;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        transition: all 250ms linear;
    }
    ul.mainlist li a.title:hover {
    color: #222;
    }
    ul.mainlist li ul.sublist {
        list-style: none;
        display: block;
        padding: 0;
    }
    ul.mainlist li ul.sublist li a {
        color: #666;
        display: block;
        transition: all 250ms ease-in-out;
    }
    ul.mainlist li ul.sublist li a:hover {
    color: #222;
    }
    

I am very pleased with the result of these menus and there are very high chances of me going for a similar design in some new project of mine.

## Buttons with 3 states

2 days back I made these [buttons][7]. The palletes are from [design-seeds.com][8]. I love the palletes over there and the colors are inspired from their website.

Along with making the buttons and adding a little animation to them, I incorporated another background pattern to the demo.  
Now, I plan to learn a little bit about radial patterns.

_image missing_

## Animation with Chrome Icon

And the last thing I tried yesterday was a little [animation][10] with the chrome icon inspired by [HTML5 – The Real Bleeding Edge][11].

_image missing_

The HTML markup for it.

    <img class="chrome" src="http://www.wowpedia.org/images/8/89/Chrome.png" />
    

And the simple animation.

    @-moz-keyframes rotate {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
    }
    img.chrome {
    width: 10%;
    -moz-animation: rotate infinite 1s linear;
    }
    img.chrome:hover {
    -moz-animation: rotate infinite 0.5s linear;
    }
    

Even you can try out these simple tricks and learn a great deal from them.  
Keep dabbling like crazy.

 [2]: http://dabblet.com/gist/1614813 "Very basic CSS pattern"
 [4]: http://dabblet.com/gist/1615419 "Checked CSS pattern"
 [6]: http://dabblet.com/gist/1614434 "Smashing Magazine like menu"
 [7]: http://dabblet.com/gist/1651486 "Buttons with 3 states"
 [8]: http://design-seeds.com/ "Design Seeds"
 [10]: http://dabblet.com/gist/1653014 "Animation with Chrome Icon"
 [11]: http://html5-demos.appspot.com/static/html5-therealbleedingedge/template/index.html "HTML5 - The Real Bleeding Edge"