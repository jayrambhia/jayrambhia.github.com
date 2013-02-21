---
layout: page
title: Blog
slug: blog
---

<div class="g one-whole" markdown="1">

<ul class="block-list text--center">
    {% assign t = 1 %}
    {% for post in site.posts %} 
        {% if post.category == 'Blog' %}
            {% if t <= 3 %}
                <li>
                <a href="{{ post.url }}" class="link-complex">
				<span class="gamma">{{ post.title }}</span><br/>
				<date class="date">{{ post.date | date_to_long_string }}</date> // <span class="tags">{{ post.tag }}</span>
			     </a>
                <span>{{post.content | truncatewords:100}} <a href="{{post.url}}" class="link-complex">Read More</a></span><br/>
                </li>
            {% else %}
                <li>
                <a href="{{ post.url }}" class="link-complex">
                <span class="gamma">{{ post.title }}</span><br/>
                <date class="date">{{ post.date | date_to_long_string }}</date> // <span class="tags">{{ post.tag }}</span>
                </a>
                </li>
            {% endif %}
        {% assign t = t | plus:1 %}
	{% endif %}
{% endfor %}
</ul>
</div>