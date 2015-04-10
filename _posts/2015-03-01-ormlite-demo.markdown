---
category: Blog
tag: Android
comments: true
date: 2015-03-01 15:00:00
layout: post
slug: ormlite-demo
title: ORMLite with Android
---

I am working on application which requires a database. Android supports SQLite and we have to make do with it. Writing database queries can create a lot of boilerplate code and can be really difficult to debug. I was looking for some sort of **ORM** library for android. I came around few of them. One of them was `GreenDAO`. It seemed very promising but I couldn't manage to get it working after spending couple of days. I decided to give **[ORMLite](http://ormlite.com/docs/android)** a shot. The library is very stable and uses annotations. It was really easy to implement everything so I decided to stick with it.

### Model
To use ORMLite, you first need to create your model classes. A sample model class would like this.

{% gist jayrambhia/aaa20788ec2704c2326f Note.java %}

 - ORMLite needs an empty constructor
 - ORMLite generally expects your variables to be public, but you can keep them private with using `useGetSet=true`
 - You can specify field name to be used in the table with `coulmnName`
 - `generatedId = true, allowGeneratedIdInsert = true` will generate Auto Incremental Ids.
 - To store dates, it is advised to use `java.util.Date` and not `java.sql.Date`. Also, it is advised to keep date with `DataType.DATE_LONG` so that you can sort data based on dates.
 
There isn't much more to this. This will be your table model.

### DatabaseHelper

ORMLite has provided a class `OrmLiteSqliteOpenHelper` which I extended to create my own database helper class. This class will call method `onCreate` if the database does not exist. It will call `onUpgrade` method if you change your database version.

{% gist jayrambhia/aaa20788ec2704c2326f DatabaseHelper.java %}

In `onUpgrade` method, you need not drop the table and create it again. If you do this, you would also have to take care about not losing the data. [ORMLite - Upgrading Your Schema](http://ormlite.com/javadoc/ormlite-core/doc-files/ormlite_4.html#Upgrading-Schema) shows a very helpful way to update database without losing the data.

### Repository

Repository is the class which you use to query data from the database.

{% highlight java %}

public class NoteRepository {
 
    private DatabaseHelper dbHelper;
    private Dao<Note, Integer> noteDao;
 
    public NoteRepository(Context context) {
        DatabaseManager dbManager = new DatabaseManager();
        dbHelper = dbManager.getHelper(context);
        noteDao = dbHelper.getNoteDao();
    }
    
    public int create(Note note) {
        return noteDao.create(note);
    }
    
    public long getNumberOfNotes() {
        QueryBuilder<Note, Integer> qb = noteDao.queryBuilder();
        return qb.countOf();
    }
 
    public List<Note> getRecentNotes(long limit) {
        QueryBuilder<Note, Integer> qb = noteDao.queryBuilder();
        qb.orderBy(Note.TIMESTAMP_FIELD, false);
        qb.limit(limit);
        
        PreparedQuery<Note> preparedQuery = qb.prepare();
        return noteDao.query(preparedQuery);

    }
}

{% endhighlight %}

### Add Note To Database

{% highlight java %}
    Note note = new Note();
    note.setTitle("Test note");
    note.setMessage("This is a test note");
    note.setCreated_ts(new Date());
    
    NoteRepository noteRepository = new NoteRepositroy(context);
    noteReposiory.create(note);
    
    Log.i(TAG, "note id: " + note.id);

{% endhighlight %}

### GitHub Repository

I have uploaded this code on GitHub with some functionality so that app is responsive. You can fork it **[here](https://github.com/jayrambhia/ORMLiteDemo)**.

Here's an updated screenshot of the app.

![](https://github.com/jayrambhia/ORMLiteDemo/blob/master/screenshot/Screenshot_2015-04-08-18-26-06.png)

[screenshot](https://github.com/jayrambhia/ORMLiteDemo/blob/master/screenshot/Screenshot_2015-04-08-18-26-06.png)

P.S. I have strated to work with RxJava and it has been a joyride!
