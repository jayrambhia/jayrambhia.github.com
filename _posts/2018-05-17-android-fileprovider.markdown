---
category: Blog
tag: Android
comments: true
date: 2018-05-17 16:00:00
layout: post
slug: android-fileprovider-ecosystem
title: How to get away with READ/WRITE permissions on Android
description: Use fileprovider and the android ecosystem to create/edit/share files without asking users for Read and Write permissions.
keywords: [android, android development, androiddev, dev, kotlin, android permissions, read_external_storage, write_external_storage, fileprovider, android ecosystem, read file, write file, share file, share image, save file]
category_tag: [Android, FileProvider]
---

Android has been using permissions since its beginning but never really enforced the correct usage until Marshmallow and developeers took advantage of it and went rampant. Since Marshmallow (API 23, Android 6.0), android ecosystem introduced permission requests and now we have to ask user to explicitly provide permissions which is really good in the sense of privacy for the users, but adds a lot of work for developers and provides kind of bad user experience.

This article has a bit of clickbait title and does not focus on any hacks but leverages Android's ecosystem to show how an app can read, write and share files without requiring `READ_EXTERNAL_STORAGE` and `WRITE_EXTERNAL_STORAGE`. Each app in Android runs in its own system, like a sandbox. These sandboxes are not connected from one another which provides security. Now, to work with other apps, Android system has provided certain tools and one of them is **FileProvider**. FileProvider is a special subclass of `ContentProvider` that facilitates secure file sharing with other apps by creating `content://` uri. We will come back to this later.

TODO: some stuff here like a seguway 

**Note**: This post is not intended towards Read/Write heavy files such as a photo gallery or a music player. If your app occassionally write a file, eg. export some file or save an image once in a while, you may find this interesting.

# Create a file

As the title says, you don't need to have `WRITE_EXTERNAL_STORAGE` permission to create a file and write to it. If you use app's internal storage to write a file, you don't need write permission.

## Write to internal storage

Files in your app's internal storage are private and secure from other apps. On Android 6.0 and lower, other apps can read your app's internal files if you set the file mode to world readable. This mode has been deprecated and will throw a `SecurityException` from Android 7.0. To share an internal file, you need to use `FileProvider`.

Create a file in internal storage - `context.getFilesDir()` returns a `File` representing an internal directory of your app.

{% highlight kotlin %}
val file = File(context.filesDir, name)
{% endhighlight %}

You may also use `context.openFileOutput()` to get a `FileOutputStream` to write.
{% highlight kotlin %}
context.openFileOutput(filename, Context.MODE_PRIVATE).use {
	it.write(fileContents.toByteArray())
}
{% endhighlight %}

Read more about writing to internal storage on Android docs - [Write to internal storage](https://developer.android.com/training/data-storage/files#WriteInternalStorage)

## Write to cache

App's cache directory is uniquely associated with the app. This directory is meant for temporary storage and the system may delete the files if running low on storage.

{% highlight kotlin %}
val file = File(context.cacheDir, name)
{% endhighlight %}

## Write to external storage
Now, coming to the most important part. We can write to external storage without asking for `WRITE_EXTERNAL_STORAGE` permission. Android 4.4 (API 19) introduced `Storage Access Framework` (SAF) which makes it simple for users to browse and open documents, images, and other files across all of their their preferred document storage providers. We'll use SAF to create a new file and write to it.

{% highlight kotlin %}
val intent = Intent(Intent.ACTION_OPEN_DOCUMENT)
	.addCategory(Intent.CATEGORY_OPENABLE)
	.setType(mimeType)
	.putExtra(Intent.EXTRA_TITLE, filename)

startActivityForResult(intent, requestCode)	 
{% endhighlight %}

This intent will trigger Storage Access Framework and the user will see a document browser prmopting user to save the file. Once user saves the file, the app gets callback with uri of the file. `mimeType` will depend on what type of file you're going to write. eg. `txt/plain` for a text file, `image/png` for a png image, `applicatio/pdf` for a PDF, etc.

{% highlight kotlin %}
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
	super.onActivityResult(requestCode, resultCode, data)
	when(requestCode) {
		YOUR_REQUEST_CODE -> {
			if (resultCode == Activity.RESULT_OK && data?.data != null) {
				val uri = data?.data
				// Use this uri to write your data.
			}
		}
	}
}
}
{% endhighlight %}

The Storage Access Framework creates a new file with the given name and provides your app with a uri generated from FileProvider. Your app gets temporary access to write to this file (via uri). We can use `FileDescription` to write to this file.

{% highlight kotlin %}
try {
    val pfd = context.contentResolver.openFileDescriptor(uri, "w")
    val fos = FileOutputStream(pfd.fileDescriptor)
    fos.write(data.toByteArray())
    fos.close()
    pfd.close()
} catch (e: FileNotFoundException) {
    e.printStackTrace()
} catch (e: IOException) {
    e.printStackTrace()
}
{% endhighlight %}

That's it! You have created a file in external storage and written to it without asking user for storage permissions. Read more about SAF on android docs - [Document Provider](https://developer.android.com/guide/topics/providers/document-provider).

# Read a file

To reaa a file from external storage, your app needs to have `READ_EXTERNAL_STORAGE` permission (or `WRITE_EXTERNAL_STORAGE` permission). But we can leverage Storage Access Framework, other apps (gallery, file explorer, etc) to let user a pick a file that they want to use. Reading from internal storage or cache directory does not require any system permissions.

## Reading from external storage

{% highlight kotlin %}
val intent = Intent(Intent.ACTION_OPEN_DOCUMENT)
	.addCategory(Intent.CATEGORY_OPENABLE)
	.setType(mimeType)

startActivityForResult(Intent.createChooser(intent, "Select file via"), requestCode)
{% endhighlight %}

mimeType is based on what type of file you want user to select. eg. `txt/plain` for a text file, `image/png` for a png image, `applicatio/pdf` for a PDF, etc. This intent will trigger an application (or an app chooser) using which user can pick a file. This will return your app an uri generated from FileProvider and your app gets temporary access to read the file.

{% highlight kotlin %}
override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
	super.onActivityResult(requestCode, resultCode, data)
	when(requestCode) {
		YOUR_REQUEST_CODE -> {
			if (resultCode == Activity.RESULT_OK && data?.data != null) {
				val uri = data?.data
				// Use this uri to write your data.
			}
		}
	}
}
}
{% endhighlight %}

If it's a text file, reading the contents is very easy. `context.contentResolver.openInputStream(uri).reader().readText()`

If it's an image file, you can use `FileDescriptior` to convert to Bitmap.

{% highlight kotlin %}
val pfd = context.contentResolver.openFileDescriptor(uri, "w")
val fd = pfd.fileDescriptor
val image = BitmapFactory.decodeFileDescriptor(fd)
pfd.close()
{% endhighlight %}

So yes, if you have an app which seldom reads from external storage, you may use this method to read files without requiring explicit permissions. Read more about [Document Provider](https://developer.android.com/guide/topics/providers/document-provider).

# Share a file

Sharing some information from the app has become one of the most basic requirments and users want to share a lot of things with their friends, eg. a note, an image, something that they drew, etc. To improve secuirty and also to make sure that other apps with which the content is being shared with has the correct permissions, Android introduced **FileProvider**. As mentioned above, FileProvider is a special subclass of `ContentProvider` that facilitates secure file sharing with other apps by creating `content://` uri.

Above we used other apps to create and read files from external storage. This is only possible because of FileProvider. Android does not allow sharing `file://` uri and will immediately throw **FileUriExposedExceptio** which will crash the app. So when an app wants to share a file with other apps, the app creates a content uri using FileProvider, grants temporary read or write access to the other app (via intent) so that the other apps can have access to the file regardless if they have READ/WRITE permission or not.

I think FileProvider is the single most useful feature in android ecosystem. FileProvider comes with support library so we don't have to worry about OEM updates.

## Setup FileProvider

Setting up FileProvider takes about 5 mins and once it's done, you don't have to worry about it at all.

In your app's `AndroidManifest` declare a provider.

{% highlight xml %}
<manifest>
...
  <application>
  ...
	<provider
	  android:authorities="${applicationId}.provider"
	  android:name="android.support.v4.content.FileProvider"
	  android:exported="false"
	  android:grantUriPermissions="true">

	  <meta-data
	    android:name="android.support.FILE_PROVIDER_PATHS"
	    android:resource="@xml/fileproviderpaths" />

	</provider>
  ...
  </application>
...
</manifest>  
{% endhighlight %}

`android:authorities` attributes to a URI authority based on a domain you control; for example, if you control the domain mydomain.com you should use the authority com.mydomain.fileprovider. Or you can just set it based on your app id. If you use `${applicationId}`, during the build, gradle will replace it with your actual app id, so if you have different build variants and flavors, this would avoid conflict of having multiple apps with same authority. 

Keep `android:exported` attribute as false as the FileProvider does not need to be public. Set the android:grantUriPermissions attribute to true, to allow you to grant temporary access to files.

### Specify available files

In the `meta-data` you have to define what files are available through fileprovider for other apps to use. This does not mean that other apps have access to those files. Other apps will have access only when your app generates a content uri using FileProvider, shares it with the other apps via intent and grants uri permissions.

Create a folder named `xml` in your app's `res` directory and create a file named `fileproviderpaths.xml`. You may keep any name, just make sure that it's reflected in the manifest.

{% highlight xml %}
<paths xmlns:android="http://schemas.android.com/apk/res/android">
  <files-path name="name" path="directory path"/>
  ... more paths
</paths>
{% endhighlight %}

`name` provides path segment to uri which increases security as this value hides the name of the subdirectory that your app is sharing. `path` provides subdirectory that you are sharing. `path` value has to be a subdirectory. You can not share a file by its file name or using wildcards.

There are different tags avaialable for different tpyes of storage. 

 - `<files-path>` is for intenral storage subdirectory.
 - `<external-path>` is for external storage subdirectory.
 - `<cache-path>` is for cache storage subdirectory.

You can find more types of tags to specify files on Android docs - [Specifying available files](https://developer.android.com/reference/android/support/v4/content/FileProvider#SpecifyFiles).

Once this setup is done, we are ready to share files with other apps.

## Share files

{% highlight kotlin %}
val uri = FileProvider.getUriForFile(context, "${BuildConfig.APPLICATION_ID}.provider", file)
# The authority must match the authority declated in the manifest.

val intent = Intent(Intent.ACTION_SEND)
	.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
	.putExtra(Intent.EXTRA_STREAM, uri)
	.putExtra(Intent.EXTRA_TITLE, filename) // If necessary
	.setType(mimeType)

startActivity(Intent.createChooser(intent, "Share via"))	
{% endhighlight %}

So, yeah. You have shared your file securely with other app and the other app has temporary access to your file via content uri.

You should definitely read more about FileProvider and how cool it is on Android docs - [FileProvider](https://developer.android.com/reference/android/support/v4/content/FileProvider).

As FileProvider often likes to say and I quote

> Respect my authoritaaahh!

FileProvider is a really great concept and it works so well. You can request longer access to files using it and so much more.

# Epilogue

I was adding support for offline export and import of data in my app - **[Flutter: Instant Movie Ratings](https://github.com/jayrambhia/MovieRatings)** (written in Kotlin, not Flutter), I added permission to manifest, did whole shbang of asking permissions to write files. I really don't like permissions so I google-fu'ed and found out about Storage Access Framework, DocumentProvider, FileProvider and re-did the whole import/export functionality and removed the permissions. The app request permission just for internet access.


