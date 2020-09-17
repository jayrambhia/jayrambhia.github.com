---
category: Blog
tag: Android
comments: true
date: 2018-06-26 16:00:00
layout: post
slug: android-lint-ref
title: Android Lint Deep dive - Advanced custom Lint rules
description: Improve your lint tooling by learning to write complex and helpful lint rules. Write a lint rule to detect usage of hardcoded colors, referencing colors to hardcoded colors using ResourceXmlDetector. Learn more about lint tool's lifecycle and use it to write better lint rules.
keywords: [android studio lint warning, lint custom rule, lint xml resource, custom lint in android, how to write custom lint rule, android lint reference]
category_tag: [Android, Lint]
---

This is the second article in the **Android Lint** series. In the [previous article](/blog/android-lint), we talked about basics of Android Lint tool, how to write a custom lint rule, register the issue and set it up. In this article, we shall explore more about Lint and write a lint rule which is a bit advanced.

## Scenario

At work, I was approached by a problem where I had to write a lint rule to detect usage of colors which do not refer to a set of colors provided by the design team. To elaborate more on this, we have a set of colors / color scheme defined by the design team. The app uses these colors, but it also uses some colors which are not provided by the design team, so the lint rule should identify such colors and raise issue for each usage of such colors.

Let's look at a sample.

{% highlight xml %}

<!-- approved colors -->
<color name="app_text_color">#DDFFFFFF</color>
<color name="app_primary_color">#313638</color>

<!-- custom defined colors -->
<color name="primary_color">@color/app_primary_color</color>
<color name="text_color">#FFF</color>

<!-- colors used in layout -->
<TextView
  android:id="@+id/textview"
  android:width="wrap_content"
  android:height="wrap_content"
  android:textColor="@color/text_color" />

<ImageView
  android:id="@+id/imageview"
  android:width="wrap_content"
  android:height="wrap_content"
  android:background="@color/primary_color" />

{% endhighlight %}

Now, when the Lint runs, it should give error for definition and usage of `text_color` and definition and usage of `primary_color` should be fine as it refers to an approved color.

## Approach

I would encourage you to think of a solution for some time before reading further.

Right now, we will just focus on resources and ignore the usage of colors in java/kotlin. We shall extend `ResourceXmlDetector` as we are focusing on resources only. The approach, to this problem that I have come up with, goes somewhat like following:

 1. Find all the declaration of `<color>` element and check which of them refer to approved colors, unapproved colors and hardcoded values. Flag the color, if necessary.
 2. Find all the attributes where colors are supposed to be used, eg. textColor, background, etc.
 3. Filter the above list of color usage and remove approved colors and raise issue for the remanining usages.

## Caveats

The lint tool checks files one after another and we can't be sure of the order of the files. So we may encounter usage of a color before its definition and incorrectly flag it as an error. Let's look at the `lifecycle` of a Lint issue.

## Lifecycle

The "lifecycle" of a lint detector is not as complicated as an Activity and it's also quite helpful.

 1. `beforeCheckProject(Context context)` - This method gets called once per detector when you run lint. Analysis of the project will begin after this method so we should set up necessary things.
 2. `beforeCheckFile(Context context)` - This method gets called once for each file. This method indicates that analysis of that file will begin after this method and we should perform necessary setup.
 3. `afterCheckFile(Context context)` - This method gets called after the analysis of a file is finished. We should perform necessary clean-ups and report the issues.
 4. `afterCheckProject(Context content)` - This method gets called after the analysis of the project is complete. Here, we may perform necessary clean-ups and report project-wide issues.

Other useful methods in the lifecycle:

 1. `visitElement(XmlContext context, Element element)` - XmlScanner invokes this method when it visits a particular element. - We will use this method to find declarations of `<color>` elements.
 2. `visitAttribute(XmlContext context, Attr attribute)` - XmlScanner invokes this method when it visits a particular attribute. - This method is helpful as we will obtain usage of various colors through this method.

## Preparations

It is also necessary that we visit only the `<color>` element and only the attributes where it can be used. `getApplicableElements()` and `getApplicableAttributes()` are the two methods where we will define our scope of elements and attributes. The detector shall gather all the definition in `getApplicableElements()` and all the usage in `getAppilcableAttributes()`, curate lists of approved colors and suspicious usage. In `afterCheckProject()` method, the detector shall filter the colors and report issues.

## Code

Let's write our lint detector.

### Create a new detector

{%highlight java %}
public class ColorDector extends ResourceXmlDetector {

}
{% endhighlight %}

### Define the issue

{% highlight java %}
private static final String ID = "CustomColors";
private static final String DESCRIPTION = "Custom colors used";
private static final String EXPLANATION = "Use pre-defined (allowed) colors only";
private static final Category CATEGORY = Category.CORRECTNESS;
private static final int PRIORITY = 6;
private static final Severity SEVERITY = Severity.ERROR;

public static final Issue ISSUE = Issue.create(
    ID,
    DESCRIPTION,
    EXPLANATION,
    CATEGORY,
    PRIORITY,
    SEVERITY,
    new Implementation(ColorDetector.class, Scope.RESOURCE_FILE_SCOPE)
);
{% endhighlight %}

### Provide Scope

We need to tell the lint tool what type of elements and attributes the detector expects.

{% highlight java %}
@Override
public Collection<String> getApplicableElements() {
  return Collections.singletonList("color");
}

@Override
public Collection<String> getApplicableAttributes() {
  return Arrays.asList("color", "textColor", "background");
}
{% endhighlight %}

With this configuration, this detector will be invoked for all the `<color>` elements in the project. The detecor will also be invoked for `colors`, `textColor`, and `bavkground` attributes even if it's used with elements other than `<color>`.

### Setup

{%highlight java %}
private Set<String> predefinedColors = new HashSet<>();
private Set<String> allowedColors = new HashSet<>();
private List<Pair<Attr, Location>> colorUsages = new ArrayList<>();

@Override
public void beforeCheckProject(Context context) {
  allowedColors.clear();
  colorUsages.clear();

  // add predefined colors.
  predefinedColors.add("my_awesome_color");
  ...
  ...
}
{% endhighlight %}

`predefinedColors` contains all the colors that are defined by the design team. We will add all such colors to the set in `beforeCheckProject` method. This method is called before the project analysis starts for this detector.

`allowedColors` will be filled with custom colors which refer to one of the colors from `predefinedColors`. `colorUsages` is a list of Pair (com.android.utils.Pair) which contains `Attribute` and its `Location` (which is required to repor the issue).

### Check all the colors

{%highlight java %}
@Override
public void visitElement(XmlContext context, Element element) {
  String value = null;
  NodeList nodes = element.getChildNodes();
  if (nodes.getLength() == 1) {
    Node node = nodes.item(0);
    value = node.getNodeValue();
  }

  if (value.startsWith("@color/")) {
    if (predefinedColors.contains(value.substring(7))) {
      allowedColors.add(element.getAttribute("name"));
      return;
    }
  }

  context.report(ISSUE, context.getLocation(element), "custom colors should refer to predefined colors");
}
{% endhighlight %}

`vistiElement` method is called for all the defined `<color>` elements in the project. We need to access the value of that color. We can use `element.getTextContent()` to get the value, but it does not work when the Android Studio runs lint. So we access the child node and get its node value. Once we obtain the value of that color, we need to check if it exists in predefined colors or not. If it does, it means that this color is allowed to be used, so we add it to `allowedColors` set.

### Go through all the color usages

{%highlight java %}
@Override
public void visitAttribute(XmlContext context, Attr attribute) {
  String content = attribute.getTextContent();
  if (content.startsWith("@color/")) {
    if (!predefinedColors.contains(content.substring(7))) {
      colorUsages.add(Pair.of(attribute, context.getLocation(attribute)));
    }
  } else if (content.startsWith("#")) {
    context.report(ISSUE, context.getLocation(attribute), "Do not use hardcoded colors");
  }
}
{% endhighlight %}

`visitAttribute` method is called for all the instances of `color`, `textColor` and `background` attributes. We check if the value (color) of the attribute is in `predefinedColors` set. If it's not present, we add a Pair of attribute and its location to a list for analysis at a later point. We report issue if the value is a hardcoded color.

### Analysis and clean-up

{%highlight java %}
@Override
public void afterCheckProject(Context context) {
  for (Pair<Attr, Location> usage: colorUsages) {
    String content = usage.getFirst().getTextContent();
    if (content.startsWith("@color/")) {
      if (!allowedColors.contains(content.substring(7))) {
        context.report(ISSUE, usage.getSecond(), "custom color does not refer to predefined colors");
      }
    } else if (content.startsWith("#")) {
      context.report(ISSUE, usage.getSecond(), "Do not use hardcoded colors");
    }
  }

  allowedColors.clear();
  colorUsages.clear();
  predefinedColors.clear();
}
{% endhighlight %}

`afterCheckProject` method gets called once the tool goes through all the applicable files. Here, we go through `colorUsages` which contains Pair of attribute and its location about which we are not certain if it's an issue or not. So we check if the value (color) of the attribute is available in `allowedColors` or not. If not, the detector raises the issue.

### Hook and run

As mentioned in the previous article - [Get started with Android Lint - Custom Lint Rules](/blog/android-lint), it's really easy to setup lint.

### Edge cases

During the implementation and testing I found three cases that merits attention.

 1. If a color is defined in its own file (eg. for selector, etc), it does not get correctly attributed and its usage is shown as an issue.
 2. If a color refers to a color which refers to predefined colors, lint will raise error for its definition and usage.
 3. If a color does not refer to predefined colors and `tools:ignore` is used which makes lint ignore the issue in the report, should lint report its usages as issues or not? Right now, it does.

For the second case, I think it's a good practice to raise an issue for a chain of references. If you want to make lives of other devs a bit difficult, you don't fix the 3rd issue and let them add `tools:ignore` for each usage. It is imperative to fix the first case.

This article has become a bit longer than I expected, so I leave it to the reader to fix the edge cases.

Here's the complete code.
{% gist jayrambhia/8d2416f7ec197b418ae3d762d67a7e80 ColorDetector.java %}

Here's the solution for 1st and 3rd edge case - [ColorDetector](https://gist.github.com/jayrambhia/8d2416f7ec197b418ae3d762d67a7e80#file-colordetectorwithedgecases-java).

## Summary

Lint is a very effective tool for static analysis and can prevent a lot of potential issues and help maintain the code quality. In the next article, I will talk about debugging and generating custom report with lint.

## Series

 1. [Get started with Android Lint - custom lint rules](/blog/android-lint)
 2. Android Lint Deepdive - advanced custom lint rules
