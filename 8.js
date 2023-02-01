// ----- MAKE YOUR CHANGES BETWEEN THESE LINES FOR #8 -----
const requestData8 = async function() {
    const data = await d3.json("bakeoff_scores.json");
    console.log(data);

    const svg = d3.select("#bakeoff")
    var margins = {top: 10, right: 10, bottom: 40, left: 40};
    var chartWidth = svg.attr("width") - margins.left - margins.right;
    var chartHeight = svg.attr("height") - margins.top - margins.bottom;

    // scales
    var scaleAge = d3.scaleLinear().domain([17, 71]).range([0, chartWidth]);
    var scaleScore = d3.scaleLinear().domain([0, 100]).range([chartHeight, 0]);
    let chartArea = svg.append('g')
                       .attr("class","chart")
                       //.attr('transform',`translate(${margins.left},${margins.top})`);

    // y-axis and horizontal gridlines
    let leftAxis = d3.axisLeft(scaleScore);
    chartArea.append('g')
        .attr('class', 'axis')
        .attr('transform',`translate(${margins.left-10},${margins.top})`)
        .call(leftAxis);
    let leftGridlines = d3.axisLeft(scaleScore).tickSize(-chartWidth-10).tickFormat('');
    chartArea.append('g')
        .attr('class', 'gridlines')
        .attr('transform',`translate(${margins.left-10},${margins.top})`)
        .call(leftGridlines);
    // x-axis and verticle gridlines
    let bottomAxis = d3.axisBottom(scaleAge);
    chartArea.append('g')
        .attr('class', 'axis')
        .attr('transform',`translate(${margins.left},${chartHeight+margins.top+10})`)
        .call(bottomAxis);
    let bottomGridlines = d3.axisBottom(scaleAge).tickSize(-chartHeight-10).tickFormat('');
    chartArea.append('g')
        .attr('class', 'gridlines')
        .attr('transform',`translate(${margins.left},${chartHeight+margins.top+10})`)
        .call(bottomGridlines);

    lollipop = chartArea.selectAll("g.lollipop")
                         .data(data)
                         .join("g")
                         .attr("class", "lollopop")
                         .attr('transform',`translate(${margins.left},${margins.top})`);

    lollipop.append("line")
            .attr("stroke", "blue")
            .attr("x1", d => scaleAge(d.start_age))
            .attr("x2", d => scaleAge(d.end_age))
            .attr("y1", d => scaleScore(d.overall_score))
            .attr("y2", d => scaleScore(d.overall_score))
            .attr('stroke-width', 10)
            .attr('class', 'overall');
    lollipop.append("line")
            .attr("stroke", "red")
            .attr("x1", d => scaleAge(d.start_age))
            .attr("x2", d => scaleAge(d.end_age))
            .attr("y1", d => scaleScore(d.technique_score))
            .attr("y2", d => scaleScore(d.technique_score))
            .attr('stroke-width', 10)
            .attr('class', 'technique');
    lollipop.append("line")
            .attr("stroke", "grey")
            .attr("opacity", 0.9)
            .attr("x1", d => scaleAge((d.start_age+d.end_age)/2))
            .attr("x2", d => scaleAge((d.start_age+d.end_age)/2))
            .attr("y1", d => scaleScore(d.overall_score))
            .attr("y2", d => scaleScore(d.technique_score))
            .attr('stroke-width', d => scaleAge(d.end_age) - scaleAge(d.start_age))
            .attr('class', 'overall');
}
requestData8();



// ----- MAKE YOUR CHANGES BETWEEN THESE LINES FOR #8 -----
