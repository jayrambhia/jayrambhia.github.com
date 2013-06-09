---
layout: page
title: My Notes
slug: notes
---
<ul class="block-list">
  {% for post in site.posts %}
  {% if post.category == 'Notes' %}
  <li>
    <a href="{{ post.url }}" class="link-complex">
      <h2>{{ post.title }}</h2>
      <date class="date">{{ post.date | date_to_long_string }}</date> // <span class="tags">{{ post.tag }}</span>
    </a>
  </li>
  {% endif %}
  {% endfor %}
</ul>