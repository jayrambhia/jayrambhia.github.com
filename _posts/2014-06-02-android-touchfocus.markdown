---
category: Blog
tag: Android
comments: true
date: 2014-06-02 14:00:00
layout: post
slug: android-touchfocus
title: Touch to Focus Android Camera
---

I have been working on LenX for few weeks now, and as it is a camera app, it was necessary to add some type of focus. We decided to add touch based focus. Wherever user touches the screen, Android camera would try to focus in that area.

To start off, I didn't want to show anything in the SurfaceView except Camera Preview feed. So to indicate the touch focus area, I created a transparent View and put it over SurfaceView.

Instead of beating around the bush, I'd just directly get on to the main point.

### AutoFocusCallback and touchFocus method

In CameraPreview class,

{% highlight java %}

    public class CameraPreview implements SurfaceHolder.Callback {

        // some code here

        AutoFocusCallback myAutoFocusCallback = new AutoFocusCallback(){

            @Override
            public void onAutoFocus(boolean arg0, Camera arg1) {
                if (arg0){
                    mCamera.cancelAutoFocus();      
                }
            }
        };

        /**
         * Called from PreviewSurfaceView to set touch focus.
         * @param - Rect - new area for auto focus
         */
        public void doTouchFocus(final Rect tfocusRect) {
            try {
                List<Camera.Area> focusList = new ArrayList<Camera.Area>();
                Camera.Area focusArea = new Camera.Area(tfocusRect, 1000);
                focusList.add(focusArea);
          
                Camera.Parameters param = mCamera.getParameters();
                param.setFocusAreas(focusList);
                param.setMeteringAreas(focusList);
                mCamera.setParameters(param);
          
                mCamera.autoFocus(myAutoFocusCallback);
            } catch (Exception e) {
                e.printStackTrace();
                Log.i(TAG, "Unable to autofocus");
            }
        }

    }

{% endhighlight %}

This is how Touch based focus works. You provide the camera a list of Camera.Area where you want the camera to focus and set the params. You need to call the AutoFoucsCallback and cancel it to set the focus.

In PreviewSurfaceView where I record the touch and call `doTouchFocus` with appropriate Rect.

### PreviewSurfaceView

{% highlight java %}

public class PreviewSurfaceView extends SurfaceView {
    // some code here

    @Override
    public boolean onTouchEvent(MotionEvent event) {
        if (!listenerSet) {
            return false;
        }

        if(event.getAction() == MotionEvent.ACTION_DOWN){
            float x = event.getX();
            float y = event.getY();
      
            Rect touchRect = new Rect(
                (int)(x - 100), 
                (int)(y - 100), 
                (int)(x + 100), 
                (int)(y + 100));
            

            final Rect targetFocusRect = new Rect(
                touchRect.left * 2000/this.getWidth() - 1000,
                touchRect.top * 2000/this.getHeight() - 1000,
                touchRect.right * 2000/this.getWidth() - 1000,
                touchRect.bottom * 2000/this.getHeight() - 1000);
      
            camPreview.doTouchFocus(targetFocusRect);
            if (drawingViewSet) {
                drawingView.setHaveTouch(true, touchRect);
                drawingView.invalidate();
          
                // Remove the square indicator after 1000 msec
                Handler handler = new Handler();
                handler.postDelayed(new Runnable() {
            
                    @Override
                    public void run() {
                        drawingView.setHaveTouch(false, new Rect(0,0,0,0));
                        drawingView.invalidate();
                    }
                }, 1000);
            }
      
        }

        return false;
    }

    /**
      * set CameraPreview instance for touch focus.
      * @param camPreview - CameraPreview
      */
    public void setListener(CameraPreview camPreview) {
        this.camPreview = camPreview;
        listenerSet = true;
    }
    
    /**
      * set DrawingView instance for touch focus indication.
      * @param camPreview - DrawingView
      */
    public void setDrawingView(DrawingView dView) {
        drawingView = dView;
        drawingViewSet = true;
    }

}

{% endhighlight %}

In `onTouchEvent`, once we get the x and y coordinates of the screen where the user touched, we define a square area of 200px x 200px as (x, y) set as the center. Once we have this Rect, we need to convert it to the Rect which compatible with Camera. 

As mentioned on [Android Developer Website](http://developer.android.com/guide/topics/media/camera.html#metering-focus-areas),

<blockquote cite="http://developer.android.com/guide/topics/media/camera.html#metering-focus-areas">
    The Camera.Area object contains two data parameters: A Rect object for specifying an area within the camera’s field of view and a weight value, which tells the camera what level of importance this area should be given in light metering or focus calculations.
    <br/>
    The Rect field in a Camera.Area object describes a rectangular shape mapped on a 2000 x 2000 unit grid. The coordinates -1000, -1000 represent the top, left corner of the camera image, and coordinates 1000, 1000 represent the bottom, right corner of the camera image
</blockquote>

Hence we need to convert the current Rect and interpolate if for -1000 to +1000.

Once this is done, we need to show the focus indication else users don't think anything happened. So I added a View where I draw a rectangle for 1000 msec and then hide it. I created a `Handler` and call `postDelayed` method with 1000 msec and pass an empty Rect to drawingView. And call `invalidate()` so that its `onDraw` method is called.

### DrawingView

{% highlight java %}

public class DrawingView extends View {
    private boolean haveTouch = false;
    private Rect touchArea;
    private Paint paint;
    
    public DrawingView(Context context, AttributeSet attrs) {
        super(context, attrs);
        paint = new Paint();
        paint.setColor(0xeed7d7d7);
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(2);
        haveTouch = false;
    }
    
    public void setHaveTouch(boolean val, Rect rect) {
        haveTouch = val;
        touchArea = rect;
    }
    
    @Override
    public void onDraw(Canvas canvas) {
        if(haveTouch){
            canvas.drawRect(
              touchArea.left, touchArea.top, touchArea.right, touchArea.bottom,  
              paint);
        }
    }   
}

{% endhighlight %}

So, this was how I put Touch to Focus in LenX. The project code is up on GitHub. You can fork it from [here](https://github.com/jayrambhia/Touch2Focus).

P.S. Going to launch LenX soon.