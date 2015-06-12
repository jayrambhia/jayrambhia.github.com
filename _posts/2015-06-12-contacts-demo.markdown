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

{% gist jayrambhia/ab3029a9ece2be50ced4 activity_contacts_layout.xml %}


#### CollapsingToolbarLayout : 

scrollFlags - `scroll`, `enterAlwaysCollapsed`, `enterAlwyas`

`scroll` - this flag should be set for all views that want to scroll off the screen - for views that do not use this flag, they’ll remain pinned to the top of the screen.

We need the view to scroll off the screen as the scrolling view scrolls up.

`enterAlwaysCollapsed` - When your view has declared a minHeight and you use this flag, your View will only enter at its minimum height (i.e., ‘collapsed’), only re-expanding to its full height when the scrolling view has reached it’s top.

We need the view to enter as soon as upward scroll is detected. But we do not want it to be completely re-expanded.

`enterAlways` - this flag ensures that any downward scroll will cause this view to become visible, enabling the ‘quick return’ pattern

We need the view to enter as soon as upward scroll is detected.

NOTE : All of these definitions are taken from Android Developers blog.

#### Toolbar

scrollFlags - `scroll`, `enterAlways`

We need Toolbar to scroll off the screen and quickly return back if upward scroll is detected.

#### CardView - View that gets collapsed.

collapseMode - `pin`

`pin` ensures that the view itself stays pinned and gets cut out as its parent `CollapsingToolbar` is being collapsed.

#### LinearLayout - Layout that holds TabLayout and ViewPager

layout_behavior - `@string/appbar_scrolling_view_behavior` - This sets the behavior of the view with its siblings.

#### TabLayout

scrollFlags - `scroll`

We need the TabLayout to scroll up as scrolling view scrolls.

### Conclusion

This is it. You don't have to do anything else. Just set your layout properly, and everything is taken care of. Although there are few glitches that I noticed.

 - Even if the RecyclerView is empty, views still scroll.
 - If ViewPager is not initialized with Fragments, weird things happen and TabLayout shows at the bottom.
 
Here's a cool Youtube demo that I have put.

<iframe width="560" height="315" src="https://www.youtube.com/embed/DlVTRMte4qU" frameborder="0" allowfullscreen></iframe>

I have added some dumb and some meaningful code to it to show fragments, adapters, etc. I have also tried to retain states and instances of fragments so all of that code is also added. You can fork the GitHub Repository - [ContactsDemo](https://github.com/jayrambhia/contactsdemo)

### Credits

 - [CheeseSquare](https://github.com/chrisbanes/cheesesquare)
 - [AndroidTool](https://github.com/mortenjust/androidtool-mac) for Video and GIF.


