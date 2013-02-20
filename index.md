---
layout: page
title: Home
slug: home
---
<section class="g one-whole info-on-me text-cols--2 portable-text-cols--1 landmark" markdown="1">
Three of my tools are Codeigniter, Laravel and WordPress. But there is another power that I have which allows me to think of great application architectural designs. Other than that I _love to speak_ at events and occasionally _write poetry_.

If you wish to consult me for any project, or if you want me to [speak](/speaking) at an event, say <a href="mailto:me@aniketpant.com">hello</a>.

{% for post in site.posts limit:1 %}
**Read my latest {% if post.category == "notes" %}note{% elsif post.category == "essays" %}essay{% elsif post.category == "poetry" %}poem{% elsif post.category == "talk" %}talk{% endif %} &mdash; <a href="{{ post.url }}">{{ post.title }}</a>{% endfor %}**
</section>

<section class="g one-half portable-one-whole links">
	<h3>Where would you like to teleport to?</h3>
	<ul class="block-list">
		<li><a href="/archive" class="block-list__link">The Old Archives</a></li>
		<li><a href="http://markmyword.in" class="block-list__link">Mark My Word Conference</a></li>
	</ul>
</section>

<section class="g one-half portable-one-whole">
	<h3>What am I doing nowadays?</h3>
	<p>Nowadays I am working full time as the Curator of <a href="http://markmyword.in">Mark My Word</a> which is India's First Content and Design Conference scheduled to happen on Feb 2, 2013.</p>
</section>

<section class="g one-whole recent-posts">
	<h3>Take a look at my last few posts</h3>
	<dl class="split">
		{% for post in site.posts limit:5 %}
			<dt class="split__title"><a href="{{ post.url }}">{{ post.title }}</a></dt>
			<dd class="split__detail"><em>{{ post.date | date:"%d %b" }}</em></dd>
		{% endfor %}
	</dl>
</section>