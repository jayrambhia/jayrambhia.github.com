---
category: Project
tag: Android
comments: true
date: 2018-04-23 22:00:00
layout: post
slug: flutter-movie-ratings
title: Flutter - An app to get movie ratings on-demand
keywords: [android app, open source, kotlin app, android kotlin, clean architecture, movie ratings, netflix ratings, imdb, prime video, open movie database, accessibility services]
---

Flutter is an open source android app completely written in [Kotlin](add link). The idea behind Flutter comes from a necessity. I would spend a lot of time on Netflix just find a good movie to watch. It was difficult to find a good movie because Netflix would show its own ratings which are not at all reliable and more often than not I would end up watching a bad movie. I wanted something which would show me the IMDb rating of the movie on Netflix. I didn't find anything that would work on Android so I thought of writing my own app and named it Flutter.

## What's Flutter?

Flutter uses [Android's accessibility services](add link) to read the titles of the movies and TV shows from Netflix app. Once the title is obtained, the app would send a query to the [open movie database](add link) to get the movie ratings and show it in floating window over the app.

## Open Source

Flutter was closed source during its inception and for a few versions. I realized that there was nothing worth to be kept hidden as I made the first working version in couple of days so I thought anyone else could also do the same. So I decided to make it open source and changed some build configurations in order to hide my API key, added flavors to strip [Crashlytics](add link) from the open source version.

## Kotlin

Flutter is my first app that I have written in Kotlin. I chose to go with Kotlin as Google [announced](add link here) that they have started supporting it and I thought this would be a good learning exercise. Initially, the code seemed a lot like Java and once I completed [Kotlin koans](Add link here), I made some changes to make it more Kotlin-y. I experienced that it was similar experience when I was starting with Python. There are a lot of ways to write a code, but there are some **pythonic** ways to do it. It's similar with Kotlin. I started improving the code and using some functionality such as map, sortBy, etc. There were also some syntax issues with RxKotlin initially, but I got over them. I wouldn't say that the code is a good example of Kotlin, but I'm making progress and change stuff when I learn more about it. Eg. I started using sealed classes for UI states which seem to be a good usecase.

## Accessibility Services

Android offers a wide range of accessibility services that developers can leverage to create innovative apps and also offer some features to people with disabilities. Flutter uses accessibility services to get `window state changed` and `window content changed` for the supported apps. Once it receives `window content changed` event, it looks for nodes with specific view id which Netflix uses to show the title of the movie.