---
category: Blog
tag: OpenCV
comments: true
date: 2014-04-08 19:00:00
layout: post
slug: opencv-with-tbb
title: Multithreading in OpenCV using TBB
---

I was working on a small algorithm and it took a while to do the complete processing so I thought of using POSIX threads for multithreading where I failed horribly. I spent some good amount of time on it, but realized maybe it needed a bit more. I knew that OpenCV has TBB support. I started to look for small examples which would help me learn how to use OpenCV's TBB API. Examples were really hard to find, but thankfully, I found this post on OpenCV Forum - [How To Use parallel_for](http://answers.opencv.org/question/3730/how-to-use-parallel_for/).

### What is TBB

Threading Building Blocks (TBB) is a C++ template library developed by Intel for writing software programs that take advantage of multi-core processors. OpenCV has a provided a simple API to take advantage of TBB.

### OpenCV with TBB

OpenCV lets you use the functionality of TBB with its native datatypes without much hassle. OpenCV has provided `cv::parallel_for_` function which helps us use TBB functionality. So here's how you use loops with multi-core processors using OpenCV and TBB.

{% highlight cpp %}

    class Parallel_process : public cv::ParallelLoopBody
    {

    private:
        cv::Mat img;
        cv::Mat& retVal;

    public:
        Parallel_process(cv::Mat inputImgage, cv::Mat& outImage)
            : img(inputImgage), retVal(outImage){}

        virtual void operator()(const cv::Range& range) const
        {
            for(int i = range.start; i < range.end; i++)
            {
                // Your code here
            }
        }
    };

    int main(int argc, char* argv[])
    {
        cv::Mat img, out;
        img = cv::imread(argv[1]);
        out = cv::Mat::zeros(img.size(), CV_8UC3);
        
        // create 8 threads and use TBB
        cv::parallel_for_(cv::Range(0, 8), Parallel_process(img, out);
        return(1);
    }

{% endhighlight %}

### Example

I have made a sloppy example of Gaussian Blur using TBB.

{% highlight cpp %}

    class Parallel_process : public cv::ParallelLoopBody
    {

    private:
        cv::Mat img;
        cv::Mat& retVal;
        int size;
        int diff;

    public:
        Parallel_process(cv::Mat inputImgage, cv::Mat& outImage, 
                         int sizeVal, int diffVal)
                    : img(inputImgage), retVal(outImage), 
                      size(sizeVal), diff(diffVal){}

        virtual void operator()(const cv::Range& range) const
        {
            for(int i = range.start; i < range.end; i++)
            {
                /* divide image in 'diff' number 
                of parts and process simultaneously */

                cv::Mat in(img, cv::Rect(0, (img.rows/diff)*i, 
                           img.cols, img.rows/diff));
                cv::Mat out(retVal, cv::Rect(0, (retVal.rows/diff)*i, 
                                    retVal.cols, retVal.rows/diff));
                cv::GaussianBlur(in, out, cv::Size(size, size), 0);
            }
        }
    };

    int main(int argc, char* argv[])
    {
        cv::Mat img, out;
        img = cv::imread(argv[1]);
        out = cv::Mat::zeros(img.size(), CV_8UC3);
        
        // create 8 threads and use TBB
        cv::parallel_for_(cv::Range(0, 8), Parallel_process(img, out, 5, 8);

        cv::imshow("image", img);
        cv::imshow("blur", out);
        cv::waitKey(0);

        return(1);
    }

{% endhighlight %}

When you profile this implementation against normal implementation (without TBB), you might find that sometimes TBB implementation is considerably slower. This happens due to a lot of function calls. So if you are doing some sort of heavy processing, you might consider using TBB. But if you're just performing a small task, e.g. `accumulateWeighted` function of OpenCV, TBB implementation turns out to be 3-4 times slower over 1000 iterations.

P.S. Building an android application which will be launched soon on Android Play store.