import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class LineChart extends Component {
  static defaultProps = {
    displayTitle: true,
    displayLegend: true,
    legendPosition: 'right',
  };

  render() {
    const {chartData, label, height, width} = this.props;
    return (
      <div className="chart">
        <Line
          data={chartData}
          height={height}
          width={width}
          options={{
            title: {
              display: this.props.displayTitle,
              text: label,
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />
      </div>
    )
  }
}

export default LineChart;