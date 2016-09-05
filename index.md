---
layout: page
title: Home
slug: home
---
I am an Android Developer and an open source enthusiast. I currently work at [Elanic](http://elanic.in/) and have previously contributed to open source framework for Machine Vision - [SimpleCV](http://simplecv.org/). This is where I post my ramblings.

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
{% increment posts %}
{% for post in site.posts %}
	{% if post.category == "Blog"%}
- **[{{ post.title }}]({{ post.url }})**<!-- -->
		{% increment posts %}
	{% endif %}
	{% if posts == 5 %}
		{% break %}

{% endfor %}


### Notes
{% increment notes %}
{% for post in site.posts %}
	{% if post.category == "Notes"%}
- **[{{ post.title }}]({{ post.url }})**
		{% increment notes %}
	{% endif %}
	{% if notes == 4 %}
		{% break %}

{% endfor %}

### Projects
{% increment projects %}
{% for post in site.posts %}
	{% if post.category == "Project"%}
- **[{{ post.title }}]({{ post.url }})**
		{% increment projects %}
	{% endif %}
	{% if projects == 3 %}
		{% break %}

{% endfor %}
<!-- - **[Lenx](http://lenxapp.com/)**
- **[Waeo](http://getwaeo.com/)** -->
