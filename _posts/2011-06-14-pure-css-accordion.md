---
author: Aniket
title: Pure CSS Accordion
layout: post
type: post
category: notes
tags:
  - Accordion
  - CSS
---
This is a simple accordion made by using Pure CSS.

The HTML markup goes like this:

    <ul>
     <li>
     <a href="#">Link#1</a>
     <span>
     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac felis risus, nec fringilla orci. Pellentesque mauris nisi, semper eu vestibulum a, dignissim non justo. Ut vitae metus in elit iaculis ultricies eu ut mi. Nulla sodales tellus ut arcu dapibus ornare.
     </span>
     </li>
     <li>
     <a href="#">Link#2</a>
     <span>
     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac felis risus, nec fringilla orci. Pellentesque mauris nisi, semper eu vestibulum a, dignissim non justo. Ut vitae metus in elit iaculis ultricies eu ut mi. Nulla sodales tellus ut arcu dapibus ornare.
     </span>
     </li>
     <li>
     <a href="#">Link#3</a>
     <span>
     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac felis risus, nec fringilla orci. Pellentesque mauris nisi, semper eu vestibulum a, dignissim non justo. Ut vitae metus in elit iaculis ultricies eu ut mi. Nulla sodales tellus ut arcu dapibus ornare.
     </span>
     </li>
     <li>
     <a href="#">Link#4</a>
     <span>
     Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac felis risus, nec fringilla orci. Pellentesque mauris nisi, semper eu vestibulum a, dignissim non justo. Ut vitae metus in elit iaculis ultricies eu ut mi. Nulla sodales tellus ut arcu dapibus ornare.
     </span>
     </li>
     </ul>
    



And the CSS for it is:

    #main {
    margin-top: 150px;
    }
    
    .accordion {
    margin: auto;
    list-style: none;
    max-width: 800px;
    text-rendering: geometricPrecision;
    font-family: 'Constantia';
    }
    
    .accordion li {
    float: left;
    padding: 20px;
    width: 100px;
    height: 175px;
    max-height: 200px;
    background: #659EC7;
    overflow: hidden;
    box-shadow: inset 0px 0px 10px #ccc, 0px 0px 10px #659EC7;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    }
    
    .accordion li:hover {
    width: 300px;
    background: #488AC7;
    box-shadow: 0px 0px 10px #488AC7;
    -webkit-transform: scale(1.2);
    -moz-transform: scale(1.2);
    transform: scale(1.2);
    -webkit-transition: all 0.6s ease-in-out;
    -moz-transition: all 0.6s ease-in-out;
    transition: all 0.6s ease-in-out;
    }
    
    .accordion li:first-child {
    -webkit-border-radius: 10px 0px 0px 10px;
    -moz-border-radius: 10px 0px 0px 10px;
    border-radius: 10px 0px 0px 10px;
    }
    
    <code>.accordion li:last-child {
    -webkit-border-radius: 0px 10px 10px 0px;
    -moz-border-radius: 0px 10px 10px 0px;
    border-radius: 0px 10px 10px 0px;
    }
    
    .accordion li:first-child:hover {
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
    border-radius: 0px;
    -webkit-transform: scale(1.2) rotate(-2deg);
    -moz-transform: scale(1.2) rotate(-2deg);
    transform: scale(1.2) rotate(-2deg);
    }
    
    .accordion li:last-child:hover {
    -webkit-border-radius: 0px;
    -moz-border-radius: 0px;
    border-radius: 0px;
    -webkit-transform: scale(1.2) rotate(2deg);
    -moz-transform: scale(1.2) rotate(2deg);
    transform: scale(1.2) rotate(2deg);
    }
    
    .accordion li a {
    display: inline-block;
    color: #fefefe;
    text-decoration: none;
    text-shadow: 0px 0px 1px #000, 0px 0px 1px #333;
    font-size: 20px;
    cursor: default;
    }
    
    .accordion .info {
    display: none;
    color: #FFF8C6;
    line-height: 22px;
    }
    
    .accordion li:hover &gt; .info {
    display: block;
    }

[View Demo][1]

 [1]: https://developer.mozilla.org/en-US/demos/detail/pure-css-accordion/launch "Pure CSS Accordion"