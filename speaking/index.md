---
layout: page
title: Speaking
slug: speaking
---

<div class="g one-whole" markdown="1">

<p class="lead">You can take a look at my slides at <a href="https://speakerdeck.com/aniketpant">my Speaker Deck profile</a>. Also, you can <a href="https://github.com/aniketpant/presentations">fork my slides</a> here.</p>

<ul class="block-list text--center">
{% for post in site.posts %}
	{% if post.category == 'talk' %}
		<li>
			<a href="{{ post.url }}" class="link-complex">
				<span class="gamma">{{ post.title }}</span><br/>
				<span class="topic beta highlight link-complex__target">{{ post.topic }}</span><br/>
				<date class="date">{{ post.date | date_to_long_string }}</date> // <span class="place">{{ post.place }}</span>
			</a>
		</li>
	{% endif %}
{% endfor %}
</ul>

</div>