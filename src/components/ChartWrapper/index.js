import React, { Component } from 'react';
import D3Chart from '../Chart';

export default class ChartWrapper extends Component {

  componentDidMount() {
    this.setState({
      chart: new D3Chart(this.refs.chart, this.props.data)
    })
  }

  render() {
    return <div className="chart-area" ref="chart"></div>
  }
}