---
layout: page
title: Blog
slug: blog
---

<div class="g one-whole" markdown="1">

<ul class="block-list text--center">
{% for post in site.posts limit:5%}
	{% if post.category == 'Blog' %}
		<li>
			<a href="{{ post.url }}" class="link-complex">
				<span class="gamma">{{ post.title }}</span><br/>
				<date class="date">{{ post.date | date_to_long_string }}</date> // <span class="tags">{{ post.tag }}</span>
			</a>
            <span>{{post.content | truncatewords:100}} <a href="{{post.url}}" class="link-complex">Read More</a></span><br/>
		</li>
	{% endif %}
{% endfor %}
{% for post in site.posts %}
    {% if forloop.index >= 6 %}
        {% if post.category == 'Blog' %}
            <li>
                <a href="{{ post.url }}" class="link-complex">
                <span class="gamma">{{ post.title }}</span><br/>
                <date class="date">{{ post.date | date_to_long_string }}</date> // <span class="tags">{{ post.tag }}</span>
                </a>
            </li>
        {% endif %}
    {% endif %}
{% endfor %}
</ul>

</div>