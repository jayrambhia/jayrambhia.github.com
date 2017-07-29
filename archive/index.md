---
layout: default
title: Archives
cover: false
---

<header class="main-header {% if page.cover %}" style="background-image: url({{ page.cover }}) {%else%}no-cover{% endif %}">
    <nav class="main-nav overlay clearfix">
            {% if page.logo %}
                <a class="blog-logo" href="{{ site.url }}">
                    <img src="{{ page.logo }}" alt="Blog Logo" />
                </a>
            {% endif %}
        <a class="back-button icon-arrow-left" href="{{ site.url }}">Home</a>
    </nav>
    <div class="vertical">
        <div class="main-header-content inner">
            <h1 class="page-title">Archives</h1>
            <h2 class="page-description">
                Welcome to the archives! Here you can find all the posts in chronological order.
            </h2>
        </div>
    </div>
    <a class="scroll-down icon-arrow-left" href="#content" data-offset="-45"><span class="hidden">Scroll Down</span></a>
</header>


<main id="content" class="content" role="main">

{% for post in site.posts %}
{% unless post.next %}
<article class="post">
	<header class="post-header">
        <h2 class="post-title">{{ post.date | date: '%Y' }}</h2>
    </header>
    <section class="post-excerpt">
    <ul>
{% else %}
{% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
{% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
{% if year != nyear %}
</ul>
</section>
</article>	
<article class="post">
	<header class="post-header">
        <h2 class="post-title">{{ post.date | date: '%Y' }}</h2>
    </header>
    <section class="post-excerpt">
    <ul>
{% endif %}
{% endunless %}
	<li>
    <a href="{{ post.url }}">{{ post.title }}</a> in {{ post.category }}
    </li>
{% endfor %}
</ul>
</section>
</article>
</main>