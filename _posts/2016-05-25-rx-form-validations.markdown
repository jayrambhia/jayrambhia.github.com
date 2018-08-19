---
category: Blog
tag: Android
comments: true
date: 2016-05-25 23:00:00
layout: post
slug: rx-form-validations
title: RxJava for Form Validations
description: Yes, RxJava has a steep learning curve, but you won't be able to master it unless you are ready to fail. Let's take one step beyond networking and understand various concepts and operators of RxJava by implementing validations for form with an amazing UX.
keywords: [rxjava with android, use rxjava debounce, android development, android tutorial, learn rxjava, rxjava best practices, rxjava debounce, rxjava form validations, rxjava publish subject, combineLatest]
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

	We have hooked observables to edittexts and getting one boolean using combineLatest. It's time to add some pattern validations.

3. Use `debounce` to get the latest change in the editText and put it through our validator and combine results of validators to enable/disable submit button.

	{% gist jayrambhia/52c65afbb74e204a14de1c32b3fcefac validationWithDebounce.java %}
	<br/>
	We have a debounce operator which emits item which are validated using `map` operator which then sends item to our subscriber. Read up about my confusing about debounce **[here](/notes/rxjava-debounce)**. After debounce, we have used `observeOn(AndroidScheduers.mainThread())` because by default debounce operator works on scheduler thread and we need the data on the main thead as we've to show the results in the UI.

	What is `ValidationResult`? It's just a simple class that I made to keep some data about the validation. It stores whether the validation was successful or not. If not, it also keeps a reason which we can show to the user. Apart from that, it also stores the actual data which we'll require later. You can find the class **[here](https://gist.github.com/jayrambhia/52c65afbb74e204a14de1c32b3fcefac#file-validationwithdebounce-java)**.

	Our validation is done and now we need to combine all the validation observables and emit a single result.

	{% gist jayrambhia/52c65afbb74e204a14de1c32b3fcefac combineValidations.java %}
	<br/>
	This looks like step 1 but with validations included. Great. Now, we need to move on to server based validation where we need to check if username or email is available or not.

4. Chain another `map` operator which will make API call to the server.

	{% gist jayrambhia/52c65afbb74e204a14de1c32b3fcefac validationWithApi.java %}

	<br/>

	Wow, that's a long chain of command. Well, nothing that lambdas can't fix.

	Moving on from step 3, we chain a `map` operator which will call the API and return `ValidationResult`. We need to process this result and make changes in the UI if validation fails so we attach another `map` operator which will check the result and reflect it on the UI and emit validation success result. Notice, that we have moved
	the `observeOn` call to right before the map where we change the UI. Here, for API call I could have used a `flatMap` but hey, if `map` works, why use `flatMap`, right?

	In the code, you'll notice that if Regex validation is not successful, the app is not making a call to the network. That's some sneaky optimization right there. Am I right?

	**[AvailabilityChecker](https://gist.github.com/jayrambhia/52c65afbb74e204a14de1c32b3fcefac#file-availabilitychecker-java)** is an interface and **[RandomAvailabilityChecker](https://gist.github.com/jayrambhia/52c65afbb74e204a14de1c32b3fcefac#file-randomavailabilitychecker-java)** is an implementation which uses `delay` operator to send results after some amount of time. It also uses a random number to determing whether to send success or not.

	Build. Run the app. Test. Yeah, it works but something is not right.
	I start entering the username and enter 5-6 characters. Regex validation is fine. The app is making a network call and I start editing the field again and add 2 more characters. Regex validation is successful and the app makes another network call. I get the response from my first network call. Wait, I don't want that. I should have canceled that call before making another network call.

	How do I do that? How do I cancel that network call before making a new call? So I looked around on the internet to find possible soultions and I didn't find something satisfying. The only thing that I found was that I need to call `unsubscribe` on the subscription to cancel the call. Well, I don't have a subscription here and even if I had, I am pretty sure it would unsubscribe everything including the textwatcher subject.

5. Create a subscription for the API call

	{% gist jayrambhia/52c65afbb74e204a14de1c32b3fcefac ValidationWithDebounce2.java %}

	A bit messy and less RxJava-ish I suppose. We now have one PublishSubject for EditText and another one for validation which is directly hooked into `combineLatest`. In the code, you'll probably notice that I have again changed `observeOn()` and moved it before the we touch the UI. `subscribeOn()` call is probably redundant here as `debounce` will emit item on scheduler thread itself. As soon as we get the data from debounce, we cancel the api call and make a new call.

	Combining subjects for final UI change

	{% gist jayrambhia/52c65afbb74e204a14de1c32b3fcefac combineAPIValidationSubjects.java %}

	Subject is Observer as well as Observable so we can use them together in combineLatest.

	Build. Run the app. Test. Yeah, works well. Pats on the back. But hey, wait a minute. There is thing weird thing happening. I entered 6-7 characters in the username and waited for a second. Network call started and I also started entering the text. I didn't stop entering for 5 seconds and the network call returned data and it reflected on the UI. But I was entering the text so ideally that network call should have been cancelled as there was nothing to validate.

	Another Aha! moment about `debounce`. If I keep entering text, the subject will keep emitting an item and debounce will not send me any data until time-interval has gone by without any new item. Super sneaky debounce, I must say. Or am I too clumsy? Anyway, `map` to the rescue.

6. Use `map` before `debounce` to cancel API calls

	{% gist jayrambhia/52c65afbb74e204a14de1c32b3fcefac ValidationWithDebounce3.java %}

	<br/>

	Build. Run. Test. Works perfectly. Nice. Finally, I can get some peace in my life.

So after using bunch of `map` operators here and there with cool dudes like `debounce` and `combineLatest`, I finally managed to write a form validator using RxJava. I'm sure I could have eliminated a lot of `map` operators, but where's the fun in that! If you know how I can do this same thing and make it more RxJava-ish, please let me know.

I have uploaded the code on Github and you can find it here - **[RxFormValidation](https://github.com/jayrambhia/RxFormValidation)**. I'm planning to add some unit testing and more form elements later.

P.S. Can you guess which is my favorite RxJava operator? It has `map` in it.
