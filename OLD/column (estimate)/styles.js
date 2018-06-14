var styleprint = {classes:
[{class:"background{fill: none}"},
{class:"chartholder{fill: none}"},
{class:"annotationText{font-family:Avenir; font-size:8px; line-height:9px; fill:#000; font-weight: 100;}"},
{class:"annotationLine{fill:none;stroke:#000;stroke-width:.3px}"},
{class:"forecastArrow{fill:#B3B4B5;stroke:none;}"},
{class:"title{font-family:Avenir; font-size:10px; line-height:11px; fill:#000000; font-weight:900;}"},
{class:"subtitle{font-family:Avenir; font-style:italic; fill:#000000; font-size:7.5px; line-height:9px; font-weight:100; letter-spacing:-.2px;}"},
{class:"legend{font-family:Avenir; font-size:8px; line-height:9px; font-weight: 100; fill: #000;}"},
{class:"labels{font-family:Avenir; font-size:8px; line-height:9px; fill: #000; font-weight: 100;}"},
{class:"source{fill: #000000; font-family:Avenir; font-style:italic; font-size:6.5px; line-height: 7px; font-weight: 100;}"},
{class:"logo{fill: none;}"},
{class:"hat{fill:none; stroke-width:0.75px; stroke:#000;}"},
{class:"xAxis{fill:none; stroke-width:0px; stroke:none;}"},
{class:"xAxis line{fill:none; stroke-width:2.5px; stroke:#000; stroke-linecap:round;}"},
{class:"xAxis text{fill:#000000; font-family:Avenir; font-size:8px; line-height:9px; font-weight:100; font-feature-settings:'tnum' 1;}"},
{class:"xAxis text.forecast{opacity:0.6}"},
{class:"yAxis{fill:none; stroke-width:0px; stroke:none;}"},
{class:"yAxis line{fill:none; stroke-width:0.3px; stroke:#acacac;}"},
{class:"yAxis text{fill:#000000; font-family: Avenir; font-size: 8px; line-height:9px; font-weight: 100; font-feature-settings: 'tnum' 1;}"},
{class:"origin line{fill:none; stroke-width:0.5px; stroke:#000;}"},
{class:"lines{fill:none; stroke-width:2.0px;stroke-linecap: round;}"}
],
titleOffset:9,
subOffset:-4,
legendyOffset:0,
fillcolours:["#154577","#58bdbb","#ac252a","#cabd92","#ee5427","#f9a71a","#b0d480","#64a056","#00809c","#675388","#a16698","#d2d3d3"],
forecastColours:["#8998b8","#b7e0dc"]
}

var styleweb = {classes:
[{class:"background{fill: none}"},
{class:"chartholder{fill: none;}"},
{class:"annotationText{font-family:Avenir; font-size:8px; line-height:9px; fill:#000; font-weight: 100;}"},
{class:"annotationLine{fill:none;stroke:#000;stroke-width:.3px}"},
{class:"forecastArrow{fill:#B3B4B5;stroke:none;}"},
{class:"title{font-size:10px; font-family:Avenir; line-height:11px; font-weight:900; fill:#000;}"},
{class:"subtitle{font-family:Avenir; font-style:italic; font-size:7.5px; line-height:9px; font-weight:100; fill:#000; letter-spacing:-.2px;}"},
{class:"legend{font-family:Avenir; font-size:8px; line-height:9px; font-weight: 100; fill: #000;}"},
{class:"source{fill:#000; font-family:Avenir; font-style:italic; font-size:6.5px; line-height:7px; font-weight:100;}"},
{class:"labels{font-family:Avenir; font-size:8px; line-height:9px; fill:#000; font-weight:100;}"},
{class:"logo{fill: none;}"},
// {class:"hat{fill:none; stroke-width:1.3px; stroke:#000;}"},
{class:"xAxis{fill:none; stroke: none;}"},
{class:"xAxis line{fill:none; stroke-width:2.5px; stroke:#000; stroke-linecap:round;}"},
{class:"xAxis text{font-family:Avenir; fill:#000; font-size:8px; line-height:9; font-weight:100;}"},
{class:"xAxis text.forecast{opacity:0.6}"},
{class:"yAxis{fill:none; stroke: none;}"},
{class:"yAxis line{fill:none; stroke-width:.5px; stroke:#acacac;}"},
{class:"yAxis text{font-family: Avenir; fill:#000; font-size: 8px; line-height:9; font-weight:100; font-feature-settings: 'tnum' 1; text-anchor: end;}"},
{class:"origin line{fill:none; stroke:#000; stroke-width:.5px;}"},
{class:"lines{fill:none; stroke-width: 2.5px; stroke-linecap: round;}"}
],
titleOffset:9,
subOffset:-4,
legendyOffset:0,
fillcolours:["#154577","#58bdbb","#ac252a","#cabd92","#ee5427","#f9a71a","#b0d480","#64a056","#00809c","#675388","#a16698","#d2d3d3"],
forecastColours:["#8998b8","#b7e0dc"]
}

var stylesoc = {classes:
[{class:"background{fill: #212121;}"},
{class:"chartholder{fill: #4d4d4f;}"},
{class:"title{font-size: 38px; fill: #ffffff; opacity: 0.95; font-weight: 400;}"},
{class:"subtitle{font-size: 28px; fill: #ffffff; opacity: 0.70; font-weight: 100; line-height: 30px;}"},
{class:"source{font-size: 25px; fill: #ffffff; opacity: 0.50; font-weight: 100;}"},
{class:"logo{fill: #ffffff; opacity: 0.38;}"},
{class:"xAxis{fill:none; stroke: none;}"},
{class:"xAxis line{fill:none; stroke:#ffffff; stroke-width: 2.0px; opacity: 0.5;}"},
{class:"xAxis text{font-size: 28px; fill: #ffffff; opacity: 0.50; font-weight: 100; line-height: 18px;}"},
{class:"yAxis{fill:none; stroke: none;}"},
{class:"yAxis line{fill:none; stroke-width: 2.0px; stroke-dasharray:2,8; opacity: 0.38; stroke:#ffffff;}"},
{class:"yAxis text{font-size:8px; fill: #ffffff; opacity: 0.50; font-weight: 100; line-height: 28px; font-feature-settings: 'tnum' 1; text-anchor: end;}"},
{class:"origin line{fill:none; stroke:#ffffff; stroke-width: 2.0px; opacity: 0.5; stroke-dasharray:1,0}"},
{class:"lines{fill:none; stroke-width: 5px;  stroke-linecap: round;}"}
],
titleOffset:36,
subOffset:0,
legendyOffset:0,
fillcolours:["#EB3F50","#00D9CA","#BF9413","#1F5E99","#A7FF59","#FF9B96","#81838F"]
//fillcolours:["#CC4759","#00B5B5","#E6B522","#437099","#FF8C8B","#CBFF7E","#8A8A8A"]
}
var stylevid = {classes:
[{class:"background{fill: #212121;}"},
{class:"titleframe{fill: none;}"},
{class:"chartholder{fill: none;}"},
{class:"title{font-size: 68px; fill: #ffffff; font-weight: 600;opacity: 0.9;}"},
{class:"subtitle{font-size: 48; fill: #ffffff; font-weight: 400;opacity: 0.7;}"},
{class:"source{font-size:36; fill: #ffffff; font-weight: 400;opacity: 0.5;}"},
{class:"logo{fill: #ffffff;}"},
{class:"xAxis{fill:none; stroke: none;}"},
{class:"xAxis line{fill:none; stroke-width: 4px; stroke:#ffffff;opacity: 0.5}"},
{class:"xAxis text{font-size: 48; fill: #ffffff; font-weight: 400;opacity: 0.5}"},
{class:"yAxis{fill:none; stroke: none;}"},
{class:"yAxis line{fill:none; stroke-width: 4px; stroke:#ffffff;opacity: 0.38}"},
{class:"yAxis text{font-size: 48; fill: #ffffff; font-weight: 400;font-feature-settings: 'tnum' 1; text-anchor: end;opacity: 0.5}"},
{class:"origin line{fill:none; stroke:#ffffff; stroke-width: 5.0px;stroke-dasharray:1,0; opacity: 0.5}"},
{class:"whiskers{fill:none; stroke-width:2.0px;stroke:#ffffff; opacity: 0.5}"},
{class:"lines{fill:none; stroke-width: 8.0px; stroke-linecap: round;}"},
{class:"fill{fill-opacity:1.0; stroke-width: 0.0px}"},
{class:"highlight{fill-opacity:1.0;}"},
{class:"day{fill:none; stroke: #ffffff; stroke-width:4.0px; opacity: 0.5; stroke-linecap: round;}"},
{class:"month{fill:none; stroke: #ffffff; stroke-width:4.0px; opacity: 0.5; stroke-linecap: round;}"}

],
titleOffset:68,
subOffset:0,
legendyOffset:15,
linecolours:["#EB3F50","#00D9CA","#BF9413","#1F5E99","#A7FF59","#FF9B96","#81838F"],
fillcolours:["#EB3F50","#00D9CA","#BF9413","#1F5E99","#A7FF59","#FF9B96","#81838F"]
}




    //Tabular with 
    //-webkit-font-feature-settings: 'tnum' 1;
       //font-feature-settings: 'tnum' 1;