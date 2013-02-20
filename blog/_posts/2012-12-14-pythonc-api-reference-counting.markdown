---
category: Blog
tag: Python
comments: true
date: 2012-12-14 13:21:57
layout: post
slug: pythonc-api-reference-counting
title: 'Python/C API: Reference Counting'
wordpress_id: 987
categories:
- c++
- Daily Posts
- open source
- Python
- Technical
tags:
- api
- c
- heap
- memory
- pointers
- python
- pythonc
- Py_DECREF
- Py_INCREF
- reference count
- selection sort
- sort
- sorting
---

5th semester is finally over and let's just say I have been to the dark side. Moving on. The most important aspect of Python is memory management. As mentioned in the earlier post of this series, PyObject* is a pointer to a weird data type representing an arbitrary Python object. All Python objects have a “type” and a **“reference count”** and they live on heap so you don’t screw with them and only pointer variables cab be declared. I had skipped the part of referencing. In this post, I'll talk about Memory Management in Python and Reference Counts.

**So What is Reference Counting?**
Python's memory management is based on reference counting. Every Python object has a count of the number of references to the object. When the count becomes zero, the object can be destroyed and its memory reclaimed. Reference counts are always manipulated explicitly using macros **Py_INCREF()** to increment the reference count and **Py_DECREF** to decrement it by one. The decref macro is considerably more complex than the incref one, since it must check whether the reference count becomes zero and then cause the object’s deallocator, which is a function pointer contained in the object’s type structure.

**Background**:

**PyObject**:



	
  * Python objects are structures allocated on the heap.

        
  * Accessed through pointers of type PyObject*

        
  * An object has a reference count that is increased or decreased when a pointer to the object is copied or deleted.

        
  * When the reference count reaches zero there are no references to the object left and it can be removed from the heap.



**Py_INCREF() and Py_DECREF()**:



	
  * The macros Py_INCREF(op) and Py_DECREF(op) are used to increment or decrement reference counts.

	
  * Py_DECREF() also calls the object's deallocator function; for objects that don't contain references to other objects or heap memory this can be the standard function free()

	
  * The argument shouldn't be a NIL pointer.



To prevent Memory Leaks, corresponding to each call to Py_INCREF(), there must be a call to Py_DECREF().

**Owned vs Borrowed**:
Every PyObject pointer is either owned or borrowed. An owned reference means you are responsible for correctly disposing of the reference. Objects are not owned, they are all shared. It's the references to the objects that are owned or borrowed.

A borrowed reference implies that some other piece of code(function) owns the the reference, because the code's interest started before yours, and will end before yours. So you must not deallocate the pointer or decrease the reference. Otherwise, **crash!** A caller must have a reference to the arguments it passes into a called function, so arguments are almost always borrowed.

**Acquiring Owned References**:
There are two ways to get an owned reference:


	
	
  * Accept a return value from a C function that returns a PyObject*. Most C API functions that return PyObject* return a new reference, but **not all**. Some return the borrowed reference. Read the docs carefully. [Python/C API functions that borrow references - StackOverflow](http://stackoverflow.com/questions/10247779/python-c-api-functions-that-borrow-and-steal-references).

	
  * Use Py_INCREF on a borrowed PyObject pointer you already have. This increments the reference count on the object, and obligates you to dispose of it properly.



**Discarding Owned References**:
Once you have an owned reference, you have to discard it properly. There are three ways.



	
  * Return it to the caller of your function. This transfers the ownership from you to your caller. Now they have an owned reference.

	
  * Use Py_DECREF() to decrement the reference count.

	
  * Store it with PyTuple_SetItem() or PyList_SetItem(), which are unusual among C API functions: they steal ownership of their item argument. [Python/C API functions that steal reference - StackOverflow](http://stackoverflow.com/questions/10247779/python-c-api-functions-that-borrow-and-steal-references).



**Code Example**:
So I have been working on my pointer skills and created a simple selection sort to sort a list of integers.
Here's the code.
**Include Libraries**:
    
    #include <Python.h>
    #include <stdio.h>
    #include <stdlib.h>




**C Function**:
PyArg_ParseTuple works like scanf and returns 1 if successful. So, here I'm trying to check whether the passed argument(one argument only) is a PyObject (list) or not and similar to scanf, storing the value of the argument in list (PyObject*).
    
    PyObject* py_selectionSort(PyObject* self, PyObject* args)
    {
        PyObject* list;
    
        if (!PyArg_ParseTuple(args, "O", &list))
        {
            printf("Not a listn");
            return NULL;
        }
    // continued
    }

**NOTE:** list is an object we pull out of the args with PyArg_ParseTuple. Since args is borrowed, we can borrow value out of it, so list is also borrowed.


**Create array from list**:
I am creating an integer array from the Python list. 
    
    PyObject* py_selectionSort(PyObject* self, PyObject* args)
    {
        // continued..
        PyObject* list_item;
        Py_ssize_t i, len;
    
        len = PyList_Size(list);
        long* list_array = (long*) malloc(len*(sizeof(long)));
    
        /* create array from list */
        for(i=0; i<len; i++)
        {
            list_item = PyList_GetItem(list, i);
            if PyInt_Check(list_item)
            {
                *list_array = PyInt_AsLong(list_item);
                list_array++;
            }
            // Py_DECREF(list_item); No need to decrease the reference count
            // as PyList_GetItem returns a borrowed reference.
        }
        list_array-=len;
    
      // continued..
    }

@franksmit](http://twitter.com/franksmit) pointed out the mistake with borrowed reference.

Here list_item is an owned reference, so it is your responsibility to discard it properly using Py_DECREF.

**Sorting**:
This is just C part. You can skip this part if you know how to sort stuff.
    
    PyObject* py_selectionSort(PyObject* self, PyObject* args)
    {
        // continued..
    
        int min = *list_array;
        int index = 0;
        int l;
        int min_element, temp_element;
        for (j=0; j<len; j++)
        {
            list_array+=j;
            min = *list_array;
            index = j;
            for (k=j; k<len; k++)
            {
                if (*list_array < min)
                {
                    min = *list_array;
                    index = k;
                }
                list_array++;
            }
            list_array = list_array - len;
            if (index != j)
            {
                temp_element = *(list_array + j);
                *(list_array + j) = *(list_array+ index);
                *(list_array + index) = temp_element;
            }
        }
    
       // continued ..
    }




**Create list from the sorted array**:
After sorting the integer array, I want a list (PyObject*) which I can return.
    
    PyObject* py_selectionSort(PyObject* self, PyObject* args)
    {
        // continued..
        /* create list from sorted array */
        PyObject* flist = PyList_New(len);
        for (i=0; i<len; i++)
        {
            list_item = PyInt_FromLong(*list_array);
            PyList_SetItem(flist, i, list_item);
            list_array++;
            //Py_DECREF(list_item); /* PyList_SetItem steals the reference */
        }
        list_array-=len;
        
        // continued ..
    }

**NOTE:**Here we're not to use Py_DECREF to decrement the reference count of list_item because PyList_SetItems() steals the reference.


**Cleaning Up and Return**:
Memory management is very important in any Python program hence you need to clean up to avoid memory leaks and crashes.
    
    PyObject* py_selectionSort(PyObject* self, PyObject* args)
    {
        // continued ..
        /* make sure that list_array points to the first allocated block of the array
         * else, free() will cause a segmentation fault.
         */
        free(list_array);
        
        /* list is an object we pull out of the args with PyArg_ParseTuple. 
         * Since args is borrowed, we can borrow value out of it, 
         * so list is also borrowed. */
        //Py_DECREF(list);
    
        return flist;
    }

**NOTE**: list is an object we pull out of the args with PyArg_ParseTuple. Since args is borrowed, we can borrow value out of it, so list is also borrowed. list_array must point to the first allocated block of the array while using free() to deallocate it.


**Afterpart**:
Declare PyMethodDef and the module.
    
    PyMethodDef methods[] = {
      {"selectionSort",(PyCFunction)py_selectionSort, METH_VARARGS, NULL},
      {NULL, NULL,0,NULL},
    };
    
    PyMODINIT_FUNC initselectionSort(void)
    {
        Py_InitModule3("selectionSort", methods,
                       "Extension module example!");
    }




You can find/fork code on my [GitHub](https://github.com/jayrambhia/PyCee/).

**References**:
[Python/C API docs](http://docs.python.org/2/c-api/)
[A Whirlwind Excursion through Python C Extensions - Ned Batchelder](http://nedbatchelder.com/text/whirlext.html)
[Ed's Eclectic Science Page](http://edcjones.tripod.com/refcount.html)
Numerous StackOverlfow questions.

**P.S. Winter break is on. I need to speed things up and start with Mahotas and other Computer Vision work. I have to make some notes, presentation slides and gather all my CV work for the next semester.**
