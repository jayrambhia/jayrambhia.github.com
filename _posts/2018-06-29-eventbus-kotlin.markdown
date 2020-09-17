---
category: Notes
tag: Kotlin
comments: true
date: 2018-06-29 14:00:00
layout: post
slug: eventbus-rxkotlin
title: Eventbus in Kotlin with Rx
keywords: [rxjava with android, rxjava for eventbus, learn rxjava, rxjava best practices, rxjava subscriber, android eventbus kotlin, kotlin development, kotlin tutorial, kotlin anroid app]
category_tag: [Kotlin, Eventbus]
description: EventBus is a design pattern which allows publish-subscribe style communication without requiring components to registering with each other. Write your own implementation of EventBus using Kotlin and Rx in just 10 lines of code.
---

**EventBus** is a design pattern which allows publish-subscribe style communication without requiring components to registering with each other. Most of the android developers have used a library for `EventBus`. [EventBus by Greenrobot](https://github.com/greenrobot/EventBus) is a pretty famous library and widely used. It was quite impressive how you could send any object and the subuscriber would receive it without any hassles.

Kotlin has been on the rise since past couple of years, especially for android app development. I also started learning the language by making an app. I required `EventBus` so I thought of implementing it myself in Kotlin with the help of Rx (RxKotlin) and it turned out to be super short and quite easy.

{% highlight kotlin %}
class EventBus {
  companion object {
    val publisher: PublishSubject<Any> = PublishSubject.create()

    inline fun <reified T> subscribe(): Observable<T> {
      return publisher.filter {
        it is T
      }.map {
        it as T
      }
    }

    fun post(event: Any) {
      publisher.onNext(event)
    }
  }
}
{% endhighlight %}

That's it! It's that simple. And this is how I use it.

{% highlight kotlin %}
data class SomeEvent(val text: String)

// Where you want to subscribe for events
class SomeActivity {
  private var disposable: Disposable? = null

  override fun onResume() {
    super.onResume()
    // Register to recieve `SomeEvent`
    disposable =
        EventBus.subscribe<SomeEvent>()
           // if you want to receive the event on main thread
          .observeOn(AndroidSchedulers.mainThread())
          .subscribe({
            Log.d(TAG, "event received: $it")
          })

  }

  override fun onPause() {
    super.onPause()
    // Unregister from EventBus
    disposable?.dispose()
  }  
}

class SomewhereElse {
  fun onNewMessage(text: String) {
    EventBus.post(SomeEvent(text))
  }
}
{% endhighlight %}

### reified

It means to make something, which is abstract, concrete or real. When we need to access the type passed in the parameter, we can use `reified` type parameters which gives us run-time access to types passed to the function. Read more about it - [reified specs](https://github.com/JetBrains/kotlin/blob/master/spec-docs/reified-type-parameters.md).
