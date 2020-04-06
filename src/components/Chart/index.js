import * as d3 from 'd3'

class D3Chart {
  constructor(element, data) {

    // props 
    this.chartHeight = 500
    this.chartWidth = 1500

    // init svg
    const svg = d3.select(element)
      .append("svg")
      .attr("width", this.chartWidth + 150)
      .attr("height", this.chartHeight + 350)
      .append("g")
      .attr("transform", `translate(320, 100)`)

    svg.append("text")
      .attr("x", - (this.chartHeight / 2))
      .attr("y", - 280)
      .attr("text-anchor", "middle")
      .text("Sales 2011")
      .attr("transform", "rotate(-90)")

    const HorizontalAxisGroup = svg.append("g")
      .attr("transform", `translate(0, ${this.chartHeight})`)

    const verticalAxisGroup = svg.append("g")

    // label
    const horizontalLabel = svg.append("text")
      .attr("x", this.chartWidth / 2)
      .attr("y", this.chartHeight + 50)
      .attr("text-anchor", "middle")

    // label bottom
    horizontalLabel.text("Estimated Annual Sales for U.S. Electronic Shopping and Mail-Order Houses")

    this.mountChart(data, svg, HorizontalAxisGroup, verticalAxisGroup)
  }

  mountChart = (data, svg, HorizontalAxisGroup, verticalAxisGroup) => {
    // vertical position
    const vertical = d3.scaleBand()
      .domain(data.map(item => item.merchandiseLine))
      .range([0, this.chartHeight])
      .padding(0.9)

    // horizontal position
    const horizontal = d3.scaleLinear()
      .domain([
        d3.min(data, item => Math.floor(item.total)) * 0.95,
        d3.max(data, item => Math.floor(item.total))
      ])
      .range([this.chartWidth, 0])

    // label horizontal
    const xAxisCall = d3.axisBottom(horizontal)
    HorizontalAxisGroup.call(xAxisCall)

    // label vertical
    const yAxisCall = d3.axisLeft(vertical)
    verticalAxisGroup.call(yAxisCall)

    // data join
    const rects = svg.selectAll("rect")
      .data(data)

    // data enter
    rects.enter()
      .append("rect")
      .attr("x", 10)
      .attr("width", item => Math.floor(item.total) / 120)
      .attr("y", item => vertical(item.merchandiseLine))
      .attr("height", 5)
      .attr("fill", (item, indice) => indice === 0 ? "#000" : "#0476b7")
  }
}

export default D3Chart