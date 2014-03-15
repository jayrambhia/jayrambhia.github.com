---
layout: page
title: Home
slug: home
---
Being a __paranoid android__, I believe in Open Source and have immense faith in the community. Developer of open source framework for Machine Vision - [SimpleCV](http://simplecv.org/).
If you want to get in touch, <a href="mailto:jayrambhia777@gmail.com">say Hi!</a>.

Events
{% for post in site.posts limit:5 %}
{% if post.category == "Event"%}
- **[{{ post.title }}]({{ post.url }})**<!-- -->
{% endif %}
{% endfor %}

Articles
{% for post in site.posts limit:5 %}
{% if post.category == "Blog"%}
- **[{{ post.title }}]({{ post.url }})**<!-- -->
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

Working at a Computer Vision based startup [Tesseract](http://tesseract.in/) as technology head and co-founder. Making Computer Vision based real-world applications. And obviously, playing Ultimate frisbee.
