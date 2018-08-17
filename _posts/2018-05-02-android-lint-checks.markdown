---
category: Blog
tag: Android
comments: true
date: 2018-05-02 16:00:00
layout: post
slug: android-lint
title: Get started with Android Lint - Custom Lint Rules
description: Use Android Lint tool to write custom lint rules to detect and prevent potential issues and bugs. Write a basic rule to detect usage textAppearance in TextView in XML layouts and setup the lint module to run with gradle and Android Studio.
keywords: [android, android development, lint, kotlin, android studio, lint custom rule, lint xml resource, custom lint, how to write custom lint rule, fix lint gradle, continuous integration]
category_tag: [Android, Lint]
---

Android build system provides a lot of tools to optimize the code, find potential issues, improve performance, etc. One of the tool it supports is Lint. Lint is a tool which analyzes the source code and flags potential bugs and errors during the build, and Android Studio even uses Lint to show those bugs and errors in the editor.

From wikipedia,

 > A linter or lint refers to tools that analyze source code to flag programming errors, bugs, stylistic errors, and suspicious constructs.

Android build system provides a lot of Lint rules that are quite helpful such as `Hardcoded String` in xml layout, `Missing Permissions` in Java/Kotlin code. After lint runs over the codebase, it generates a report in html and xml showing warnings and errors.

Sometimes, based on your requirements, you may need to write your custom lint rules. And that's a good thing. Writing your custom Lint rules has never been easier! Android Studio 3 provides a great support to write and run your custom lint rules and you no longer have to copy jar file to `~/.android/lint` or some other place. It's super easy now and you must use Lint!

## Overview

Before writing some code, let's understand different aspects of Lint. There are 4 main parts for every lint check.

 1. **Issue**: As the name suggests, this is what we are using lint for - to find issues in our code. Here, we define what issue we are looking for.
 2. **Detector**: Again, as the name suggests, a detector is used to detect issues in the source code. Here, we write the logic to find out the issues.
 3. **Implementation**: It binds an issue with a detector class and helps lint know where to look for a given issue.
 4. **Registry**: It's a list of all the issues that lint should look for.

## Example

Ideally, we should read more about each element, but what's the fun in that? Let's write a simple custom lint rule that runs on app's xml layouts and registers a warning for every `TextView` that does not use `textAppearance` attribute.

### Module

In your Android app project, create a new module and select `Java Library` option. Once android studio creates the module, let's edit build configuration.

{% highlight gradle %}
apply plugin: 'java-library'

dependencies {
    compileOnly 'com.android.tools.lint:lint-api:26.1.2'
    compileOnly 'com.android.tools.lint:lint-checks:26.1.2'
}

sourceCompatibility = "1.8" // or 1.7
targetCompatibility = "1.8" // or 1.7
{% endhighlight %}

### Issue

Once we have added lint as dependency, we can easily proceed forward with writing our custom lint rule. Let's write a simple Issue.

{% highlight java %}
class TextAppearanceIssue {
  private static final String ID = "MissingTextAppearance";
  private static final String DESCRIPTION = "textAppearance attribute is missing";
  private static final String EXPLANATION = "We should use textAppearance to style a TextView in order to provide consistent design";
  private static final Category CATEGORY = Category.TYPOGRAPHY;
  private static final int PRIORITY = 4;
  private static final Severity SEVERITY = Severity.WARNING;

  public static final Issue ISSUE = Issue.create(
    ID,
    DESCRIPTION,
    EXPLANATION,
    CATEGORY,
    PRIORITY,
    SEVERITY,
    new Implementation(
      TextViewStyleDetector.class,
      Scope.RESOURCE_FILE_SCOPE)
  );
}
{% endhighlight %}

 - **Id**: Id of the issue. This should be unique and is displayed in the report. You use this same id if you want to ingore a lint check.
 - **Description**: Brief description of the issue.
 - **Explanation**: Describe the issue in details and propose possible solutions.
 - **Category**: This defines the category of the issue. There are many categories provided in lint tools such as `TYPOGRAPHY`, `CORRECTNESS`, etc. You should choose the correct category based on your issue.
 - **Priority**: Define priority of the issue on a scale of 0 to 10.
 - **Severity**: Define severity of the issue. eg. `WARNING`, `ERROR`, `FATAL`, etc.

### Implementation

Implementation binds the issue to the detector class. We provide the detector class and a scope of the implementation. We provide `Scope.RESOURCE_FILE_SCOPE` because the issue may be present in resources only.

### Detector

We need to write detection logic for lint to detect the issue.

{% highlight java %}
public class TextViewStyleDetector extends ResourceXmlDetector {

  private static final String SCHEMA = "http://schemas.android.com/apk/res/android";
  private static final String TEXT_APPEARANCE = "textAppearance";
  private static final String TEXTVIEW = "TextView";

  @Nullable
  @Override
  public Collection<String> getApplicableElements() {
    return Collections.singletonList(TEXTVIEW);
  }

  @Override
  public void visitElement(XmlContext context, Element element) {
    if (!element.hasAttributeNS(SCHEMA, TEXT_APPEARANCE)) {
        context.report(
          TextAppearanceIssue.ISSUE,
          context.getLocation(element),
          TextAppearanceIssue.EXPLANATION);
    }
  }
}
{% endhighlight %}

Android lint provides some scanning APIs to be used for detectors.

 - **UastScanner**: Java + Kotlin files
 - **ClassScanner**: Bytecode
 - **BinaryResourceScanner**: Binary resources
 - **ResourceFolderScanner**: Resource folders
 - **XmlScanner**: Xml files
 - **GradleScanner**: Gradle files
 - **OtherFileScanner**: Other files in projects

Here, we extend `ResourceXmlDetector` which implements `XmlScanner` to scan Xml files and get Xml dom elements to perform checks on.

We override method `getApplicableElements` and return `TextView` because we just want to check for TextViews. Based on your requirements, you may return multiple element names or `ALL` which would scan all the elements in xml.

`visitElement` method is called when XmlScanner visits the applicable element. Here, we add our logic. We check if the TextView element has `textAppearance` attribute or not. If not, we report the issue.

`context.report` method is used to report the issue and generate a report. `context.getLocation` gives the location of the element (file path, line number, column) to pinpoint the exact location in the report.

### Registry

We have our Issue, Detecor and Implementation ready. We just need to register the issue and update gradle build script to include the registry class.

{% highlight java %}
public class CustomLintRegistry extends IssueRegistry {

  @NotNull
  @Override
  public List<Issue> getIssues() {
    return Arrays.asList(TextViewStyleDetector.TextAppearanceIssue.ISSUE);
  }
}
{% endhighlight %}

In `getIssues` method, we return a list of all the issues that we want to register with Lint.

We also need to update `build.gradle` file.

{% highlight gradle %}
apply plugin: 'java-library'

dependencies {
    compileOnly 'com.android.tools.lint:lint-api:26.1.2'
    compileOnly 'com.android.tools.lint:lint-checks:26.1.2'
}

sourceCompatibility = "1.8" // or 1.7
targetCompatibility = "1.8" // or 1.7

jar {
    manifest {
        attributes 'Lint-Registry': '<your package name>.CustomLintRegistry'
    }
}
{% endhighlight %}

### Setup

We are all ready with our custom lint rule. We just need to add it to the app's build file. Update your app's `build.gradle` file and add following dependency.

{% highlight gradle %}
dependencies {
	// .. your other dependencies
	lintChecks project(':CustomLint') // here CustomLint is name of the module.
}
{% endhighlight %}

That's it! Let's run lint.

> ./gradlew lintDebug

And your new custom lint rule will be used to check for issues.

## Summary

Writing custom Lint rules for Android is super easy now and you should definitely write some of your own rules to avoid potential issues and especially to keep high code quality in a big team.

## Series

 1. Get started with Android Lint - custom lint rules
 2. [Android Lint Deepdive - advanced custom lint rules](/blog/android-lint-ref)
