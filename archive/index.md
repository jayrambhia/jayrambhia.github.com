---
layout: page
title: Archive
slug: archive
---
{% for post in site.posts %}
{% unless post.next %}
### {{ post.date | date: '%Y' }}
{% else %}
{% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
{% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
{% if year != nyear %}
### {{ post.date | date: '%Y' }}
{% endif %}
{% endunless %}
- [{{ post.title }}]({{ post.url }})<!-- -->
{% endfor %}