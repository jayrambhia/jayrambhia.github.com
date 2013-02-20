---
layout: page
title: Home
slug: home
---
<section class="g one-whole info-on-me text-cols--2 portable-text-cols--1 landmark" markdown="1">
Being a __paranoid android__, I believe in Open Source and have immense faith in the community. Developer of open source framework for Mahcine Vision - [SimpleCV](http://simplecv.org/).
If you want to talk to me, or hire me, or give me a thesis opportunity, drop me a <a href="mailto:jayrambhia777@gmail.com">mail</a>.

{% for post in site.posts limit:1 %}
**Read my latest {% if post.category == "Blog" %}Blogposts{% elsif post.category == "news" %}Articles{% elsif post.category == "poetry" %}poem{% elsif post.category == "talk" %}talk{% endif %} &mdash; <a href="{{ post.url }}">{{ post.title }}</a>{% endfor %}**
</section>

<section class="g one-half portable-one-whole links">
	<h3>Where would you like to track?</h3>
	<ul class="block-list">
		<li><a href="/archive" class="block-list__link">The Old Archives</a></li>
		<li><a href="http://jayrambhia.wordpress.com/" class="block-list__link">Paranoid Android's Blog</a></li>
	</ul>
</section>

<section class="g one-half portable-one-whole">
	<h3>What am I doing nowadays?</h3>
	<p>Nowadays I am working on implementing statistical learning techniques to estimate and detect objects in visual based tracking as my project. Apart from this, I'm working as an intern at <a href="http://duceretech.com/">Ducere Technologies</a>. And obviously, playing Ultimate frisbee.</p>
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