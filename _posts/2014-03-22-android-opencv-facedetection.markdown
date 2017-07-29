---
category: Blog
tag: Android
comments: true
date: 2014-03-22 13:00:00
layout: post
slug: android-opencv-facedetection
title: Face Detection using OpenCV Haarcascades in Android
keywords: [android development, android camera app, android native programming, opencv C++ with android, opencv camera app, android camera detect faces, face detection with opencv, haar cascades in android]
---

I was working on this app which required face detection and pose estimation. I was already using Native code for some other processes (edge detection, etc) so I figured I'd use Haarcascades in native code only. It was a bit of hassle to configure how to send xml file to JNI or whether it would load the cascade once I pass the filename to the native code.

So I looked around a bit. I tried to look into the examples provided with opencv sdk and found out that I had to write the whole xml file to **FileOutputStream** so that it could be accessed in the native code.

### Making XML available to the native code

First I stored the XML file in assets/ folder.

{% highlight java %}
final InputStream is;
FileOutputStream os;
try {
    is = getResources().getAssets().open("face_frontal.xml");
    File cascadeDir = getDir("cascade", Context.MODE_PRIVATE);
    mCascadeFile = new File(cascadeDir, "face_frontal.xml");
    
    FileOutputStream os;
    os = new FileOutputStream(mCascadeFile);
            
    byte[] buffer = new byte[4096];
    int bytesRead;
    while ((bytesRead = is.read(buffer)) != -1) {
        os.write(buffer, 0, bytesRead);
    }

    is.close();
    os.close();
} catch (IOException e) {
    Log.i(TAG, "face cascade not found");
}

{% endhighlight %}

Once this is done, you can pass the file and relevant Mat objects to the native code.

### JNI call

{% highlight java %}
faceFound = detectFace(mCascadeFile.getAbsolutePath(),
                       mRgba.getNativeObjAddr(),
                       mretVal.getNativeObjAddr());

// Image is loaded in mRgba
// mretVal will contain the output Mat 

// At the end of the class declaring the native function
public native int detectFace(String filename, long matAddrRgba,
                             long matAddrRetVal);
{% endhighlight %}

### Native code

I'm not editing the native function name here so you need to change it appropriately.

{% highlight cpp %}
JNIEXPORT jint JNICALL Java_com_fenchtose_cardscanner_ScanActivity_detectFace(JNIEnv* jenv, jobject, jstring jFileName, jlong addrRgba, jlong addrRetVal)
{
    const char* jnamestr = jenv->GetStringUTFChars(jFileName, NULL);
    string stdFileName(jnamestr);

    Mat& mRgba = *(Mat*)addrRgba;
    Mat& retValMat = *(Mat*)addrRetVal;
    Mat gray;
    vector<Rect> faces;

    jint retVal;
    int faceFound=0;

    mRgba.copyTo(retValMat);

    cvtColor(mRgba, gray, CV_RGBA2GRAY);

    CascadeClassifier face_cascade;
    face_cascade.load(stdFileName);
    LOGD("cascade loaded\n");

    face_cascade.detectMultiScale(gray, faces, 2, 1,
                CV_HAAR_FIND_BIGGEST_OBJECT |  CV_HAAR_SCALE_IMAGE,
                Size(30, 30), Size(900, 900));
    LOGD("detectMultiScale\n");

    if (faces.size() > 0)
    {
        int index;
        Rect face;
        for(index=0; index<faces.size(); index++){
            face = faces[index];
            rectangle(retValMat, face, Scalar(255, 0, 0), 3);
        }
        faceFound = 1;
        LOGD("face found\n");
    }
    else
    {
        LOGD("face not found\n");
        faceFound = 0;
    }
    
    retVal = (jint)faceFound;

    return retVal;
}

{% endhighlight %}

This returns if face is found or not. If face is found it draws on the retvalMat.
So this was pretty easy to do and return a good output.

P.S. Learning more about Android OpenCV.