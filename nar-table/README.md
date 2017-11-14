# nar-table
A sample table generation template for NAR.

This uses the [d3js](https://d3js.org/) library (version 4) to produce styled table elements in SVG. These tables can then be loaded into Illustrator for final tweaks by using the [NYT SVG Crowbar](http://nytimes.github.io/svg-crowbar/) bookmark in Chrome.

As Alan Smith said:
> Coding tables gives me a nosebleed

Tasks remaining:

### Next steps
- [x] add source and switch location depending on footnote
- [x] odd-even shading (last cell grey)
- [x] bottom align header information

### Longer term
- [ ] detect text/number in columns and format right/center accordingly
- [ ] consistent , and .00 for numbers
- [ ] add commas for numbers 
- [ ] add function to control decimal places, and force .00 for rounded figures
- [ ] detect when columns hold numbers, and centre them under the 
