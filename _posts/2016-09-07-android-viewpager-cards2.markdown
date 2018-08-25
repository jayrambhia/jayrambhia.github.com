---
category: Blog
tag: Android
comments: true
image:
 twitter: /assets/images/android_blur_img1.png
 facebook : /assets/images/android_blur_img1.png
 height: 270
 width: 180
date: 2016-09-02 23:00:00
layout: post
slug: android-viewpager-cards-2
title: ViewPager Animations
description: Meaningful UI and animations with Android ViewPager - Let's make ViewPagers fun! After adding the transformations, let's add some animations to the ViewPager elements. These animations will make your app stand out in the crowd.
keywords: [android, android development, androiddev, dev, viewpager cards, android card, android ui, duolingo, viewpager animation, transitions, blur bitmap]
series: android-ui
series_title: Animate your ViewPagers
series_description: When it comes to animations, android apps are significantly behind the curve compared to iOS apps. Despite the great work from Google in the material design and animations, we don't see much animation in android apps. In this article, I show how adding meaningful animation to your ViewPager contents can make your app stand out.
---

Meaningful transitions and animations makes the UI more elegant. Now, I'm no UI expert but I can say when I like a thing better than the other. Well, this post is about that. Adding animations is good but adding intuitive animations is better. In the previous post, I talked about view position in ViewPager - [ViewPager cards inspired by "ViewPager class inspired by Duolingo"](/blog/android-viewpager-cards-1).

Let's take the same example and add some in and out animations based on actions. When the data is available, we'll show that cards are entering from the bottom and when the user presses back, cards go back to the bottom of the screen.

### Animations

{% gist jayrambhia/16f92f6d5e644ea8c365c381a816a94b CustomAnimationUtils.java %}

Our strategy is to show that view is coming from bottom of the screen and fixes at its position. Initially, we'll set `translationY` to a high value so that we do not have to worry about long screens or tablets. Next, we want to animate `translationY` property and get it to 0. We should specify duration and interpolator by some trial and error and see which fits the best.

With our helper methods, animation call is just one line code.

{% gist jayrambhia/16f92f6d5e644ea8c365c381a816a94b SimpleAnimations.java %}

Animate In                  |  Animate Out
:-------------------------:|:-------------------------:
<img alt="viewpager animate in" title="Animate in ViewPager items" src="/assets/images/viewpager-card2-gif1.gif"/>  |  <img alt="viewpager animate out" title="Animate out ViewPager items" src="/assets/images/viewpager-card2-gif2.gif"/>

Simple. Works well. But we can do better.

It would be better if we could animate each page differently so that it would look like second page came after the first page. To achieve this, we need those views. In my code, I have modified my `PagerAdapter` to store the views based on the index. I think you could simply do `ViewPager.getChildAt(0)` to get the first view. So once we get the first and second view, we can make the second view come in a bit late.

The same can be performed for animating out.

{% gist jayrambhia/16f92f6d5e644ea8c365c381a816a94b IndieAnimations.java %}

Animate In                  |  Animate Out
:-------------------------:|:-------------------------:
<img alt="viewpager animate in" title="Animate in ViewPager items" src="/assets/images/viewpager-card2-gif3.gif"/>  |  <img alt="viewpager animate out" title="Animate out ViewPager items" src="/assets/images/viewpager-card2-gif4.gif"/>

I'm sure there are much better animations and transitions that we can implement. Well, this is just a start.

P.S. I should study [Google's guidelines for Motion](https://material.google.com/motion/material-motion.html) and [Movement](https://material.google.com/motion/movement.html#movement-movement-in-out-of-screen-bounds) in particular.
