---
layout: page
title: Home
slug: home
---
I am an Android Developer and an open source enthusiast.

### Articles
{% assign posts = 0 %}
{% for post in site.posts %}
	{% if post.category == "Blog"%}
- **[{{ post.title }}]({{ post.url }})**<!-- -->
		{% assign posts = posts | plus: 1 %}
	{% endif %}
	{% if posts == 5 %}
		{% break %}
	{% endif %}		

{% endfor %}


### Notes
{% assign notes = 0 %}
{% for post in site.posts %}
	{% if post.category == "Notes"%}
- **[{{ post.title }}]({{ post.url }})**
		{% assign notes = notes | plus: 1 %}
	{% endif %}
	{% if notes == 3 %}
		{% break %}
	{% endif %}		

{% endfor %}

### Projects
{% assign projects = 0 %}
{% for post in site.posts %}
	{% if post.category == "Project"%}
- **[{{ post.title }}]({{ post.url }})**
		{% assign projects = projects | plus: 1 %}
	{% endif %}
	{% if projects == 3 %}
		{% break %}
	{% endif %}			

{% endfor %}

<br/>
