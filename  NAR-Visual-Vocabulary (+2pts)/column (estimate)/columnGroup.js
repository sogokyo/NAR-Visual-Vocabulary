function columnChart(data,stylename,media,plotpadding,legAlign, logScale, logScaleStart, yMin,yMax,yHighlight, numTicksy, ticks, yAlign){

    var titleYoffset = d3.select("#"+media+"Title").node().getBBox().height
    var subtitleYoffset=d3.select("#"+media+"Subtitle").node().getBBox().height;

    // return the series names from the first row of the spreadsheet
    var seriesNames = Object.keys(data[0]).filter(function(d){ return d != 'cat'&& d!='annotate'; });
    //Select the plot space in the frame from which to take measurements
    var frame=d3.select("#"+media+"chart")
    var plot=d3.select("#"+media+"plot")



    var yOffset=d3.select("#"+media+"Subtitle").style("font-size");
    yOffset=Number(yOffset.replace(/[^\d.-]/g, ''));
    
    //Get the width,height and the marginins unique to this plot
    var w=plot.node().getBBox().width;
    var h=plot.node().getBBox().height;
    var margin=plotpadding.filter(function(d){
        return (d.name === media);
      });
    margin=margin[0].margin[0]

    var plotWidth=w-margin.left-margin.right
    var plotHeight=h-margin.top-margin.bottom

    var colours=stylename.fillcolours;
    var forecastColours=stylename.forecastColours;

    var yScale = d3.scale.linear()
        .range([plotHeight, 0]);

    var plotData=data.map(function(d) {
        return {
            cat:d.cat,
            groups:getGroup(d)
        }
    });

    function getGroup(el) {
        var groups=seriesNames.map(function(name) {
            return {
                name: name,
                value:+el[name]
            }
        });
       return groups
    }

    var yMin=Math.min(yMin,d3.min(plotData, function(d) { return d3.min(d.groups, function(d) { return d.value; })})); 
    var yMax=Math.max(yMax,d3.max(plotData, function(d) { return d3.max(d.groups, function(d) { return d.value; })})); 

    yScale.domain([yMin, yMax]);

    var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient(yAlign)
    .ticks(numTicksy);

    var yLabel=plot.append("g")
      .attr("class", media+"yAxis")
      .call(yAxis)

    //calculate what the ticksize should be now that the text for the labels has been drawn
    var yLabelOffset=yLabel.node().getBBox().width-6
    var yticksize=colculateTicksize(yAlign, yLabelOffset);

    yLabel.call(yAxis.tickSize(yticksize))
    yLabel
        .attr("transform",function(){
            if (yAlign=="right"){
                return "translate("+(margin.left)+","+margin.top+")"
            }
            else return "translate("+(w-margin.right)+","+margin.top+")"
            })

    //identify 0 line if there is one
    var originValue = 0;
    var origin = plot.selectAll(".tick").filter(function(d, i) {
            return d==originValue || d==yHighlight;
        })
    .classed(media+"origin",true);

    var x0 = d3.scale.ordinal()
    .rangeBands([4, plotWidth-4-yLabelOffset], .14);

    var x1 = d3.scale.ordinal();

    var xAxis = d3.svg.axis()
        .scale(x0)
        .tickSize(yOffset/0)
        .orient("bottom");

    /*declare a second axis which will be used for placing dots on top*/
    var xAxisDots = d3.svg.axis()
    .scale(x0)
    .orient("bottom")
    .tickSize(0);


    x0.domain(data.map(function(d) { return d.cat; }));
    x1.domain(seriesNames)
    .rangeBands([0, x0.rangeBand()]);    

    var xlabels=plot.append("g")
        .attr("class",media+"xAxis")
        .attr("transform",function(){
            if(yAlign=="right") {
                return "translate("+(margin.left)+","+(plotHeight+margin.top)+")"
            }
             else {return "translate("+(margin.left+yLabelOffset)+","+(plotHeight+margin.top)+")"}
            })
      .attr("text-anchor","middle")
      .call(xAxis)
      .selectAll("text")
      .attr("dy","1.2em")
      .attr("dx","-.15em");

    var category = plot.selectAll("."+media+"category")
        .data(plotData)
        .enter().append("g")
        .attr("class", media+"category")
        .attr("transform", function(d) { return "translate(" + (x0(d.cat)+(margin.left)) + ",0)"; });

    var rects = category.selectAll("rect")
        .data(function(d) { return d.groups; })
        .enter().append("rect")
          .attr("width", x1.rangeBand())
          .attr("x", function(d) { return x1(d.name); })
          .attr("y", function(d,i) {
                return yScale(Math.max(0, d.value))})
          .attr("height", function(d) {return (Math.abs(yScale(d.value) - yScale(0))); })
          .attr("transform",function(){
                if(yAlign=="right") {
                    return "translate("+(margin.left-5)+","+(margin.top)+")"
                }
                 else {return "translate("+(margin.left+yLabelOffset)+","+(margin.top)+")"}
            });

//find the index number of the forecast - if there is one
var forecastIndex;
function forecast(element){
    return element.annotate=="Estimate"
}
if (data.findIndex(forecast)>-1){
    forecastIndex=data.findIndex(forecast)
};

//set the fill colour accordingly
if (forecastIndex){
    //console.log("There is a forecast")
    rects.forEach(function(d,i){
        d.forEach(function(e,j){
            if (i<forecastIndex){
            d3.select(e).style("fill",colours[j])
        }   else    {
            d3.select(e).style("fill",forecastColours[j])
        }
        })
    })
}   else    {
    rects.forEach(function(d,i){
        d.forEach(function(e,j){
            d3.select(e).style("fill",colours[j])
        })
    })
}



    //the axis with the dots on - above the bars   
    var xLabelsDots=plot.append("g")
      .attr("class", media+"xAxis")
      .attr("transform",function(){
                if(yAlign=="right") {
                    return "translate("+(margin.left)+","+(h-margin.bottom)+")"
                }
                 else {return "translate("+(margin.left+yLabelOffset)+","+(h-margin.bottom)+")"}
            })      
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

    // //create a legend first
    var legendyOffset=0
        var legend = plot.append("g")
            .attr("id",media+"legend")
            .on("mouseover",pointer)
            .selectAll("g")
            .data(seriesNames)
            .enter()
            .append("g")
            .attr ("id",function(d,i){
                return media+"l"+i
            })

        var drag = d3.behavior.drag().on("drag", moveLegend);
        d3.select("#"+media+"legend").call(drag);
            
        legend.append("text")

            .attr("id",function(d,i){
                return media+"t"+i
            })
            .attr("x",yOffset+yOffset/5)
            .attr("y",1.5)
            .attr("class",media+"legend")
            .text(function(d){
                return d;
            })

        // legend.append("rect")
        //     .attr("x",0)
        //     .attr("y",-yOffset+yOffset/2.5)
        //     .attr("width",(yOffset/100)*85)
        //     .attr("height",(yOffset/100)*85)
        //     .style("fill", function(d,i){return colours[i]})

        legend.attr("transform",function(d,i){
            if (legAlign=='hori') {
                var gHeigt=d3.select("#"+media+"l0").node().getBBox().height;
                if (i>0) {
                    var gWidth=d3.select("#"+media+"l"+(i-1)).node().getBBox().width+15; 
                }
                else {gWidth=0};
                legendyOffset=legendyOffset+gWidth;
                return "translate("+(legendyOffset)+","+(gHeigt)+")";  
            }
            else {
                var gHeight=d3.select("#"+media+"l"+(i)).node().getBBox().height
                return "translate(0,"+((i*yOffset)+yOffset/2)+")"};
        })

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



//add annotation
    var annotations = data.filter(function(d){
        return d.annotate !="" && d.annotate !=undefined;
    })


    var arrowConfig = {
        width: media == "web" ? 4:4,
        length: media == "web" ? 7:7,
        height: media == "web" ? 14:8,
        gap: media == "web" ? 6:3,
        margin: 2
    }



    var anno = plot.append("g")
        .attr("id","annotations")
        .attr("transform",function(){
                if(yAlign=="right") {
                    return "translate("+(margin.left)+","+(margin.top)+")"
                }
                 else {return "translate("+(margin.left+yLabelOffset)+","+(margin.top)+")"}
        })



    anno.selectAll("line")
        .data(annotations)
        .enter()
        .append("line")
        .attr("class",media+"annotationLine")
        .attr("x1",function(d){return x0(d.cat) - ((x0.range()[1] - x0.range()[0] - x0.rangeBand())/2)})
        .attr("x2",function(d){return x0(d.cat) - ((x0.range()[1] - x0.range()[0] - x0.rangeBand())/2)})
        .attr("y1",yScale.range()[0])
        .attr("y2",yScale.range()[1]-(arrowConfig.width*1.5+arrowConfig.margin))



    anno.selectAll("text")
        .data(annotations)
        .enter()
        .append("text")
        .attr("class",media+"annotationText")
        .attr("text-anchor","start")
        .attr("x",function(d){return x0(d.cat) - ((x0.range()[1] - x0.range()[0] - x0.rangeBand())/2)})
        .attr("y",yScale.range()[1]-(arrowConfig.width*1.5+arrowConfig.gap+2))
        .html(function(d){
            return d.annotate
        })

    anno.selectAll("path")
        .data(annotations.filter(function(d){return d.annotate == "Estimate"}))
        .enter()
        .append("path")
        .attr("class",media+"forecastArrow")
        .attr("d",function(d){return  "M" + (x0(d.cat) - ((x0.range()[1] - x0.range()[0] - x0.rangeBand())/2)) + "," + (yScale.range()[1]-arrowConfig.width*1.5-arrowConfig.margin) + "L" + ((d3.max(x0.range())  + (x0.rangeBand()))-arrowConfig.length) + "," + (yScale.range()[1]-arrowConfig.width*1.5-arrowConfig.margin) + "L" + ((d3.max(x0.range())  + (x0.rangeBand()))-arrowConfig.length) + "," + (yScale.range()[1]-(arrowConfig.width*2+arrowConfig.margin)) + "L" + ((d3.max(x0.range()) + (x0.rangeBand()))) + "," + (yScale.range()[1]-(arrowConfig.width+arrowConfig.margin)) + "L" + ((d3.max(x0.range())  + (x0.rangeBand()))-arrowConfig.length) + "," + (yScale.range()[1]-(arrowConfig.margin)) + "L" + ((d3.max(x0.range())  + (x0.rangeBand()))-arrowConfig.length) + "," + (yScale.range()[1]-((arrowConfig.width/2)+arrowConfig.margin)) + "L" + (x0(d.cat) - ((x0.range()[1] - x0.range()[0] - x0.rangeBand())/2)) + "," + (yScale.range()[1]-((arrowConfig.width/2)+arrowConfig.margin))})
        // .attr("x",function(d){return x0(d.cat) - ((x0.range()[1] - x0.range()[0] - x0.rangeBand())/2) + 3})


        if (forecastIndex){

    d3.selectAll("." + media +"xAxis .tick text")
        .classed("forecast", function(d){ return x0.domain().indexOf(d) >= x0.domain().indexOf(annotations.filter(function(f){return f.annotate == "Estimate"})[0].cat)})

}




}