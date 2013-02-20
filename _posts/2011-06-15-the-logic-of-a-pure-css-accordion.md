---
author: Aniket
title: The Logic of a Pure CSS Accordion
layout: post
type: post
category: notes
tags:
  - Accordion
  - CSS
---
You may have seen [this][1], or you might not have.

The logic behind making this was, I had seen an accordion on some site, it was a little different than what I have made (actually very different)

What happened in it was, when I hover on one element, it expanded but the width of the accordion remained the same. That accordion used jQuery, and I always try making things with **minimum or no jquery**. Its not like I’m against using jquery but I try avoiding it.

I sat for a couple of hours thinking how I can achieve it. But then there was no way I could link one CSS effect to change another element’s appearance (unless it’s contained in that element).

So, I thought, what if I can just make the display into something else, with the width changing and a scale effect but not inside it, rather giving it a feel as if it floats another level up :) Not very innovative, but that was the only thing I could think of for making it a **Pure CSS Accordion**.

I have used two pseudo selectors together to achieve the first-child and the last-child effects. What I have done is that I combined “:first-child” and “:last-child” with a “:hover”. If you use it properly, it can do wonders :D

This is all for this post. Tomorrow I begin work on a new CSS technique. Wait for it.

 [1]: https://developer.mozilla.org/en-US/demos/detail/pure-css-accordion/launch "Pure CSS Accordion"