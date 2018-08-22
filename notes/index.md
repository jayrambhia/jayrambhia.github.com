---
layout: default
title: Notes by Jay Rambhia
cover: false
---

<header class="main-header {% if page.cover %}" style="background-image: url({{ page.cover }}) {%else%}no-cover{% endif %}">
    <nav class="main-nav overlay clearfix">
            {% if page.logo %}
                <a class="blog-logo" href="{{ site.url }}">
                    <img src="{{ page.logo }}" alt="Blog Logo" />
                </a>
            {% endif %}
        <a class="back-button icon-arrow-left" href="{{ site.url }}/{{ site.archives }}">Archives</a>
    </nav>
    <div class="vertical">
        <div class="main-header-content inner">
            <h1 class="page-title">Notes</h1>
            <h2 class="page-description">
                Aha, Notes! These are just some of my ramblings.
            </h2>
        </div>
    </div>
    <a class="scroll-down icon-arrow-left" href="#content" data-offset="-45"><span class="hidden">Scroll Down</span></a>
</header>


<main id="content" class="content" role="main">

{% assign first = true %}
{% assign cyear = "" %}
{%- for post in site.posts %}
  {%- if post.category == "Notes" %}
    {%- if first %}
      {%- assign first = false %}
      {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
      <article class="post">
        <header class="post-header">
              <h2 class="post-title">{{ post.date | date: '%Y' }}</h2>
          </header>
          <section class="post-excerpt">
            <ul>
    {%- else %}
      {% capture year %}{{ post.date | date: '%Y' }}{% endcapture %}
      {% capture nyear %}{{ post.next.date | date: '%Y' }}{% endcapture %}
      {%- if year != nyear or cyear != nyear %}
        </ul>
        </section>
        </article>  
        <article class="post">
          <header class="post-header">
                <h2 class="post-title">{{ post.date | date: '%Y' }}</h2>
            </header>
            <section class="post-excerpt">
            <ul>
      {%- endif %}
    {%- endif %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a> on {{ post.tags }}
      </li>
      {% assign cyear = year %}
  {%- endif %}    
{%- endfor %}
</ul>
</section>
</article>
</main>
