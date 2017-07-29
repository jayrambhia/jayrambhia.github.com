---
category: Blog
tag: Android
comments: true
date: 2013-03-29 01:00:00
layout: post
slug: beginning-android-opencv
title: 'Beginning Android OpenCV'
keywords: [android development, android camera app, android native programming, opencv C++ with android, opencv camera app, android ndk, android opencv ndk]
---

Many people who are trying to search for Android Opencv stumble upon my blog due to the name Paranoid Android. I had decided that I would never make an android appliaction as I hate Java, but desperate times require desparate measures, and so I installed Android OpenCV and created a small application.

### How To Setup Android OpenCV Development Kit

Follow [this link](http://docs.opencv.org/doc/tutorials/introduction/android_binary_package/android_dev_intro.html) and do exactly as it says. It might be bit confusing, but that's the right way to do it and it works. 

Once you have set up everything and tested one of the OpenCV example applications, you should start scrolling down.

### Writing Basic Application

Once you create a new android project, you need to add OpenCV 2.4.4 library in its properties and set NDK path and stuff which is usual. Now, I'll demonstarte how to make one applicaiton in which OpenCV uses the phone camera, captures the image and shows a gray image on the screen.

In your `MainActivity.java`, you need to add some imports, which I guess, you'll figure it out using Eclipse.

Since we are using OpenCV's camera functionality, we need to use **CvCameraViewListener2**. So before calling any methods or callback, we would like to define our variables that we are going to use.
{% highlight java %}
    public class MainActivity extends Activity implements CvCameraViewListener2 {
    
        private static final String TAG = "OCVSample::Activity";
        private Mat mRgba;
        private Mat mGray;
        private CameraBridgeViewBase mOpenCvCameraView;

        // some other stuff shown below
    }
{% endhighlight %}

Now, we'd like to add callback method which would start the Android Application and show display on the screen.
{% highlight java %}
    public class MainActivity extends Activity implements CvCameraViewListener2 {

        // some stuff before this

        private BaseLoaderCallback mLoaderCallback = new BaseLoaderCallback(this) {
            @Override
            public void onManagerConnected(int status) {
                switch (status) {
                    case LoaderCallbackInterface.SUCCESS:
                    {
                        Log.i(TAG, "OpenCV loaded successfully");
                        mOpenCvCameraView.enableView();
                        mOpenCvCameraView.setOnTouchListener( MainActivity.this );
                    } break;
                    default:
                    {
                        super.onManagerConnected(status);
                    } break;
                }
            }
        };

    // some more stuff here
    }
{% endhighlight %}
    
Log.i basically helps in debugging as it shows messages in the emulator Log Cat.

Instantiate Main Activity.
{% highlight java %}
    public class MainActivity extends Activity implements CvCameraViewListener2 {

        // some stuff here

        public MainActivity() {
            Log.i(TAG, "Instantiated new " + this.getClass());
        }

    // some more stuff here
   }
{% endhighlight %}

Now, we need to configure how the application will behave when it's started, paused and resumed.
{% highlight java %}
    public class MainActivity extends Activity implements CvCameraViewListener2 {

        // some stuff here
        @Override
        protected void onCreate(Bundle savedInstanceState) {
            Log.i(TAG, "called onCreate");
            super.onCreate( savedInstanceState );
            getWindow().addFlags( WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON );
            setContentView(R.layout.tutorial1_surface_view);
            mOpenCvCameraView = (CameraBridgeViewBase) findViewById ( R.id.tutorial1_activity_java_surface_view );

            mOpenCvCameraView.setVisibility( SurfaceView.VISIBLE );
            mOpenCvCameraView.setCvCameraViewListener(this);
        }

        @Override
        public void onPause()
        {
            super.onPause();
            if (mOpenCvCameraView != null)
                mOpenCvCameraView.disableView();
        }

        @Override
        public void onResume()
        {
            super.onResume();
            OpenCVLoader.initAsync(OpenCVLoader.OPENCV_VERSION_2_4_3, this,
                                   mLoaderCallback);
        }

        public void onDestroy() {
            super.onDestroy();
            if (mOpenCvCameraView != null)
                mOpenCvCameraView.disableView();
        }
        
        // some more stuff here
    }
{% endhighlight %}

You might be wondering why there is `R.id.tutorial1_activity_java_surface_view`. The short answer is I am lazy and just copied it.

Now, we need to implement camera methods in order to use it.
`onCameraViewStarted()`, `onCameraViewStopped()` and `onCameraFrame()` must be implemented in order to create a working application. (Anyway, it will give errors if you don't add all three methods).
{% highlight java %}
    public class MainActivity extends Activity implements CvCameraViewListener2 {
        // some stuff here

        public void onCameraViewStarted(int width, int height) {
            mGray = new Mat();
            mRgba = new Mat();
        }

        public void onCameraViewStopped() {
        }

        public Mat onCameraFrame(CvCameraViewFrame inputFrame) {
            mRgba = inputFrame.rgba();
            Imgproc.cvtColor(mRgba, mGray, Imgproc.COLOR_BGRA2GRAY);
            return mGray;
        }

    // no stuff here. It ends here, unless you want to add something more.
    }
{% endhighlight %}

So your `MainActivity.java` is done. Now, you need to add `tutorial1_surface_view` layout. You can add it in `Main_surface_view` also which is by default, but remember to change `tutorial1_surface_view` to `Main_surface_view` in the code. Create a file named **tutorial1_surface_view.xml** in your project's `/res/layout` folder.

Copy the following xml in it.
{% highlight xml %}
    <LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools"
        xmlns:opencv="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent" >

        <org.opencv.android.JavaCameraView
            android:layout_width="fill_parent"
            android:layout_height="fill_parent"
            android:visibility="gone"
            android:id="@+id/tutorial1_activity_java_surface_view"
            opencv:show_fps="true"
            opencv:camera_id="any" />

        <org.opencv.android.NativeCameraView
            android:layout_width="fill_parent"
            android:layout_height="fill_parent"
            android:visibility="gone"
            android:id="@+id/tutorial1_activity_native_surface_view"
            opencv:show_fps="true"
            opencv:camera_id="any" />
    </LinearLayout>
{% endhighlight %}

You also need to add some permissions in **AndroidManifest.xml** Copy and change necessary information. Get the file [here](https://gist.github.com/jayrambhia/5265868).

Even after doing this, you might face small problems, so don't worry, you will be able to debug them. One of them would be regarding a logo in `/res/drwable` folder. You need to add an image there with filename `icon.png` or whatever you prefer, just make sure that you do necessary changes in corresponding files.

Take out your Android phone and plug it in USB debugging mode. Load the application and have fun.

P.S. Made an android application that generates disparity map using two images. Here's a video you can check out. I have improved the disparity map quality a lot. 

<iframe width="420" height="315" src="https://www.youtube.com/embed/JYExOcmBgIE" frameborder="0" allowfullscreen></iframe>
