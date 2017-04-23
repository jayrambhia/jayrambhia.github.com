---
category: Blog
tag: Android
comments: true
date: 2014-06-16 16:00:00
layout: post
slug: android-timer
title: Timer Utility for Android
keywords: [android development, android basic tutorial, android handler for timer]
---

We launched LenX last week and got a lot of feedback. One of them was to include a timer utility to set the exposure time. I looked up a bit and found out that the best way to do this was to use `Handler` and create a separate thread.

Usage of the TimerUtility class:

 - Call a fixed method of my activity after certain time interval
 - Pause the timer if pause button is pressed
 - Resumer the timer when resume button is pressed

The first part was pretty easy. Create a `Runnable` which invokes the method. Use a `Handler` to process this Runnable instance using `postDelayed` method and provide the time interval in milliseconds.

For the second part, I looked around a bit and found out that I can remove the `Runnable` using 'removeCallbacks' method. Now, I was wondering what to do for the third part. I could simply use `postDelayed` again to process the Runnable, but I wanted the appropriate time interval. To overcome this, I started to save the system time when it started, paused, resumed etc and calculated elapsed time and used this elapsed time in `postDelayed` and processed the Runnable.


### TimerUtility Class

{% highlight java %}

public class TimerUtility {
    private int time_in_ms;
    private final Context context;
    private final MyActivity mAct;
    private Handler handler;
    private final Runnable runnable;
    private long startTime, pauseTime, elapsedTime, remainingTime, resumeTime;

    public TimerUtility(Context con) {
        context = con;
        mAct = (MyActivity)context;

        runnable = new Runnable() {
            @Override
            public void run() {
                mAct.onTimerStop();
            }
        };

    }

    public void setTime(int timeInMS) {
        time_in_ms = timeInMS;
    }
    
    public void startTimer() {
        startTime = System.currentTimeMillis();
        resumeTime = startTime;
        elapsedTime = 0;
        remainingTime = time_in_ms;

        handler = new Handler();
        handler.postDelayed(runnable, time_in_ms);
    }

    public void pauseTimer() {
        
        pauseTime = System.currentTimeMillis();
        elapsedTime = pauseTime - resumeTime + elapsedTime;
        remainingTime = time_in_ms - elapsedTime;
        handler.removeCallbacks(runnable);
    }

    public void resumeTimer() {
        resumeTime = System.currentTimeMillis();
        handler.postDelayed(runnable, remainingTime);
    }
}

{% endhighlight %}

We also added some animation with the timer, but that content is for some other post. I have added a simple working demo showing the usage of `TimerUtility` on GitHub. You can fork it [here](https://github.com/jayrambhia/TimerUtilityDemo).

P.S. So much to do with LenX. I am overwhelmed, but it's fun!