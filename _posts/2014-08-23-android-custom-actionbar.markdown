---
category: Blog
tag: Android
comments: true
date: 2014-08-23 14:00:00
layout: post
slug: android-custom-actionbar
title: Custom Actionbar Layout in Android
keywords: [android development, android actionbar tutorial, sherlock actionbar, android toolbar, android custom layout]
---

[ActionBar](http://developer.android.com/guide/topics/ui/actionbar.html) is a very important part of Android. We can use it for our advantage. We needed certain customization in the actionbar and to do it easily we just made a desirable layout and changed the style of the actionbar.

### Design Layout

We just needed a simple actionbar with back button on the left, check button on the right and the title in the center. So we created a simple linear layout.

{% gist jayrambhia/a6b06d8ea225c1e57dac actionbar_layout.xml %}

<br/>

### Adding Custom Layout To ActionBar

Now, for each activity you can have different actionbar layouts. And it's really easy to set it up. In our case, we did this.

{% gist jayrambhia/a6b06d8ea225c1e57dac custom_actionbar.java %}
<br/>

That was easy. And it looked something like this.

![custom actionbar](/assets/images/custom_actionbar1.png)

P.S. More posts coming about the app.