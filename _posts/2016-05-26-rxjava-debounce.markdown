---
category: Notes
tag: RxJava
comments: true
date: 2016-05-25 15:30:00
layout: post
slug: rxjava-debounce
title: A Note About RxJava Debounce Operator
---

RxJava has myriad operators that we can use to make our code simpler and our lives easier. I'm very insistent when it comes to EditText validations that we should not start validating as soon as the user starts entering the text. I like to give the user a bit of time to think about what they want to enter. My strategy has always been that as soon as the user stops typing, wait for 800 milliseconds, and start your validation or request calls. This works very well if the user is slow with typing. One useful point to note about this is that if your app is making a network call (for search results, etc) and the user changes the query, it should cancel that call and fire another call based on some parameters. I used to do this using `Handler.postDelayed()` and `Handler.removeCallback()`. It was really tideous to do all this.

I started to look for some RxJava tricks that I could look into and achieve this with as less code as possible. I tried few things but that didn't work very well and also, I didn't have much experience with RxJava at that time. I would just `flatMap` everything coming in my way. I had tried using `debounce` once but for some reason it didn't work out well so I rolled back to using the old Handler method.

Last night, I started listening to [Fragmented Podcast](http://fragmentedpodcast.com/) and saw that there were couple of episodes about RxJava with Dan Lew. I listened to both of them intently. It wasn't a class but just overall gist about RxJava. What I took away from those episodes is that RxJava is a sea and I'm just swimming on the shore. I need to go deep. Apart from that, I also observed that even the pro android devs have had tough times with RxJava and the only way to master it is practising it enough.

I decided to make an Rx implementaion where I can validate forms using RxJava (and no Handlers). Why forms? Because forms have a lot of EditText and I just couldn't stay defeated any longer. In those podcast episodes, they talked about a lot of different operators so I went through the notes and read up about the basic RxJava operators. I decided to use `debounce`.

### What my understanding of debounce was

What I had understood about debounce through my last encounter was that debounce operator will keep emitting items after a certain time interval. So if I were to attach a debounce operator to edittext value, I would keep getting data after exactly `t` seconds. So this was not ideal for me. Regardless of this, I added a debounce operator and started logging the output. And, I was shocked!

### What debounce actually is

From [ReactiveX - Debounce](http://reactivex.io/documentation/operators/debounce.html) the definition:

    Only emit an item from an Observable if a particular timespan has passed without it emitting another item

What does this mean?

It's difficult to put this definition in words for me. So I'll just go ahead and give a simple example. Let's say debounce interval is 200ms. Observable emits an item. The debounce operator takes this item and keeps it. The operator will set a timer to 200ms and starts countdown. 200ms has passed, debounce will send this item to the observer.
Observable emits another item. The operator will reset the timer to 200ms and start countdown. Let's say, the observable emits another item in 100ms. The debounce operator will get the item and it will reset the timer to 200ms and start the countdown. And probably the older item is discarded (I don't know. I'm just assuming). Once the countdown completes, the operator will send the item to the observer. So after every item that the observable emits, debounce operator resets the timer and sends the latest item only when the countdown is finished. Here's an image from ReactiveX docs.

![Debounce Throttle](/assets/images/rxjava-debounce-1.png)

<br/>
So, here's another thoguht. If I use a debounce operator with interval of 500 ms, and my observable emits items after every 499 ms, the debounce operator will never emit the item. To get some proof about this theory, I went to the docs page again where I can play with marble diagram and here's what I got.

![Debounce No Emission](/assets/images/rxjava-debounce-2.png)

Wow, so I guess if there's enough time between my last item and onCompleted event, debounce will emit the last item. But the docs also say that,

    Note that the last item emitted by the source Observable will be emitted in turn by this operator even if the source Observable’s onCompleted notification is issued within the time window you specify since that item’s emission. That is to say: an onCompleted notification will not trigger a throttle.

This is a bit confusing, so I am assuming that the last item will always be emitted.

Whoa, this new found knowledge helped me a lot in making my Rx form validator and yeah, `debounce` it pretty kickass.

P.S. One operator at a time and soon I'll be there, drowning in the lava of RxJava.