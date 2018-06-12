import * as React from 'react';
import * as d3 from 'd3';
import SimpleBarChartProps from './SimpleBarChartProps';
import SimpleBarChartState from './SimpleBarChartState';
import './simple-bar-chart.scss';

class SimpleBarChart extends React.Component<SimpleBarChartProps, SimpleBarChartState> {
    private chartRef: HTMLDivElement;
    private d3Context: d3.Selection<d3.BaseType, {}, null, undefined>;

    constructor(props: SimpleBarChartProps, context: any) {
        super(props, context)
        this.state = {
            height: 200,
            width: 350,
        }
    }

    componentDidMount() {
        this.d3Context = this.setD3Context();
        this.buildD3Chart();
    }

    setD3Context(): d3.Selection<d3.BaseType, {}, null, undefined> {
        return d3.select(this.chartRef)
            .append('svg')
            .attr('height', this.state.height)
            .attr('width', this.state.width);
    }

    buildD3Chart() {
        var xScale = d3.scaleLinear()
            .domain([0, this.props.data.length])
            .range([0, this.state.width]);

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(this.props.data)])
            .range([0, this.state.height]);

        this.d3Context.selectAll('rect')
            .data(this.props.data)
            .enter()
            .append('rect')
            .attr('fill', this.props.color)
            .attr('width', (d) => (xScale(1) * 0.75))
            .attr('y', (d) => (this.state.height - yScale(d)))
            .attr('height', (d) => (yScale(d)))            
            .attr('x', (d, i) => (xScale(i)))
    }

    render() {
        return (
            <div ref={(ref: HTMLDivElement) => this.chartRef = ref}></div>
        )
    }
}

export default SimpleBarChart;

