// ----- MAKE YOUR CHANGES BETWEEN THESE LINES FOR #10 -----
let requestData10 = async function() {
    const data = await d3.json('us_artists.topojson');
    console.log(data);

    const svg = d3.selectAll("#map")
    var mapWidth = svg.attr("width");
    var mapHeight = svg.attr("height");

    var states = topojson.feature(data, data.objects.states)
    var projection = d3.geoAlbersUsa().fitSize([mapWidth, mapHeight], states);
    var path = d3.geoPath().projection(projection);
    var artistExtent = d3.extent(states.features, d => d.properties.percent_artists)
    var colorScale = d3.scaleSequential(d3.interpolateViridis).domain(artistExtent);

    svg.selectAll("path.states")
            .data(states.features)
            .join("path")
            .attr("class", "states")
            .attr("d", path)
            .attr("fill", d => colorScale(d.properties.percent_artists))
            //.attr("stroke", "none");

    WashDC = projection([-77.025955, 38.942142]);
    svg.append("circle")
       .attr("cx", WashDC[0])
       .attr("cy", WashDC[1])
       .attr("r", 8)
       .attr("fill", colorScale(0.224))
       .attr("stroke", "black")
       .attr("stroke-width", 1)
}
requestData10();

// ----- MAKE YOUR CHANGES BETWEEN THESE LINES FOR #10 -----
