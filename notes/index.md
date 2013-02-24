---
layout: page
title: My Notes
slug: notes
---

<div class="g one-whole" markdown="1">

<ul class="block-list text--center">
{% for post in site.posts %}
    {% if post.category == 'Notes' %}
        <li>
            <a href="{{ post.url }}" class="link-complex">
                <span class="gamma">{{ post.title }}</span><br/>
                <date class="date">{{ post.date | date_to_long_string }}</date> // <span class="tags">{{ post.tag }}</span>
            </a>
        </li>
    {% endif %}
{% endfor %}
</ul>

</div>