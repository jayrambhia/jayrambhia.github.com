---
author: Aniket
title: 'Laravel : Setting up and getting down to business'
layout: post
type: post
category: essays
tags:
  - Codeigniter
  - Laravel
---
After three days of tinkering with Laravel, I finally have it set up and ready to work.

Coming from a Codeigniter background, it did take me some time to understand how it is functioning.  
Let me describe my three days with **Laravel**.

## Day 1

> Laravel is so cool. The documentation is superb and so many amazing features to work on. Let’s give it a shot.

This was my first reaction when I saw the documentation and I immediately installed it.

For the first half an hour, I didn’t understand why I was able to see the directory listing on the opening it on my server. That shouldn’t have been the case.  
I had followed all the instructions given in the documentation and it should have been working.

### The tale of the splash page

The first thing I didn’t get was that their was no index.php and yet it said that if I have mod_rewrite enabled along with the apt .htaccess file, it should show me the **beautiful splash page**.

I checked application/routes.php and thought that *I am so cool*, I can figure it out all by myself. I made a change and went ahead.

Sadly, no splash page came and all I got was a directory listing. Then I started opening the folders and when I opened public, I got errors.  
After a while, I reverted back to the original routes.php file and on refreshing, the page showed up.

Hurray!

I started reading the beautifully laid out offline documentation and understood how to register **routes & controllers**.

#### Takeaways

*   Controllers
*   Routes
*   Validation

## Day 2

Day 2 started off really well. I start creating my views and learnt how to route requests.  
I made two controllers in total and their required views. Used the awesome **blade** templating engine.

Feeling invincible, I moved on to create the **models**. But, no. I still had to try out some other things which I wanted to do from before but with Codeigniter it was difficult.

### The Amazing Artisan

We have something called as **artisan** in Laravel.

Artisan provides us with a **Command Line Interface (CLI)**. Just write a simple line in English and you have database migrations set up. Run tasks and install bundles. It’s amazing.

I thought of setting up an administrator account and do the basic configuration by making a task. The task was easy to write. It would call up a model and use the functions. Sounds simple.

### Models Wreaking Havoc

I was now required to make models. From my Codeigniter experience, models are placed in application/models. Even here it’s all the same. So, I made my two files and wrote all the functions.

Codeigniter uses an **active query** method to interact with databases.  
Laravel provides us with two methods to do it:

1.  **Fluent Query Builder**
2.  **Eloquent ORM**

Like an idiot I read Eloquent ORM and opened Fluent Query Builder. This was my first mistake (you will understand what implications it has soon).

I wrote my models with the Fluent Query Builder and tried to run the tasks using artisan. One task ran and the other failed.  
Made some changes but it didn’t budge. So, I left it for Day 3.

#### Takeaways

*   Templating
*   Artisan
*   Database Interaction

## Day 3

I was very confident that I would nail it today.  
The first thing I did was to make a separate branch on the git repo and start working on a new way to do it.

I read about Eloquent ORM. It required me to make a model for each of my tables. My application has seven tables, so that makes it seven models.  
Sounds fine.

So, I made the tables on my database. But soon I saw what **migrations** could do.

### Migrations

Migrations are a powerful tool in Laravel.  
Use artisan to create a migration and then code your table schemas in it. This will help you create tables easily and in times of distress, you can rollback the changes.

From the documentation, I coded my migrations and ran it. In one line of code, my tables were ready. I thought of taking them down. One command and my database was like a new-born baby.

Having understood migrations, now it was time to code the models.

### Eloquent ORM

I started building the models and they were ready in no time. But on running the tasks, they didn’t seem to work. I couldn’t understand why.  
Then I remembered about the naming conventions of Laravel and the way I had named the models, it was all incorrect.

My models were named like this: abc\_def\_ghi.  
For these models to work, I need to make them like this: abc/def/ghi.

And the job was done!

#### Takeaways

*   Migrations
*   Eloquent ORM
*   Invincibility

## Finale

Everything was working now.  
Now, was the time to feel invincible and I did feel that way.

It was a great experience to tackle these problems. Sometimes, new methods give you a hard time but all you need to do is **tame them**.