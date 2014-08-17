---
category: Notes
tag: Java
comments: true
date: 2014-06-26 17:00:00
layout: post
slug: java-reflection
title: java.lang.reflect.Method for Callback methods
---

I keep looking for ways to do things right. For calling some function of my activity, I'd pass activity to that class and call that particular method. I did not feel right doing this and I wanted to make my class more generic so I started looking for better approaches. I found this approach, where I can pass any function as `reflect.Method` and invoke it in that class. This seemed perfect, but as it turns out this also has some issues of its own.

Using `getDeclaredMethod` we can create Method instance. And pass it to the class for callback.

## Activity class

{% highlight java %}

import java.lang.reflect.Method;

public class MyActivity extends Activity {
    
    private SimpleButton button1;
    private SimpleButton button2;

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        button1 = new SimpleButton();
        try {
            Method method1 = null;
            method1 = MyActivity.class.getDeclaredMethod("onButton1Clicked",
                boolean.class);
            button1.setCallalbes(method1);
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }

        button2 = new SimpleButton();
        try {
            Method method2 = null;
            method2 = MyActivity.class.getDeclaredMethod("onButton2Clicked", 
                boolean.class);
            button2.setCallalbes(method2);
        } catch (NoSuchMethodException e) {
            e.printStackTrace();
        }
    }

    public void onButton1Clicked(boolean state) {
        // do something
    }

    public void onButton2Clicked(boolean state) {
        // do something
    }

}

{% endhighlight %}

### SimpleButton class

Once we set the callback function using `reflect.Method`, we can call it with onTouchListener or any other functions.

{% highlight java %}

public class SimpleButton {
    
    private Method callbackFunc;
    private boolean state;

    public SimpleButton() {

    }

    public void setCallables(Method cFunc) {
        callbackFunc = cFunc;
    }

    private void invokeCallbackFunctions(boolean state) {
        if (callbackFunc != null) {
            callbackFunc.invoke(state);
        }
    }
}

{% endhighlight %}

But the trouble doesn't end here. I tested it and it was working fine. I uploaded it on PlayStore for Beta Testing. It just didn't work. I downloaded the app from PlayStore, tried it and checked Log. It gave me `methodNotFoundException`. After a bit of googling, I found out this was due to `proGuard`. I didn't add exceptions in its config. We had to add these methods in proguard-properties and after few tries it worked.

P.S. Building a real app is much complicated.