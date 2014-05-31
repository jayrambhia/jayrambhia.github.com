---
category: Blog
tag: Android
comments: true
date: 2014-05-12 17:00:00
layout: post
slug: android-facedetection
title: Face Detection using Android Camera Preview
---

I have been working on making a perfect Camera Preview interface with burst capability, touch focus, face detection, frame processing, pinch zoom and whatever that I could think of.

Android provides its own face detection API within **Android.Camera** given that your device supports it. Nexus 4 seems to support it, but Nexus 7 does not. This face detection is hardware based (probably qualcom chip).It's quite accurate and works real time. Anyway, moving on to the implementation part.

It's really easy to implement dace detection. All I had to do was create a **Camera.FaceDetectionListener** and attach it to the Camera in **Camera.PreviewCallback**.

### Implementation

Things to remember:

 - Check if face detection is supported by the device or not using Camara.Parameters
 - When calling **Camera.startFaceDetection()** function, check if face detection is not already running.
 - **Android.Hardware.Camera** gives face coordinates based on its sensor values which range from (-1000, -1000) to (1000, 1000). First one being top left corner and the latter one being bottom right corner. So now you must resample those coordinates based on your preview size or canvas size.

A class that implements Camera.PreviewCallback

{% highlight java %}

public int doFaceDetection() {
    if (faceDetectionRunning) {
        return 0;
    }
    // check if face detection is supported or not
    // using Camera.Parameters
    if (params.getMaxDetectedFaces() <= 0) {
        Log.e(TAG, "Face Detection not supported");
        return -1;
    }

    MyFaceDetectionListener fDListener = new MyFaceDetectionListener();
    mCamera.setFaceDetectionListener(fDetectionListener);
    mCamera.startFaceDetection();
    faceDetectionRunning = true;
    return 1;
}

public int stopFaceDetection() {
    if (faceDetectionRunning) {
        mCamera.stopFaceDetection();
        faceDetectionRunning = false;
        return 1;
    }
    return 0;
}

private class MyFaceDetectionListener 
              implements Camera.FaceDetectionListener {

    @Override
    public void onFaceDetection(Face[] faces, Camera camera) {

        if (faces.length == 0) {
            Log.i(TAG, "No faces detected");
        } else if (faces.length > 0) {
            Log.i(TAG, "Faces Detected = " + 
                  String.valueOf(faces.length));

            public List<Rect> faceRects;
            faceRects = new ArrayList<Rect>();

            for (int i=0; i<faces.length; i++) {
                int left = faces[i].rect.left;
                int right = faces[i].rect.right;
                int top = faces[i].rect.top;
                int bottom = faces[i].rect.bottom;
                Rect uRect = new Rect(left0, top0, right0, bottom0);
                faceRects.add(uRect);
            }
            
            // add function to draw rects on view/surface/canvas
        }
    }
}

{% endhighlight %}

I implented a custom view(based on View) on top of the Preview Surface to show rectangles drawn around the faces.

![Image](/assets/images/facedetect-1.jpg)

P.S. Working on an app which corrects selfies.