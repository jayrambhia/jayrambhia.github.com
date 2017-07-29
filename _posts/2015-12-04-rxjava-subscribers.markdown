---
category: Notes
tag: RxJava
comments: true
date: 2015-12-04 02:00:00
layout: post
slug: rxjava-subscribers
title: A Note About RxJava and its Subscriber
keywords: [rxjava with android, use rxjava debounce, android development, android tutorial, learn rxjava, rxjava best practices, rxjava subscriber]
---

Wow, I almost forgot about this part of my blog. I am writing a note after over a year. I could have written a post about it, but I was tinkering with RxJava and found something interesting and made sort of a theory which I am not sure is correct or not. I am not going to explain what Observers and Subscribers do in RxJava. Anyway, here it goes.

Once the Observable has called Subscriber's `Observer.onCompleted()`, subscriber unsubscribes self from receiving any more items from the Observable. Let's take a scenario where you want to do some action once the subscriber has unsubscribed. I looked around quite a bit about this and found an interesting answer on StackOverflow and here's the [link](http://stackoverflow.com/a/26695678/891373). It was a bit difficult to understand at first what was happening. So I tried adding a subscriber to my main subscriber (we'll call it mSubscriber from now). Nothing happened. I didn't get any callbacks. Other subscriber's onCompleted() wasn't even called. I thought that it was weird. I tried exactly as mentioned in the answer -> `Subscriptions.create()`. And I was typing it, Android Studio auto-suggested the parameter -> **create(Action0 unsubscribe)**. This meant that it had something to do with unsubscription of the subscriber. So I went alog and added the method. It worked so I decided to dig deep into it.

`Subscriptions.create(Action0 Unsubscribe)` creates a `BooleanSubscription` which has a callback which is invoked when it is unsubscribed. According to the solution, we need to add this Subscription to our subscriber in order to receive the callback. I was confused regarding how this would work. If the subscribers which are added don't get onNext() or any other event, how would they get this event?

If I understand this correctly, each Subscriber (which implements Observer<T> and Subscription) has a list of Subscriptions. We'll refer to this list as `SubscriptionList` from now. When we call `add`, we add the subscription to subscriber's SubscriptionList. I explored the source code a bit more and found out that when `unsubscribe()` is called for the subscriber, it first unsubscribes self and then calls `unsubscribe()` on the subscription list (it implements Subscription). In its implementation of unsubscribe, it calls unsubscribe over all its elements. Once I got to know about this, it felt like finding the last piece.

{% highlight java %}
Subscriber subscriber = new Subscriber {
    @Override
    public void onCompleted() {
        Log.i(TAG, "onCompleted");
    }

    @Override
    public void onError(Throwable e) {

    }

    @Override
    public void onNext(Object o) {

    }
};

observable.subscribe(subscriber);

subscriber.add(Subscription.create(new Action() {
    @Override
    public void call() {
        Log.i(TAG, "on unsubscribed");
    }
}));

{% endhighlight %}

Since `BooleanSubscription` invokes a callback method when it is unsubscribed, if we add it to the SubscriptionList, we can know when the subscriber unsubscribed because SubscriptionList will call unsubscribe on the BooleanSubscription. Based on this, here's what I understood. Even if you add another Subscriber in the SubscriptionList, onNext(), onCompleted() aren't going to be called based on mSubscriber's activities. To think more about this, SubscriptionList actually contains a linked list of `Subscription`. Subscription has only two methods - `isUnsubscribed()` and `unsubscribe()`. onNext() and other methods belong to Observer. That means we can only add Subscriptions to a Subscriber. We can add Subscriber also because it implements Subscription. 

Getting back to the point - if you call subscriber to unsubscribe, all the subsriptions in SubscriptionList will also unsusbscribe.

This seems to be very useful in a scenario where you want to unsubscribe all of your Subscribers. Each subscriber behaves independently, but can be unsubscribed at the same time using something like this. This can be very helpful to avoid memory leaks in Android.

We create a subscriber which does nothing but just holds other subscribers in its Subscription List. We can add more subscribers. We need not worry about the subscribers which have already unsubscribed. If the activity is destroyed, we can simply call unsubscribe on the main wrapping subscriber (which doesn't do anything apart from holding all the subscribers).

{% highlight java %}

private class WrapperSubscriber extends Subscriber {
    @Override
    public void onCompleted() {
        Log.i(TAG, "subscriber on Completed");
    }

    @Override
    public void onError(Throwable e) {

    }

    @Override
    public void onNext(Boolean o) {
        Log.i(TAG, "subscriber on next");
    } 
}

WrapperSubscriber _subscriber = new WrapperSubscriber();

// Make some API calls
_subscriber.add(callApi1WhichReturnsObservable()
                .subscribeOn(Schedulers.io())
                .subscriber( /* subscriber methods */);

_subscriber.add(callApi2WhichReturnsObservable()
                .subscribeOn(Schedulers.io())
                .subscriber( /* subscriber methods */);
                
// Activity is being destroyed
@Override
protected void onDestroy() {
    _subscriber.unsubscribe(); // This will unsubscriber all subscribers
}

{% endhighlight %}

Well, this is very hacky and seems to be using some resources. We can use `CompositeSubscription` instead.

{% highlight java %}

CompositeSubscription _subscriptions = new CompositeSubscription();

// Make some API calls
_subscriptions.add(callApi1WhichReturnsObservable()
                .subscribeOn(Schedulers.io())
                .subscriber( /* subscriber methods */);

_subscriptions.add(callApi2WhichReturnsObservable()
                .subscribeOn(Schedulers.io())
                .subscriber( /* subscriber methods */);
                
// Activity is being destroyed
@Override
protected void onDestroy() {
    _subscriptions.unsubscribe(); // This will unsubscriber all subscribers
}

{% endhighlight %}

P.S. RxJava is really interesting and there's so much more to dig!
