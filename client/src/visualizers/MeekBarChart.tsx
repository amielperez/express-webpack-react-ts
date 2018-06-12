import * as React from 'react';
import * as d3 from 'd3';
import SimpleBarChartProps from './SimpleBarChartProps';
import SimpleBarChartState from './SimpleBarChartState';

class MeekBarChart extends React.Component<SimpleBarChartProps, SimpleBarChartState> {
    private xScaleFn: d3.ScaleLinear<number, number>;
    private yScaleFn: d3.ScaleLinear<number, number>;
    private BAR_WIDTH_FACTOR: number = 0.75;
    private DEFAULT_COLOR: string = '#f00';

    constructor(props: SimpleBarChartProps, context: any) {
        super(props, context);
    }

    componentDidUpdate() {
        this.computeChart();
    }

    computeChart() {
        this.xScaleFn = d3.scaleLinear()
            .domain([0, this.props.data.length])
            .range([0, this.props.width]);

        this.yScaleFn = d3.scaleLinear()
            .domain([0, d3.max(this.props.data)])
            .range([0, this.props.height]);
    }

    render() {
        var svgStyle = {
            width: this.props.width,
            height: this.props.height,
        };

        this.computeChart();        
        return (
            <div>
                <svg style={svgStyle}>
                    {
                        this.props.data &&
                        this.props.data.map((d, i) =>{
                            var barStyle = {
                                height: this.yScaleFn(d),
                                width: this.xScaleFn(1) * this.BAR_WIDTH_FACTOR,
                                x: this.yScaleFn(i),
                                y: this.props.height - this.yScaleFn(d),
                                fill: this.props.color || this.DEFAULT_COLOR,
                            }
                            return <rect style={barStyle}></rect>;
                        })
                    }
                </svg>
            </div>
        );
    }
}

export default MeekBarChart;
