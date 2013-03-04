---
layout: page
title: Projects
slug: projects
---

<div class="g one-whole" markdown="1">

<ul class="block-list text--center">
{% for post in site.posts %}
    {% if post.category == 'Project' %}
        <li>
            <a href="{{ post.url }}" class="link-complex">
                <span class="gamma">{{ post.title }}</span><br/>
            </a>
        </li>
    {% endif %}
{% endfor %}
</ul>

</div>