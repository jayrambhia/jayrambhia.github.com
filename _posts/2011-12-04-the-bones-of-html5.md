---
author: Aniket
title: The Bones of HTML5
layout: post
type: post
category: essays
tags:
  - Bones
  - html5
  - Wordpress
---
## Introduction

The father and mother of wrongly named articles is this! For sure! Trust me on that.

No, I am not writing about HTML5′s architecture!

This article is about a WordPress theme framework called “Bones” and how it uses HTML5. The holistic view about it. The good, the better and the best (and a itsy bitsy orc-like things)

BTW, I recommend you read my short article on [HTML5 Semantics and Good Coding Practices][2].

## What is Bones?

[Bones][3] is a WordPress theme framework developed by [Eddie Machado][4]. Twist it and turn it the way you want. Highly flexible it is!  
I use it for my website and speak about it nearly every time I talk to any WordPress developer or whenever I give a talk.

Bones is available in 3 flavors -

1.  [A WordPress framework][5]
2.  [A responsive version of the framework][6]
3.  [HTML version][7]

The size is super-tiny, only **248kb**.

## **Here is how Bones uses HTML5**

### Navigation

Let’s start with the navigation bar that is your menu bar is not enclosed in div’s with id’s like #navigation or #top-menu but uses nav element to do the job.

Code:

    <nav role="navigation"> <!--?php bones_main_nav(); // Adjust using Menus in WordPress Admin ?-->
    </nav>
    

### In terms of posts

Bones uses HTML5 the way it’s supposed to be. The use of div’s has been greatly reduced and the code is highly semantic.

Let me explain this with an example.  
Take a look at the code below. It is a snippet from the index.php.

    <article id="post-<?php the_ID(); ?>" php="" post_class="" clearfix="">role="article">
    <header>
    <h1>
    
    <!--?php _e("Posted", "bonestheme"); ?--><time datetime="<?php echo the_time('Y-m-j'); ?>" pubdate=""><!--?php the_time('F jS, Y'); ?--></time> <!--?php the_author_posts_link(); ?--> & <!--?php _e("filed under", "bonestheme"); ?--> <!--?php the_category(', '); ?-->.</h1>
    </header>
     <!-- end article header -->
    <section><!--?php the_content(_e('<span-->Read more on "'.the_title('', '', false).'" »', "bonestheme")); ?></section>
     <!-- end article section -->
    <footer>
    <!--?php the_tags('<span-->Tags: ', ', ', ''); ?></footer>
     <!-- end article footer --></article>
     <!-- end article -->
    

Okay, please ignore the class h2 with the h1. I’ll get to the un-semantic part later.

Apart from that minor error mentioned above, you can notice that an article is being used to for each post generated using the \*mighty\* loop. Each post will be enclosed in an article tag. The article tag in turn has it’s very own header, footer and section. This is how **semantics** roll!

The <header> contains the post title of each post and also the meta information of the post. The meta is also used very correctly by enclosing the time of the post in a time tag. From the header we move to the section.

The <section> is used because it is closely related to the article but not so close to the other articles or the page as such.

Then the <footer> tag. This harbors your tags of the post.

Similarly the comment listing and the other pages also use a similar format for displaying the content. The comments are enclosed in a unordered list. And each list element contains an article with header, section and footer inside.

### Microdata

New attributes like itemscope and itemprop have been implemented in the latest update of Bones. These are from the current working draft of [microdata][8].

This is the way they are being used in page.php.

    <article id="post-<?php the_ID(); ?>" php="" post_class="" clearfix="">role="article" itemscope itemtype="http://schema.org/BlogPosting">
    <header>
    <h1></h1>
    <!--?php _e("Posted", "bonestheme"); ?--><time datetime="<?php echo the_time('Y-m-j'); ?>" pubdate=""><!--?php the_time('F jS, Y'); ?--></time> <!--?php _e("by", "bonestheme"); --> <!--?php the_author_posts_link(); ?-->.</header>
     <!-- end article header -->
    <section itemprop="articleBody"><!--?php the_content(); ?--></section>
     <!-- end article section -->
    <footer><!--?php the_tags('
    <br ?-->Tags: ', ', ', '
    
    '); ?></footer>
     <!-- end article footer --></article>
     <!-- end article -->
    

Notice itemscope and itemtype attributes in the article. The BlogPosting schema is being used in the itemtype too. Also, you will notice itemprop inside the section which has the value “articleBody”.

## Sidebar

The sidebar is one area where some changes can be made. A better way to understand this is by looking at this code snippet.

    function bones_register_sidebars() {
      register_sidebar(array(
        'id' => 'sidebar1',
        'name' => 'Sidebar 1',
        'description' => 'The first (primary) sidebar.',
        'before_widget' =></pre>
    <div id="%1$s">',
     'after_widget' => '</div>
    <pre>
    ',
        'before_title' => '</pre>
    <h4>',
     'after_title' => '</h4>
    <pre>
    ',
      ));
    }
    

This code registers the sidebar but places div’s around each widget. Instead of using div’s, a good option would be to go ahead with using aside’s. Semantic!

This is the *orc* blood I warned you about.

## The Functions

Bones makes use of a core function file called as bones.php  
The features are:

### Theme Support

*   Post thumbnails
*   Custom backgrounds
*   Automatic Feed Links
*   Post formats

### Footer Links

Bones provides with a function to include links in the footer of your site. Quite useful for making sitemaps.

### Bones Related posts

This is interesting. This function looks for related posts by checking on tags of the other posts.  
Very simple to do but it comes by default, so good for us!

### Page Navigation

A pagination thingy for you. Use this function to generate a numeric page navigation for your archives.

### Filtering <p> tags from images

Code from [css-tricks.com][9]  
Your text:

    blah blah blah</pre>
    <img src="image.jpg" alt="" />
    <pre>
    blah blah blah
    

WordPress turns it into:

    blah blah blah</pre>
    <img src="image.jpg" alt="" />
    <pre>
    blah blah blah
    

Our little function removes the p around the img and makes it into this.

    blah blah blah</pre>
    <img src="image.jpg" alt="" />
    <pre>
    blah blah blah
    

## The Stylesheet

Bones uses *two* stylesheets in total. One is normalize.css and the other is style.css

You can make out from the names of the two about what they do, so I will talk about the best parts about the stylesheet.

### The modified 960.gs

Eddie has changed 960.gs into a flexible grid system. By flexible I mean that you can change the value of the container and the grids will change accordingly. Makes things really easy. You can see the change below.

    #container, .wrap {
      width: 940px;
      margin: 0 auto;
      padding: 0 10px;
    }
    /* layout options ( all have margins right & left of 2.1276596%) */
    .col60 { width: 6.3829787%; } /* width 60px / grid_1 */
    .col140 { width: 14.893617%; } /* width 140px / grid_2 */
    .col220 { width: 23.404255%; } /* width 220px / grid_3 */
    .col300 { width: 31.914894%; } /* width 300px / grid_4 */
    .col380 { width: 40.425532%; } /* width 380px / grid_5 */
    .col480 { width: 51.06383%; } /* width 480px / grid_6 */
    .col540 { width: 57.446809%; } /* width 540px / grid_7 */
    .col620 { width: 65.957447%; } /* width 620px / grid_8 */
    .col700 { width: 74.468085%; } /* width 700px / grid_9 */
    .col780 { width: 82.978723%; } /* width 780px / grid_10 */
    .col860 { width: 91.489362%; } /* width 860px / grid_11 */
    .col940 { width: 100.0%; } /* width 940px / grid_12 */
    

### Media Queries

All media queries are already there, all you need to do is write them your way.

Eddie has even made a responsive version of bones. That version is recommended if you are looking for a responsive design.

## The Un-Semantic Part

The only place where I have noted some problems regarding the CSS being un-semantic is the use of classes like h1, h2, h3 and the rest.

But the reason for that is very simple and logical. You post title is h1, and it is too large as such so you go ahead and put a class h2 to reduce the size and the line height. The consecutive headings in your post can be put as h2, h3 and so on and yet your code is semantic as the headings are logical.

The other way to have done it would have been associating the class of the article with h1 and similarly the other elements would have been styled. Eddie didn’t do that.

It’s just a *different approach*.

## The Bottom Line

The good part is that it is always in development and people contribute to it!

So many features packed together into a small theme which can be extended as much as possible. Truly a development framework made for developers. You can see the repository on GitHub over [here][5].

If you liked the post, please upvote on HN. Here’s the link to the [discussion][10].

If you are going to try it out then, like Eddie writes in the stylesheet.

**Happy Developing!**

 [2]: http://www.aniketpant.com/posts/html5-semantics-and-good-coding-practices "HTML5 Semantics and Good Coding Practices"
 [3]: http://themble.com/bones/ "Bones Framework"
 [4]: http://themble.com/ "Eddie Machado"
 [5]: https://github.com/eddiemachado/bones "Eddie Machado - Bones"
 [6]: https://github.com/eddiemachado/bones-responsive "Eddie Machado - Bones - Responsive"
 [7]: https://github.com/eddiemachado/bones-html "Eddie Machado - Bones - HTML"
 [8]: www.w3.org/TR/html5/microdata.html "Draft - Microdata"
 [9]: http://css-tricks.com/snippets/wordpress/remove-paragraph-tags-from-around-images/ "Remove tags from images"
 [10]: http://news.ycombinator.com/item?id=3315583 "Link to discussion on "The Bones of HTML5""