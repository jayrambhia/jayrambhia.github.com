---
category: Blog
tag: Android
comments: true
date: 2014-03-15 17:00:00
layout: post
slug: pass-activity-bitmap
title: Pass Bitmap Data Between Activities in Android
keywords: [android development, android bitmap tutorial, pass bitmap to another activity, android bitmap in bundle, android camera bitmap]
---

I was making an application where I chose image file using browser intent and process it using OpenCV NDK. I decided to keep a different Activity for the OpenCV part and hence I had to pass the bitmap data from my main Activity to the OpenCV part activity. I had written an application before where I starting one intent from another activity. But I did not know how to pass arguments to the new activity. I looked up on Google and found out how to call another activity and then how to pass required data.

#### Start New Activity from Current Activity

{% highlight java %}

    Intent anotherIntent = new Intent(this, anotherActivity.class);
    startActivity(anotherIntent);
    finish();

{% endhighlight %}

#### Start New Acticity from Current Activity With Passing Required Data

{% highlight java %}

    Intent anotherIntent = new Intent(this, anotherActivity.class);
    anotherIntent.putExtra("key", "value");
    startActivity(anotherIntent);
    finish();

{% endhighlight %}

[putExtra()](http://developer.android.com/reference/android/content/Intent.html#putExtra(java.lang.String, android.os.Bundle)) method is used to send extra data from one activity to another.

#### Extract Data In Other Activity

{% highlight java %}

    data = getIntent().getStringExtra("key");

{% endhighlight %}

`getIntent()` method returns the intent that started this activity.

`getStringExtra()` retrieves extended data from the intent.

Now, it turns out that it's not possible to pass Bitmap as extended data. It needs to be converted to `byteArray`.

#### Pass Bitamp as Extended Data

{% highlight java %}

    ByteArrayOutputStream bStream = new ByteArrayOutputStream();
    bitmap.compress(Bitmap.CompressFormat.PNG, 100, bStream);
    byte[] byteArray = bStream.toByteArray();

    Intent anotherIntent = new Intent(this, anotherActivity.class);
    anotherIntent.putExtra("image", byteArray);
    startActivity(anotherIntent);
    finish();

{% endhighlight %}

#### Retrieve Bitmap in Other Activity

{% highlight java %}

    Bitmap bmp;

    byte[] byteArray = getIntent().getByteArrayExtra("image");
    bmp = BitmapFactory.decodeByteArray(byteArray, 0, byteArray.length);

{% endhighlight %}

[Detailed StackOverflow Answer](http://stackoverflow.com/questions/12908048/passing-bitmap-between-two-activities)

Well, that's how I pass bitmap data between two activities. There are some better methods to do this such as passing fileURIs. 

P.S. Working on Android now. Need to get better at layouts and designs.
