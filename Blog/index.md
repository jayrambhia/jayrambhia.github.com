---
layout: page
title: Blog
slug: Blog
---

<div class="g one-whole" markdown="1">

<ul class="block-list text--center">
{% for post in site.posts %}
	{% if post.category == 'Blog' %}
		<li>
			<a href="{{ post.url }}" class="link-complex">
				<span class="gamma">{{ post.title }}</span><br/>
				<span class="topic beta highlight link-complex__target">{{ post.topic }}</span><br/>
				<date class="date">{{ post.date | date_to_long_string }}</date> // <span class="tags">{{ post.tag }}</span>
			</a>
		</li>
	{% endif %}
{% endfor %}
</ul>

</div>