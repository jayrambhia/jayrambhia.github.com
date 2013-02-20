---
author: Aniket
title: 'CSS3 Filters : Usage and Implementation'
layout: post
type: post
category: essays
tags:
  - CSS3
  - Filters
---
## Presenting..

CSS3 presents us with a new way to ramp up images (or any element as such).  
Presenting to you, **CSS3 Filters**. This is one hell of an addition to the current features we have.

Forget about making sprites to put in some effects on images, or adding a masking layer to make awesome features. Filters are all we needed and we have them now.

##### Attention: Just be careful when you play around with filters. They are under development.

## The Filters

##### Important: All filters will require vendor prefixes.

### grayscale(amount)

Simple to understand. Convert your images to grayscale.

    div { filter: grayscale(100%) }

### sepia(amount)

Add a vintage look to your images.

    div { filter: sepia(100%) }

### blur(amount)

You can now blur your images. No need to add a box-shadow to do the same thing (or even add a mask).

    div { filter: blur(1px) }

### saturate(amount)

You can even change the saturation of the image.

    div { filter: saturate(2) }

### invert(amount)

Invert an image by this simple line of code.

    div { filter: invert(100%) }

### hue-rotate(amount)

    div { filter: hue-rotate(90deg) }

### contrast(amount) & brightness(amount)

These do what you expect them to.

    div { filter: contrast(50%) brightness(50%) }

This will reduce the contrast and brightness of the image to 50%.

## Demo

I made a little [demo][1]. Here is the [gist][2].

## Resources

1.  One of the most elaborate articles on CSS3 filters : [Understanding CSS Filters – HTML5 Rocks][3]
2.  A tutorial by Nettuts+ : [Say Hello to CSS3 Filters][4]

 [1]: http://jsfiddle.net/aniketpant/xqRJf/embedded/result/ "Fiddle - CSS3 Filters"
 [2]: https://gist.github.com/2869497 "Gist: CSS3 Filters"
 [3]: http://www.html5rocks.com/en/tutorials/filters/understanding-css/ "Understanding CSS Filters - HTML5 Rocks"
 [4]: http://net.tutsplus.com/tutorials/html-css-techniques/say-hello-to-css3-filters/ "Say Hello to CSS3 Filters"