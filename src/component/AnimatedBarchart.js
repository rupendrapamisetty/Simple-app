import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { useResizeObserver } from "../util";

const AnimatedBarchart = () => {
    const [data, setData] = useState([25, 30, 45, 60, 20, 70, 30]);
    const ref = useRef();
    const wrapperRef = useRef();

    const dimensions = useResizeObserver(wrapperRef);

    useEffect(() => {
        const svg = d3.select(ref.current);
        // console.log("dimensions",dimensions);

        if(!dimensions) return;

        const xScale = d3.scaleBand()
            .domain(data.map((_, index) => index))
            .range([0, dimensions.width])
            .padding(0.5);

        const yScale = d3.scaleLinear()
            .domain([0, 150])
            .range([dimensions.height, 0]);

        const colorScale = d3.scaleLinear()
            .domain([75, 100, 150])
            .range(['green', 'orange', 'red'])
            .clamp(true);

        const xAxis = d3.axisBottom(xScale).ticks(data.length);
        svg.select(".x-axis")
            .attr("transform", `translateY(${dimensions.height}px)`)
            .call(xAxis);

        const yAxis = d3.axisRight(yScale);
        svg.select(".y-axis")
            .attr("transform", `translateX(${dimensions.width}px)`)
            .call(yAxis);

        svg.selectAll(".bar")
            .data(data)
            .join('rect')
            .attr("class", "bar")
            .style("transform", "scale(1,-1)")
            .attr("x", (_, index) => xScale(index))
            .attr("y", -dimensions.height)
            .attr("width", xScale.bandwidth())
            .on("mouseenter", (_, value) => {
                const index = data.indexOf(value);
                svg.selectAll(".tooltip")
                    .data([value])
                    .join(enter => enter.append("text").attr("y",yScale(value)-4))
                    .attr("class", "tooltip")
                    .attr("x", xScale(index)+xScale.bandwidth()/2)
                    .attr("text-anchor","middle")
                    .text(value)
                    .transition()
                    .attr("y", yScale(value)-8)
                    .attr("opacity", 1);
            })
            .on("mouseleave", () => {
                svg.selectAll(".tooltip")
                    .transition()
                    .attr("opacity", 0)
                    .remove();
            })
            .transition()
            .attr("fill", colorScale)
            .attr("height", (value) => 150 - yScale(value));
    }, [data,dimensions]);

    return (
        <React.Fragment>
           <div ref={wrapperRef} style={{marginBottom:"2rem"}}>
            <svg ref={ref} width={300} height={200}>
                <g className="x-axis" />
                <g className="y-axis" />
            </svg>
           </div>
            <br />
            <br />
            <button onClick={() => setData(data.map(item => item + 5))}>
                update data
            </button>
            <button onClick={() => setData(data.filter(item => item < 35))}>
                filter data
            </button>
            <button onClick={() => setData([...data, Math.round(Math.random() * 100)])}>
                Add data
            </button>

        </React.Fragment>
    );
};

export default AnimatedBarchart;
