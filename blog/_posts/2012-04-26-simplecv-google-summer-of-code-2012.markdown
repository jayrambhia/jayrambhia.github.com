---
category: Blog
tag: Computer Vision
comments: true
date: 2012-04-26 16:23:58
layout: post
slug: simplecv-google-summer-of-code-2012
title: SimpleCV - Google Summer of Code 2012
wordpress_id: 434
categories:
- Computer Vision
- Daily Posts
- GSoC
- open source
- Python
- Technical
tags:
- code
- gsoc
- opencv
- openTLD
- python
- simplecv
- summer
---

[caption id="attachment_440" align="aligncenter" width="632" caption="GSoC 2012"][![](http://www.jayrambhia.com/blog/wp-content/uploads/2012/04/banner-gsoc20122.png)](http://www.jayrambhia.com/blog/wp-content/uploads/2012/04/banner-gsoc20122.png)[/caption]


My proposal **Automatic segregation of conveyor belt items using SimpleCV** as submitted to **SimpleCV** has been accepted for **Google Summer of Code 2012**. I would like to thank **[Katherine Scott](http://www.kscottz.com/)** and **[Anthony Oliver](http://www.anthonyoliver.net/)** for their guidance and support and providing me a great opportunity to work with them. I would also like to thank all of them who helped achieve this glory. I would like to congratulate Vijay, Victor and Seunghoon whose proposals got accepted (with [**SimpleCV**](http://simplecv.org/)) and all the other 1208 students.




[caption id="attachment_450" align="aligncenter" width="173" caption="SimpleCV"][![](http://www.jayrambhia.com/blog/wp-content/uploads/2012/04/simplecv_logo_minimal.png)](http://www.jayrambhia.com/blog/wp-content/uploads/2012/04/simplecv_logo_minimal.png)[/caption]

I am very excited to kickoff my summer as soon as possible. I will be working with Anthony Oliver as he is my mentor. My project, which is based on Computer Vision, basically consists of two parts. **[GSoC 2012 Project Page](http://www.google-melange.com/gsoc/project/google/gsoc2012/jayrambhia/5001)**.

**Abstract**:
Automating the process of removal of garbage/debris (unwanted items) from conveyor line systems in factory workflows, thereby segregating wanted & unwanted items. Outliers are identified by an independent feature extraction scheme & tracked along the conveyor belt using **[TLD algorithm](http://info.ee.surrey.ac.uk/Personal/Z.Kalal/tld.html)** till they are removed.

1. **Identifying the unwanted items or outliers**
As the items move along the conveyor belt, an overhead camera will identify the items that do not belong there. For this purpose, I would develop an independent feature extraction scheme tailored for this purpose and identify the unwanted items. The location co-ordinates of these items i.e. the ROI (which will be updated in real time for each item) will be conveyed to the system.

2. **Tracking with TLD**
The co-ordinates i.e. the ROI of the unwanted items, as they enter the field of vision of the camera, will be obtained from closest to furthest position on the conveyor. A novel aspect of this implementation is the automation of the selection of the ROI required in TLD. I will use the ROI co-ordinates obtained above, one at a time, and set the ROI for TLD automatically.Once done, the ROI co-ordinates will be communicated to the removal mechanism viz. A robotic manipulator.


**Deliverables**
A novel feature extraction scheme, which is both robust & real-time, tailored to the cause of identifying outliers (different objects) in an image will be developed. As the primary aim of the project, a SimpleCV port to the entire OpenTLD algorithm will be made & used. A demonstration of the final application will be provided by simulating a conveyor belt and tracking the outliers in the various objects on the same.

I will use **Python** and [**OpenCV**, ](http://opencv.willowgarage.com/wiki/)[**SimpleCV**](https://github.com/ingenuitas/SimpleCV/) libraries. I plan to port [**OpenTLD**](https://github.com/zk00006/OpenTLD) to **Python/SimpleCV**.



###### I will post all my project updates here.



P.S. I hope to have an outstanding summer.
