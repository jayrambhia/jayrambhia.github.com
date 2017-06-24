---
category: Blog
tag: Android
comments: true
image:
 twitter: /assets/images/litho-demo-1.jpg
 facebook : /assets/images/litho-demo-1.jpg
 height: 270
 width: 180
date: 2017-04-22 22:00:00
layout: post
slug: android-litho-gifs
title: Build Android GIF search engine using Litho by Facebook
description: Litho (by Facebook) tutorial to build a GIF search engine in Android using Giphy.
keywords: [android, android development, androiddev, dev, litho, react, ui, gif, gifs, search, engine, facebook, open source, recyclerview, props, state]
---

I recently tried my hands with [React](https://facebook.github.io/react/) - A Javascript library for building user interfaces. I started following this amazing tutorial - 
[React 101](https://blog.tighten.co/react-101-building-a-gif-search-engine) by [Tighten](http://blog.tighten.co/). I had just finished building my first GIF search engine
and Facebook open sourced [Litho](http://fblitho.com/) - A declarative UI framework for Android. Well, Litho takes a lot of inspiration from React. I had just started to get my hands dirty with React (and liked it), I thought I give Litho a try. So what should I do? GIF search engine for Android using Litho!

![Basic android recyclerview using Litho](/assets/images/litho-demo-1.jpg)
*GIF search engine with Litho - Android*

# Preface

This is a first post in the series - **Exploring Litho**. We will explore various apsects of Litho including LayoutSpec, MountSpec, Props and State, Navigation, Events, State synchronization between Litho components. In this post, we will see how to add dependency of Litho in your project's build.gradle file, followed by a brief introduction of Components and how we can use these components to build ourselves a GIF search engine.

# Introduction to Litho by Facebook

Litho is a declerative UI framework for Android. It uses [Yoga](https://facebook.github.io/yoga/) - cross-platform layout engine which uses Flexbox like styling. Before, proceeding further, I would suggest that you go through [Getting Started](http://fblitho.com/docs/getting-started) and [Tutorial](http://fblitho.com/docs/tutorial) of Litho.

Since Litho seems to be inspired from React, it uses `Components` and you can make a great UI with adding bunch of components and those components are reusable! Facebook has spent a lot of time and resources in making Litho efficient. It wants to be so efficient that it generates most of its own code. As an end user, you can not create a Component (You can but it would not be efficent). You write a `ComponentSpec` and Litho will generate all the code for you. Have you used Dagger 2? Yes, it's that amount of generated code so I guess method count is going to go sky high! There are two types of CompoentSpec.

	1. LayoutSpec
	2. MountSpec

MountSpec is if you want to customize a lot of things. We'll talk about it later. LayoutSpec - quoting from the docs,

	A layout spec is the logical equivalent of a composite view on Android. It simply groups existing components together in an immutable layout tree.


Let's just dive into it.

# Adding Litho as Dependecy

In your **build.gradle** file, include these things to add Litho as a dependency to your project.

{% highlight groovy %}
// Litho
compile 'com.facebook.litho:litho-core:0.2.0'
compile 'com.facebook.litho:litho-widget:0.2.0'
provided 'com.facebook.litho:litho-annotations:0.2.0'

annotationProcessor 'com.facebook.litho:litho-processor:0.2.0'

// SoLoader
compile 'com.facebook.soloader:soloader:0.2.0'
{% endhighlight %}

We need to initialize `SoLoader` to mke Litho work. We'll do this in our Application class. Let's create a class `MyApplication` which extends `Application`.

{% highlight java %}
public class MyApplication extends Application {
	@Override
	public void onCreate() {
		super.onCreate();
		SoLoader.init(this, false);
	}
}
{% endhighlight %}

Don't forget to add MyApplication class to `AndroidManifest`. Now, we are ready to work with Litho. Before diving into the code, let's ponder on what we are going to make and how Litho will help us build it.

# GIF search engine App
It's just a simple one screen - no navigation (yet) app to search GIFs from [Giphy](http://giphy.com/). It's a glorified search engine. I have used Retrofit to fetch data and Glide to load gifs. We don't need to cover that in this series so you can just grab the code from Github repository.

## Layout of a search engine

Since it's a simple app, all we need is an `EditText` and a `RecyclerView`. Conventionally, we would use a `LinearLayout` with vertical orientation and add an EditText and a RecyclerView in XML. But we're going to talk Litho and bit of React. In Recat, these things are considered components. So Let's start there.

## Components
We will start with one component to hold EditText and RecyclerView. Let's call it `HomeComponent`.

### HomeComponent
To generate HomeComponent, we require a HomeComponent Spec. We will create a class named `HomeComponentSpec` and annotate it with **@LayoutSpec**. This annotation lets Litho know that this is a component spec class and it needs to generate component from it. Litho doesn't know what to render. It expects `ComponentLayout` so we will create a static method which returns ComponentLayout annotated with `@OnCreateLayout`. ComponentLayout represents a component's compound layout state. Litho uses it to define the size and position of the component's mounted Views and Drawables. In simpler terms, it tells Litho what to draw and where to draw.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a HomeComponentSpec.java %}

Litho will generate **HomeComponent** class which we will use. If you notice, we are using `@Prop String hint`. **`@Prop`** comes from React where you can pass some properties to components. For HomeComponent, it is not required to pass this prop as we can hardcode it. But for demonstration of how props work we are going to use it. We take this property and set it as EditText's hint. We need to stack the views horizontally, so we are using `Column` as it stacks the views horizontally. We can add views with `child` method.

Note: EditText is a litho's widget. It is **to be confused** with Android's EditText because litho's EditText renders Android's EditText.

To display HomeComponent on the screen, we will modify `MainActivity`. Litho provdes a builder pattern to create a component so that if we change some parameters, we don't have to update the constructor again and again. It also helps when we have a lot of props. Litho is quite smart and it generates code based on the variable/parameter name. We have added **~@Prop String hint`** so it will create a builder method `hint(String hint)` and we can pass the value using it.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a MainActivity.java %}
<br/>
<br/>
### What is ComponentContext?
ComponentContext is a context subclass used by Litho internally to keep track of a lot of things including components.

If you run the app now, you'll just see an EditText at the top. We have not added any data/views to the RecyclerView component. Try chaning the hint prop by updating the value that we pass to the builder and run the app again. It's so much better than hardcoding it. What would happen if we do not pass hint prop to the component?

The screen is empty and our aim is to show GIFs in a list or a grid. We will first add some dummy data to see how exactly things work with Litho and RecyclerView.

### GifItemViewComponent
As we discussed, all the views are components. Each item in the RecyclerView will also be a component. We need to make a component for that.
Since we are going to show a gif, let's name it GifItemViewComponent. We will write write a Component Spec for it. Before jumping into images, let's try displaying a basic TextVeiw.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a GifItemViewSpec.java %}

Now, we need to add some dummy data so that we can see something on the screen. We need to update `HomeComponentSpec.getRecyclerComponent`.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a HomeComponentSpec-Recycler.java %}
<br/>
<br/>
### What is RecyclerBinder?

`RecyclerBinder` is sort of a super RecyclerView Adapter which takes care of creating views. It's supposed to be highly optimised. RecyclerView Adapter recycles ViewHolders but RecyclerBinder recycles each view (component to be correct) based on the type. If we have two different components for different items in Recycler as Component1 and Component2. Text (child) component of Component1 may be recycled and used in Component2. Litho would take care of correctly measureing and redering the recycled components.

We don't have to write boilerplate code for RecyclerBinder like we do for RecyclerView.Adapter. We don't need to have a specific dataset. 

`binder.insertItemAt(position, ComponentInfo)` is used to add Component at a specified position.

### What is ComponentInfo?
ComponentInfo keeps the component and necessary information regarding how to render the component. It even takes care of `span size` and `isSticky`. It is so difficult to have a sticky item in a RecyclerView but Litho does it all under the hood and gives us simple APIs.
<br/>
<br/>
We have added some data to RecyclerBinder and let's see what it renders on the screen when we run the app. No surprises! It renders exactly 20 items which display **Hello World**, Let's add more items and see how the scrolling works. No issues at all! It uses RecyclerView under the hood but with super optimizations.

Static content is nice, but we want to know how easy or difficult it would be to have some dynamic content. One easy way to add dynamic content would be to add a `@Prop` to our component and pass diffreent values for different items.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a GifItemViewSpec-1.java %}

We should update our `Recycler.insertItemAt` method. We have defined `@Prop String title` for our component and if we do not provide it via builder, Litho will throw a RuntimeException.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a HomeComponentSpec-Recycler-1.java %}

Let's hit that run button again. Yes, we see different data for different items even after scrolling. RecyclerBinder is recycling the views correctly as we don't see any data repetitions. Let's add some more data and scroll it like crazy. Data is not jumbled up so we can safely assume that Litho's RecyclerBinder is going to work just as well if not better as RecyclerView.Adatper.

We know that Litho can handle dynamic data well. But is the data really dynamic? We usually have a lot of APIs and we populate the data based on the response and update the adapter. Let's find out if we can do that with RecyclerBinder or not. We can call some API to give us some data so that we can feed it to the RecyclerBinder but that would mean a lot of boilerplate. There's an easy way to replicate the behavior. We'll use a `Handler` and feed data via a `Runnable` which we call using `Handler.postDelayed`. We also need access to RecyclerBinder so let's modify our HomeComponent and add the Handler in MainActivity. Since we need access to RecyclerBinder, we will create an instance in MainActivity and pass it to HomeComponent as a **Prop**.

### Dynamic Updates
After a lot of trial and erros, I figured out a better way to do it. Since we use `RecyclerBinder` to add/remove components, we just need access to that. So I decided to pass binder as a prop.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a HomeComponentSpec-1.java %}

<br/>
Let's change our MainActivity to create an instance of RecyclerBinder to pass it to HomeComponent and add a Handler to feed data to the binder after some time.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a MainActivity-1.java %}

Let's run the app and see if this works or not. It does. That's great news because now we know that we can also feed the response of API to the recyclerview. But, how would we update the data if the API is called again or user calls refresh. RecylerBinder provides following methods.

 - removeItemAt(int position)
 - removeRangeAt(int position, int count)

We can remove particular or all the items and insert new items.

<br/>
<br/>

We have established that we can update the data dynamically. We will start working on the part - Listen to updates in the EditText value.

## Getting EditText Value in Litho

EditText that we are using is a Litho Component and it does not have the verbose `onTextChangeListener(TextWatcher watcher)` method. For these things Litho relies heavily on its **`Event`** API.

## What is Event in Litho?

Litho provides a general purpose API to connect components through events. The components that are provided by Litho have all the necessary callbacks and events baked into it. We'll explore Event API in upcoming posts. EditText component builder has **`.textChangeEventHandler`** method which lets us pass an `EventHandler`. More about EventHandler in upcoming posts. Litho will generate an EventHandler for us if we want. To do that, we need to create a static method with annotation `OnEvent(TextChangeEvent.class)`. This annotation lets Litho know that we want an EventHandler for the given Event class. Another example of an Event class is - `ClickEvent`. If we dig in the source code and check out TextChangeEvent class, we'll see it's just a dumb class.

{% highlight java %}
@Event
public class TextChangedEvent {
  public String text;
}
{% endhighlight %}

With `@Event` annotation, Litho will know that it's an Event class and it will generate some code for it. The field `String text` is to let Litho know that this event will carry some data and the variable name of the data.

In our component class, this is show our @OnEvent method will look.

{% highlight java %}
@OnEvent(TextChangedEvent.class)
static void onQueryChanged(ComponentContext c, @FromEvent String text) {

}
{% endhighlight %}

It's so amazing. Everything is so interconnected by annotations. Based on this method, Litho will generate a method in our component - `static EventHandler onQueryChanged(ComponentContext c)`. It's like **What You See Is What You Get**. ComponentContext takes a piggy back ride and comes everywhere.
<br/>

Let's add a log statement to see if it even works or not.

{% highlight java %}
@LayoutSpec
public class HomeComponentSpec {
  ... some code here

  private static Component<EditText> getEditTextComponent(ComponentContext c, String hint) {
    return EditText.create(c)
        .textSizeDip(16)
        .hint(hint)
        .textChangedEventHandler(HomeComponent.onQueryChanged(c))
        .build();
  }
  
  @OnEvent(TextChangedEvent.class)
  static void onQueryChanged(ComponentContext c, @FromEvent String text) {
    Log.d("TextChangedEvent", "Value: " + text);
  }
  
} 
{% endhighlight %}

<br/>
It does work. We get the correct value as soon as we update something in the EditText. We need to send this value to our MainActivity so that we can call some API. We'll do this via callback. We'll declare an interface, pass its implementation as a `@Prop` to HomeComponent and invoke in `onQueryChanged` method.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a HomeComponentSpec-2.java %}

<br/>
Litho API is quite amazing. Even though we have passed our Prop in some different method, it will pick it up and add to the builder. We'll create an implementation of the callback interface and pass it to the builder.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a MainActivity-query.java %}
<br/>
Let's run the app once again and see if what we just did works or not. It does because I have spent some time exploring litho and finding correct ways to do stuff.
<br/>
Step by step we have tested and integrated small things to make our GIF search engine. The last thing remaining is - **Showing GIFs**. Conventionally, we would just use `ImageView` and load GIFs using `Glide`. Let's see what component Litho provides for ImageView.

### Image Component in Litho
Litho provides `Image` component for us to use but it's not as flexible as `ImageView`. It doesn't have `setBitmap` method. We can convert Bitmap to a Drawable and set it but loading GIFs is asynchronous task and how would we set it in the Image component? Props are immutable and State is really difficult to manage outside the component. Even Glide doesn't support `Image`. After looking into Litho's samples, they have used Image component with `Fresco`. We don't want to be tied down with a particular library. If we can use Glide, we can modify the component a bit to use Piccasso or any other image loading library. It's about time we made our custom component. To create a custom component and customize how and what it renders, we'll use **`@MountSpec`**.

### What is MountSpec?
A mount spec defines a component which can render itself. So if we ever want to create something that needs customizing or not provided by Litho, we should create a mount spec.

### How to use MountSpec to create an ImageView component?

 - To create a mount spec, we need to annotate the class with `@MountSpec`.
 - In a layout spec, it is necessary for us to define a method with `@OnCreateLayout` annotation. Similarly, in mount spec, we must define a method annotated with **`@OnCreateMountContent`**. This method will be called before the component is mounted on the host. This is where we'll prepare/initialize the item that we want to render. We may return `View` or `Drawable` in this method. Litho will render the value that we return in this method. Here, we want to render an ImageView so we will create a new instance of ImageView and return it.
 - We will also create a static method annotated with `@OnMeasure`. This method will be called during layout calculation. Sometimes if the component doesn't need layout calculation, this method will not be called. We will use `MeasureUtils.measureWithDesiredPx()` method provided by Litho. We'll pass fixed width and height for each component. This method updates `Size size` parameter which Litho uses for layout calculation.

You can find in-depth docs about MountSpec [here](http://fblitho.com/docs/mount-specs).

To test if the ImageView will render correctly, we'll just set a static drawable to it. If that works, it should also work for Bitmaps.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a GifItemViewSpec-2.java %}

We have updated GifItemViewSpec from `LayoutSpec` to `MountSpec` and updated bunch of methods. The component does no longer require `@Prop String title` so we would need to update MainActivity as Litho would remove `.title(String title)` method from the builder on code generation.

Let's also update the RecylerBinder to show grids of 3 columns.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a MainActivity-grid.java %}

Let's hit that run button again and see what we get. It is as expected. We see a grid of 3 columns with android icons everywhere!

![Litho custom ImageView component using MountSpec](/assets/images/litho-demo-2.jpg)
*ImageView component using Litho MountSpec*

We are sure that we can use `ImageView` and this deduces that we can also use Glide, Piccasso or any other image loading and caching library with Litho. Let's start working on the final part to make ourselves a GIF search engine.

### Boilerplate
We'll use `Retrofit` to fetch data from Giphy search API and feed it to the RecyclerBinder. Nobody likes writing boilerplate code so here's the `model` part of this app - [models](https://github.com/jayrambhia/LithoGifSearch/tree/v1/app/src/main/java/com/fenchtose/lithogifsearch/models).
<br/>
Let's create a POJO to hold GIF data - GitItem. 

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a GifItem.java %}
<br/>
We'll pass an instance of GifItem as a prop to GifItemView so that it can access the url of the GIF.

### Use Glide with ImageView component in Litho
Glide is a magical library which is quite convinient and easy to use. We just need to call `Glide.with(context).load(url).into(imageview)`.

 - We will create a static method annotated with `@OnMount`. This method will be called after `@OnCreateMountContent` and before the component is mounted to the host. This is where we should set a bitamp or a drawable to the ImageView. Litho will give us a reference to the value returned by `@OnCreateMountContent` method in `@OnMount` method as a parameter. We would call Glide to load image into the ImageView in this method.

 - In `@OnMeasure`, we'll use `MeasureUtils.measureWithAspectRatio` and pass aspect ratio of 1 to get square images.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a GifItemViewSpec-3.java %}
<br/>
### More Boilerplate
Let's update our MainActivity call API and feed data to RecylerBinder. We'll use `OnQueryUpdateListener` to get data and call API using Retrofit and once we get the data, we will feed it to the binder. We also don't want to make API calls for every characeter that user enters so to make things easy, let's keep a limit of 6 letters - because **Batman**.

{% gist jayrambhia/cd0e65e1b24f45d2bb05a790e812468a MainActivity-2.java %}

`GifProvider` takes care of initializing retrofit and when `search(String query)` is called, it will make an API request and return `List<GifItem>` in `ResponseListener` callback. We could have used RxJava but it seemed out of scope for this demo.

### Final Run
Let's run the app one more time and search for batman. If it did not work, please make sure that you have added Internet permission in your AndroidManifest file.

![GIF Search Engine using Android with Litho by Facebook](/assets/images/litho-demo-1.jpg)*Custom Litho ImageView component to display GIFs with Glide*

There are some optimizations that we can do. Instead of calling `Glide.with(context)` in GifItemViewSpec, we can pass `Glide.RequestManager` as a prop.

So our GIF search engine powered by Litho (and Giphy) is ready! We'll explore more about state, good practices, and other awesome features in upcoming posts.

## Conclusion about Litho
Litho by Facebook is new, dynamic and powerful. It is definitely interesting. Facebook uses Litho in their production app for news feed so it is production ready and baked with all the necessary things. There's still more to explore about Litho.

## Be Social
If you liked this post or found it helpful, please spread the word!

## Code
You can find current code here - [LithoGifDemo - v1](https://github.com/jayrambhia/LithoGifSearch/tree/v1)

You can find the latest code (keeps updating) here - [LithoGifDemo](https://github.com/jayrambhia/LithoGifSearch)

In the next post - [Managing State in Litho](/blog/android-litho-state), we will see how we can implement state in Litho!

P.S. I do not (yet) fully understand Litho, State, Yoga, Flexbox so feel free to suggest updates and best practices.

## Series

 1. Android GIF search engine with Litho
 2. [Managing State in Litho](/blog/android-litho-state)
 3. [Navigation with Litho](/blog/android-litho-navigation)
 4. [Events with Litho](/blog/android-litho-events)
 5. [Synchronzing state between different components](/blog/android-litho-sync) 
