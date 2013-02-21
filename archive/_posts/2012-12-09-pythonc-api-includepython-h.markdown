---
category: Blog
tag: Python
comments: true
date: 2012-12-09 03:30:37
layout: post
slug: pythonc-api-1
title: 'Python/C API: #include "Python.h"'
---

People are strange when you are stranger. So stop being stranger and start writing emails. You'd get replies.

I came across this amazing computer vision library for Python - **[Mahots](https://github.com/luispedro/mahotas)**. It has great support for Image Processing and the most important thing is it has its own C++ bindings. I was awestruck when I first saw the source code and it is efficiently planned and brilliantly executed library. **[Luis Pedro](http://luispedro.org/)** has produced a bunch of beautiful codes. I have decided to contribute to Mahotas as it'd help me learn Python C++ bindings, create efficient algorithms, and feel powerful again (see previous post for the context: )

I had tried Python/C API once before but couldn't get the hold of it. It was too confusing. Tried swig, cython and boost, but all in dumpster. Too many complications. But after looking at Mahotas' bindings and how they are used as **extension modules**, I am giving it a shot. And so far, it's been good. To understand basics, I went through the reference manual on Python website but it was all too complicated and direct. So I directly opened one of the C++ bindings of mahotas and started understanding it. But still went through few topics of Python/C API. To summarize,

All function, type and macro definitions are included in **Python.h**. It must be included.

Nothing should be defined that starts with **Py** or **_Py**.

**PyObject* ** is is a pointer to a weird data type representing an arbitrary Python object. All  Python objects have a "type" and a "reference count" and they live on heap so you don't screw with them and only pointer variables cab be declared.

Then there is all this stuff about referencing and dereferencing the Python object. Reference count keeps a count of how many different places there are that have a reference to an object. When an object's reference count is zero, it is deallocated. Reference counts are manipulated manually. Read more about Py_INCREF(), Py_DECREF() [here.](http://docs.python.org/2/c-api/intro.html#reference-count-details)

More complicated stuff is explained after that. Exceptions, and Exception Handling. I read that, but skipped the implementation. I also skipped Reference Counting, and now I think, I shouldn't have. Anyway, moving on to embedding Python.



### **The Header**:


Include Python.h header file as it gives you access to the internal Python API. Add other necessary headers.

    
    #include <Python.h>
    #include <stdio.h>






### **The C Functions**:


Every function returns a Python object. There's no void here. Return Py_RETURN_NONE to return Python's None value.

    
    PyObject* foo(PyObject* self, PyObject *args)
    {
        //something goes here
        return Py_RETURN_NONE;
    }






### **The Method Mapping Table**:


Structure used to describe a method of an extension type.  PyMethodDef contains an entry for every function that you are making available to Python.

    
    struct PyMethodDef {
       char *ml_name;
       PyCFunction ml_meth;
       int ml_flags;
       char *ml_doc;
    };




**ml_name** - the name of the function as the Python interpreter will present it.
**ml_meth** -pointer to the C implementation.
**ml_flags** - flag bits indicating how the call should be constructed. Read about flags [here](http://docs.python.org/2/c-api/structures.html#METH_KEYWORDS).
**ml_doc** - points to the contents of the docstring.

Map the above defined function
    
    PyMethodDef methods[] = {
      {"foo",(PyCFunction)foo, METH_VARARGS, NULL},
      {NULL, NULL,0,NULL},
    };






### **The Initialization Function**:


This function is called by the Python interpreter when the module is loaded. It's required that the function be named **initModule**, where Module is the name of the module. This is a very crucial part. I forgot about this and wandered on the interent  for almost an hour. If you don't add this, you'll get an import error in the Python interpreter.

ImportError: dynamic module does not define init function (initfoo)

    
    void initModule(void) {
       Py_InitModule3(func, module_methods, "docstring...");
    }




**func**: This is the function to be exported.
**module_methods**: This is the mapping table name defined above.
**docstring**: This is the comment you want to give in your extension

Initialize the above given module
    
    void initfoo(void)
    {
        Py_InitModule3("foo", methods, "Extension module example!");
    }




Now onto the final and most exciting part.



### **Building and Installing Extensions:**

All hail the **distutils package**

Create a **setup.py** file.

    
    from distutils.core import setup, Extension
    
    setup(name="foo", version="0.1",
               ext_modules=[Extension("foo",["foo.c"])])




And install.
**$ sudo python setup.py install **

Usage:
    
    import foo
    foo.foo()






### **Example**:


Return the reversed string.



##### **C File**:


    
    #include <stdio.h>
    #include <stdlib.h>
    #include <string.h>
    #include <Python.h>
    
    PyObject* pyrev(PyObject* self, PyObject* str1)
    {
        char* str2;
        if (!PyArg_ParseTuple(str1, "s",  &str2))
        {
            return NULL;
        }
       // Yes, I could have used strlen() to get the length.
        int len;
        for (len=0; *str2!=NULL; str2++)
        {
            len+=1;
        }
        str2-=len;
        
        char* str3 = (char *)malloc((len+1)*sizeof(char));
        str3+=len;
        *str3 = NULL;
        str3--;
        
        for (;*str2!=NULL; ++str2, str3--)
        {
            *str3 = *str2;
        }
        str3++;
        
        return Py_BuildValue("s", str3);
    }
    
    PyMethodDef methods[] = {
      {"pyrev",(PyCFunction)pyrev, METH_VARARGS, NULL},
      {NULL, NULL,0,NULL},
    };
    
    void initpyrev(void)
    {
        Py_InitModule3("pyrev", methods,
                       "Reverse the string!");
    }




**Some of the points that you should note**
**PyArg_ParseTuple()** parses the tuple in data types.
int PyArg_ParseTuple(PyObject* tuple, char* format,...)

Let's assume, I'm passing 3 arguments to the function. one int, one double, and one string.
    
    PyObject* bar(PyObject* self, PyObject* args)
    {
        int i1;
        double d1;
        char* s1;
    
        PyArg_ParseTuple(args, "ids", &i1, &d1, &s1);
    }



In the above code, I'm using PyArg_ParseTuple() to check whether I'm getting string or not and also to assign the string value.

**Py_BuildValue**: Py_BuildValue are used to get PyObject from string or int or other data types. I'm returning PyObject of str3.


> PyObject* Py_BuildValue(char* format,...)



**PyString_AsString()**: As the documentation says,


> The pointer refers to the internal buffer of string, not a copy. The data must not be modified in any way, unless the string was just created using PyString_FromStringAndSize(NULL, size). It must not be deallocated.


Please ensure you do not deallocate this buffer.
[Refer this.](http://stackoverflow.com/questions/8749842/sporadic-segfault-in-c-python-extension)



> PyString_AsString returns a pointer to the internal buffer of the python string. If you want to be able to free() it (or indeed have it exist for beyond the lifetime of the associated python string), you need to malloc() memory and strcpy() the data. If the strings contain binary data, you should be using PyString_AsStringAndSize.


[Refer this.](http://docs.python.org/api/stringObjects.html)

This thing got me into a lot of trouble. Only Segmentation faults for hours. Searched everything, tried everything, but couldn't use it. I still have to study about reference counts and implement them to make code better. No memory problems.

Few helpful links:

- [http://www.tutorialspoint.com/python/python_further_extensions.htm](http://www.tutorialspoint.com/python/python_further_extensions.htm)
- [http://bytes.com/topic/python/answers/578916-cpoying-pylist-c-string-array](http://bytes.com/topic/python/answers/578916-cpoying-pylist-c-string-array)
- [http://docs.python.org/2/c-api/string.html](http://docs.python.org/2/c-api/string.html)

I guess this should get you going. I have made a repository for all my Python/C API work and stuff. You can find it on GitHub and fork it. Suggestions and additions are welcome. **[PyCee](https://github.com/jayrambhia/PyCee)**.

**P.S. May the Open Source embed you.**
