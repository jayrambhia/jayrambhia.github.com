---
category: Blog
tag: Android
comments: true
date: 2013-04-17 21:00:00
layout: post
slug: opencv-android-image
title: Using Android SDK Camera with OpenCV
---

So I'm currently working on HTC Evo V 4G and was desparately trying to obtain images from both the camera. One thing was sure that I couldn't use OpenCV's Java Camera or Native Camera (it doesn't even work with ICS). I decided to use Android SDK Camera. I tried posting question on stackoverflow and OpenCV forum, but couldn't find any proper solutions. I tried taking pieces of code from wherever I could and wrote something, but it wouldn't work. I also found a perfectly working code but it was giving me Static Linkage Errors. It meant the OpenCV manager couldn't be loaded in the application. I had done everything step by step but it wasn't working.

Since my phone has two back cameras (stereoscopic), I was finding it very difficult to access both the cameras and convert it to OpenCV images (Mat format). Someone adviced me to use HTC Open Sense SDK to access both the cameras. So I downloade HTC Open Sense SDK and installed it as mentioned on [HTC Website](http://www.htcdev.com/devcenter/opensense-sdk/download-install). I loaded one of the example applications on the phone and started using it. It worked alright. I browsed the source and found a code which used 3D camera. You can find it on [HTC Website](http://www.htcdev.com/devcenter/opensense-sdk/stereoscopic-3d/s3d-sample-code/)

So, I used it as the base of my code. Tried it and switced off the 2D view. So far so good. The applicaiton was working fine. [Dan](http://trandi.wordpress.com/2012/10/13/physical-face-following-with-opencv-on-android/) advised me to use `Camera Intent`. I tried Camera Intent and it turned out to be very good. It started a new thread/application which captured image on pressing the button and also asked whether you wanted to save it or not. Pretty useful application. But it couldn't be used in my case becuase whenever I used Intent, it started the camera in 2D mode, i.e. only one camera was capturing the image. So I had to look for some other solution.

There's a [similar question](http://stackoverflow.com/questions/12966858/how-to-split-the-left-and-right-camera-images-htc-evo-3d-in-the-camera-preview) on stackoverflow which proved to be very useful. Using the code provided to capture images and store it in bytes, I used OpenCV Mat's put instance to store the data in OpenCV Mat. Plus, I edited the HTC code a bit for my own use so that I could use both cameras and store the image data in bytes.

Whenevr I pressed on text/button, using `onTouchEvent`, I'd use  `addCallbackBuffer` and `setPreviewCallbackWithBuffer` to get the raw image data in bytes.

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        switch (event.getAction()) {
        case MotionEvent.ACTION_DOWN:
        //  toggle();
            //Intent cameraIntent = new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE); 
            //startActivityForResult(cameraIntent, 1337);
            int bufferSize = width * height * 3;
            byte[] mPreviewBuffer = null;

            // New preview buffer.
            mPreviewBuffer = new byte[bufferSize + 4096];

            // with buffer requires addbuffer.
            camera.addCallbackBuffer(mPreviewBuffer);
            camera.setPreviewCallbackWithBuffer(mCameraCallback);
            break;
        default:
            break;
        }
        return true;
    }

Now, the function where I'd store the bytes data in OpenCV Mat.

    private final Camera.PreviewCallback mCameraCallback = new Camera.PreviewCallback() {
    public void onPreviewFrame(byte[] data, Camera c) {
        Log.d(TAG, "ON Preview frame");
        img = new Mat(height, width, CvType.CV_8UC1);
        gray = new Mat(height, width, CvType.CV_8UC1);
        img.put(0, 0, data);        
        
        
        
        Imgproc.cvtColor(img, gray, Imgproc.COLOR_YUV420sp2GRAY);
        String pixvalue = String.valueOf(gray.get(300, 400)[0]);
        String pixval1 = String.valueOf(gray.get(300, 400+width/2)[0]);
        Log.d(TAG, pixvalue);
        Log.d(TAG, pixval1);
            // to do the camera image split processing using "data"
        }
    };

The image that we get from Android SDK Camera is in `YUV420s` Colorspace and we wanted it in BGRA/Grayscale corolspace. So we tried converting it, but we were getting only 0.0 as the data, so we figured there was some problem with YUV420s colorspace format. We looked up on the google and realized that OpenCV requires only 1 channel (not 4 or 3 channel) Mat to store YUV420S colorspace image. So, now we have both the images stored in Mat. Both images are places side by side. We can use both the images by splitting the Mat in half.

So this is a way to use Android SDK Camera to take image and convert it OpenCV Mat. I have posted the solution on stackoverflow. You can find it [here](http://stackoverflow.com/questions/15959552/unable-to-use-both-cameras-of-evo-4g-using-opencv4android/).

P.S. More posts to come on image stitching and Android.
