---
category: Blog
tag: python
comments: true
date: 2012-04-18 15:35:28
layout: post
slug: opencv-with-pygtk
title: OpenCV with pygtk
---

In my [previous post](http://jayrambhia.wordpress.com/2012/04/10/integrating-opencv-with-pygtk/), I have shown how to **integrate OpenCV with pygtk** to show images. In this post, I'll be showing how to use OpenCV/SimpleCV with pygtk to show **multiple images** simultaneously, a continuous streaming of images (like a video), etc.

I have used multi-threading to call **gtk.main()** because if I don't do that, my program will be stuck untill, gtk.main() doesn't end. It doesn't end untill gtk.main_quit() is explicitly called.

    
    import gtk
    from threading import Thread
    import gobject
    gtk.gdk.threads_init()

As I have mentioned before, **gtk.gdk.threads_init()** is necessary. The gtk.gdk.threads_init() function initializes PyGTK to use the Python macros that allow multiple threads to serialize access to the Python interpreter (using the **Python Global Interpreter Lock (GIL)**).The gtk.gdk.threads_init() function must be called before the gtk.main() function. At this point in the application the Python GIL is held by the main application thread. You can get more information about gtk.gdk.threads_init() and GIL here in **[pygtk docs](http://www.pygtk.org/docs/pygtk/gdk-functions.html#function-gdk--threads-init).**

    
    class DisplayImage():
        def __init__(self,title="SimpleCV"):
            self.img = None
            self.img_gtk = None
            self.done = False
            self.thrd = None
            self.win = gtk.Window()
            self.win.set_title(title)
            self.win.connect("delete_event",self.leave_app)
            self.image_box = gtk.EventBox()
            self.win.add(self.image_box)
      
        def show_image(self,image):
            self.img = image
            if self.img_gtk is None:
                self.img_flag=0
                self.img_gtk = gtk.Image()# Create gtk.Image() only once
                self.image_box.add(self.img_gtk)# Add Image in the box, only once
            self.img_pixbuf = gtk.gdk.pixbuf_new_from_data(self.img.tostring(),
                                                    gtk.gdk.COLORSPACE_RGB,
                                                    False,
                                                    self.img.depth,
                                                    self.img.width,
                                                    self.img.height,
                                                    self.img.width*self.img.nChannels)
            self.img_gtk.set_from_pixbuf(self.img_pixbuf)
            self.img_gtk.show()
            self.win.show_all()
            if not self.img_flag:
                self.thread_gtk()    # gtk.main() only once (first time)
                self.img_flag=1      # change flag
            
        def thread_gtk(self):
            # changed this function. Improved threading.
            self.thrd = Thread(target=gtk.main, name = "GTK thread")
            self.thrd.daemon = True
            self.thrd.start()
        
        def leave_app(self,widget,data):
            self.done = True
            self.win.destroy()
            gtk.main_quit()
    
        def isDone(self):
            return self.done
        
        def quit(self):
            self.done = True
            self.win.destroy()
            gtk.main_quit()
    

So, here's the complete class that I made to show images in OpenCV/SimpleCV.
In line 26,

    
    self.img_gtk.set_from_pixbuf(self.img_pixbuf)

In my previous post it was

    
    image = gtk.image_new_from_pixbuf(img_pixbuf)


So, here's the problem with it. Whenever I do **gtk.image_new_from_pixbuf()**, it would create a new gtk.Image object at a different address, and hence we would have to add the new object in the box every time and destroy the previous image object which was there in the box. So, instead of that I have used **gtk.set_from_pixbuf()**, which would not create a new gtk.Image object, but just change the image.

Now moving on to threading part, it's very important that you call gtk.main with a thread. And it has to be called only once during the program, otherwise there would be many threading problems. gtk.main has to be called after you have created widgets, added properties and shown.

    
    thrd = Thread(target=gtk.main, name = "GTK thread")
    thrd.daemon = True
    thrd.start()

After creating the thread, **thrd.daemon = True** is very necessary before you start the thread, otherwise there will be too many errors and complications with gtk. Believe me, I have faced it for two days. And it was not good.

I have added more functionalities in DisplayImage class  such as getting co-ordinates of mouse click, etc. You can find it here on my **[GitHub](https://github.com/jayrambhia/SimpleCVexamples/tree/master/pygtk_image)**. You can also find some examples that I have worked out for SimpleCV there.

So, now some examples.
Show image in OpenCV.

    from cv2.cv import *
    from pygtk_image import DisplayImage
    import time
    image = LoadImage("Image name")
    image_rgb = CreateImage((image.width,image.height),image.depth,image.channels)
    CvtColor(image,image_rgb,CV_BGR2RGB) # iplImage has BGR colorspace
    display = DisplayImage()
    display.show(image_rgb)
    time.sleep(3)
    display.quit()

Show image in SimpleCV

    
    from SimpleCV import *
    from pygtk_image import DisplayImage
    import time
    
    image = Image("lenna")
    display = DisplayImage(title="SimpleCV")
    display.show(image.toRGB().getBitmap())
    time.sleep(3)
    display.quit()

Show multiple images simultaneously in SimpleCV
    
    from SimpleCV import *
    from pygtk_image import *
    
    d1 = DisplayImage()
    d2 = DisplayImage()
    i1 = Image("lenna")
    
    while not (d1.isDone() or d2.isDone()):
        try:
            d1.show_image(i1.toRGB().getBitmap())
            time.sleep(0.1)
            d2.show_image(i1.toGray().getBitmap())
            time.sleep(0.1)
        except KeyboardInterrupt:
            d1.quit()
            d2.quit()

Show images in a series in SimpleCV
    
    from SimpleCV import *
    from pygtk_image import *
    
    def loadimage():
        image = Image("lenna")
        d = DisplayImage()
        d.show_image(image.toRGB().getBitmap())
        time.sleep(3)
        d.show_image(Image("simplecv").toRGB().getBitmap())
        time.sleep(2)
        d.quit()
    
    if __name__ == "__main__":
        loadimage()

show captured images from camera in SimpleCV
    
    from SimpleCV import *
    from pygtk_image import *
    
    cam = Camera()
    d = DisplayImage()
    while not d.isDone():
        try:
            i = cam.getImage()
            i.drawRectangle(d.mouseX,d.mouseY,50,50,width=5)
            d.show_image(i.applyLayers().toRGB().getBitmap())
            time.sleep(0.1)
        except KeyboardInterrupt:
            d.quit()
            break

If you find some better way to show images using pygtk, or a better way to thread gtk.main(), let me know.

P.S. Anxiously waiting for GSoC 2012 results. Only 2 days and 8 hours to go.
