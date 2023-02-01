// ----- MAKE YOUR CHANGES BETWEEN THESE LINES FOR #9 -----
let requestData9 = async function() {
    const data = await d3.json('class_network.json');
    console.log(data);

    var sim = d3.forceSimulation()
                .nodes(data.nodes)
                .force("links", d3.forceLink()
                                  .links(data.links)
                                  .id(d => d.course))
                .force("repulse", d3.forceManyBody().strength(-120))
                .force("collide", d3.forceCollide()
                                 .radius(6))
                .force("radial", d3.forceRadial()
                                   .radius( d => 60 * d.level )
                                   .x(300)
                                   .y(300)
                                   .strength(3))
                .on("tick", render);

    svg = d3.selectAll("#network")
    var colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    function render() {
        // Edges
        let lines = svg.selectAll("line.links")
                       .data(data.links)
                       .join(
                           enter => enter.append("line")
                                         .attr("class", "links")
                                         .attr("stroke", "#2E2E2E")
                                         .attr("stroke-width", 1)
                       )
                       .attr("x1", d => d.source.x).attr("x2", d => d.target.x)
                       .attr("y1", d => d.source.y).attr("y2", d => d.target.y);
        // Nodes
        let circles = svg.selectAll("circle.nodes")
                         .data(data.nodes)
                         .join(
                             enter => enter.append("circle")
                                           .attr("class","nodes")
                                           .attr("r", 6)
                               )
                                           .attr("cx", d => d.x)
                                           .attr("cy", d => d.y)
                                           .attr("fill", d => colorScale(d.prefix))
    }


}
requestData9();

// ----- MAKE YOUR CHANGES BETWEEN THESE LINES FOR #9 -----
