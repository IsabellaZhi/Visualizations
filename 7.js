// ----- MAKE YOUR CHANGES BETWEEN THESE LINES FOR #7 -----
const requestData = async function() {
    const data = await d3.json("olympic_ages.json"); //这不需要别的吧
    console.log(data);

    var timeParse = d3.timeParse("%Y")
    data.forEach(d => {
        d['date'] = timeParse(d['date'])
    });
    //console.log(data)

    const svg = d3.select("#olympic")
    var margins = {top: 10, right: 10, bottom: 40, left: 40};
    var chartWidth = svg.attr("width") - margins.left - margins.right;
    var chartHeight = svg.attr("height") - margins.top - margins.bottom;

    // scales
    var timeExtent = d3.extent(data, d => d['date'] );
    var scaleTime = d3.scaleTime().domain(timeExtent).range([0, chartWidth]);
    var ageExtent = d3.extent(data, d => d['age'] );
    var scaleAge = d3.scaleLinear().domain(ageExtent).range([chartHeight, 0]);
    //const sports = d3.map(Object.keys(data), d => d.sports);
    var colorScale = d3.scaleOrdinal(d3.schemeCategory10)//.domain(sports)
    let chartArea = svg.append('g')
                       .attr("class","chart")
                       //.attr('transform',`translate(${margins.left},${margins.top})`);

    // y-axis and horizontal gridlines
    let leftAxis = d3.axisLeft(scaleAge);
    chartArea.append('g')
        .attr('class', 'axis')
        .attr('transform',`translate(${margins.left-10},${margins.top})`)
        .call(leftAxis);
    let leftGridlines = d3.axisLeft(scaleAge).tickSize(-chartWidth-10).tickFormat('');
    chartArea.append('g')
        .attr('class', 'gridlines')
        .attr('transform',`translate(${margins.left-10},${margins.top})`)
        .call(leftGridlines);
    // x-axis and verticle gridlines
    let bottomAxis = d3.axisBottom(scaleTime);
    chartArea.append('g')
        .attr('class', 'axis')
        .attr('transform',`translate(${margins.left},${chartHeight+margins.top+10})`)
        .call(bottomAxis);
    let bottomGridlines = d3.axisBottom(scaleTime).tickSize(-chartHeight-10).tickFormat('');
    chartArea.append('g')
        .attr('class', 'gridlines')
        .attr('transform',`translate(${margins.left},${chartHeight+margins.top+10})`)
        .call(bottomGridlines);

    function jitter(){
        return Math.random() * 6 - 3}
    circles = chartArea.selectAll("circle")
                       .data(data)
                       .join("circle")
                       .attr("cx", d => scaleTime(d.date) + jitter())
                       .attr("cy", d => scaleAge(d.age))
                       .attr("r", 5)
                       .attr("opacity", 0.4)
                       .attr("class", "circles")
                       .attr("fill", d => colorScale(d.sport))
                       .attr('transform',`translate(${margins.left},${margins.top})`);
}
requestData();









// ----- MAKE YOUR CHANGES BETWEEN THESE LINES FOR #7 -----
