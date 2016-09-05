---
category: Blog
tag: Android
comments: true
date: 2016-09-02 23:00:00
layout: post
slug: android-viewpager-cards-1
title: ViewPager cards inspired by "viewpager class inspired by Duolingo"
---

[ViewPager cards inspired by Duolingo](https://rubensousa.github.io/2016/08/viewpagercards) is a great post where the developer has tried to replicate the behavior of the viewpager and cards. I really liked the idea so I wanted to give it a try. I found this design quite interesting -- [Weather App UI - Dribbble](https://dribbble.com/shots/2817827-Weather-App-UI) and thought of giving it a try. You may notice that the previous and the next cards are partially visible and the distance between each card is uniform. To achieve this in Android, we need to dive in some Math.

To begin with, I just added some `pageMargin` and set `pageWidth` in PagerAdapter. This worked but I could not see the previous view as the viewpager will scroll till the current view has reached to the left most part of the viewpager. So I needed something which would also show the previous view. `clipToPadding` should be used for that.

There are some basic things that we should get familiarized with before diving into the math.

 - To put some distance between each view in the viewpager, we need to use `pageMargin`.
 - To show previous and next views in the viewpager, we need to use padding and make `clipToPadding` false. Read more about `clipToPadding` [here](https://developer.android.com/reference/android/view/ViewGroup.html#attr_android:clipToPadding).

I started working on some basic equations to get the desired result for all the screens. I got an equation with three different variables which would be very difficult to configure. So I dropped the idea of `pageMargin` and set it as 1. The view used in ViewPager will be `match_parent` so that it automatically takes the width of 1 page.

    let x<sub>1</sub> = partial width of the previous view = partial width of the next view
    let x<sub>2</sub> = distance between two pages = pageMargin
    let w<sub>p</sub> = width of the page
    let W = width of the screen
    let P<sub>v</sub> = viewpager left padding = viewpager right padding

    2x<sub>1</sub> + 2x<sub>2</sub> + w<sub>p</sub> = W

To get the desired effect we need set to left and right padding to the viewpager and `clipToPadding` as false,

	w<sub>p</sub> = W - 2P<sub>v</sub>

Which gets us,

    P<sub>v</sub> = x<sub>1</sub> + x<sub>2</sub>

We can set x<sub>1</sub> and x<sub>2</sub> based on our requirements. With x<sub>1</sub> = 16dp and x<sub>2</sub> = 8dp, we get P<sub>v</sub> = 24dp. 