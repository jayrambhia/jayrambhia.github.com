---
layout: default
title: Comprehensive archives of an android developer - Jay Rambhia
cover: false
---

<header class="main-header {% if page.cover %}" style="background-image: url({{ page.cover }}) {%else%}no-cover{% endif %}">
    <nav class="main-nav overlay clearfix">
        <a id="back_home" class="back-button icon-arrow-left" href="{{ site.url }}">Home</a>
        <a id="back_to_post" class="back-button icon-arrow-left" style="visibility:hidden;" onclick="history.back()">Back to post</a>
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

    <script>
      var url = window.location.href;
      if (url.includes("from_post=1")) {
        document.getElementById("back_home").style.display = "none";
        document.getElementById("back_to_post").style.visibility = "visible";
      }
    </script>
</header>


<main id="content" class="content" role="main">
<article class="post">
	<header class="post-header">
        <h2 class="post-title">Featured</h2>
    </header>
    <section class="post-excerpt">
    	<ul>
    		<li>
    			<a href="{{ site.url }}/android">Android</a>
    		</li>
    		<li>
    			<a href="{{ site.url }}/computervision">Computer Vision</a>
    		</li>
    		<li>
    			<a href="{{ site.url }}/notes">Notes</a>
    		</li>
        <li>
            <a href="{{ site.url }}/projects">Projects</a>
        </li>
        <li>
            <a href="{{ site.url }}/series">Article Series</a>
        </li>
    	</ul>
    </section>
</article>    

{%- assign first = true %}
{%- assign cyear = "" %}
{%- for post in site.posts %}
    {% if post.hidden == true %}
        {% continue %}
    {% endif %}
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
        <a href="{{ post.url }}">{{ post.title }}</a> in {{ post.category }}
    </li>
    {%- assign cyear = year %}
{%- endfor %}
</ul>
</section>
</article>
</main>
