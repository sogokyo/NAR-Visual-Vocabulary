function columnChart(data, stylename, media,yMin,yMax, yMin1,yMax1, chartpadding,legAlign,labels,lineSmoothing, numTicksy, yAlign,interval,minAxis, ticks,y1ticks,y2ticks){
    var titleYoffset = d3.select("#"+media+"Title").node().getBBox().height
    var subtitleYoffset=d3.select("#"+media+"Subtitle").node().getBBox().height;

    var seriesNames = Object.keys(data[0]).filter(function(d){ return d != 'barDate'&& d != 'lineDate' && d != 'highlight' ; });

    //Select the plot space in the frame from which to take measurements
    var chart=d3.select("#"+media+"chart")
    var plot=d3.select("#"+media+"plot")

    var yOffset=d3.select("#"+media+"Subtitle").style("font-size");
    yOffset=Number(yOffset.replace(/[^\d.-]/g, ''));
    
    //Get the width,height and the marginins unique to this plot
    var w=plot.node().getBBox().width;
    var h=plot.node().getBBox().height;
    var margin=chartpadding.filter(function(d){
        return (d.name === media);
      });
    margin=margin[0].margin[0];

    var colours=stylename.fillcolours;

    var plotWidth=w-margin.left-margin.right
    var plotHeight=h-margin.top-margin.bottom;

    var barData=data.map(function(d) {
        var e=seriesNames[0]
        return{
            date:d.barDate,
            value:+d[e]
        }
    })

    barData=barData.filter(function(d){
        if (d.date !== null){
            return{
                date:d.date,
                value:d.value
            }
            return false
        }
    })

    var lineData=data.map(function(d) {
        var e=seriesNames[1]
        return{
            date:d.lineDate,
            value:+d[e]
        }
    })
    lineData=lineData.filter(function(d){
        if (d.date !== null){
            return{
                date:d.date,
                value:d.value
            }
            return false
        }
    })

    //no fancy autoscaling here :-/
    //var yDomain = d3.extent(barData, function(d) {return d.value;});
    //var yDomain1 = d3.extent(lineData, function(d) {return d.value;});
    var yDomain = [yMin,yMax]
    var yDomain1 = [yMin1,yMax1]

   /* yDomain[0]=Math.min(yMin,yDomain[0])
    yDomain[1]=Math.max(yMax,yDomain[1])
    yDomain1[0]=Math.min(yMin1,yDomain1[0])
    yDomain1[1]=Math.max(yMax1,yDomain1[1])*/

    var yScaleL = d3.scale.linear()
        .range([plotHeight, 0])
        .domain(yDomain);

    var yScaleR = d3.scale.linear()
        .range([plotHeight, 0])
        .domain(yDomain1);

    var yAxisL = d3.svg.axis()
        .scale(yScaleL)
        .tickValues(y1ticks)
        .tickSize(10)
        .orient("left")

    var yAxisR = d3.svg.axis()
        .scale(yScaleR)
        .tickValues(y2ticks)
        .tickSize(0)
        .orient("right")

    

    var yLabelL=plot.append("g")
      .attr("class", media+"yAxis")
      .call(yAxisL)

    var yLabelR=plot.append("g")
      .attr("class", media+"yAxis")
      .call(yAxisR)

    yLabelL.selectAll('text')
        .attr("style", null)
        .style("fill", colours[0]);
    yLabelR.selectAll('text')
        .attr("style", null)
        .attr("x", yOffset*2)
        .style("fill", colours[1])

    //calculate the width of the y axes objects
    var yLabelLOffsetL=yLabelL.node().getBBox().width
    var yLabelLOffsetR=yLabelR.node().getBBox().width

    yLabelL
        .attr("transform",function(){
            return "translate("+yLabelLOffsetL+","+margin.top+")"
            })
    yLabelR
        .attr("transform",function(){
            return "translate("+(w-yLabelLOffsetR)+","+margin.top+")"
            })

    //now we can reassign margins and set final plotWidth
    margin.left=yLabelLOffsetL-8;
    margin.right=yLabelLOffsetR;

    plotWidth=w-(margin.left+margin.right)

    //just check width of the recalculated plotting area
   /*]
   ]
    plot.append("rect")
        .attr("fill","pink")
        .attr("x",margin.left)
        .attr("y",margin.top)
        .attr("width",plotWidth)
        .attr("height",plotHeight)*/

    //barwidth will be
    var barWidth = plotWidth/barData.length*1.2;

    //a third axis for the background ticks linking the 2 scales
    var yAxisC = d3.svg.axis()
        .scale(yScaleL)
        .tickValues(y1ticks)
        .tickSize(plotWidth+2)
        .orient("right")


    var yLabelC=plot.append("g")
        .attr("transform","translate("+margin.left+","+margin.top+")")
        .attr("class", media+"yAxis")
        .call(yAxisC)
        .selectAll("text")
        .remove()



    //identify 0 line if there is one
    var originValue = 0;
    var origin = plot.selectAll(".tick").filter(function(d, i) {
            return d==originValue;
        }).classed(media+"origin",true);

    var xDomain = d3.extent(data, function(d) {return d.barDate;});

    var xScale = d3.time.scale()
        .domain(xDomain)
        //.range([+10,(plotWidth-yLabelLOffsetL-yLabelLOffsetR-margin.right-10)]);
        .range([0,plotWidth-barWidth]);

    var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickValues(ticks.major)
        .tickSize(yOffset/0)
        .orient("bottom")
        .tickFormat(d3.time.format("’%y"));

    /*declare a second axis which will be used for placing dots on top*/
    var xAxisDots = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .tickSize(0);

    var xLabel=plot.append("g")
        .attr("class",media+"xAxis")
        .attr("transform",function(){
            return "translate("+(margin.left+(barWidth/2))+","+(plotHeight+margin.top)+")"})
      .attr("text-anchor","middle")
      .call(xAxis)
      .selectAll("text")
      .attr("dy","1.3em")
      .attr("dx","-.15em");

    xLabel.selectAll('text')
        .attr("style", null)

    if(minAxis) {
        var xAxisMinor = d3.svg.axis()
        .scale(xScale)
        .tickValues(ticks.minor)
        .tickSize(yOffset/4)
        .orient("bottom");

        var xLabelMinor=plot.append("g")
            .attr("class",media+"minorAxis")
            .attr("transform",function(){
                return "translate("+(margin.left)+","+(plotHeight+margin.top)+")"})
        .call(xAxisMinor);
    }

    var bar=plot.append("g")
        .attr("id","bar")
        .attr("transform",function(){
                return "translate("+(margin.left+(barWidth/2.4))+","+(margin.top)+")"})  
    bar.selectAll("."+media+"bar")
        .data(barData)
        .enter()
        .call(function(parent){
            parent.append('rect')
                .style("fill",colours[0])
                .attr("id",function(d) { return d.date+"-"+d.value; })
                .attr("class",media+"fill")
                .attr("x", function(d) { return xScale(d.date) - (plotWidth/barData.length)*.25; })
                .attr("width", plotWidth/barData.length*.35)
                .attr("y", function(d) { return yScaleL(Math.max(0, d.value))})
                .attr("height", function(d) {return (Math.abs(yScaleL(d.value) - yScaleL(0))); })
    })


    var  bar=plot.append("g")
        .attr("id","bar")
        .attr("transform",function(){
                return "translate("+(margin.left+(barWidth/1.41))+","+(margin.top)+")"})  
    bar.selectAll("."+media+"bar")
        .data(lineData)
        .enter()
        .call(function(parent){
            parent.append('rect')
                .style("fill",colours[1])
                .attr("id",function(d) { return d.date+"-"+d.value; })
                .attr("class",media+"fill")
                .attr("x", function(d) { return xScale(d.date) - (plotWidth/lineData.length)*.25; })
                .attr("width", plotWidth/lineData.length*.35)
                .attr("y", function(d) { return yScaleR(Math.max(0, d.value))})
                .attr("height", function(d) {return (Math.abs(yScaleR(d.value) - yScaleR(0))); })
    })

    //the axis with the dots on - above the bars   
    var xLabelsDots=plot.append("g")
        .attr("class",media+"xAxis")
        .attr("transform",function(){
            return "translate("+(margin.left+(barWidth/2))+","+(plotHeight+margin.top)+")"})
      .attr("text-anchor","middle")
      .call(xAxisDots)
      .selectAll("text").remove()//remove the text from this axis - we just need the dots


    //Add labels so that the preflight script in illustrator will work
    d3.selectAll(".printxAxis text")
    .attr("id","xAxisLabel")
    d3.selectAll(".printyAxis text")
    .attr("id","yAxisLabel")
    d3.selectAll(".printyAxis line")
    .attr("id","yAxisTick")
    d3.selectAll(".printxAxis line")
    .attr("id","xAxisTick")
    d3.selectAll(".printminorAxis line")
    .attr("id","minorTick")

    d3.selectAll(".domain").remove()

    //create a legend first
    var legend = plot.append("g")
        .attr("id",media+"legend")
        .on("mouseover",pointer)
    var drag = d3.behavior.drag().on("drag", moveLegend);
        d3.select("#"+media+"legend").call(drag);
    
    var barTextL=legend.append("text")
        .attr("x","1.1em")
        .attr("y","1.4em")
        .attr("class",media+"legend")
        .text(seriesNames[0])

    var legOffset=barTextL.node().getBBox().width

    legend.append("rect")
        .attr("x",legOffset+(yOffset/0))
        .attr("y",-yOffset+yOffset/.6)
        .attr("width",(yOffset/100)*85)
        .attr("height",(yOffset/100)*85)
        .style("fill", colours[0])

    var barTextR=legend.append("text")
        .attr("x",w-11)
        .attr("y","1.4em")
        .attr("class",media+"legend")
        .style("text-anchor","end")
        .text(seriesNames[1])

    var legOffset=barTextR.node().getBBox().width

    legend.append("rect")
        .attr("x",legOffset+(yOffset*40))
        .attr("y",-yOffset+yOffset/.6)
        .attr("width",(yOffset/100)*85)
        .attr("height",(yOffset/100)*85)
        .style("fill", colours[1])

    function colculateTicksize(align, offset) {
        if (align=="right") {
            return w-margin.left-offset
        }
        else {return w-margin.right-offset}
    }

    function pointer() {
        this.style.cursor='pointer'
    }

    function moveLegend() {
        var dX = d3.event.x; // subtract cx
        var dY = d3.event.y; // subtract cy
        d3.select(this).attr("transform", "translate(" + dX + ", " + dY + ")");

    }





}
