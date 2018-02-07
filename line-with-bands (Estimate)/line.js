
function lineChart(data, stylename, media, yMin, yMax, yAxisHighlight, plotpadding,legAlign,lineSmoothing, logScale, logScaleStart, markers, numTicksy, yAlign, ticks,minAxis){


    var titleYoffset = d3.select("#"+media+"Title").node().getBBox().height
    var subtitleYoffset=d3.select("#"+media+"Subtitle").node().getBBox().height;

    // return the series names from the first row of the spreadsheet
    var seriesNames = Object.keys(data[0]).filter(function(d){ return d != 'date' && d != 'highlight'&& d != 'annotate' ; });
    //Select the plot space in the frame from which to take measurements
    var frame=d3.select("#"+media+"chart")
    var plot=d3.select("#"+media+"plot")
    var xCenter = 10

    var yOffset=d3.select("#"+media+"Subtitle").style("font-size");
    yOffset=Number(yOffset.replace(/[^\d.-]/g, ''));
    
    //Get the width,height and the marginins unique to this chart
    var w=plot.node().getBBox().width;
    var h=plot.node().getBBox().height;
    var margin=plotpadding.filter(function(d){
        return (d.name === media);
      });
    margin=margin[0].margin[0]
    var colours=stylename.linecolours;
    var plotWidth = w-(margin.left+margin.right);
    var plotHeight = h-(margin.top+margin.bottom);

    //calculate range of time series 
    var xDomain = d3.extent(data, function(d) {return d.date;});
    var yDomain;
    var yCeiling, yCeilings = [];

    //calculate range of y axis series data, also get max y point for every row
    data.forEach(function(d,i){
            yCeiling = [];
        seriesNames.forEach(function(e){
            if (d[e]){
                yMin=Math.min(yMin,d[e]);
                yMax=Math.max(yMax,d[e]);
                yCeiling.push(+d[e])
            }
        });
        yCeilings.push({val: +d3.max(yCeiling)})
    });
    yDomain=[yMin,yMax];

    //creat an array of start stop areas
    var boundries= data.filter(function(d) {
        return  (d.highlight==="begin" || d.highlight==="end")
    })
    var shadeAreas=[]

    boundries.forEach(function(d,i){
        if (d.highlight==="begin") {
            shadeAreas.push({begin: d.date,end:boundries[i+1].date}) 
        }
    })

    //create a separate array for each series, filtering out records of each  series for which there are no data
    var plotArrays = [];
    seriesNames.forEach(function(series,i){
        plotArrays[i] = [];
    });
    data.forEach(function(d,i){
        yCeilings[i].date=d.date;
        seriesNames.forEach(function(series,e){
            var myRow = new Object();
            myRow.date=d.date;
            myRow.highlight=d.highlight;
            myRow.val=d[series];
            if (myRow.val){
                plotArrays[e].push(myRow);
            }   else    {
                //console.log('skipped a value:'+i);   
            } 
        });
    });

    //Scales

    var yScale;
        if (logScale) {
			yScale = d3.scale.log()
			.domain([logScaleStart,yMax])
			.range([plotHeight,0]);
		}
        else {
			yScale = d3.scale.linear()
			.domain(yDomain)
			.range([plotHeight,0]);
		}

    var yAxis = d3.svg.axis()
        .scale(yScale)
        .ticks(numTicksy)
        .orient(yAlign)

    if (logScale){
        yAxis.tickFormat(function (d) {
            return yScale.tickFormat(1,d3.format(",d"))(d)
        })   
    }

    // Draw NAR-style bands

    var xBandsG = plot.append("g")
        .attr("class", "g.xBand");


    var yLabel=plot.append("g")
    .attr("class",media+"yAxis")
    .call(yAxis);

    //calculate what the ticksize should be now that the text for the labels has been drawn
    var yLabelOffset=yLabel.node().getBBox().width
    //console.log("offset= ",yLabelOffset)
    var yticksize=colculateTicksize(yAlign, yLabelOffset);
    //console.log(yticksize);

    yLabel.call(yAxis.tickSize(yticksize))
    yLabel
        .attr("transform",function(){
            if (yAlign=="right"){
                return "translate("+(margin.left)+","+margin.top+")"
            }
            else return "translate("+(w-margin.right)+","+margin.top+")"
            })

    if (yAlign=="right"){
        yLabel.selectAll('text')
            .attr("style", null)
            .attr("x",yticksize+(yLabelOffset*.8))
        }

    //identify 0 line if there is one
    var originValue = 96;
    var origin = plot.selectAll(".tick").filter(function(d, i) {
            return d==originValue || d==yAxisHighlight;
        }).classed(media+"origin",true);

    var xScale = d3.time.scale()
    //var xScale = scaleWeekday()
        .domain(xDomain)
        .range([xCenter,(plotWidth-yLabelOffset)-(margin.left+xCenter)])

    
    var xAxis = d3.svg.axis()
        .scale(xScale)
        .tickValues(ticks.major)
        .tickSize(yOffset/0)
        .orient("bottom")
        .tickFormat(function(d,i){
            // Always show complete date for first tick
            if(i == 0){
                return d3.time.format("%b %Y")(d).replace(/^0/g,"")
            // If ticks are at least one month apart, show year for ticks in January
            }else if(ticks.major[2].getMonth() - ticks.major[0].getMonth() >= 1 && d.getMonth() == 0){
                return d3.time.format("%d %b ’%y")(d).replace(/^0/g,"")
            // Otherwise, if ticks are at least one month apart just show month...
            }else if(ticks.major[1].getMonth() - ticks.major[0].getMonth >= 1){
                return d3.time.format("%b")(d).replace(/^0/g,"")
            // Or finally, show day and month
            }else{
                return d3.time.format("%b")(d).replace(/^0/g,"")
                // return d3.time.format("%d %b")(d) if month's second mention needed

            }
        });
        //d= date, m=month as #, b=Jan, B=January, y=01, Y=2001;
    //Plot and position on the page
;

    var xLabel=plot.append("g")
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
      .attr("dy","1.3em");

    xLabel.selectAll('text')
        .attr("style", null)

        var bandTicks = ticks.major;
    if(minAxis) {
        bandTicks = ticks.minor;

        var xAxisMinor = d3.svg.axis()
        .scale(xScale)
        .tickValues(ticks.minor)
        .tickSize(yOffset/0)
        .orient("bottom");

        var xLabelMinor=plot.append("g")
            .attr("class",media+"minorAxis")
            .attr("transform",function(){
                if(yAlign=="right") {
                    return "translate("+(margin.left)+","+(plotHeight+margin.top)+")"
                }
                 else {return "translate("+(margin.left+yLabelOffset)+","+(plotHeight+margin.top)+")"}
                })
            .call(xAxisMinor);
    }

    if(shadeAreas.length>0){
        plot.selectAll("."+media+"area")
        .data(shadeAreas)
        .enter()
        .call(function(parent){
            parent.append('rect')
                .attr("class",media+"Shade")
                .attr("x", function(d) {
                    return xScale(d.begin)})
                .attr("width", function (d) {return xScale(d.end)-xScale(d.begin)})
                .attr("y", yScale(yMax))
                .attr("height",plotHeight-yScale(yMax))
                .attr("transform",function(){
                if(yAlign=="right") {
                    return "translate("+(margin.left)+","+(margin.top)+")"
                }
                 else {return "translate("+(margin.left+yLabelOffset)+","+(margin.top)+")"}
            });
        })
    }

        //add annotation
    var annotations = data.filter(function(d){
        return d.annotate !="" && d.annotate !=undefined;
    })

    var arrowConfig = {
        width: media == "web" ? 4:4,
        length: media == "web" ? 7:7,
        height: media == "web" ? 8:8,
        gap: media == "web" ? 3:3,
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
        .attr("x1",function(d){return xScale(d.date)})
// To offset line to between ticks
        // .attr("x1",function(d){return xScale(d.date)-("width", xScale(bandTicks[2]) - xScale(bandTicks[1]))/2})        
        .attr("x2",function(d){return xScale(d.date)})
        .attr("y1",yScale.range()[0])
        .attr("y2",yScale.range()[1]-(arrowConfig.width*1.5+arrowConfig.margin))

    anno.selectAll("text")
        .data(annotations)
        .enter()
        .append("text")
        .attr("class",media+"annotationText")
        .attr("text-anchor", d => d.annotate == "Estimate" ? "start":"middle")
        .attr("x",function(d){return xScale(d.date)})
        .attr("y",yScale.range()[1]-(arrowConfig.width*1.5+arrowConfig.gap+2))
        .text(function(d){
            return d.annotate
        })

    anno.selectAll("path")
        .data(annotations.filter(function(d){return d.annotate == "Estimate"}))
        .enter()
        .append("path")
        .attr("class",media+"estimateArrow")
        .attr("d",function(d){return  "M" + xScale(d.date) + "," + (yScale.range()[1]-arrowConfig.width*1.5-arrowConfig.margin) + "L" + (d3.max(xScale.range())  -arrowConfig.length) + "," + (yScale.range()[1]-arrowConfig.width*1.5-arrowConfig.margin) + "L" + (d3.max(xScale.range())  + (-arrowConfig.length)) + "," + (yScale.range()[1]-(arrowConfig.width*2+arrowConfig.margin)) + "L" + d3.max(xScale.range()) + "," + (yScale.range()[1]-(arrowConfig.width+arrowConfig.margin)) + "L" + (d3.max(xScale.range())  -arrowConfig.length) + "," + (yScale.range()[1]-(arrowConfig.margin)) + "L" + (d3.max(xScale.range())  -arrowConfig.length) + "," + (yScale.range()[1]-((arrowConfig.width/2)+arrowConfig.margin)) + "L" + xScale(d.date) + "," + (yScale.range()[1]-((arrowConfig.width/2)+arrowConfig.margin))})


    //create a line function that can convert data[] into x and y points
    var lineData= d3.svg.area()
        .x(function(d,i) { 
            return xScale(d.date); 
        })
        .y(function(d) { 
            return yScale(d.val); 
        })
        .interpolate(lineSmoothing)

    var clipData= d3.svg.area()
        .x(function(d,i) { 
            return xScale(d.date); 
        })
        .y0(yScale(yMin))
        .y1(function(d) { 
            return yScale(d.val); 
        })
        .interpolate(lineSmoothing)

    plotArrays.forEach(function(d,i){

        var xBandClip = plot.append("clipPath")
            .attr("id", "xBandClip_" + i);

        var seriesClip = xBandClip
            .append("path")
            .attr("d", clipData(d))
            .attr("transform",function(){
                if(yAlign=="right") {
                    return "translate("+(margin.left)+","+(margin.top)+")"
                }
                 else {return "translate("+(margin.left+yLabelOffset)+","+(margin.top)+")"}
            });

        xBandsG.selectAll("rect.xBand")
        .data(bandTicks.slice(1, bandTicks.length))
        .enter()
        .append("rect")
        .attr("class", media+"xBand")
        .attr("x", function(b){return (margin.left+yLabelOffset) + xScale(b)})
        .attr("width", xScale(bandTicks[2]) - xScale(bandTicks[1]))
        .attr("y", margin.top + yScale(yMax))
        .attr("height", yScale(yMin)-yScale(yMax))
        .attr("clip-path", "url(#xBandClip_" + i + ")");

    });


    var lines = plot.append("g").attr("id","series").selectAll("g")
            .data(plotArrays)
            .enter()
            .append("g")
            .attr("id",function(d,i){
                return seriesNames[i];  
            })

    lines.append("path")
        .attr("class",media+"lines")
        .attr("stroke",function(d,i){
            return colours[i];  
        })
        .attr('d', function(d){
            return lineData(d); })
        .attr("transform",function(){
            if(yAlign=="right") {
                return "translate("+(margin.left)+","+(margin.top)+")"
            }
             else {return "translate("+(margin.left+yLabelOffset)+","+(margin.top)+")"}
        })

    lines.append("g").attr("fill",function(d,i){return colours[i]})
    .selectAll("circle")
    .data(function(d){
        return d;})
    .enter()
    .append("circle")
    .attr("r", function(d) {
        if(d.highlight=="yes") {
            return yOffset/4
            }
            else {return 0}
        })
    .attr("cx",function(d){return xScale(d.date)})
    .attr("cy",function(d){return yScale(d.val)})
    .attr("transform",function(){
        if(yAlign=="right") {
            return "translate("+(margin.left)+","+(margin.top)+")"
        }
         else {return "translate("+(margin.left+yLabelOffset)+","+(margin.top)+")"}
    });
    

    //if needed, create markers
    if (markers){
        lines.append("g").attr("fill",function(d,i){return colours[i]})
            .selectAll("circle")
            .data(function(d){return d;})
            .enter()
            .append("circle")
            .attr("r",yOffset/3.5)
            .attr("id",function(d){
                return d.date+":"+d.val;
            })
            .attr("cx",function(d){return xScale(d.date)})
            .attr("cy",function(d){return yScale(d.val)})
            .attr("transform",function(){
                if(yAlign=="right") {
                    return "translate("+(margin.left)+","+(margin.top)+")"
                }
                 else {return "translate("+(margin.left+yLabelOffset)+","+(margin.top)+")"}
            });
    }

    if((annotations.filter(function(f){return f.annotate == "Estimate"})).length>0){

        d3.selectAll("." + media +"xAxis .tick text")
            .style("opacity", function(d){ return d > annotations.filter(function(f){return f.annotate == "Estimate"})[0].date ? 0.4:1})

        lines.append("path")
            .attr("class",media+"estimateDash")
            .attr('d', function(d){
                return lineData(d.filter(function(v){return v.date >= annotations.filter(function(f){return f.annotate == "Estimate"})[0].date})); })
            .attr("transform",function(){
                if(yAlign=="right") {
                    return "translate("+(margin.left)+","+(margin.top)+")"
                }
                 else {return "translate("+(margin.left+yLabelOffset)+","+(margin.top)+")"}
            })
        
    }


    d3.selectAll(".domain").remove()

    //Add labels so that the preflight script in illustrator will work
    d3.selectAll(".printxAxis text")
    .attr("id","xAxisLabel")
    d3.selectAll(".printyAxis text")
    .attr("id","yAxisLabel")
    d3.selectAll(".printyAxis line")
    .attr("id","yAxisTick")
    d3.selectAll(".printxAxis line")
    .attr("id","xAxisTick")

    if (seriesNames[0]!="x"){
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
            .attr("x",yOffset+yOffset/2)
            .attr("y",yOffset/1.25)
            .attr("class",media+"legend")
            .text(function(d){
                return d;
            })
        legend.append("line")
            .attr("stroke",function(d,i){
                return colours[i];  
            })
            .attr("x1",0)
            .attr("x2",yOffset)
            .attr("y1",yOffset/2.4)
            .attr("y2",yOffset/2.4)
            .attr("class",media+"lines")

        legend.attr("transform",function(d,i){
            if (legAlign=='hori') {
                var gHeigt=d3.select("#"+media+"l0").node().getBBox().height;
                if (i>0) {
                    var gWidth=d3.select("#"+media+"l"+(i-1)).node().getBBox().width+yOffset; 
                }
                else {gWidth=0};
                legendyOffset=legendyOffset+gWidth;
                return "translate("+(legendyOffset)+","+(gHeigt/2)+")";  
            }
            else {
                return "translate(0,"+((i*yOffset))+")"};
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


    function scaleWeekday(){
        var domain = [0,1];
        var range = [0,1];
        var msDay = 60000 * 60 * 24; //number of ms in a day
        function scale(x){
            //TODO: check we have a date... if not NaN
            //if it's a weekend reject, returning NaN
            if(x.getDay() == 0 || x.getDay() == 6) return undefined; //sunday is 0, saturday is 6
            var domainWeekendsMs = countWeekendDays(domain[0], domain[1]) * msDay;
            //  console.log(domain[0] + '->' + x, ' weekend days ' + countWeekendDays(domain[0], x) )
            //  console.log('adjusting')
            //  console.log(x.getTime(),'-',countWeekendDays(domain[0],x) * msDay)
            var adjustedValue = ( x.getTime() - (countWeekendDays(domain[0],x) * msDay) )-domain[0].getTime();
            var scaleFactor = (range[1] - range[0]) / ((domain[1] - domain[0]) - domainWeekendsMs ); //range units per ms
            //  console.log('scale', scaleFactor);
            return adjustedValue * scaleFactor;
        }

        scale.invert = function(x){ //TODO, this would be useful
        }
        scale.domain = function(x){
            if(!x) return domain;
            domain = x;
            return scale;
        }

        scale.range = function(x){
            if(!x) return range;
            range = x;
            return scale;
        }

        function countWeekendDays(d1, d2){ //how many weekend days are there between d1 and d2
            var firstday = d1.getDay();
            var daySpan = (d2.getTime() - d1.getTime() - firstday) / msDay;
            var weekSpan = (daySpan / 7) | 0;
            var weekRemainder = Math.ceil(daySpan % 7);
            var extra = 0;
            if (firstday + weekRemainder > 7){
            extra = 2;
            }else if (firstday + weekRemainder == 7 || weekRemainder > firstday){
            extra = 1;
            }
            return weekSpan * 2 + extra;
        }


        return scale;
    }





}