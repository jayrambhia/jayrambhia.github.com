---
layout: page
title: Archive
slug: archive
---

<div class="g one-whole">

{% for post in site.posts %}
{% unless post.next %}
<h3>{{ post.date | date: '%Y' }}</h3>
<dl class="split">
{% else %}
{% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
{% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
{% if year != nyear %}
</dl>
<hr class="rule rule--dashed" />
<h3>{{ post.date | date: '%Y' }}</h3>
<dl class="split">
{% endif %}
{% endunless %}
<dt class="split__title"><a href="{{ post.url }}" class="link-complex"><span class="link-complex__target">{{ post.title }}</span> <span class="highlight">[{% if post.category == "Blog" %}Blogpost{% elsif post.category == "News" %}Recent Events{% elsif post.category == "poetry" %}Poem{% elsif post.category == "talk" %}Talk{% endif %}]</span></a></dt>
<dd class="split__detail"><em>{{ post.date | date:"%d %b" }}</em></dd>
{% endfor %}
</dl>

</div>