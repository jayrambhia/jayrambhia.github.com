---
layout: page
title: Home
slug: home
---
<section class="g one-whole info-on-me text-cols--1 portable-text-cols--1 landmark" markdown="1">
Being a __paranoid android__, I believe in Open Source and have immense faith in the community. Developer of open source framework for Mahcine Vision - [SimpleCV](http://simplecv.org/).
If you want to talk to me, or hire me, or give me a thesis opportunity, drop me a <a href="mailto:jayrambhia777@gmail.com">mail</a>.

</section>
<section class="g one-half portable-one-whole" markdown="1">
**Read my latest Articles{% for post in site.posts limit:5 %}{% if post.category == "Blog"%}{% if post.tag == "Computer Vision"%}<br> <a href="{{ post.url }}">{{ post.title }}</a>{% endif %}{% endif %}{% endfor %}**
</section>

<section class="g one-half portable-one-whole" markdown="1">
**Read about my latest Events{% for post in site.posts limit:20 %}{% if post.category == "Event"%}<br> <a href="{{ post.url }}">{{ post.title }}</a>{% endif %}{% endfor %}**
</section>

<section class="g one-half portable-one-whole links">
	<h3>What would you like to track?</h3>
	<ul class="block-list">
		<li><a href="/archive" class="block-list__link">The Old Archives</a></li>
		<li><a href="/Blog/" class="block-list__link">Paranoid Android's Blog</a></li>
		<li><a href="/Me" class="block-list__link">Me</a></li>
	</ul>
</section>

<section class="g one-half portable-one-whole">
	<h3>What am I doing nowadays?</h3>
	<p>I am working on implementing statistical learning techniques to estimate and detect objects in visual based tracking as my project. Apart from this, I'm working as an intern at <a href="http://duceretech.com/">Ducere Technologies</a>. And obviously, playing Ultimate frisbee.</p>
</section>