---
layout: page
title: Home
slug: home
---
Being a __paranoid android__, I believe in Open Source and have immense faith in the community. Developer of open source framework for Machine Vision - [SimpleCV](http://simplecv.org/).
If you want to talk to me, or hire me, or give me a thesis opportunity, drop me a <a href="mailto:jayrambhia777@gmail.com">mail</a>.

Events
{% for post in site.posts limit:5 %}
{% if post.category == "Event"%}
- **[{{ post.title }}]({{ post.url }})**<!-- -->
{% endif %}
{% endfor %}

Articles
{% for post in site.posts limit:5 %}
{% if post.category == "Blog"%}
{% if post.tag == "Computer Vision"%}
- **[{{ post.title }}]({{ post.url }})**<!-- -->
{% endif %}
{% endif %}
{% endfor %}

Recent Projects
{% for post in site.posts limit:5 %}
{% if post.category == "Project"%}
- **[{{ post.title }}]({{ post.url }})**<!-- -->
{% endif %}
{% endfor %}

### What would you like to track?

- [**The Old Archives**](/archive)
- [**Paranoid Android's Blog**](/blog/)
- [**Me**](/me)

### What am I doing nowadays?

I am working on object and pattern recognition to identify the speceis of flora and fauna. I'm also working on 3D Depth based image segmentation. And obviously, playing Ultimate frisbee.