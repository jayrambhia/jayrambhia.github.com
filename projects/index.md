---
layout: page
title: Projects
slug: projects
---

{% for post in site.posts %}
{% if post.category == 'Project' %}
<li><a href="{{ post.url }}" class="gamma">{{ post.title }}</a></li>
{% endif %}
{% endfor %}