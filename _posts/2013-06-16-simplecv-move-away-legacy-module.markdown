---
category: Notes
tag: Python
comments: true
date: 2013-06-16 11:34:25
layout: post
slug: simplecv-move-away-legacy-module
title: Why SimpleCV Should move away from OpenCV Python's Legacy Module
keywords: [opencv tutorial, simplecv tutorial, opencv 2 python, computer vision tutorial, open source]
---

Current OpenCV version is 2.4.5 and although it has almost all the Python bindings, it still lacks some of the latest development, but that's not the issue here. OpenCV Python bindings still support the Legacy code (i.e. **cv** module), but no one knows when they will deprecate it. We need to move away from Legacy module as soon as possible. I have been supporting this idea for quite a while now because I have faced so many problems. I insist on using new module and it requires numpy and there's so much hassle of converting column major bitmap image to row major numpy matrix and back to display proper image. Since SimpleCV is moving to 2.0 and have big plans, see [SimpleCV 2.0 Plans](https://github.com/sightmachine/SimpleCV/wiki/SimpleCV-2.0-Planning), I think this should be the part of it and I can't think of any better opportunity to implement it than this. I have listed some pros and cons.

#### Pros

 - OpenCV > 2.3 has **cv2** module. Ubuntu 12.04 and newer versions provide OpenCV >= 2.3.1
 - cv2 uses Numpy.
 - Numpy functions are parallelized and hence faster.
 - Numpy supports multiprocessing without much hassles.
 - Easier to implement algorithms with Numpy.
 - pyOpenCL support Numpy (GPU support)
 - Cython supports Numpy (If we ever decide for more speed)
 - Numba supports Numpy (If we ever decide for more speed)
 - PyPy supports Numpy (It doesn't have GIL issues)

#### Cons
 - **cv2** doesn't support some of the Legacy functions for which we have to use **cv**

#### Things that would change

 - **cv2.cv.iplImage** is column major (I don't know why), but Numpy and OpenCV Mat are row major matrices and hence SimpleCV Image should also be row major. This would eliminate such issues - [#339](https://github.com/sightmachine/SimpleCV/issues/339)
 - We can move away from PIL
 - More scope for optimization
 - Parallalization and Multiprocessing
 - GPU support

Detailed information and Updates can be found on my [SimpleCV repository's Wiki Page](https://github.com/jayrambhia/SimpleCV/wiki/Road-to-2.0#move-away-from-cv-legacy-module).