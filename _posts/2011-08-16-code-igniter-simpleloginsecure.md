---
author: Aniket
title: 'Code Igniter - SimpleLoginSecure'
layout: post
type: post
category: notes
tags:
  - bcrypt
  - Codeigniter
  - PHPass
  - Problem
  - Stack Overflow
---
Yesterday, I made an attempt to use PasswordHash and tried to directly convert it into a CI Library. Failing at that, I went ahead and downloaded **SimpleLoginSecure**.

Refer to my [question][1] on Stack Overflow, regarding why I have been talking about Password Hashing so much.

The library is pretty cool. Here is the [link][2] to it.

#### What I did?

1.  Put the downloaded file in application/libraries
2.  Made minor table name and field name changes
3.  DONE

It’s super easy and it comes with 4 functions.

1.  Create
2.  Login
3.  Logout
4.  Delete

This is all you need in a basic login and it’s all there. Just minor customizations required and \*poof\*, work done.

And the best part about this library is that it uses **bcrypt** to hash passwords. And that is why it is a beauty. It uses [PHPass][3].

That is all, and I still haven’t got any reply to my [question][4] regarding Form Validation. Really need help with it.

 [1]: http://stackoverflow.com/questions/7072968/passwordhash-not-working-with-codeigniter-solved "Question on Stack Overflow"
 [2]: http://codeigniter.com/wiki/File:SimpleLoginSecure-1.0.1.zip/ "SimpleLoginSecure"
 [3]: http://www.openwall.com/phpass/ "PHPass"
 [4]: http://stackoverflow.com/questions/7006552/form-validation-not-working-in-code-igniter "Form Validation - Stack Overflow"