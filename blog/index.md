---
layout: page
title: Blog
slug: blog
---
<ul class="block-list">
{% assign t = 1 %}
{% for post in site.posts %}
{% if post.category == 'Blog' %}
<li>
<a href="{{ post.url }}" class="block-list__link">
    <h2>{{ post.title }}</h2>
    <date class="date">{{ post.date | date_to_long_string }}</date> // <span class="tags">{{ post.tag }}</span>
</a>
{% if t <= 3 %}
<p>{{post.content | truncatewords:90}} <a href="{{post.url}}" class="go"> Read More</a></span><p/>
{% endif %}
</li>
{% assign t = t | plus:1 %}
{% endif %}
{% endfor %}
</ul>