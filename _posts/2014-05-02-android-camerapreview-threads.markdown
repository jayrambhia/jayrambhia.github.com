---
category: Blog
tag: Android
comments: true
date: 2014-05-02 19:00:00
layout: post
slug: android-camerapreview-threads
title: Android CameraPreview with PreviewCallback and Processing Frames using Threads
---

Recently, I have started working with Android extensively. It hasn't been easy. I had to figure out a lot of stuff and that too simultaneously. How UI works, how threads run, how to process frames, etc. In [my previous post](/blog/android-camerapreview-opencv), I have shown how to process each frame **onPreviewFrame** callback. In this post, I am going to write about using asynchronous threads to do image processing so that workload of ui thread reduces.

## AsyncTask

This is not much difficult. First I got familiarized with <strong>[AsyncTask](http://developer.android.com/reference/android/os/AsyncTask.html)</strong>. As the docs suggests,
<blockquote>
<strong>
AsyncTask enables proper and easy use of the UI thread. This class allows to perform background operations and publish results on the UI thread without having to manipulate threads and/or handlers.
</strong>
</blockquote>

Some important aspects of AsyncTask.

<ul>
    <li>It must be subclassed to be used.</li>
    <li>The subclass will override at least one of the methods of AsyncTask. <strong> doInBackground(Params...) </strong> is the most important one of them. This where you would want to do your processing. This runs in a background thread. </li>
    <li> <strong> onPostExecute(Result) </strong> allows you to peform necessary functions after the background processing is completed. If you want to do some changes in UI (render bitmap, change labels, etc), this where you should do it. </li>
    <li> <strong> onPreExecute() </strong> is invoked on the UI thread before executing the task. You can do necessary set up for the task here (show a progress bar etc) </li>
</ul>

Once you have configured this, it is really easy to call AsyncTask.

{% highlight java %}
    new SomeNameTask().execute(data);
{% endhighlight %}

### AsyncTask code

I have written a simple application where I get data from **onPreviewFrame** callback function. This data is in YUV format so can't be used directly. I have written a simple OpenCV native (jni based) code for YUV to Grayscale conversion.
I pass raw byte data and int array(of pixels to be filled). Raw byte data gets converted from YUV to Gray and Gray to RGBA. But since YUV data has grayscale info, we do not need to convert it grayscale. I directly convert YUV data using CV_GRAY2RGBA. And I show this grayscale image on the screen along with the preview of the frame.

In your class which extends **Camera.PreviewCallback** class,

{% highlight java %}

    @Override
    public void onPreviewFrame(byte[] data, Camera camera) {

        if (imageFormat == ImageFormat.NV21){
            Log.i(TAG, "onPreviewFrame");
            if(mProcessInProgress){
                mCamera.addCallbackBuffer(data);
            }
            if (data == null){
                return;
            }
            
            mProcessInProgress = true;
            if (mBitmap == null) {
                mBitmap = Bitmap.createBitmap(width, height,
                                              Bitmap.Config.ARGB_8888);
                myCameraPreview.setImageBitmap(mBitmap);
            }
            myCameraPreview.invalidate();
            
            mCamera.addCallbackBuffer(data);

            // set flag for processing
            mProcessInProgress = true;
            
            // call AsyncTask   
            new ProcessPreviewDataTask().execute(data);
        }
    private class ProcessPreviewDataTask
            extends AsyncTask<byte[], Void, Boolean> {

        @Override
        protected Boolean doInBackground(byte[]... datas) {
            Log.i(TAG, "background process started");

            byte[] data = datas[0];
            
            // process data function
            convertGray(width, height, data, pixels);
            
            mCamera.addCallbackBuffer(data);

            // change processing flag
            mProcessInProgress = false;

            return true;
        }
        
        @Override
        protected void onPostExecute(Boolean result){
            Log.i(TAG, "running onPostExecute");
            // set pixels once processing is done

            myCameraPreview.invalidate();
            mBitmap.setPixels(pixels, 0, previewSizeWidth,
                    0, 0, previewSizeWidth, previewSizeHeight);
            myCameraPreview.setImageBitmap(mBitmap);
        }
    }
{% endhighlight %}

So this was really interesting to work out.

Here's the <strong>[Github Repo](https://github.com/jayrambhia/AsynCamera)</strong> which you can fork.

P.S. I have been working on some computer vision based apps and also on renderscript. More posts coming soon.