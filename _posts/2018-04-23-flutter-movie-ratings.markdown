---
category: Project
tag: Android
comments: true
image:
 twitter: https://raw.githubusercontent.com/jayrambhia/MovieRatings/master/screenshots/playstore_logo.png
 facebook : https://raw.githubusercontent.com/jayrambhia/MovieRatings/master/screenshots/playstore_logo.png
 height: 270
 width: 180
date: 2018-04-23 22:00:00
layout: post
slug: flutter-movie-ratings
title: Flutter - An app to get movie ratings on-demand
description: Flutter - Movie Ratings - An open source android app to get movie ratings on-demand
keywords: [android app, open source, kotlin app, android kotlin, clean architecture, movie ratings, netflix ratings, imdb, prime video, open movie database, accessibility services]
---

Flutter is an open source android app completely written in [Kotlin](https://kotlinlang.org/). The idea behind Flutter comes from a necessity. I would spend a lot of time on Netflix just find a good movie to watch. It was difficult to find a good movie because Netflix would show its own ratings which are not at all reliable and more often than not I would end up watching a bad movie. I wanted something which would show me the IMDb rating of the movie on Netflix. I didn't find anything that would work on Android so I thought of writing my own app and named it Flutter.

<p align="center">
<img src="https://raw.githubusercontent.com/jayrambhia/MovieRatings/master/screenshots/playstore_logo.png" width="240px"/>
</p>

:-----------------:-----------------:
![screenshot 1](https://raw.githubusercontent.com/jayrambhia/MovieRatings/master/screenshots/f1.png)| ![screenshot 2](https://raw.githubusercontent.com/jayrambhia/MovieRatings/master/screenshots/f2.png)

### What's Flutter?

Flutter uses [Android's accessibility services](https://developer.android.com/reference/android/accessibilityservice/AccessibilityService.html) to read the titles of the movies and TV shows from Netflix app. Once the title is obtained, the app would send a query to the [open movie database](http://www.omdbapi.com/) to get the movie ratings and show it in floating window over the app.

### Open Source

Flutter was closed source during its inception and for a few versions. I realized that there was nothing worth to be kept hidden as I made the first working version in couple of days so I thought anyone else could also do the same. So I decided to make it open source and changed some build configurations in order to hide my API key, added flavors to strip [Crashlytics](https://try.crashlytics.com/) and [Fabric](https://fabric.io/) events from the open source version. It's available on Github - [MovieRatings](https://github.com/jayrambhia/MovieRatings).

### Kotlin

Flutter is my first app that I have written in Kotlin. I chose to go with Kotlin as Google [announced](https://blog.jetbrains.com/kotlin/2017/05/kotlin-on-android-now-official/) that they have started supporting it and I thought this would be a good learning exercise. Initially, the code seemed a lot like Java and once I completed [Kotlin koans](https://kotlinlang.org/docs/tutorials/koans.html), I made some changes to make it more Kotlin-y. I experienced that it was similar experience when I was starting with Python. There are a lot of ways to write a code, but there are some **pythonic** ways to do it. It's similar with Kotlin. I started improving the code and using some functionality such as map, sortBy, etc. There were also some syntax issues with RxKotlin initially, but I got over them. I wouldn't say that the code is a good example of Kotlin, but I'm making progress and change stuff when I learn more about it. Eg. I started using sealed classes for UI states which seem to be a good usecase.

### Accessibility Services

Android offers a wide range of accessibility services that developers can leverage to create innovative apps and also offer some features to people with disabilities. Flutter uses accessibility services to get `window state changed` and `window content changed` for the supported apps. Once it receives `window content changed` event, it looks for nodes with specific view id which Netflix uses to show the title of the movie.

### Open Movie Database

OMDb is a great API to get information and ratings of the movies. It's free with limited usage and operates on [Patreon donations](https://www.patreon.com/bePatron?u=5038490). It doesn't have as much information as [TMDb](https://www.themoviedb.org/documentation/api) or [TVDb](https://api.thetvdb.com/swagger) but it gets the job done. It offers APIs to search for movies based on a title or search query, get movie info based on IMDb ID.

### Search and Collections

Initially, I didn't have any plans of adding features to search for movies, get more information and add them to collections. As time passed and I needed some pet project to get better at Kotlin, I decided to add more features to Flutter. Now, I actively develop it, add new features and also take user requests.

### Contribution

Flutter is open for contribution but hasn't received any. Here's the [issues page](https://github.com/jayrambhia/MovieRatings/issues) and the [project page](https://github.com/jayrambhia/MovieRatings/projects/1). Feel free to add feature requests, issues, or have a look if you're interested in contributing.

### Download

Flutter is available on [Playstore](https://play.google.com/store/apps/details?id=com.fenchtose.flutter&referrer=utm_source%3Djayrambhia_project) and on [Github](https://github.com/jayrambhia/MovieRatings/releases).