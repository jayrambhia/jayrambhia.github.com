---
category: Blog
tag: Android
comments: true
date: 2015-06-12 17:00:00
layout: post
slug: contacts-demo
title: Dialer App with New Design Library
---

Android just released a new [Design Support Library](http://android-developers.blogspot.com.es/2015/05/android-design-support-library.html) which is very useful to create beautiful designs and animations (with older version compatibility) and that too without writing much boilerplate code.

## What's New

 - Navigation View
 - Floating Labels for EditText
 - Floating Action Button
 - Snackbar
 - Tabs
 - CoordinatorLayout
 
IMO, CoordinatorLayout is the best from all of these. 

## What is CoordinatorLayout?

[CoordinatorLayout](http://developer.android.com/reference/android/support/design/widget/CoordinatorLayout.html) is a super powered `FrameLayout`. CoordinatorLayout helps you define behavior of its children without getting your hands dirty. eg. Snackbar must not overlap the floating action button. To achieve this, add your FAB to `CoordinatorLayout` and inflate Snackbar in that layout. Coordinator will take care of the scroll/animation behavior for you.

### What else can CoordinatorLayout do?

CoordinatorLayout when implemented with **[AppBarLayout](https://developer.android.com/reference/android/support/design/widget/AppBarLayout.html)** can acheive Toolbar scroll behavior, Toolbar collapse behavior and some other funky stuff.

I was always fascinated by Lollipop's dialer app. It's collapsing toolbar with scroll behavior, tabs and viewpager. With the new design support library, I gave a shot to replicate that behavior. And I was so amazed that it all started fitting perfectly within hours. I could just imagine spending days working on the animation of each view and try to bind them together. But this just took few hours. Here's a demo.

![demo gif](https://raw.githubusercontent.com/jayrambhia/contactsdemo/master/images/demo1.gif)

### Breakdown

Studying the dialer app, I reached to following conclusions. 

 - It uses Collapsing Toolbar. 
 - Search View is a child of Toolbar. Toolbar scrolls off the screen when recyclerview in the bottom fragment is scrolled up. It also has behavior of quick return, i.e. As soon as it detects downward scroll, it will scroll down completely.
 - Last dialed contact view is collapsed linearly with the scroll. It re-expands to its original height only when the scrolling view has reached its top.

Let's get started with the layout.

### Layout

{% gist jayrambhia/ab3029a9ece2be50ced4  activity_contacts_layout.xml %}


#### CollapsingToolbarLayout : 

scrollFlags - `scroll` | `enterAlwaysCollapsed` | `enterAlwyas`

