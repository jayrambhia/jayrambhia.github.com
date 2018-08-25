---
category: Blog
tag: Android
comments: true
date: 2015-02-24 15:00:00
layout: post
slug: keep-checklist
title: Google Keep Style Checklist
description: Google Keep is one of the most popular apps to keep notes, checklists among other things. The user experience in unparalleled. Here, I try to replicate the same user experience of adding things to do in a check list.
keywords: [android development, android notes app, google keep, android todo list, android UI, Google keep checklist, android checklist]
series: android-ui
series_title: Google Keep Style Checklist
series_description: Google Keep is one of the most popular apps to keep notes, checklists among other things. The user experience in unparalleled. Here, I try to replicate the same user experience of adding things to do in a check list.
---

I have been working on a Notes application for quite some time now. One of the essential notes are checklists. Google Keep has really nice implementation of checklist note. So taking inspiration from the layout, I tried making my own checklist.

I tried a lot of things. I added EditText in ListView (ArrayAdapter) and added TextWatcher to every edittext and removed the appropriately but it would just not work. I tried the same thing with RecyclerView, it worked better than ListView but still it was not at all functional. The only possible way that I could think of was having a LinearLayout and adding EditText one by one. It worked. It worked out quite well. I stuck to it.

### My Strategy

I created a custom EditText with easy approach to add and remove TextWatcher. I created a custom class extending `LineraLayout` which would hold `CheckBox`, `EditText` and a button to remove the entry. In the Activity, I kept an array which would hold all these views and get me data when needed.

### How It Works

 - A new view (checkbox and edittext) is added on start. This view is assigned state as `STATE_LAST` as it is the last item in the array. When the user enters the first character, a new view is added at the bottom and also in the array. The new view gets the state as `STATE_LAST` and the current view gets the state as `STATE_SECOND_LAST`.

 - If the user removes all the text from this view (i.e. `STATE_SECOND_LAST`), the last view is removed and this view's state is changed to `STATE_LAST`. Repeat first step.

 - Let's assume that user has entered the text and moves to the next edittext. The next view will have `STATE_LAST` state. Repeate first step. Here, if you have more than 2 views, view with `STATE_LAST` state gets assigned the `STATE_SECOND_LAST` state and the view with `STATE_SECOND_LAST` state gets assigned the `STATE_OTHER` state.

 - If you change something in the edittext with state `STATE_OTHER`, nothing much happens. You just have to take care of all the views' state while adding or removing new views.

### Screenshot

 Here's a sample screenshot of the app.

 ![Screenshot](https://github.com/jayrambhia/ChecklistDemo/raw/master/images/screenshot_1.jpg)

As you can see I have just implemented the part where users can add checklists. Checking an entry and adding to other layout is the next thing on the checklist. Bad pun.

### Code

 Here's the main class which takes care of states.

 {% gist jayrambhia/d855ce46f8d4add0ebc1 CheckListItemArrayList.java %}

### Demo Application

 I have started to learn `MVP` pattern for Android. Model-View-Presenter. Activity/Fragment is treated as view. Most of the logic is implemented in Model and Presenter. Presenter is the communication link between Model and View. You can fork the project here - **[CheckListDemo](https://github.com/jayrambhia/ChecklistDemo)**

 P.S. I have been learning a lot of new things about Android Development and you'll be bugged to see more posts.
