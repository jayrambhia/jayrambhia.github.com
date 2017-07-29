---
layout: page
title: Android
slug: android
---
{% for post in site.posts %}
{% if post.tag == "Android" %}
- #### [{{ post.title }}]({{ post.url }}) 
**[{{ post.category }}] | Posted on: {{ post.date | date_to_long_string }}** <!-- -->
{% endif %}
{% endfor %}