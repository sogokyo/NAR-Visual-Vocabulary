function columnChart(data,stylename,media,yMin,yMax,plotpadding,legAlign,yHighlight, labels, numTicksy, yAlign,sort){

    var titleYoffset = d3.select("#"+media+"Title").node().getBBox().height
    var subtitleYoffset=d3.select("#"+media+"Subtitle").node().getBBox().height;

    var groupNames=[]
    for(i = 0; i< data.length; i++){    
        if(groupNames.indexOf(data[i].group) === -1){
            groupNames.push(data[i].group);        
        }        
    }

    //Select the plot space in the frame from which to take measurements
    var chart=d3.select("#"+media+"chart")
    var plot=d3.select("#"+media+"plot")

    var yOffset=d3.select("#"+media+"Subtitle").style("font-size");
    yOffset=Number(yOffset.replace(/[^\d.-]/g, ''));
    
    //Get the width,height and the marginins unique to this plot
    var w=plot.node().getBBox().width;
    var h=plot.node().getBBox().height;
    var margin=plotpadding.filter(function(d){
        return (d.name === media);
      });
    margin=margin[0].margin[0];

    var colours= d3.scale.ordinal()
      .domain(groupNames)
      .range(stylename.fillcolours);

    var plotWidth=w-margin.left-margin.right
    var plotHeight=h-margin.top-margin.bottom

    if (sort=="descending") {
        data.sort(function(a, b) { return b.value - a.value; })//Sorts biggest rects to the left
    }
    else {data.sort(function(a, b) { return a.value - b.value; })//Sorts biggest rects to the left
}
    var yScale = d3.scale.linear()
        .range([plotHeight, 0]);

    yMin=Math.min(yMin,d3.min(data, function(d) { return +d.value;}))
    yMax=Math.max(yMax,d3.max(data, function(d) { return +d.value;}))

    //var max=d3.max(data, function(d,i) { return +d.value;});
    yScale.domain([yMin, yMax]);

    var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient(yAlign)
    .ticks(numTicksy)

    var yLabel=plot.append("g")
      .attr("class", media+"yAxis")
      .call(yAxis)

    //calculate what the ticksize should be now that the text for the labels has been drawn
    var yLabelOffset=yLabel.node().getBBox().width
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

    var xScale = d3.scale.ordinal()
    .rangeBands([0, plotWidth-yLabelOffset],.4);

    var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom")
    .tickSize(0);    

    xScale.domain(data.map(function(d) { return d.cat;}));


    var xLabels=plot.append("g")
      .attr("class", media+"xAxis")
      .attr("transform",function(){
                if(yAlign=="right") {
                    return "translate("+(margin.left)+","+(h-margin.bottom)+")"
                }
                 else {return "translate("+(margin.left+yLabelOffset)+","+(h-margin.bottom)+")"}
            })      
      .attr("text-anchor","middle")
      .call(xAxis)
      .selectAll("text")
      .attr("dy",".9em");

    plot.selectAll("."+media+"fill")
    .data(data)
    .enter()
        .append("g")
        .attr("id",function(d) { return d.cat+"-"+d.value; })
        .attr("transform",function(){
                if(yAlign=="right") {
                    return "translate("+(margin.left)+","+(margin.top)+")"
                }
                 else {return "translate("+(margin.left+yLabelOffset)+","+(margin.top)+")"}
            })
        .call(function(parent){
            parent.append('rect')
                .style("fill", function (d) {
                    return colours(d.group)
                })
                .attr("id",function(d) { return d.cat+"-"+d.value; })
                .attr("class",media+"bars")
                .attr("x", function(d) { return xScale(d.cat); })
                .attr("width", xScale.rangeBand())
                .attr("y", function(d) { return yScale(Math.max(0, d.value))})
                .attr("height", function(d) {return (Math.abs(yScale(d.value) - yScale(0))); })
                .on("mouseover",pointer)
                .on("click",function(d){
                    var elClass = d3.select(this)
                    if (elClass.attr("class")==media+"bars") {
                        d3.select(this).attr("class",media+"highlight");
                        console.log(colours.range()[0])
                        d3.select(this).style("fill",colours.range()[6])
                    }
                    else{var el=d3.select(this)
                        el.attr("class",media+"bars");
                        d3.select(this).style("fill",colours.range()[0])
                    }
                })
            if (labels) {
                parent.append("text")
                .attr("class", media+"labels")
                .style("text-anchor","middle")
                .text(function(d) {return d.value;})
                .attr("x", function(d) { return xScale(d.cat)+(xScale.rangeBand()/2)})
                .attr("y", function(d) {
                    if(d.value>0) {
                        return yScale(d.value)+yOffset
                    }
                    else {
                        return yScale(d.value)-(yOffset*.5)}
                });
                var clear = yLabel.selectAll(".tick").filter(function(d, i) {
                    return d!=originValue
                })
                clear.remove()
            }
        });

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
    //console.log(groupNames[0])
    if (groupNames[0]!="-") {
        var legendyOffset=0
        var legend = plot.append("g")
            .attr("id",media+"legend")
            .on("mouseover",pointer)
            .selectAll("g")
            .data(groupNames)
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
            .attr("y",0)
            .attr("class",media+"legend")
            .text(function(d){
                return d;
            })

        legend.append("rect")
            .attr("x",0)
            .attr("y",-yOffset+yOffset/3)
            .attr("width",(yOffset/100)*85)
            .attr("height",(yOffset/100)*85)
            .style("fill", function(d,i){return colours(d)})

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
    }

    
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