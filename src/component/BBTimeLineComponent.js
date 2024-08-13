import React,{useRef,useEffect} from 'react'
import * as d3 from 'd3';
import { useResizeObserver } from '../util';

const getDate = dateString => {
    const date = dateString.split("-");
    return new Date(date[2], date[0] - 1, date[1]);
  };
  

const BBTimeLineComponent = ({ data, highlight }) => {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimensions = useResizeObserver(wrapperRef);
  
    // will be called initially and on every data change
    useEffect(() => {
      const svg = d3.select(svgRef.current);
      if (!dimensions) return;
  
      const minDate = d3.min(data, episode => getDate(episode.air_date));
      const maxDate = d3.max(data, episode => getDate(episode.air_date));
  
      const xScale = d3.scaleTime()
        .domain([minDate, maxDate])
        .range([0, dimensions.width]);
  
      const yScale = d3.scaleLinear()
        .domain([d3.max(data, episode => episode.characters.length), 0])
        .range([0, dimensions.height]);
  
      svg
        .selectAll(".episode")
        .data(data)
        .join("line")
        .attr("class", "episode")
        .attr("stroke", episode =>
          episode.characters.includes(highlight) ? "blue" : "black"
        )
        .attr("x1", episode => xScale(getDate(episode.air_date)))
        .attr("y1", dimensions.height)
        .attr("x2", episode => xScale(getDate(episode.air_date)))
        .attr("y2", episode => yScale(episode.characters.length));
  
      const xAxis = d3.axisBottom(xScale);
      svg
        .select(".x-axis")
        .style("transform", `translateY(${dimensions.height}px)`)
        .call(xAxis);
  
      // draw the gauge
    }, [data, dimensions, highlight]);
  
    return (
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef}>
          <g className="x-axis" />
        </svg>
      </div>
    );
  }

export default BBTimeLineComponent
