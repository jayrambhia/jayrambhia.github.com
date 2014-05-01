---
category: Blog
tag: Data Visualization
comments: true
date: 2014-04-22 15:00:00
layout: post
slug: beginning-d3-js
title: Beginning D3.js
---

A friend was working on a project for data visualization using **D3.js** and I decided to help. I didn't know much about javascript and d3. I still don't, but I learned few things on my way. I wouldn't bore you with details explaining how d3.js works as there are a lot of better sites for that. I made few different types of charts using d3.js and kind of made my own library. It has chain syntax facility and also it's pretty easy to use. One can update the parameters easily. I'd put it on GitHub once I finish scrubbing it up.

<div id="bar-chart-d3">This is just a simple example of a bar chart
</br>
</br>
{% highlight js %}

    var chart = barChart().width(400)
                          .height(300)
                          .barWidth(20)
                          .separation(3)
                          .showAxis(true)
                          .load(data)
                          .idVal("#bar-chart-d3")
                          .showXText(true)
                          .showLegend(true)
                          .autoUpdateWidth(true)
                          .plot();
{% endhighlight %}

Here data is raw data. A 2 dimensional array. I'm generating random data and plotting it. <strong>idVal</strong> parameter is the id of the tag where you want the svg element to be put. In this case, in this div.

</div>

<style type="text/css">
            
        .axis path,
        .axis line {
            fill: none;
            stroke: black;
            shape-rendering: crispEdges;
        }
        
        .axis text {
            font-family: sans-serif;
            font-size: 11px;
        }

        .xaxis path,
        .xaxis line {
            fill: none;
            stroke: black;
            shape-rendering: crispEdges;
        }
        .xaxis text {
            display:none;
        }

        .slice text {
        font-size: 16pt;
        font-family: Arial;
        }
            .line {
        fill: none;
        stroke-width: 2.5px;
        }
    .legend {
            padding: 5px;
            font: 10px sans-serif;
            background: yellow;
            box-shadow: 2px 2px 1px #888;
        }
            
</style>

<script type="text/javascript" src="/assets/js/d3.v2.min.js">

</script>

<script type="text/javascript" src="/assets/js/charts.js">

</script>

<script type="text/javascript">

    //var data = generateData(10, 2);
    var data = [["Fruit","Prices"],["Apple",100],["Orange", 150], ["Peach", 85], ["Grapes", 65], ["Mango", 225]];
    var chart = barChart().width(600).height(300).barWidth(20).separation(3).showAxis(true).showXText(true).showLegend(true).autoUpdateWidth(true).load(data).idVal("#bar-chart-d3").plot();
</script>

Till now, I have created these charts.

 - Bar Chart
 - Multibar Chart (Stacked and Grouped)
 - Pie Chart (Radial and Angular)
 - Scatter Chart
 - Line Chart

I have also added support for Axis and Legend. I'll add one by one blog posts explaining each of them in brief.

P.S. This was a fun project.