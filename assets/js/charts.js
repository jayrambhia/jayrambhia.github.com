axis = function(){
    /*
    function to create and plot d3.svg.axis() with appropriate scale and range.

    Usage: 
        Xaxis = axis();

    Parameters:
        ldomain  - start of domain
        rdomain  - end of domain
        lrange   - start of range
        rrange   - end of range
        xpadding - padding on x axis
        ypadding - padding on y axis
        orientation - Orientation of the axis. eg. left, bottom, etc.

    Example:
        Xaxis = axis();

        // Put 7 elements with data range of 20 to 90 on X axis.
        Xaxis.ldomain(0).rdomain(7).lrange(20).rrange(90).orientation("bottom");
        Xaxis.plot();

        Yaxis = axis().ldomain(0).rdomain(5).lrange(100).rrange(300).orientation("left").plot();
        // change left domain after plotting
        Yaxis.ldomain(2);
        // change xpadding
        Yaxis.xpadding(20);
    */
    var ldomain = 0, rdomain = 0, lrange = 0, rrange = 0;
    var class_attr = "axis";
    var orientation = "left", ticks = 0;
    var xpadding = 10, ypadding = 10;
    var plotted = false;

    var scale, Axis, AxisGroup;

    function chart(selection){}

    chart.ticks = function(_) {
        if (!arguments.length) return ticks;
        ticks = _;
        chart.update();
        return chart;
    }
    chart.ldomain = function(_) {
        if (!arguments.length) return ldomain;
        ldomain = _;
        chart.update();
        return chart;
    }
    chart.rdomain = function(_) {
        if (!arguments.length) return rdomain;
        rdomain = _;
        chart.update();
        return chart;
    }
    chart.lrange = function(_) {
        if (!arguments.length) return lrange;
        lrange = _;
        chart.update();
        return chart;
    }
    chart.rrange = function(_) {
        if (!arguments.length) return rrange;
        rrange = _;
        chart.update();
        return chart;
    }
    chart.orientation = function(_) {
        if (!arguments.length) return orientation;
        orientation = _;
        chart.update();
        return chart;
    }
    chart.xpadding = function(_) {
        if (!arguments.length) return xpadding;
        xpadding = _;
        chart.update();
        return chart;
    }
    chart.ypadding = function(_) {
        if (!arguments.length) return ypadding;
        ypadding = _;
        chart.update();
        return chart;
    }

    chart.classAttr = function(_) {
        if (!arguments.length) return class_attr;
        class_attr = _;
        return chart;
    }

    chart.plot = function(svg) {
        plotted = true;
        scale = d3.scale.linear()
                     .domain([ldomain, rdomain])
                     .range([lrange, rrange]);

        Axis = d3.svg.axis()
                    .scale(scale)
                    .orient(orientation)
                    .ticks(ticks);

        AxisGroup = svg.append("g")
                         .attr("class", class_attr)
                         .attr("transform", "translate(" + xpadding + "," + ypadding + ")")
                         .call(Axis);
        return svg;
    }

    chart.update = function(){

        if (!plotted) {return chart;}

        scale = d3.scale.linear()
                     .domain([ldomain, rdomain])
                     .range([lrange, rrange]);

        Axis = d3.svg.axis()
                    .scale(scale)
                    .orient(orientation)
                    .ticks(ticks);
        
        AxisGroup.transition().duration(1000)
                         .attr("transform", "translate(" + xpadding + "," + ypadding + ")")
                         .call(Axis);
    }
    
    return chart;
}

legend = function() {
    var   lHeight = 100
        , lWidth = 100
        , rect
        , colorPalette = d3.scale.category20c()
        , textSize = 10
        , width
        , height
        , idval = ""
        , showVal = false
        , plotted = false;

    var legend;

    function chart(selection){

    }

    chart.plot = function(svg, data) {
        plotted = true;
        legend = svg.append("g")
                        .attr("class", "legend")
                        .attr("id", idval)
                        .attr("height", lHeight)
                        .attr("width", lWidth);
                        //.attr("transform", "translate(-20, 50)");
        if (rect)
        {
            legend.selectAll("rect")
                  .data(data) 
                  .enter()
                  .append("rect")
                  .attr("x",function(d,i){
                    if (i==0)
                    {
                        return -10;
                    }
                    return width - lWidth - 12
                    })
                  .attr("y", function(d, i){return i*20 - 4;})
                  .attr("width", 10)
                  .attr("height", 10)
                  .style("fill", function(d, i){
                    return colorPalette(i);
                  });
        }
        else
        {
            legend.selectAll("circle")
                  .data(data)
                  .enter()
                  .append("circle")
                  .attr("cx", function(d, i){
                    if (i==0)
                    {
                        return -10;
                    }
                    return width - lWidth - 12; })
                  .attr("cy", function(d, i){return i*20;})
                  .attr("r", 8)
                  .style("fill", function(d, i){return colorPalette(i);});
        }

        legend.selectAll("text")
              .data(data)
              .enter()
              .append("text")
              .attr("x", width - lWidth)
              .attr("y", function(d, i){return i*20+4;})
              .text(function(d, i){
                if (i == 0)
                {
                    return "";
                }
                if (!showVal)
                {
                    return data[i][0];
                }
                return data[i][0] + " : " + data[i][1];
              });
        return chart;
    }

    chart.update = function() {
        if (!plotted) { return chart; }
        if (rect)
        {
            d3.select("#"+idval).selectAll("rect").transition().duration(100)
                .attr("x",function(d,i){
                    if (i==0)
                    {
                        return -10;
                    }
                    return width - lWidth - 12
                    })
                .attr("y", function(d, i){return i*20 - 4;})

        }
        else
        {
            d3.select("#"+idval).selectAll("circle").transition().duration(100)
                .attr("cx", function(d, i){
                    if (i==0)
                    {
                        return -10;
                    }
                    return width - lWidth - 12; })
                  .attr("cy", function(d, i){return i*20;})
        }

        d3.select("#"+idval).selectAll("text")
            .attr("x", width - lWidth)
            .attr("y", function(d, i){
                //console.log("i "+i);
                return i*20+4;});
        
        return chart;
    }

    chart.idval = function(_) {
        if (!arguments.length) return idval;
        idval = _;
        //chart.updatePlotValues();
        //chart.update();
        return chart;
    }

    chart.width = function(_) {
        if (!arguments.length) return width;
        width = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.height = function(_) {
        if (!arguments.length) return height;
        height = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.updatePlotValues = function() {
        return chart;
    }

    chart.lWidth = function(_) {
        if (!arguments.length) return lWidth;
        lWidth = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.showVal = function(_){
        if (!arguments.length) return showVal;
        showVal = _;
        return chart;
    }

    chart.lHeight = function(_) {
        if (!arguments.length) return lHeight;
        lHeight = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.rect = function(_) {
        if (!arguments.length) return rect;
        rect = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    return chart;
}

barChart = function() {
    /*
    function to create bar chart.

    Data specification: 
        - Only two columns
        - first row should be headers
        - first column should be name based
        - second column should be number based

    Usage:
        var bar_chart = barChart();

        //load data
        bar_chart.load(data)

        //plot
        bar_chart.plot();

    Parameters:
        width       - Width of svg element
        height      - height of svg element
        barWidth    - width of each bar
        separation  - separation between two bars
        ypadding    - padding on y side
        xpadding    - padding on x side
        yTicks      - number of ticks on y axis
        xTicks      - number og ticks on x axis
        showAxis    - show/hide axis. boolean value
        showYText   - show/hide text on y axis.
        showXText   - show/hide text on x axis.

    Example:
        var bar = barChart();

        // add parameters
        bar.width(800).height(200).separation(5);

        // load data
        bar.load(data);

        // plot
        bar.plot();

        //After plotting change params. It will automatically do the transition.
        bar.height(300).barWidth(10);
    */
    var   width = 600
        , height = 300
        , colorPalette = d3.scale.category20c()
        , barWidth = 40
        , separation = 5
        , xpadding = 50
        , ypadding = 10
        , textXOffset = 15
        , textYOffset = 15
        , textYPosition = 300
        , yTicks = 5
        , xTicks = 0
        , maxData = 0
        , xrange = 0
        , yrange = 0
        , cols = 0
        , rows = 0
        , maxData = 0
        , xrange = 0
        , yrange = 0
        , barHeightMultiplier = 1
        , showAxis = true
        , showYText = false
        , showXText = false
        , textSpace = 50
        , showLegend = false
        , showLegendVal = true
        , lHeight = 100
        , lWidth = 100
        , lMultiplier = 0
        , autoUpdateWidth = false
        , plotted = false
        , data_loaded = false
        , idVal = "body";

    var rectContainer;
    var xAxis = axis() , yAxis = axis();
    var ilegend = legend();

    function chart(selection) {
        //selection.each
    }

    chart.plot = function() {

        plotted = true;
        var svg = d3.select(idVal).append("svg").attr("width", width).attr("height", height).attr("id","svg-bar");

        if (showAxis)
        {
            console.log(xrange + " xrange");
            xAxis.ldomain(0)
                 .rdomain(rows)
                 .lrange(0)
                 .rrange(xrange)
                 .xpadding(xpadding)
                 .classAttr("xaxis")
                 .ypadding(height - textSpace)
                 .orientation("bottom")
                 .ticks(xTicks)
                 .plot(svg);

            yAxis.ldomain(maxData)
                 .rdomain(0)
                 .lrange(0)
                 .rrange(height - textSpace - ypadding)
                 .ticks(yTicks)
                 .ypadding(ypadding)
                 .xpadding(xpadding)
                 .orientation("left")
                 .plot(svg);
        }

        if (showLegend)
        {
            ilegend.width(width)
                  .height(height)
                  .lHeight(lHeight)
                  .lWidth(lWidth)
                  .rect(true)
                  .idval("legend-bar")
                  .showVal(showLegendVal)
                  .plot(svg, data);
        }

        rectContainer = svg.append("g")
                           .attr("id", "bar")
                           .attr("height", height)
                           .attr("width", width - lMultiplier*lWidth);

        rectContainer.selectAll("rect").data(data)
                    .enter()
        .append("rect").attr("x", function(d, i)
        {
            return (xpadding + (i-1)*(barWidth+separation));
            
        }).attr("y", function(d, i)
        {
            if(i==0){return 0;}
            console.log("y "+ d[1]);
            return height - textSpace - d[1] * barHeightMultiplier - 1;
        }).attr("width", function(d)
        {
            return barWidth;
        }).attr("height", function(d, i)
        {
            if(i==0){return 0;}
            return d[1] * barHeightMultiplier;
        }).style("fill", function(d, i) {return colorPalette(i);});

        
        if (showXText)
        {
            //console.log("showXText");
            rectContainer.selectAll("text").data(data).enter()
            .append("text").text(function(d, i)
            {
                if (i==0) { return ""};
                //console.log("text " + d[0]);
                return d[0];
            })
            
            .attr("x", function(d, i)
            {
                return (xpadding + (i-1)*(barWidth+separation));;
            }).attr("y", textYPosition)
            
              .attr("font-family", "sans-serif")
              .attr("font-size", "12px")
              .attr("fill", function(d, i){return colorPalette(i);})
              
              .attr("transform", function(d, i)
                {
                    var xvar = (xpadding + 20 + (i-1)*(barWidth+separation));
                    var yvar = textYPosition ;
                    return "rotate(-90," + xvar + "," + yvar + ")";
                });   
        }
        
        return chart;

    }

    chart.load = function(indata) {
        data = indata;
        rows = data.length;
        cols = data[0].length;

        console.log("load rows " + rows);

        for(var s=0; s<rows; s++)
        {
            if (maxData < Number(data[s][1]))
            {
                maxData = Number(data[s][1]);
            }
        }

        xrange = (rows - 1) * (barWidth + separation) + xpadding;
        yrange = maxData;
        barHeightMultiplier = (height - ypadding - textSpace) / maxData;
        textYPosition = height - 1;

        data_loaded = true;
        chart.updatePlotValues();
        return chart;

    }
    
    chart.width = function(_) {
        if (!arguments.length) return width;
        width = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.height = function(_) {
        if (!arguments.length) return height;
        height = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.separation = function(_) {
        if (!arguments.length) return separation;
        separation = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.xpadding = function(_) {
        if (!arguments.length) return xpadding;
        xpadding = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.ypadding = function(_) {
        if (!arguments.length) return ypadding;
        ypadding = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.xTicks = function(_) {
        if (!arguments.length) return xTicks;
        xTicks = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.yTicks = function(_) {
        if (!arguments.length) return yTicks;
        yTicks = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }
    chart.barWidth = function(_) {
        if (!arguments.length) return barWidth;
        barWidth = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.showAxis = function(_) {
        if (!arguments.length) return showAxis;
        showAxis = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.showXText = function(_) {
        if (!arguments.length) return showXText;
        showXText = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.showLegend = function(_) {
        if (!arguments.length) return showLegend;
        showLegend = _;
        if (showLegend)
        {
            lMultiplier = 1;
        }
        else
        {
            lMultiplier = 0;
        }
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.showLegendVal = function(_) {
        if (!arguments.length) return showLegendVal;
        showLegendVal = _;
        return chart;
    }

    chart.legendWidth = function(_) {
        if (!arguments.length) return lWidth;
        lWidth = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.legendHeight = function(_) {
        if (!arguments.length) return lHeight;
        lHeight = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.idVal = function(_) {
        if (!arguments.length) return idVal;
        idVal = _;
        return chart;
    }

    function getTotalWidth(r, bw, s, xpad, lm, lw)
    {
        console.log("r" + r);
        console.log("bw" + bw);
        console.log("s" + s);
        console.log("xpad" + xpad);
        console.log("lm" + lm);
        console.log("lw" + lw);
        return (r - 1) * (bw + s) + xpad + lm*lw;
    }

    chart.reduceWidths = function(){
        var tWidth = getTotalWidth(rows, barWidth, separation, xpadding, lMultiplier, lWidth);
        console.log("tWidth " + tWidth + " width " + width);
        if (tWidth > width)
        {
            console.log("reduce barWidth and separation");
            var s1, s2;
            for (s1=barWidth, s2=separation; s1>1, s2>1; s1--, s2-=0.5)
            {
                tWidth = (rows - 1) * (s1 + s2) + xpadding + lMultiplier*lWidth;
                console.log("s1 " + s1 + " s2 " + s2);
                if (tWidth < width)
                {
                    barWidth = s1;
                    separation = s2;

                    console.log("separation " + separation);
                    console.log("barWidth " + barWidth);
                    break;
                }
            }

            console.log(s2 + " s2 after reducing both");

            if (s2 <= 2)
            {
                tWidth = (rows - 1) * (s1 + s2) + xpadding + lMultiplier*lWidth;
                console.log("tWidth " + tWidth + " width " + width);
                if (tWidth > width)
                {
                    console.log("recude barWidth");
                    for(s1=s1; s1>1; s1--)
                    {
                        tWidth = (rows - 1) * (s1 + s2) + xpadding + lMultiplier*lWidth;
                        console.log("s1 " + s1 + " s2 " + s2);

                        if (tWidth < width)
                        {
                            barWidth = s1;
                            separation = s2;
                            break;
                        }

                    }
                    tWidth = (rows - 1) * (s1 + s2) + xpadding + lMultiplier*lWidth;
                    if (tWidth > width)
                    {
                        barWidth = s1;
                        separation = s2;
                    }
                }
                else
                {
                    barWidth = s1;
                    separation = s2;
                }
            }
        }
        return chart;
    }

    chart.increaseWidths = function(){

        var tWidth = getTotalWidth(rows, barWidth, separation, xpadding, lMultiplier, lWidth);
        console.log("tWidth " + tWidth + " width " + width);
        if (tWidth < width)
        {
            console.log("increase barWidth and separation");
            var s1, s2;
            for (s1=barWidth, s2=separation; s1<width/rows, s2<width; s1++, s2+=0.5)
            {
                tWidth = (rows - 1) * (s1 + s2) + xpadding + lMultiplier*lWidth;
                console.log("s1 " + s1 + " s2 " + s2);
                if (tWidth > width)
                {
                    barWidth = s1;
                    separation = s2;

                    console.log("separation " + separation);
                    console.log("barWidth " + barWidth);
                    break;
                }
            }
        }
        return chart;
    }

    chart.autoUpdateWidth = function(_){
        if (!arguments.length) return autoUpdateWidth;
        autoUpdateWidth = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.updatePlotValues = function(){
        if (!data_loaded) { return chart;}
        if (autoUpdateWidth)
        {
            console.log("rows" + rows);
            console.log("tWidth");
            console.log(getTotalWidth(rows, barWidth, separation, xpadding, lMultiplier, lWidth));
            console.log("width " + width);
            if (getTotalWidth(rows, barWidth, separation, xpadding, lMultiplier, lWidth) < width)
            {
                console.log("increaseWidths");
                this.increaseWidths();
            }
            else
            {
                console.log("reduceWidths");
                this.reduceWidths();
            }
        }
        xrange = (rows - 1) * (barWidth + separation) + xpadding;
        yrange = maxData;
        barHeightMultiplier = (height - ypadding - textSpace) / maxData;
        textYPosition = height - 20;
    }

    chart.update = function(_){
        if (!plotted) { return chart; }
        if (showAxis)
        {
            console.log(xrange + " xrange");
            xAxis.ldomain(0)
                 .rdomain(rows)
                 .lrange(0)
                 .rrange(xrange)
                 .xpadding(xpadding)
                 .ypadding(height - textSpace)
                 .orientation("bottom")
                 .ticks(xTicks)
                 .update();

            yAxis.ldomain(maxData)
                 .rdomain(0)
                 .lrange(0)
                 .rrange(height - textSpace - ypadding)
                 .ticks(yTicks)
                 .ypadding(ypadding)
                 .xpadding(xpadding)
                 .orientation("left")
                 .update();
        }
        
        d3.select("#svg-bar").attr("height", height).attr("width", width);


        d3.select("#bar").selectAll("rect").transition().duration(1000)
           .attr("x", function(d, i)
            {
                return (xpadding + (i-1)*(barWidth+separation));
        
            }).attr("y", function(d)
            {
                return height - textSpace - d[1] * barHeightMultiplier - 1;
            }).attr("width", function(d)
            {
                return barWidth;
            }).attr("height", function(d)
            {
                return d[1] * barHeightMultiplier;
            }).style("fill", function(d, i) {return colorPalette(i);});
        
        if (showXText)
        {
            d3.select("#bar").selectAll("text")
                .attr("x", function(d, i)
                {
                    return (xpadding + (i-1)*(barWidth+separation) + 5);
                }).attr("y", textYPosition)
                .attr("transform", function(d, i)
                {
                    var xvar = (xpadding + (i-1)*(barWidth+separation));
                    var yvar = textYPosition ;
                    return "";
                    //return "translate("+ (xvar) +","+(yvar)+")rotate(0)";
                });   
        }

        if (showLegend)
        {
            ilegend.width(width)
                  .height(height)
                  .lHeight(lHeight)
                  .lWidth(lWidth)
                  .update();
        }

    }
    return chart;

}

multidatalegend = function() {
    var   lHeight = 100
        , lWidth = 100
        , rect
        , colorPalette = d3.scale.category20c()
        , textSize = 10
        , width
        , height
        , idval = ""
        , showVal = false
        , cols
        , rows
        , plotted = false;

    var legend;

    function chart(selection){

    }

    chart.plot = function(svg, data) {
        //cols = data[0].length;
        //rows = data.length;
        plotted = true;
        legend = svg.append("g")
                        .attr("class", "legend")
                        .attr("id", idval)
                        .attr("height", lHeight)
                        .attr("width", lWidth);
                        //.attr("transform", "translate(-20, 50)");
        if (rect)
        {
            legend.selectAll("rect")
                  .data(data) 
                  .enter()
                  .append("rect")
                  .attr("x",function(d,i){
                    return width - lWidth - 12
                    })
                  .attr("y", function(d, i){return (i+1)*20 - 4;})
                  .attr("width", 10)
                  .attr("height", 10)
                  .style("fill", function(d, i){
                    return colorPalette(i);
                  });
        }
        else
        {
            legend.selectAll("circle")
                  .data(data)
                  .enter()
                  .append("circle")
                  .attr("cx", function(d, i){

                    return width - lWidth - 12; })
                  .attr("cy", function(d, i){return (i+1)*20;})
                  .attr("r", 8)
                  .style("fill", function(d, i){return colorPalette(i);});
        }

        legend.selectAll("text")
              .data(data)
              .enter()
              .append("text")
              .attr("x", width - lWidth)
              .attr("y", function(d, i){return (i+1)*20+4;})
              .text(function(d, i){
                if (!showVal)
                {
                    return data[i][0];
                }
                return data[i][0] + " : " + data[i][1];
              });
        return chart;
    }

    chart.update = function() {
        if (!plotted) { return chart; }
        if (rect)
        {
            d3.select("#"+idval).selectAll("rect").transition().duration(100)
                .attr("x",function(d,i){
                    return width - lWidth - 12
                    })
                .attr("y", function(d, i){return (i+1)*20 - 4;})

        }
        else
        {
            d3.select("#"+idval).selectAll("circle").transition().duration(100)
                .attr("cx", function(d, i){
                    return width - lWidth - 12; })
                  .attr("cy", function(d, i){return (i+1)*20;})
        }

        d3.select("#"+idval).selectAll("text")
            .attr("x", width - lWidth)
            .attr("y", function(d, i){
                //console.log("i "+i);
                return (i+1)*20+4;});
        
        return chart;
    }

    chart.idval = function(_) {
        if (!arguments.length) return idval;
        idval = _;
        //chart.updatePlotValues();
        //chart.update();
        return chart;
    }

    chart.width = function(_) {
        if (!arguments.length) return width;
        width = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.height = function(_) {
        if (!arguments.length) return height;
        height = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.updatePlotValues = function() {
        return chart;
    }

    chart.lWidth = function(_) {
        if (!arguments.length) return lWidth;
        lWidth = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.showVal = function(_){
        if (!arguments.length) return showVal;
        showVal = _;
        return chart;
    }

    chart.lHeight = function(_) {
        if (!arguments.length) return lHeight;
        lHeight = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.rect = function(_) {
        if (!arguments.length) return rect;
        rect = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    return chart;
}


multibarChart = function() {
    /*
    function to create multibar chart. Can switch between stacked and grouped
    charts.

    Data specification: 
        - More than one column
        - first row should be headers
        - first column should be name based
        - other columns should be number based

    Usage:
        var multibar_chart = multibarChart();

        //load data
        multibar_chart.load(data)

        //plot
        multibar_chart.plot();

    Parameters:
        width       - Width of svg element
        height      - height of svg element
        barWidth    - width of each bar
        separation  - separation between two bars
        ypadding    - padding on y side
        xpadding    - padding on x side
        yTicks      - number of ticks on y axis
        xTicks      - number og ticks on x axis
        showAxis    - show/hide axis. boolean value
        showYText   - show/hide text on y axis.
        showXText   - show/hide text on x axis.
        stacked     - Boolean value. stacked if true, else grouped.

    Example:
        var chart = multibarChart();

        // add parameters
        chart.width(800).height(200).separation(5);

        // load data
        chart.load(data);

        // create stacked chart
        chart.stacked(true);

        // plot
        chart.plot();

        //After plotting change params. It will automatically do the transition.
        chart.height(300).barWidth(10);

        // convert stacked chart to grouped chart.
        chart.stacked(false); // auto transition
    */
    var   width = 600
        , height = 300
        , colorPalette = d3.scale.category20c()
        , barWidth = 40
        , separation = 5
        , xpadding = 40
        , ypadding = 10
        , textXOffset = 15
        , textYOffset = 15
        , textYPosition = 300
        , textSpace = 50
        , yTicks = 5
        , xTicks = 0
        , maxData = 0
        , xrange = 0
        , yrange = 0
        , cols = 0
        , rows = 0
        , maxData = 0
        , barHeightMultiplier = 1
        , widthMultiplier = 1
        , showAxis = true
        , showYText = false
        , showText = false
        , textSpace = 50
        , showLegend = false
        , showLegendVal = false
        , lHeight = 100
        , lWidth = 100
        , lMultiplier = 0
        , autoUpdateWidth = false
        , plotted = false
        , stacked = true
        , idVal = "body";

    var xAxis = axis() , yAxis = axis();
    var ilegend = multidatalegend();
    var rectContainer;
    function chart(selection) {
        //selection.each
    }

    chart.plot = function() {

        plotted = true;
        var svg = d3.select(idVal).append("svg").attr("width", width).attr("height", height).attr("id", "svg-multibar");

        if (showAxis)
        {
            xAxis.ldomain(0)
                 .rdomain(rows)
                 .lrange(0)
                 .rrange(xrange)
                 .xpadding(xpadding)
                 .classAttr("xaxis")
                 .ypadding(height - textSpace)
                 .orientation("bottom")
                 .ticks(xTicks)
                 .plot(svg);

            yAxis.ldomain(maxData)
                 .rdomain(0)
                 .lrange(0)
                 .rrange(height - ypadding - textSpace)
                 .ticks(yTicks)
                 .ypadding(ypadding)
                 .xpadding(xpadding)
                 .orientation("left")
                 .plot(svg);
        }

        if (showLegend)
        {
            var legendData = []
            for (var s=0; s<data[0].length; s++)
            {
                legendData.push([data[0][s]]);
            }

            legendData.shift();

            ilegend.width(width)
                  .height(height)
                  .lHeight(lHeight)
                  .lWidth(lWidth)
                  .rect(false)
                  .idval("legend-multibar")
                  .showVal(showLegendVal)
                  .plot(svg, legendData);
        }
        
        rectContainer = svg.append("g")
                           .attr("id", "multibar")
                           .attr("height", height)
                           .attr("width", width - lMultiplier*lWidth);
        
        var dataEnter = svg.selectAll("rect").data(data).enter();//.attr("id","mulrect");
        rectContainer.selectAll("rect").data(data).enter();

        if(stacked)
        {
            console.log("stacked");
            console.log("columns " + cols);
            // stacked bars
            for(var n=0; n<cols-1; n++)
            {
                dataEnter.append("rect").attr("x", function(d, i)
                {
                    console.log("i " + i);
                    if (i == 0) { return 0; }
                    return (xpadding + 1 + (i-1)*(barWidth+separation));
                }).attr("y", function(d, i)
                {
                    if (i == 0) { return 0; }
                    var ytop = 0;
                    for(var m = cols - 1; m > n; m--)
                    {
                        ytop += Number(d[m]);
                    }
                    return height - textSpace - ytop * barHeightMultiplier - 1;
                }).attr("width", function(d, i)
                {
                    if (i == 0) { return 0; }
                    return barWidth;
                }).attr("height", function(d, i)
                {
                    if (i == 0) { return 0; }
                    return d[n+1] * barHeightMultiplier;
                }).style("fill", function(d, i) {return colorPalette(n);})
                .attr("row",function(d,i){if (i == 0) { return 0; }return i;})
                .attr("col", function(d,i){if (i == 0) { return 0; }return n+1;});
                //.attr("id","mulrect");
            }
        }
        else
        {
            // grouped bars
            var sBarWidth = barWidth/cols;
            for(var n=0; n < cols - 1; n++)
            {
                dataEnter.append("rect").attr("x", function(d, i)
                {
                    if (i == 0) { return 0; }
                    return (xpadding + 5 + (n*sBarWidth) + (i-1)*(cols-1)*(sBarWidth) + (i-1)*(separation));
                //return ((i-1) + 0.5) * horizontalBarDistance + (n * barWidth) + xpadding;
                }).attr("y", function(d, i)
                {
                    if (i == 0) { return 0; }
                    return height - textSpace - d[n+1] * barHeightMultiplier - 1;
                }).attr("width", function(d, i)
                {
                    if (i == 0) { return 0; }
                    return sBarWidth;
                }).attr("height", function(d, i)
                {
                    if (i == 0) { return 0; }
                    return d[n+1] * barHeightMultiplier;
                }).style("fill", function(d, i) {return colorPalette(n);})
                .attr("row",function(d,i){if (i == 0) { return 0; }return i;})
                .attr("col", function(d,i){if (i == 0) { return 0; }return n+1;});

            }
        }

        if (showText)
        {
            textContainer = svg.append("g").attr("id", "multibar-x-text")
                                .attr("width", width).attr("height", 40);
            textContainer.selectAll("text").data(data).enter();

            for (var s=1; s<data.length; s++)
            {
                textContainer.append("text")
                             .text(function(d, i){
                                return data[s][0];
                             }).attr("font-family", "sans-serif")
                               .attr("font-size", "12px")
                               .attr("x", function(d, i)
                                {
                                    return xpadding + (s-1)*(barWidth+separation)+3;
                                }).attr("y", function(d,i){
                                    return height - textSpace + 15;
                                });
            }
        }

        return chart;

    }

    chart.load = function(indata) {
        data = indata;
        rows = data.length;
        cols = data[0].length;

        var cData = 0;
        for(var i=1; i<rows; i++)
        {
            for(var j=1; j<cols; j++)
            {
                cData += Number(data[i][j]);
            }
            if(cData > maxData)
            {
                    maxData = cData;
            }
            cData = 0;
        }

        xrange = (rows - 1) * (barWidth) + (rows - 2)*separation + xpadding;
        yrange = maxData;
        widthMultiplier = (width - xpadding - lMultiplier*lWidth)/(rows-2);
        barHeightMultiplier = (height - ypadding - textSpace) / maxData;
        textYPosition = height - 1;

        chart.updatePlotValues();
        return chart;

    }
    
    chart.width = function(_) {
        if (!arguments.length) return width;
        width = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }
    chart.stacked = function(_) {
        if (!arguments.length) return stacked;
        stacked = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.height = function(_) {
        if (!arguments.length) return height;
        height = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.separation = function(_) {
        if (!arguments.length) return separation;
        separation = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.xpadding = function(_) {
        if (!arguments.length) return xpadding;
        xpadding = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.ypadding = function(_) {
        if (!arguments.length) return ypadding;
        ypadding = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.xTicks = function(_) {
        if (!arguments.length) return xTicks;
        xTicks = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.yTicks = function(_) {
        if (!arguments.length) return yTicks;
        yTicks = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }
    chart.barWidth = function(_) {
        if (!arguments.length) return barWidth;
        barWidth = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.showAxis = function(_) {
        if (!arguments.length) return showAxis;
        showAxis = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.showText = function(_) {
        if (!arguments.length) return showText;
        showText = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.showLegend = function(_) {
        if (!arguments.length) return showLegend;
        showLegend = _;
        if (showLegend)
        {
            lMultiplier = 1;
        }
        else
        {
            lMultiplier = 0;
        }
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.showLegendVal = function(_) {
        if (!arguments.length) return showLegendVal;
        showLegendVal = _;
        return chart;
    }

    chart.legendWidth = function(_) {
        if (!arguments.length) return lWidth;
        lWidth = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.legendHeight = function(_) {
        if (!arguments.length) return lHeight;
        lHeight = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }
    chart.idVal = function(_) {
        if (!arguments.length) return idVal;
        idVal = _;
        return chart;
    }


    chart.updatePlotValues = function(){
        if (stacked)
        {
            var cData = 0;
            maxData = 0;
            for(var i=1; i<rows; i++)
            {   
                for(var j=1; j<cols; j++)
                {
                    cData += Number(data[i][j]);
                }
                if(cData > maxData)
                {
                    maxData = cData;
                }
                cData = 0;
            }
        }
        else
        {
            maxData = 0;
            for(var i=1; i<rows; i++)
            {
                for(var j=1; j<cols; j++)
                {
                    if(Number(data[i][j]) > maxData)
                    {
                        maxData = Number(data[i][j]);
                    }
                }
            }   
        }
        xrange = (rows - 1) * (barWidth) + (rows - 2)*separation + xpadding;
        yrange = maxData;
        barHeightMultiplier = (height - ypadding - textSpace) / maxData;
        widthMultiplier = (width - xpadding - lMultiplier*lWidth)/(rows-1);
        textYPosition = height - 20;
    }

    chart.update = function(_){
        if (!plotted) { return chart; }
        
        if(showAxis)
        {
            xAxis.ldomain(0)
                 .rdomain(rows)
                 .lrange(0)
                 .rrange(xrange)
                 .xpadding(xpadding)
                 .ypadding(height - textSpace)
                 .orientation("bottom")
                 .ticks(xTicks)
                 .update();

            yAxis.ldomain(maxData)
                 .rdomain(0)
                 .lrange(0)
                 .rrange(height - ypadding - textSpace)
                 .ticks(yTicks)
                 .ypadding(ypadding)
                 .xpadding(xpadding)
                 .orientation("left")
                 .update();
        }

        var barNodes = document.querySelectorAll("svg");
        d3.select("svg").attr("height", height).attr("width", width);

        if(stacked)
        {
            //replot stacked bars
            
            //for(var m=0; m<barNodes.length; m++) {
                var rect = d3.select("#svg-multibar").selectAll("rect");
                var rowval = 0;
                var colval = 0;
                rect.transition().duration(1000)
                    .attr("x", function(d, i)
                    {
                        rowval = d3.select(this).attr("row");
                        colval = d3.select(this).attr("col");
                        
                        if (rowval == 0) {return 0;}
                        return (xpadding + 1 + (rowval-1)*(barWidth+separation));
                        
                    }).attr("y", function(d, i)
                    {
                        if (rowval == 0) { return 0; }
                        var ytop = 0;

                        for(var s = cols - 1; s >= colval; s--)
                        {
                            ytop += Number(d[s]);
                        }
                        return height - textSpace - (ytop * barHeightMultiplier) - 1;
                    }).attr("width", function(d, i)
                    {
                        if (rowval == 0) { return 0; }
                        return barWidth;
                    }).attr("height", function(d, i)
                    {
                        if (rowval == 0) { return 0; }
                        return d[colval] * barHeightMultiplier;
                    });
            //}

        }
        else
        {
            // replot grouped bars
            var sBarWidth = barWidth/(cols-1);

            //for(var m=0; m<barNodes.length; m++) {
                var rect = d3.select("#svg-multibar").selectAll("rect");
                var rowval = 0;
                var colval = 0;
                
                rect.transition()
                    .delay(function(d,i){return i * 20;})
                    .attr("y", function(d, i)
                    {
                        rowval = d3.select(this).attr("row");
                        colval = d3.select(this).attr("col");

                        console.log("row = " + rowval);
                        console.log("col = " + colval);
                        if (rowval == 0) { return 0; }
                        return height - textSpace - (d[colval] * barHeightMultiplier) - 1;
                    }).attr("height", function(d, i)
                    {
                        if (rowval == 0) { return 0; }
                        return d[colval] * barHeightMultiplier;
                    }).transition().duration(500)
                    .attr("x", function(d, i)
                    {
                        if (rowval == 0) {return 0;}
                        console.log("x = ");
                        console.log(xpadding + 1 + ((colval - 1)*sBarWidth) + (rowval-1)*(cols-1)*(sBarWidth) + (rowval-1)*(separation));
                        return (xpadding + 1 + ((colval - 1)*sBarWidth) + (rowval-1)*(cols-1)*(sBarWidth) + (rowval-1)*(separation));
                        
                    }).transition()
                    .attr("width", function(d, i)
                    {
                        if (rowval == 0) { return 0; }
                        return sBarWidth;
                    });
            //}

        }

        if (showText)
        {
            tContainer = d3.select("#multibar-x-text").selectAll("text").transition().duration(1000)
                           .attr("x", function(d, i)
                            {
                                return xpadding + (i)*(barWidth + separation) + 3;
                            }).attr("y", function(d,i){
                                return height - textSpace + 15;
                            });
        }

    }

    return chart;

}

pieChart = function() {
    /*
    function to create pie chart. Can switch between polar and angular charts.
    charts.

    Data specification: 
        - two columns
        - first row should be headers
        - first column should be name based
        - second columns should be number based

    Usage:
        var pie_chart = pieChart();

        //load data
        pie_chart.load(data)

        //plot
        pie_chart.plot();

    Parameters:
        width       - Width of svg element
        height      - height of svg element
        ypadding    - padding on y side
        xpadding    - padding on x side
        showText    - show/hide text. // keep false. it's broken.
        radius      - Radius of the pie chart
        polar       - Boolean value. ploar chart if true, else angular chart.

    Example:
        var chart = pieChart();

        // add parameters
        chart.width(300).radius(120);

        // load data
        chart.load(data);

        // create angular chart
        chart.ploar(false);

        // plot
        chart.plot();

        //After plotting change params. It will automatically do the transition.
        chart.height(400).width(400).radius(180);

        // convert angular chart to polar chart.
        chart.polar(true); // auto transition
    */
    var   width = 400
        , height = 400
        , data = null
        , colorPalette = d3.scale.category20c()
        , xpadding = 30
        , ypadding = 10
        , maxR = 0
        , total = 0
        , xpos = width/2 // center of pie chart
        , ypos = width/2 // center of pie chart
        , showLegend = false
        , showLegendVal = true
        , lMultiplier = 0
        , lWidth = 80
        , lHeight = 80
        , autoRadius = true
        , showText = false
        , plotted = false
        , polar = false
        , r = 180
        , idVal = "body";

    var   arc
        , pie
        , arcs
        , path;

    var ilegend = legend();

    function chart(selection){

    }

    chart.load = function(indata) {
        data = indata;

        // calculate percentage
        total = 0;
        for(var i=1; i<data.length; i++)
        {
            total += Number(data[i][1]);
        }
        
        rows = data.length;
        cols = data[0].length;

        maxR = 0;
        for(var i=1; i<rows; i++)
        {
            if(Number(data[i][1]) > maxR)
            {
                    maxR = Number(data[i][1]);
            }
        }

        if(showLegend)
        {
            xpos = (width - lWidth)/2;
        }
        
        return chart;
    }

    chart.plot = function() {
        plotted = true;
        var svg = d3.select(idVal).append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("id", "svg-pie")
                    .append("g")
                    .attr("id", "pie-g")
                    .attr("transform", "translate(" + xpos +"," + ypos +")");

        if (showLegend)
        {
            var svgl = d3.select("#svg-pie");

            ilegend.width(width)
                  .height(height)
                  .lHeight(lHeight)
                  .lWidth(lWidth)
                  .rect(false)
                  .idval("legend-pie")
                  .showVal(showLegendVal)
                  .plot(svgl, data);
        }

        if (!polar)
        {
            arc = d3.svg.arc().outerRadius(r);
            pie = d3.layout.pie().value(function(d, i){
                if (i == 0)
                {
                    return 0;
                }
                return d[1];});
        }   
        else
        {
            console.log("polar")
            arc = d3.svg.arc().innerRadius(0)
                        .outerRadius(function(d, i){
                            if (i==0)
                            {
                                return 0;
                            }
                            console.log(i + " " + data.length);
                            return data[i][1]/maxR*r;
                        })
            pie = d3.layout.pie().value(function(d, i){
                if (i == 0)
                {
                    return 0;
                }
                return 1;});
        }
        path = svg.datum(data).selectAll("path")
                      .data(pie)
                      .enter()
                      .append("path")
                      .attr("fill", function(d, i){return colorPalette(i);})
                      .attr("d", arc)
                      .each(function(d, i){
                        if (i==0)
                        {
                            this._current = 0;
                        }
                        else
                        {
                            if (!polar)
                            {
                                this._current = r;
                            }
                            else
                            {
                                this._current = data[i][1]/maxR*r;
                            }
                        }

                        console.log(this._current + " this._current");
                        });
        /*
        // not working properly
        if (showText)
        {
            console.log("showText");
            path.append("svg:text")
                .attr("transform", function(d, i) {
                    if (i==0)
                    {
                        return ("translate(0,0,0)");
                    }
                    d.innerRadius = r/2;
                    d.outerRadius = r;

                    return ("translate(" + arc.centroid(d) + ") rotate("+315+")");
                })
                .attr("font-family", "sans-serif")
                //.attr("text-anchor", "left")
                .attr("font-size", "5px")
                .text(function(d, i){
                    if (i==0){return "";}
                    var textstr = data[i][0] + " (" + (data[i][1]/total*100).toFixed(2) + " %)";
                    return textstr;});
                
        }
        */
        return chart;
    }

    chart.polar = function(_) {
        if (!arguments.length) return polar;
        polar = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.height = function(_) {
        if (!arguments.length) return height;
        height = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.width = function(_) {
        if (!arguments.length) return width;
        width = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.radius = function(_) {
        if (!arguments.length) return r;
        r = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.showText = function(_) {
        if (!arguments.length) return showText;
        showText = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.autoRadius = function(_) {
        if (!arguments.length) return autoRadius;
        autoRadius = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.updatePlotValues = function(){
        if (autoRadius)
        {
            r = (width - lWidth)/2 - 1;
            console.log("autoRadius " + r);
            console.log("width " + width);
            if (r > height/2)
            {
                r = height/2-1;
            }
        }
        xpos = (width - (lMultiplier * lWidth))/2;
        ypos = height/2;
        
    }

    chart.showLegend = function(_) {
        if (!arguments.length) return showLegend;
        showLegend = _;
        if (showLegend)
        {
            lMultiplier = 1;
        }
        else
        {
            lMultiplier = 0;
        }
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.showLegendVal = function(_) {
        if (!arguments.length) return showLegendVal;
        showLegendVal = _;
        return chart;
    }

    chart.legendWidth = function(_) {
        if (!arguments.length) return lWidth;
        lWidth = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.legendHeight = function(_) {
        if (!arguments.length) return lHeight;
        lHeight = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.idVal = function(_) {
        if (!arguments.length) return idVal;
        idVal = _;
        return chart;
    }


    chart.update = function(_)
    {
        if (!plotted) { return chart; }
        console.log("updating chart");
        d3.select("#svg-pie").attr("height", height).attr("width", width);
        d3.select("#pie-g").attr("transform", "translate(" + xpos +"," + ypos +")");
        if(!polar)
        {
            arc = d3.svg.arc().outerRadius(r);
            pie.value(function(d, i){
                if (i == 0)
                {
                    return 0;
                }
                console.log(d[1]);
                return d[1];});
        }
        else
        {
            var undefCount=0;
            arc = d3.svg.arc().innerRadius(0)
                        .outerRadius(function(d, i){
                            if (i==0 || i>=Number(data.length))
                            {
                                console.log("return 0 " + i);
                                return 0;
                            }
                            else if(typeof i == "undefined")
                            {
                                undefCount++;
                                console.log(undefCount + " undefCount");
                                return 0;
                            }
                            else
                            {
                                console.log(i + " " + data.length);
                                return (data[i][1]/maxR*r);
                            }
                        })
            pie = d3.layout.pie().value(function(d, i){
                if (i == 0)
                {
                    return 0;
                }
                return 1;});
        }

        path = path.data(pie);
        path.attr("d", arc);
        path.transition().duration(750)//;.attrTween("d", tween);

        if (showLegend)
        {
            ilegend.width(width)
                  .height(height)
                  .lHeight(lHeight)
                  .lWidth(lWidth)
                  .update();
        }

        return chart;
    }

    function tween(d, i, a) {
        if(i == 0 )
        {
            this._current = 0;
            return 0;
        }
        var interVal;
        if(!polar)
        {
            interVal = r;
        }
        else
        {
            interVal = data[i][1]/maxR*r;
        }

        console.log(this._current + " this._current");
        console.log(interVal);
        var inter = d3.interpolateNumber(Number(this._current), Number(interVal));
        this._current = inter(0);
        return interVal;
        /*
        return function(t) {
            return ;
        }*/
    }

    function arcTween(a) {
        //console.log(this._current);
        //console.log(a);
        console.log("arcTween");
        var i = d3.interpolate(this._current, a);
        console.log(i(0));
        this._current = i(0);
        return function(t) {
            return arc(i(t));
        };
}

    return chart;
}

scatterChart = function() {
    var   height = 500
        , width = 500
        , colorPalette = d3.scale.category20c()
        , rows
        , cols
        , xrange = 0
        , yrange = 0
        , defaultRadius = 5
        , maxRadius = 10
        , xMaxData = 0
        , xpadding = 50
        , ypadding = 30
        , heightMultiplier = 0
        , widthMultiplier = 0
        , sizeMultiplier = 0
        , yMaxData = 0
        , sizeMaxData = 0
        , yTicks = 5
        , xTicks = 0
        , sizepadding = 0
        , showAxis = true
        , showText = false
        , textSpace = 30
        , showLegend = false
        , showLegendVal = false
        , lMultiplier = 0
        , lHeight = 80
        , lWidth = 80
        , idVal = "body"
        , plotted = false;

    var xAxis = axis() , yAxis = axis();
    var ilegend = legend();

    function chart(selection) {

    }

    chart.plot = function() {
        plotted = true;
        var svg = d3.select(idVal).append("svg").attr("width", width).attr("height", height).attr("id","svg-scatter");

        if (showAxis)
        {
            console.log(xrange + " xrange");
            xAxis.ldomain(0)
                 .rdomain(xMaxData)
                 .lrange(0)
                 .rrange(xrange)
                 .xpadding(xpadding)
                 .ypadding(height - textSpace)
                 .orientation("bottom")
                 .ticks(xTicks)
                 .plot(svg);

            yAxis.ldomain(yMaxData)
                 .rdomain(0)
                 .lrange(0)
                 .rrange(height - textSpace - ypadding)
                 .ticks(yTicks)
                 .ypadding(ypadding)
                 .xpadding(xpadding)
                 .orientation("left")
                 .plot(svg);
        }

        if (showLegend)
        {
            ilegend.width(width)
                  .height(height)
                  .lHeight(lHeight)
                  .lWidth(lWidth)
                  .rect(true)
                  .idval("legend-scatter")
                  .showVal(showLegendVal)
                  .plot(svg, data);
        }
        circContainer = svg.append("g")
                           .attr("id", "scatter")
                           .attr("height", height)
                           .attr("width", width - lMultiplier*lWidth);
        circContainer.selectAll(".dot").data(data).enter()
                 .append("circle")
                 .attr("class", "dot")
                 .attr("r", function(d, i){
                    if (i == 0)
                    {
                        return 0;
                    }
                    if (cols > 3)
                    {
                        return d[3]*sizeMultiplier;
                    }
                    return defaultRadius;
                }).attr("cx", function(d, i){
                    if (i==0)
                    {
                        return 0;
                    }
                    //console.log("cx " + d[1] * widthMultiplier) - defaultRadius;
                    return xpadding + d[1] * widthMultiplier ;
                }).attr("cy", function(d, i){
                    if (i==0)
                    {
                        return 0;
                    }
                    //console.log("cy " + d[2] * heightMultiplier);
                    return height - d[2] * heightMultiplier + sizepadding * 2 - textSpace;
                }).attr("fill", function(d, i)
                {
                    return colorPalette(i);
                });
        return chart;
    }

    chart.load = function(indata) {
        data = indata;
        rows = data.length;
        cols = data[0].length;

        var xData = 0;
        var yData = 0;
        xMaxData = 0;
        yMaxData = 0;

        for(var i=1; i<rows; i++)
        {
            xData = Number(data[i][1]);
            yData = Number(data[i][2]);
            if (xData > xMaxData)
            {
                xMaxData = xData;
            }
            if (yData > yMaxData)
            {
                yMaxData = yData;
            }
        }

        xrange = xMaxData - xpadding - lMultiplier*lWidth;
        yrange = yMaxData - ypadding - textSpace;
        heightMultiplier = (height - ypadding - defaultRadius) / yMaxData;
        widthMultiplier = (width - xpadding - defaultRadius - lMultiplier*lWidth) / xMaxData;
        sizepadding = defaultRadius + 1;

        if (cols > 3)
        {
            var sizeData = 0;
            sizeMaxData = 0;

            for(var i=1; i<rows; i++)
            {
                sizeData = Number(data[i][3]);
                if (sizeData > sizeMaxData)
                {
                    sizeMaxData = sizeData;
                }
            }

            console.log("cols > 3");

            sizeMultiplier = maxRadius / sizeMaxData;
            heightMultiplier = (height - ypadding - maxRadius) / yMaxData;
            widthMultiplier = (width - xpadding - maxRadius - lMultiplier*lWidth) / xMaxData;
            sizepadding = maxRadius + 1;
        }

        return chart;
    }

    chart.width = function(_) {
        if (!arguments.length) return width;
        width = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.height = function(_) {
        if (!arguments.length) return height;
        height = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.xpadding = function(_) {
        if (!arguments.length) return xpadding;
        xpadding = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.ypadding = function(_) {
        if (!arguments.length) return ypadding;
        ypadding = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.xTicks = function(_) {
        if (!arguments.length) return xTicks;
        xTicks = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.yTicks = function(_) {
        if (!arguments.length) return yTicks;
        yTicks = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.radius = function(_) {
        if (!arguments.length) return defaultRadius;
        defaultRadius = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.maxRadius = function(_) {
        if (!arguments.length) return maxRadius;
        maxRadius = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.showAxis = function(_) {
        if (!arguments.length) return showAxis;
        showAxis = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.showText = function(_) {
        if (!arguments.length) return showXText;
        showXText = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.showLegend = function(_) {
        if (!arguments.length) return showLegend;
        showLegend = _;
        if (showLegend)
        {
            lMultiplier = 1;
        }
        else
        {
            lMultiplier = 0;
        }
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.showLegendVal = function(_) {
        if (!arguments.length) return showLegendVal;
        showLegendVal = _;
        return chart;
    }

    chart.legendWidth = function(_) {
        if (!arguments.length) return lWidth;
        lWidth = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.legendHeight = function(_) {
        if (!arguments.length) return lHeight;
        lHeight = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.idVal = function(_) {
        if (!arguments.length) return idVal;
        idVal = _;
        return chart;
    }

    chart.updatePlotValues = function(){
        var xData = 0;
        var yData = 0;
        xMaxData = 0;
        yMaxData = 0;

        for(var i=1; i<rows; i++)
        {
            xData = Number(data[i][1]);
            yData = Number(data[i][2]);
            if (xData > xMaxData)
            {
                xMaxData = xData;
            }
            if (yData > yMaxData)
            {
                yMaxData = yData;
            }
        }

        //xrange = xMaxData + xpadding - lMultiplier*lWidth;
        yrange = yMaxData - ypadding - textSpace;
        heightMultiplier = (height - ypadding - defaultRadius) / yMaxData;
        widthMultiplier = (width - xpadding - lMultiplier*lWidth - 20) / xMaxData;
        xrange = width - xpadding - lMultiplier*lWidth - 20;
        sizepadding = defaultRadius + 1;

        if (cols > 3)
        {
            var sizeData = 0;
            sizeMaxData = 0;

            for(var i=1; i<rows; i++)
            {
                sizeData = Number(data[i][3]);
                if (sizeData > sizeMaxData)
                {
                    sizeMaxData = sizeData;
                }
            }

            sizeMultiplier = maxRadius / sizeMaxData;
            heightMultiplier = (height - ypadding - maxRadius) / yMaxData;
            widthMultiplier = (width - xpadding - maxRadius - lMultiplier*lWidth - 20) / xMaxData;
            sizepadding = maxRadius + 1;
        }

        return chart;
    }

    chart.update = function(){
        if(!plotted) { return chart;}

        if (showAxis)
        {
            xAxis.ldomain(0)
                 .rdomain(xMaxData)
                 .lrange(0)
                 .rrange(xrange)
                 .xpadding(xpadding)
                 .ypadding(height - textSpace)
                 .orientation("bottom")
                 .ticks(xTicks)
                 .update();

            yAxis.ldomain(yMaxData)
                 .rdomain(0)
                 .lrange(0)
                 .rrange(height - textSpace - ypadding)
                 .ticks(yTicks)
                 .ypadding(ypadding)
                 .xpadding(xpadding)
                 .orientation("left")
                 .update();
        }


        //var barNodes = document.querySelectorAll("svg");
        d3.select("#svg-scatter").attr("height", height).attr("width", width);
        //for(var m=0; m<barNodes.length; m++) {
            var circ = d3.select("#scatter").selectAll("circle");
            circ.transition().duration(1000)
            .attr("r", function(d, i){
                    if (i == 0)
                    {
                        return 0;
                    }
                    if (cols > 3)
                    {
                        return d[3]*sizeMultiplier;
                    }
                    return defaultRadius;
                }).attr("cx", function(d, i){
                    if (i==0)
                    {
                        return 0;
                    }
                    //console.log("cx " + d[1] * widthMultiplier - sizepadding);
                    return xpadding + d[1] * widthMultiplier;
                }).attr("cy", function(d, i){
                    if (i==0)
                    {
                        return 0;
                    }
                    //console.log("cy " + d[2] * heightMultiplier - sizepadding);
                    return height - d[2] * heightMultiplier + sizepadding*2 - textSpace;
                });

        if (showLegend)
        {
            ilegend.width(width)
                  .height(height)
                  .lHeight(lHeight)
                  .lWidth(lWidth)
                  .update();
        }
        //}

        return chart;
    }

    return chart;
}

lineChart = function(){
    var   width = 600
        , height = 300
        , colorPalette = d3.scale.category20c()
        , xpadding = 40
        , ypadding = 10
        , yTicks = 5
        , xTicks = 0
        , maxData = 0
        , xrange = 0
        , yrange = 0
        , cols = 0
        , rows = 0
        , heightMultiplier = 0
        , widthMultiplier = 0
        , showAxis = true
        , showLegend = false
        , showLegendVal = false
        , lHeight = 100
        , lWidth = 100
        , lMultiplier = 0
        , showText = false
        , textSpace = 25
        , idVal = "body"
        , plotted = false;

    var xAxis = axis(), yAxis = axis();
    var ilegend = multidatalegend();
    var svg, line, path;

    function chart(selection) {
        //selection.each
    }

    chart.plot = function(){
        plotted = true;
        svg = d3.select(idVal).append("svg").attr("width", width).attr("height", height).attr("id","line-chart");

        if (showAxis)
        {
            xAxis.ldomain(0)
                 .rdomain(cols-2)
                 .lrange(0)
                 .rrange(xrange)
                 .xpadding(xpadding)
                 .classAttr("xaxis")
                 .ypadding(height - textSpace)
                 .orientation("bottom")
                 .ticks(xTicks)
                 .plot(svg);

            yAxis.ldomain(maxData)
                 .rdomain(0)
                 .lrange(0)
                 .rrange(yrange)
                 .ticks(yTicks)
                 .ypadding(ypadding)
                 .xpadding(xpadding)
                 .orientation("left")
                 .plot(svg);
        }

        if (showLegend)
        {
            var legendData = []
            for (var s=1; s<data.length; s++)
            {
                legendData.push([data[s][0]]);
            }

            ilegend.width(width)
                  .height(height)
                  .lHeight(lHeight)
                  .lWidth(lWidth)
                  .rect(false)
                  .idval("legend-linechart")
                  .showVal(showLegendVal)
                  .plot(svg, legendData);
        }

        /*
        line = d3.svg.line()
                 .x(function(d, i){
                    if (i==0)
                    {
                        return 0 + ypadding;
                    }
                    console.log((i-1)*widthMultiplier + ypadding);
                    console.log(i*widthMultiplier + ypadding);
                    return (i-1)*widthMultiplier + ypadding;
                 }).y(function(d, i){
                    if (i==0)
                    {
                        return height - (data[1][1]*heightMultiplier) + xpadding;
                    }
                    return height - (d[1]*heightMultiplier) + xpadding;
                 })
        path = svg.append("path").datum(data).attr("class","line").attr("d", line);
        */
        path = []
        for(var n=1; n<rows; n++)
        {
            line = d3.svg.line()
                         .x(function(d, i){
                            if (i==0)
                            {
                                return 0 + xpadding;
                            }
                            return (i-1)*widthMultiplier + xpadding;
                         }).y(function(d, i){
                            if (i==0)
                            {
                                return height - (data[n][1]*heightMultiplier) - textSpace - 1;
                            }
                            return height - data[n][i]*heightMultiplier - textSpace - 1;
                         });
            path.push(svg.append("path").datum(data[n])
                         .attr("class","line").attr("d", line)
                         .attr("id", "line"+n)
                         .attr("stroke", function(d){return colorPalette(n);}));
        }

        if (showText)
        {
            textContainer = svg.append("g").attr("id", "line-x-text")
                            .attr("width", width).attr("height",40);
            textContainer.selectAll("text").data(data).enter();

            for (var s=1; s<data[0].length; s++)
            {
                textContainer.append("text")
                        .text(function(d, i){
                        return data[0][s];
                    }).attr("font-family", "sans-serif")
                      .attr("font-size", "12px")
                      .attr("x", function(d, i)
                      {
                        return xpadding + (s-1)*widthMultiplier - 15;
                      }).attr("y", function(d,i){
                        return height - 5;
                      });
            }
            /*                            
            svg.selectAll("svg").data(data).enter()
                     .append("text")
                     .text(function(d, i){
                        return data[0][i];
                    }).attr("font-family", "sans-serif")
                      .attr("font-size", "12px")
                      .attr("x", function(d, i)
                      {
                        console.log(i);
                        return xpadding + (i-1)*widthMultiplier - 2;
                      }).attr("y", function(d,i){
                        return height - 5;
                      });
            */
        }
                     /*
                     .attr("fill", function(d, i){return colorPalette(i);}).attr("translate", function(d, i){
                        var xvar = xpadding + (i+1)*widthMultiplier;
                        var yvar = height - ypadding;
                        return "rotate(-90," + xvar + "," + yvar +")";
                    });*/
        
        
        return chart;
    }

    chart.load = function(indata) {
        data = indata;
        rows = data.length;
        cols = data[0].length;

        for(var s=1; s<rows; s++)
        {
            for(var r=1; r<cols; r++)
            {
                if (maxData < Number(data[s][r]))
                {
                    maxData = Number(data[s][r]);
                }
            }
        }

        heightMultiplier = (height - ypadding - textSpace) / maxData;
        xrange = width - xpadding - lMultiplier*lWidth;
        yrange = height - ypadding - textSpace;
        widthMultiplier = xrange/(cols-2);
        return chart;

    }

    chart.width = function(_) {
        if (!arguments.length) return width;
        width = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.height = function(_) {
        if (!arguments.length) return height;
        height = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.xpadding = function(_) {
        if (!arguments.length) return xpadding;
        xpadding = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.ypadding = function(_) {
        if (!arguments.length) return ypadding;
        ypadding = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.xTicks = function(_) {
        if (!arguments.length) return xTicks;
        xTicks = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.yTicks = function(_) {
        if (!arguments.length) return yTicks;
        yTicks = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.showAxis = function(_) {
        if (!arguments.length) return showAxis;
        showAxis = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.showText = function(_) {
        if (!arguments.length) return showText;
        showText = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.idVal = function(_) {
        if (!arguments.length) return idVal;
        idVal = _;
        return chart;
    }

    chart.showLegend = function(_) {
        if (!arguments.length) return showLegend;
        showLegend = _;
        if (showLegend)
        {
            lMultiplier = 1;
        }
        else
        {
            lMultiplier = 0;
        }
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.showLegendVal = function(_) {
        if (!arguments.length) return showLegendVal;
        showLegendVal = _;
        return chart;
    }

    chart.legendWidth = function(_) {
        if (!arguments.length) return lWidth;
        lWidth = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.legendHeight = function(_) {
        if (!arguments.length) return lHeight;
        lHeight = _;
        chart.updatePlotValues();
        chart.update();
        return chart;
    }

    chart.updatePlotValues = function(){
        heightMultiplier = (height - ypadding - textSpace) / maxData;
        xrange = width - xpadding - lMultiplier*lWidth - 30;
        yrange = height - ypadding - textSpace;
        widthMultiplier = xrange/(cols-2);

        return chart;
    }

    chart.update = function(){
        if (!plotted) { return chart;}

        if (showAxis)
        {
            xAxis.ldomain(0)
                 .rdomain(cols-2)
                 .lrange(0)
                 .rrange(xrange)
                 .xpadding(xpadding)
                 .ypadding(height - textSpace)
                 .orientation("bottom")
                 .ticks(xTicks)
                 .update();

            yAxis.ldomain(maxData)
                 .rdomain(0)
                 .lrange(0)
                 .rrange(yrange)
                 .ticks(yTicks)
                 .ypadding(ypadding)
                 .xpadding(xpadding)
                 .orientation("left")
                 .update();
        }

        if (showLegend)
        {
            ilegend.width(width)
                  .height(height)
                  .lHeight(lHeight)
                  .lWidth(lWidth)
                  .update();
        }

        for(var n=1; n<rows; n++)
        {
            var newline = d3.svg.line()
                         .x(function(d, i){
                            if (i==0)
                            {
                                return 0 + xpadding;
                            }
                            return (i-1)*widthMultiplier + xpadding;
                         }).y(function(d, i){
                            if (i==0)
                            {
                                return height - (data[n][1]*heightMultiplier) - textSpace - 1;
                            }
                            return height - data[n][i]*heightMultiplier - textSpace - 1;
                         });

            path[n-1]=svg.select("#line"+n).datum(data[n])
                         .attr("class","line").attr("d", newline)
                         .attr("stroke", function(d){return colorPalette(n);});
        }

        if (showText)
        {
            tContainer = d3.select("#line-x-text").selectAll("text").transition().duration(1000)
                           .attr("x", function(d, i)
                            {
                                return xpadding + (i)*widthMultiplier - 15;
                            }).attr("y", function(d,i){
                                return height - 5;
                            });
        }

        //path.attr("d", line).transition().ease("linear");
        d3.select("#line-chart").attr("height", height).attr("width", width);
        return chart;
    }


    return chart;
}


function draw() {
    var data = generateData(60, 6);
    console.log(data);
    var chart = multibarChart().width(800).height(300).barWidth(10).separation(2).showAxis(false).load(data).plot();
    chart.stacked(false).separation(3);
    return chart;
}

function generateData(n, o) {
    /*
    function to generate random data

    Parameters: 
    
    n - number of rows
    o - number of columns
    */
    var data = []
    for (var i=0; i<n; i++)
    {
        var coldata = [];
        for(var j=0; j<o; j++)
        {

            coldata.push(Math.random());
        }
        data.push(coldata);
    }
    return data;
}