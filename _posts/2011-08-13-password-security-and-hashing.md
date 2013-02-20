---
author: Aniket
title: Password Security and Hashing
layout: post
type: post
category: notes
tags:
  - bcrypt
  - Codeigniter
  - Hashing
  - Password
  - PHPass
  - Problem
---
My old problem was not solved by now, and I was going through a question on Stack Overflow.

I got to know that MD5 should not be used in anyway. Then I read about SHA1 vs bcrypt. After quite some discussion and thanks to [Lawrence][1], I got a brilliant solution and really good lesson on password hashing.

Now, I would be using bcrypt to hash my passwords.

See this post for the [solution][2].

To implement this password hashing technique, there is a library available.

1.  Download the files from [here][3].
2.  Then, extract the files to application/library.

#### Load the library

    $this->load->library('PasswordHash',array(8, FALSE));
    

#### How to hash the password?

    $this->PasswordHash->HashPassword($password);
    

#### Check if a password is correct?

    $password = $_POST['password'];
    $actualPassword = /*Get the hashed password from your db*/;
    
    $check = $this->PasswordHash->CheckPassword($password, $actualPassword);
    

If you are not using CI, you can go through this [link][4].

 [1]: http://about.me/dclawrence "Thanks :)"
 [2]: http://stackoverflow.com/questions/7044785/what-is-the-safest-way-to-store-a-password-using-code-igniter/7045061 "Post"
 [3]: http://www.openwall.com/phpass/ "PHPass"
 [4]: http://dev.myunv.com/articles/secure-passwords-with-phpass/ "Without CI"