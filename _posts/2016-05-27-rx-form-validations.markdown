---
category: Blog
tag: Android
comments: true
date: 2016-05-27 07:00:00
layout: post
slug: rx-form-validations
title: RxJava for Form Validations
---

Since I started learning about RxJava, I have always been fascinated about how it can be used to make my life easier, code more fun and readable. I have successfully implemented Volley with RxJava to implement REST API calls, most of the async loading (images, files, etc). My worst enemy is forms. Forms need real time validations and real time responses to make UX better. In this **[post](/notes/rxjava-debounce)**, I talk about my obsession about `EditText`. Here I am trying to solve it so that I can get some peace of mind.

### Objective

 - Make the user fill `username`, `email` and `phone number`
 - Validate username, email and phone number with Regex
 - Check with the server if the username and email are available or not
 - If everything is validated, enable `submit` button

### How to go about it?

 - **[RxJava Debounce](/notes/rxjava-debounce)** - I talk about how debounce can be used for this purpose
 - Chain Observables to make it RxJava-ish (Which helps in scheduling)
 - Use `combineLatest` operator to combine all the observables to get final result - Enable/Disable the submit button

### Implementation

Okay, so we have our goals and little how-tos. Now, it's time to write some code.

1. Attach an `Observable` to EditText so that it emits data when text has changed.

{% gist jayrambhia/52c65afbb74e204a14de1c32b3fcefac RxHelper.java %}

<br/>

Here, I have used `PublishSubject` to emit EditText's field value whenever it is being changed. The difference between `BehaviorSubject` and `PublishSubject` is that, the former when subscribed to emits one previous item (if any), where as the latter emits only the items that it receives after the subscription. In this case, we don't require `BehaviorSubject`.

We have an Observable which will emit data as the user changes the value. Before going into validations, I just want to check how I can easily combine all my observables so I don't have to keep checking values each time to enable/disable the button.

2. Use `combineLatest` to combine my observables.

{% gist jayrambhia/52c65afbb74e204a14de1c32b3fcefac setup1.java %}

<br/>

I ran my code and I noticed something weird. I had just entered username (didn't do anything to email and phone field). But I didn't get anything. `combineLatest` didn't emit anything. I started adding some text into email field and the result was the same. As soon as I entered first number in the phone field, my combineLatest function got called. Cleared phone number field and edited username field and yeah, I was getting data. I restarted the app and did the same thing again and got the same results. I was a bit confused and then I realized how `combineLatest` works.

**[combineLatest](http://reactivex.io/documentation/operators/combinelatest.html)** operator starts emitting items only if all the observables have started emitting items. Since I had not changed text of email or phone after attaching an observable, the observable hadn't started emitting items. I got items when all the observable had emitted at least one item. Pretty neat.
