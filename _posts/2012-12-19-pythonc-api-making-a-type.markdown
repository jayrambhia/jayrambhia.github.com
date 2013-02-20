---
category: Blog
tag: Python
comments: true
date: 2012-12-19 13:34:32
layout: post
slug: pythonc-api-making-a-type
title: 'Python/C API: Making a Type'
wordpress_id: 988
categories:
- c++
- Daily Posts
- Python
- Technical
tags:
- api
- c
- class
- cpython
- PyObject
- python
- pythonc
- struct
---

This is the third post in the Python/C API series. In previous posts,
Python/C API: #include<Python.h> and [Python/C API: Reference Counting](http://jayrambhia.wordpress.com/2012/12/14/pythonc-api-reference-counting/), I have shown how to extend Python with C API and importance of memory management in Python. In this post, we'll be talking about declaring and making a type. This is can also be seen as a class in Python. It has it's init function, deallocating function, etc. Here's the overview.

**Overview**:



	
  * Create Structure.
	
	
  * Init and dealloc.

	
  * Declare Members.

	
  * Write Functions.

	
  * Declare Functions.

	
  * Make the type Ready.



Making a type is not only about making functions, it also relates to C structures, write them in array, and use the arrays to create Python components. We'll learn how to make a type with a simple example.

**Include Libraries**
    
    #include <Python.h>
    #include <stdio.h>
    #include "structmember.h"

tructmember.h is a very important library which helps in declaring the members of the type.


**C Struct**
The storage for the type is C struct and its filed will be type's data. Here, I am declaring a **"CountDict" type**.
    
    // CountDict type
    typedef struct {
        PyObject_HEAD
        PyObject * dict;
        PyObject * keys;
        PyObject * vals;
        int count;
        char* name;
    } CountDict;

The first thing in the struct must be PyObject_HEAD, with no semicolon. This is a macro that creates the initial fields in the structure. This is what makes your structure usable as a PyObject. The rest of the struct can be whatever data that you need for the type. PyObject* pointers are very useful for holding Python objects, but they are almost certainly **owned references**. Hence you have to be very careful to acquire and release them properly.


**Init and dealloc**:
When writing a Python class, some special methods have special names, eg. __init__. When creating a type in C, these special methods are ordinary C functions with particular signatures that will be specified as part of the type definition. These function should be named systematically for user readability, but the name really doesn't matter. A Pointer to the function will be associated with its role.
    
    static int CountDict_init(CountDict *self, PyObject *args, PyObject* kwds)
    {
        self->dict = PyDict_New();
        self->keys = PyList_New(0);
        self->vals = PyList_New(0);
        self->count = 0;
        if (!PyArg_ParseTuple(args, "s", &self->name))
        {
            return -1;
        }
        return 0;
    }
    
    static void CountDict_dealloc(CountDict *self)
    {
        Py_XDECREF(self->dict);
        Py_XDECREF(self->keys);
        Py_XDECREF(self->vals);
        self->ob_type->tp_free((PyObject*)self);
    }

Python class need not have an explicit deallocation method, but a C class has to have an explicit deallocation method. In this method, you should dispose all the owned references, and finally call the class tp_free function to clean up the type itself.


**Make Data Available in Python**
After declaring the type (C struct), and few important methods, you need to make all that data available to Python.
**Declare Members**:
You can decide which of your struct's fields to make available as Python data attributes, if any. An array of structures defines the attributes.
    
    static PyMemberDef
    CountDict_members[] = {
        { "dict",   T_OBJECT, offsetof(CountDict, dict), 0,
                    "The dictionary of value collected so far."},
        { "keys",   T_OBJECT, offsetof(CountDict, keys), 0,
                    "The keys collected so far."},
        { "vals",   T_OBJECT, offsetof(CountDict, vals), 0,
                    "The values collected so far."},
        { "count",  T_INT, offsetof(CountDict, count), 0,
                    "The number of times set() has been called."},
        { "name",  T_STRING, offsetof(CountDict, name), 0,
                    "The name of the type."},
        {NULL}
    };

Each PyMemberDef structure specifies the Python attribute name, the C type of the field, the offset into the structure (with the handy offsetof macro), some flags, and a docstring for the attribute. The array will be used later in the type definition.


**Write Functions**:
Class methods are defined just like functions. You can write as many functions as you want.
    
    static PyObject* CountDict_Set(CountDict *self, PyObject* args)
    {
        const char* key;
        PyObject* value;
        
        if (!PyArg_ParseTuple(args, "sO:set", &key, &value))
        {
            return NULL;
        }
        
        if (PyDict_SetItemString(self->dict, key, value) < 0)
        {
            return NULL;
        }
        PyList_Append(self->keys, PyString_FromString(key));
        PyList_Append(self->vals, value);
        self->count ++;
        
        return Py_BuildValue("i", self->count);
    }
    
    static PyObject* CountDict_GetKeys(CountDict *self)
    {
        return self->keys;
    }
    
    static PyObject* CountDict_GetVals(CountDict *self)
    {
        return self->vals;
    }
    
    static PyObject* CountDict_GetName(CountDict* self)
    {
        return Py_BuildValue("s", self->name);
    }



**Declare Methods**:
Methods are also declared like functions, in an array of structs, providing the name, C function pointer, flags, and docstring for method.
    
    static PyMethodDef CountDict_methods[] = {
        {"set", (PyCFunction) CountDict_Set, 
                    METH_VARARGS, "set a key and increment the count."},
        {"getKeys", (PyCFunction) CountDict_GetKeys, 
                    METH_VARARGS, "get all the keys."},
        {"getVals", (PyCFunction) CountDict_GetVals,
                   METH_VARARGS, "get all the values."},
        {"getName", (PyCFunction) CountDict_GetName,
                  METH_VARARGS, "get name of the type"},
        {NULL}
    };



**Declare the Type Components**:
Types are defined by initializing a PyTypeObject struct. This struct has fields for each of the special functions needed to provide the behavior of a type. Where in Python we'd have specially named functions like __init__ and __hash__, in C we have members in the PyTypeObject struct pointing to the C function implementing the functionality. Other fields in the struct get pointers to the arrays of structs defining the methods, properties, and attributes.
    
    static PyTypeObject
    CountDictType = {
       PyObject_HEAD_INIT(NULL)
       0,                         /* ob_size */
       "CountDict",               /* tp_name */
       sizeof(CountDict),         /* tp_basicsize */
       0,                         /* tp_itemsize */
       (destructor)CountDict_dealloc, /* tp_dealloc */
       0,                         /* tp_print */
       0,                         /* tp_getattr */
       0,                         /* tp_setattr */
       0,                         /* tp_compare */
       0,                         /* tp_repr */
       0,                         /* tp_as_number */
       0,                         /* tp_as_sequence */
       0,                         /* tp_as_mapping */
       0,                         /* tp_hash */
       0,                         /* tp_call */
       0,                         /* tp_str */
       0,                         /* tp_getattro */
       0,                         /* tp_setattro */
       0,                         /* tp_as_buffer */
       Py_TPFLAGS_DEFAULT | Py_TPFLAGS_BASETYPE, /* tp_flags*/
       "CountDict object",        /* tp_doc */
       0,                         /* tp_traverse */
       0,                         /* tp_clear */
       0,                         /* tp_richcompare */
       0,                         /* tp_weaklistoffset */
       0,                         /* tp_iter */
       0,                         /* tp_iternext */
       CountDict_methods,         /* tp_methods */
       CountDict_members,         /* tp_members */
       0,                         /* tp_getset */
       0,                         /* tp_base */
       0,                         /* tp_dict */
       0,                         /* tp_descr_get */
       0,                         /* tp_descr_set */
       0,                         /* tp_dictoffset */
       (initproc)CountDict_init,  /* tp_init */
       0,                         /* tp_alloc */
       0,                         /* tp_new */
    };



**Make the type Ready**:
Once the module is initialized, we can init some slots in the type that can't be done with the struct initializer, then call PyType_Ready to finish up the creation of the type.
    
    void initccv(void)
    {
        PyObject* mod;
        
        mod = Py_InitModule3("ccv", NULL, "An extension with a type");
        // ccv is the module name
        if (mod == NULL)
        {
            return;
        }
        
        CountDictType.tp_new = PyType_GenericNew;
        if (PyType_Ready(&CountDictType) < 0) {
          return;
        }
        
        Py_INCREF(&CountDictType);
        PyModule_AddObject(mod, "CountDict" , (PyObject* )&CountDictType);
    }

PyType_Ready performs bookkeeping and other initialization to prepare the type for use, including hooking up the hierarchy for inheritance, and so on. Finally, PyModule_AddObject is used to assign the type to its name in the module.


You can find the complete code on my [GitHub](https://github.com/jayrambhia/PyCee/blob/master/pycee/ccv.c).  I'm working on making a type for SimpleCV Image class. I am planning to use numpy C api. I hope this goes well.

P.S. The Hobbit has by far the most amazing animation I have ever seen.


