---
layout: page
title: Home
slug: home
---
I am an Android Developer and an open source enthusiast. I have been an active contributor of open source framework for Machine Vision - [SimpleCV](http://simplecv.org/). I like to learn new things and this is where I post my ramblings.

I am an active freelancer so if you want to get in touch, <a href="mailto:jayrambhia777@gmail.com">say Hi!</a>.

<!--
Events
{% for post in site.posts limit:5 %}
{% if post.category == "Event"%}
- **[{{ post.title }}]({{ post.url }})**
{% endif %}
{% endfor %}
-->

### Articles
{% for post in site.posts limit:5 %}
{% if post.category == "Blog"%}
- **[{{ post.title }}]({{ post.url }})**
{% endif %}
{% endfor %}


### Notes
{% for post in site.posts limit:5 %}
{% if post.category == "Note"%}
- **[{{ post.title }}]({{ post.url }})**
{% endif %}
{% endfor %}

### Projects
{% for post in site.posts limit:5 %}
{% if post.category == "Project"%}
- **[{{ post.title }}]({{ post.url }})**
{% endif %}
{% endfor %}

