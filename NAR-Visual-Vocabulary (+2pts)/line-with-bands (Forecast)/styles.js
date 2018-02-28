var styleprint = {classes:
[{class:"background{fill:none}"},
{class:"annotationText{font-family:Avenir; font-size:10px; line-height:11px; fill:#000; font-weight:100; letter-spacing:-.2px;}"},
{class:"annotationLine{fill:none;stroke:#000; stroke-width:.3px}"},
{class:"xBand:nth-child(odd){fill:#e6e6e6; stroke:none;}"},
{class:"xBand:nth-child(even){fill:#fff; stroke:none}"},
{class:"Shade{fill:#CABD92;opacity:0.2; stroke:none}"},
{class:"forecastArrow{fill:#B3B4B5; stroke:none;}"},
{class:"forecastDash{stroke-dasharray:1.6,1.2; stroke:#ffffff; stroke-width:1px; stroke-linecap:butt;}"},
{class:"chartholder{fill: none}"},
{class:"title{font-family:Avenir; font-size:12px; line-height:13px; fill:#000000; font-weight:900; letter-spacing:-.2px;}"},
{class:"subtitle{font-family:Avenir; font-style:italic; fill:#000000; font-size:9.5px; line-height:11px; font-weight:100; letter-spacing:-.2px;}"},
{class:"legend{font-family:Avenir; font-size:10px; line-height:11px; font-weight:100; fill:#000; letter-spacing:-.2px;}"},
{class:"labels{font-family:Avenir; font-size:10px; line-height:11px; fill:#000; font-weight:100; letter-spacing:-.2px;}"},
{class:"source{font-family:Avenir; font-style:italic; fill:#000000; font-size:8.5px; line-height]:9px; font-weight:100; letter-spacing:-.2px;}"},
{class:"logo{fill: none;}"},
{class:"hat{fill:none; stroke-width:0.3px; stroke:#000;}"},
{class:"xAxis{fill:none; stroke-width:0px; stroke:none;}"},
{class:"xAxis line{fill:none; stroke-width:2.5px; stroke:#000000; stroke-linecap:round;}"},
{class:"xAxis text{font-family:Avenir; font-size:10px; line-height:11px; fill:#000000; font-weight:100; letter-spacing:-.2px; font-feature-settings:'tnum' 1;}"},
{class:"minorAxis{fill:none; stroke-width:0px; stroke:none;}"},
{class:"minorAxis line{fill:none; stroke-width:0.3px; stroke:#acacac;}"},
{class:"yAxis{fill:none; stroke-width:0px; stroke:none;}"},
{class:"yAxis line{fill:none; stroke-width:0.3px; stroke:#acacac;}"},
{class:"yAxis text{font-family:Avenir; fill:#000000; font-size:10px; line-height:11px; font-weight:100; letter-spacing:-.2px; font-feature-settings:'tnum' 1;}"},
{class:"linesHighlight{fill:none; stroke-width:.5px; stroke-linecap:round;}"},
{class:"minorAxis{fill:none; stroke-width:0px; stroke:none;}"},
{class:"minorAxis line{fill:none; stroke-width:0.3px; stroke:red;}"},
{class:"origin line{fill:none; stroke-width:0.5px; stroke:#000;}"},
{class:"area{fill:none}"},
{class:"lines{fill:none; stroke-width:2px; stroke-linecap:round; stroke-linejoin:round;}"}
],
titleOffset:12,
subOffset:-5,
legendyOffset:0,
linecolours:["#154577","#58bdbb","#ac252a","#cabd92","#ee5427","#f9a71a","#b0d480","#64a056","#00809c","#675388","#a16698","#d2d3d3"],
fillcolours:["#154577","#58bdbb","#ac252a","#cabd92","#ee5427","#f9a71a","#b0d480","#64a056","#00809c","#675388","#a16698","#d2d3d3"]
}

//FOR OGP, USE PRINT VERSION, 1. resize to 341 x 179 in index.html, 2. make left, right, top, bottom margins 10pt in line #41


var styleweb = {classes:
[{class:"background{fill:none}"},
{class:"annotationText{font-family:Avenir; font-size:10px; line-height:11px; fill:#000; font-weight:100; letter-spacing:-.2px;}"},
{class:"annotationLine{fill:none;stroke:#000; stroke-width:.3px}"},
{class:"xBand:nth-child(odd){fill:#e6e6e6; stroke:none;}"},
{class:"xBand:nth-child(even){fill:#fff; stroke:none}"},
{class:"Shade{fill:#CABD92;opacity:0.2; stroke:none}"},
{class:"forecastArrow{fill:#B3B4B5; stroke:none;}"},
{class:"forecastDash{stroke-dasharray:1.4,1.2; stroke:#ffffff; stroke-width:1px; stroke-linecap:butt;}"},
{class:"chartholder{fill: none}"},
{class:"title{font-family:Avenir; font-size:12px; line-height:13px; fill:#000000; font-weight:900; letter-spacing:-.2px;}"},
{class:"subtitle{font-family:Avenir; font-style:italic; fill:#000000; font-size:9.5px; line-height:11px; font-weight:100; letter-spacing:-.2px;}"},
{class:"legend{font-family:Avenir; font-size:10px; line-height:11px; font-weight:100; fill:#000; letter-spacing:-.2px;}"},
{class:"labels{font-family:Avenir; font-size:10px; line-height:11px; fill:#000; font-weight:100; letter-spacing:-.2px;}"},
{class:"source{font-family:Avenir; font-style:italic; fill:#000000; font-size:8.5px; line-height]:9px; font-weight:100; letter-spacing:-.2px;}"},
{class:"logo{fill: none;}"},
{class:"hat{fill:none; stroke-width:0.3px; stroke:#000;}"},
{class:"xAxis{fill:none; stroke-width:0px; stroke:none;}"},
{class:"xAxis line{fill:none; stroke-width:2.5px; stroke:#000000; stroke-linecap:round;}"},
{class:"xAxis text{font-family:Avenir; font-size:10px; line-height:11px; fill:#000000; font-weight:100; letter-spacing:-.2px; font-feature-settings:'tnum' 1;}"},
{class:"minorAxis{fill:none; stroke-width:0px; stroke:none;}"},
{class:"minorAxis line{fill:none; stroke-width:0.3px; stroke:#acacac;}"},
{class:"yAxis{fill:none; stroke-width:0px; stroke:none;}"},
{class:"yAxis line{fill:none; stroke-width:0.3px; stroke:#acacac;}"},
{class:"yAxis text{font-family:Avenir; fill:#000000; font-size:10px; line-height:11px; font-weight:100; letter-spacing:-.2px; font-feature-settings:'tnum' 1;}"},
{class:"linesHighlight{fill:none; stroke-width:.5px; stroke-linecap:round;}"},
{class:"minorAxis{fill:none; stroke-width:0px; stroke:none;}"},
{class:"minorAxis line{fill:none; stroke-width:0.3px; stroke:red;}"},
{class:"origin line{fill:none; stroke-width:0.5px; stroke:#000;}"},
{class:"area{fill:none}"},
{class:"lines{fill:none; stroke-width:2px; stroke-linecap:round; stroke-linejoin:round;}"}
],
titleOffset:12,
subOffset:-5,
legendyOffset:0,
linecolours:["#154577","#58bdbb","#ac252a","#cabd92","#ee5427","#f9a71a","#b0d480","#64a056","#00809c","#675388","#a16698","#d2d3d3"],
fillcolours:["#154577","#58bdbb","#ac252a","#cabd92","#ee5427","#f9a71a","#b0d480","#64a056","#00809c","#675388","#a16698","#d2d3d3"]
}

var stylesoc = {classes:
[{class:"background{fill:none}"},
{class:"annotationText{font-family:Avenir; font-size:10px; line-height:11px; fill:#000; font-weight:100; letter-spacing:-.2px;}"},
{class:"annotationLine{fill:none;stroke:#000; stroke-width:.3px}"},
{class:"xBand:nth-child(odd){fill:#e6e6e6; stroke:none;}"},
{class:"xBand:nth-child(even){fill:#fff; stroke:none}"},
{class:"Shade{fill:#CABD92;opacity:0.2; stroke:none}"},
{class:"forecastArrow{fill:#B3B4B5; stroke:none;}"},
{class:"forecastDash{stroke-dasharray:1.4,1.2; stroke:#ffffff; stroke-width:1px; stroke-linecap:butt;}"},
{class:"chartholder{fill: none}"},
{class:"title{font-family:Avenir; font-size:12px; line-height:13px; fill:#000000; font-weight:900; letter-spacing:-.2px;}"},
{class:"subtitle{font-family:Avenir; font-style:italic; fill:#000000; font-size:9.5px; line-height:11px; font-weight:100; letter-spacing:-.2px;}"},
{class:"legend{font-family:Avenir; font-size:10px; line-height:11px; font-weight:100; fill:#000; letter-spacing:-.2px;}"},
{class:"labels{font-family:Avenir; font-size:10px; line-height:11px; fill:#000; font-weight:100; letter-spacing:-.2px;}"},
{class:"source{font-family:Avenir; font-style:italic; fill:#000000; font-size:8.5px; line-height]:9px; font-weight:100; letter-spacing:-.2px;}"},
{class:"logo{fill: none;}"},
{class:"hat{fill:none; stroke-width:0.3px; stroke:#000;}"},
{class:"xAxis{fill:none; stroke-width:0px; stroke:none;}"},
{class:"xAxis line{fill:none; stroke-width:2.5px; stroke:#000000; stroke-linecap:round;}"},
{class:"xAxis text{font-family:Avenir; font-size:10px; line-height:11px; fill:#000000; font-weight:100; letter-spacing:-.2px; font-feature-settings:'tnum' 1;}"},
{class:"minorAxis{fill:none; stroke-width:0px; stroke:none;}"},
{class:"minorAxis line{fill:none; stroke-width:0.3px; stroke:#acacac;}"},
{class:"yAxis{fill:none; stroke-width:0px; stroke:none;}"},
{class:"yAxis line{fill:none; stroke-width:0.3px; stroke:#acacac;}"},
{class:"yAxis text{font-family:Avenir; fill:#000000; font-size:10px; line-height:11px; font-weight:100; letter-spacing:-.2px; font-feature-settings:'tnum' 1;}"},
{class:"linesHighlight{fill:none; stroke-width:.5px; stroke-linecap:round;}"},
{class:"minorAxis{fill:none; stroke-width:0px; stroke:none;}"},
{class:"minorAxis line{fill:none; stroke-width:0.3px; stroke:red;}"},
{class:"origin line{fill:none; stroke-width:0.5px; stroke:#000;}"},
{class:"area{fill:none}"},
{class:"lines{fill:none; stroke-width:2px; stroke-linecap:round; stroke-linejoin:round;}"}
],
titleOffset:12,
subOffset:-5,
legendyOffset:0,
linecolours:["#154577","#58bdbb","#ac252a","#cabd92","#ee5427","#f9a71a","#b0d480","#64a056","#00809c","#675388","#a16698","#d2d3d3"],
fillcolours:["#154577","#58bdbb","#ac252a","#cabd92","#ee5427","#f9a71a","#b0d480","#64a056","#00809c","#675388","#a16698","#d2d3d3"]
}


var stylenowcast = {classes:
[{class:"background{fill: none}"},
{class:"annotationText{fill:#6b6e68;font-size:14px;}"},
{class:"annotationLine{fill:none;stroke:#6b6e68;stroke-width:1px}"},
{class:"Shade{fill:#69A1AA;opacity:0.2;stroke:none}"},
{class:"chartholder{fill: none}"},
{class:"title{font-size:17px; font-family:Avenir; line-height:18px; font-weight:900; fill:#000; letter-spacing:-.2px;}"},
{class:"subtitle{font-family:Avenir; font-style:italic; font-size:12.75px; line-height:15.3px; font-weight:100; fill:#000; letter-spacing:-.2px;}"},
{class:"source{fill:#000; font-family:Avenir; font-style:italic; font-size:11px; line-height:12px; font-weight:100;}"},
{class:"logo{fill: none;}"},
{class:"xAxis{fill:none; stroke: none;}"},
{class:"xAxis line{fill:none; stroke-width: 1.0px; stroke:#c3bcb0;}"},
{class:"xAxis text{fill:#6b6e68; font-size: 14.0px; font-weight: 400; text-anchor: middle; font-feature-settings: 'tnum' 1;}"},
{class:"yAxis{fill:none; stroke: none;}"},
{class:"yAxis line{fill:none; stroke-width: 1.0px; stroke:#c3bcb0; stroke-dasharray:1,2}"},
{class:"yAxis text{fill:#6b6e68; font-size: 14.0px; font-weight: 400; font-feature-settings: 'tnum' 1; text-anchor: end;}"},
{class:"minorAxis{fill:none; stroke: none;}"},
{class:"minorAxis line{fill:none; stroke:#9ba497; stroke-width: 1px;stroke-dasharray:1,0}"},
{class:"origin line{fill:none; stroke:#9ba497; stroke-width: 1px;stroke-dasharray:1,0}"},
{class:"area{fill:#D9E7EF;}"},
{class:"lines{fill:none; stroke-width: 2.5px; stroke-linecap: round;stroke-linejoin: round;}"}
],
titleOffset:12,
subOffset:-5,
legendyOffset:0,
linecolours:["#A5526A","#F19F9E","#D36969","#69A1AA","#66bfd4","#486ba0"],
fillcolours:["#A5526A","#F19F9E","#D36969","#69A1AA","#66bfd4","#486ba0"]
}

var stylevid = {classes:
[{class:"background{fill: #212121;}"},
{class:"titleframe{fill: none;}"},
{class:"annotationText{fill:#ffffff;font-size:48px;}"},
{class:"annotationLine{fill:none;stroke:#ffffff;stroke-width:1px}"},
{class:"Shade{fill:#ffffff;opacity:0.2;stroke:none}"},
{class:"chartholder{fill: none;}"},
{class:"title{font-size: 68px; fill: #ffffff; font-weight: 600;opacity: 0.9;}"},
{class:"subtitle{font-size: 48; fill: #ffffff; font-weight: 400;opacity: 0.7;}"},
{class:"source{font-size: 36; fill: #ffffff; font-weight: 400;opacity: 0.5;}"},
{class:"logo{fill: #ffffff;}"},
{class:"xAxis{fill:none; stroke: none;}"},
{class:"xAxis line{fill:none; stroke-width: 4px; stroke:#ffffff;opacity: 0.5}"},
{class:"xAxis text{font-size: 48; fill: #ffffff; font-weight: 400;opacity: 0.5}"},
{class:"yAxis{fill:none; stroke: none;}"},
{class:"yAxis line{fill:none; stroke-width: 4px; stroke:#ffffff;opacity: 0.38}"},
{class:"yAxis text{font-size: 48; fill: #ffffff; font-weight: 400;font-feature-settings: 'tnum' 1; text-anchor: end;opacity: 0.5}"},
{class:"origin line{fill:none; stroke:#ffffff; stroke-width: 5.0px;stroke-dasharray:1,0; opacity: 0.5}"},
{class:"area{fill:#fdf8f2; fill-opacity:0.2;}"},
{class:"whiskers{fill:none; stroke-width:2.0px;stroke:#ffffff; opacity: 0.5}"},
{class:"lines{fill:none; stroke-width: 8.0px; stroke-linecap: round;stroke-linejoin: round;}"},
{class:"fill{fill-opacity:1.0; stroke-width: 0.0px}"},
{class:"highlight{fill-opacity:1.0;}"},
{class:"day{fill:none; stroke: #ffffff; stroke-width:4.0px; opacity: 0.5; stroke-linecap: round;stroke-linejoin: round;}"},
{class:"month{fill:none; stroke: #ffffff; stroke-width:4.0px; opacity: 0.5; stroke-linecap: round;stroke-linejoin: round;}"}

],
titleOffset:68,
subOffset:0,
legendyOffset:15,
linecolours:["#EB3F50","#00D9CA","#BF9413","#1F5E99","#A7FF59","#FF9B96","#81838F"],
fillcolours:["#EB3F50","#00D9CA","#BF9413","#1F5E99","#A7FF59","#FF9B96","#81838F"]
}
