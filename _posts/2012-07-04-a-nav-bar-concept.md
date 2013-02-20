---
author: Aniket
title: A Nav Bar Concept
layout: post
type: post
category: essays
tags:
  - Animation
  - CSS3
---
I guess I saw this thing somewhere before but finally I am bringing it to life.

This is the starting point. Let’s just put out the HTML markup we will use to create this demo.

    <!-- The nav element starts here -->
    <nav>
      <!-- This list of links begin here -->
      <ul class='nav'>
        <li><a href='#'>Link 1</a></li>
        <li><a href='#'>Link 2</a></li>
        <li><a href='#'>Link 3</a></li>
        <li><a href='#'>Link 4</a></li>
      </ul>
      <!-- List of links end here -->
    </nav>
    <!-- End of the nav element -->
{:data-language="html"}    

So, let’s begin with the CSS code.

We will import, *Squada One*, the font we are going to use from the Google Webfonts API.  
And then we will create the basic look of the nav element.

    /* Importing the font family */
    @import url(http://fonts.googleapis.com/css?family=Squada+One);
    
    /* The Nav Element */
    nav {
      display: block;
      margin: 20px 0;
      background: #d23515;
      box-shadow: inset 0 0 0 2px #b32d12;
      border-top: 20px solid #c33113;
      border-bottom: 20px solid #c33113;
    }
{:data-language="css"}    

Then we will put together the styling for the list of links.

    /* Styling the list of links */
    .nav {
      margin: 0.333em 2em;
      padding: 0;
    }
    
    /* The li element which contains the links */
    .nav li {
      display: inline-block;
      transform: skew(-10deg);
    }
{:data-language="css"}    

And now it’s time to style the links.

    /* This is how the link will be done */
    .nav a {
      display: block;
      text-decoration: none;
      text-transform: uppercase;
      font-family: 'Squada One', sans-serif;
      font-size: 2em;
      color: #fff;
      background: #e94220;
      padding: 1em;
      box-shadow: 1px 1px 1px #b32d12;
      text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(255, 255, 255, 0.5);
      transition: all 100ms linear; /* Transitions set for each state */
    }
    
    /* So, let's change it on hover */
    .nav a:hover {
      background: #b32d12;
      text-shadow: 0 1px 0 rgba(0, 0, 0, 0.5), 0 -1px 0 rgba(255, 255, 255, 0.5);
    }
    
    /* And here's how it will look on clicking */
    .nav a:active {
      background: #222;
      transition: all 250ms linear; /* Increased the duration */
    }
{:data-language="css"}    

And now we are going to put in the finish touches with the most important part. **The animation.**

The keyframes look like this.

    @-keyframes flicker {
      0% {
        background: #e94220;
      }
      50% {
        background: #b32d12;
      }
      100% {
        background: #b32d12;
      }
    }
{:data-language="css"}

And let’s complete the whole act by fitting in the keyframes to the links.

    /* Animation queued in */
    .nav li a {
      animation: flicker 1 500ms linear;
    }
    
    /* A little delay for the first link */
    .nav li:nth-of-type(n) a {
      animation-delay: 500ms;
    }
    
    /* A little more for the second one */
    .nav li:nth-of-type(2n) a {
      animation-delay: 1000ms;
    }
    
    /* Some more coming in for the third link */
    .nav li:nth-of-type(3n) a {
      animation-delay: 1500ms;
    }
    
    /* And the last one comes last */
    .nav li:nth-of-type(4n) a {
      animation-delay: 2000ms;
    }
{:data-language="css"}

If you liked my post, then it would be great if you [upvote it on HN][1].And we’re done. Our little demo is ready.

  
If you’re looking for the complete code for it, [take a look at the gist][2].

[View Demo][3]

 [1]: http://news.ycombinator.com/item?id=4200316
 [2]: https://gist.github.com/3048534 "Gist: Funky Nav Bar"
 [3]: http://codepen.io/aniketpant/details/4/4