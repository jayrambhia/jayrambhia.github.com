---
category: Blog
tag: Android
comments: true
date: 2014-08-15 15:00:00
layout: post
slug: android-audio-cursor
title: Get Metadata of Audio files using Cursor in Android
keywords: [android development, android media player, android content resolver, android artist data, music player tutorial, android playlist]
---

We are building a music app and as you would have guessed we would require all the audio metadata. At first, we tried using Android's Intent but it would let us select only one audio file at a time. Also, there was a setback if the user had disabled the default music player and other player did not listen to this intent. So we tried to look up for other ways to obtain metadata of all the audio files. We first used [MediaMetaDataRetriever](http://developer.android.com/reference/android/media/MediaMetadataRetriever.html) but it would give null String for some of the audio objects.

After a bit of searching, we found an easy method which would give us all of the required metadata and that too very quickly. We used Android's `ContentResolver` to query external audio files of the device.

### Query using ContentResolver

{% gist jayrambhia/f2c04188c8b314abea4e audio_cursor.java %}

<br/>

### Extracting Metadata from Cursor

After getting the cursor, we would extract the metadata and create new instances of `QueryObject` (our class to handle audio queries) for each entry.

{% gist jayrambhia/f2c04188c8b314abea4e QueryObject.java %}

<br/>

To show all these audio files, we were using custom `ArrayAdapter` and `ListView`.

P.S. The app is turning out to be really cool.