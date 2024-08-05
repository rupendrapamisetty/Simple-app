import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { Button, Grid, SvgIcon } from "@mui/material";

const Barchart = () => {
  const [data, setData] = useState([25, 30, 45, 60, 20,70,30]);
  const ref = useRef();

  useEffect(() => {
    const svg = d3
      .select(ref.current);

    const xScale = d3.scaleLinear()
                    .domain([0,data.length-1])
                    .range([0,300]);

    const yScale = d3.scaleLinear()
                    .domain([0,150])
                    .range([150,0]);

    const xAxis = d3.axisBottom(xScale).ticks(data.length).tickFormat(index=>index+1);
    svg.select(".x-axis").style("transform","translateY(150px)").call(xAxis);

    const yAxis = d3.axisRight(yScale);
    svg.select(".y-axis").style("transform","translateX(300px)").call(yAxis);

    
    const myLine = d3.line()
                    .x((value,index)=>xScale(index))
                    .y(yScale)
                    .curve(d3.curveCardinal);
    //   .attr("width", 500)
    //   .attr("height", 500)
    //   .style("background", "#f0f0f0");

    // svg
    //   .selectAll("circle")
    //   .data(data)
    //   .join("circle"
    //     // enter => enter.append("circle").attr("class","new"),
    //     // update => update.attr("class","update"),
    //   ).attr("r",value=>value)
    //   .attr("cx",value=>value*2)
    //   .attr("cy",value=>value*2)
    //   .attr("stroke","red")
    svg.selectAll(".line")
        .data([data])
        .join("path")
        .attr("d",myLine)
        .attr("fill","none")
        .attr("stroke","blue");
  }, [data]);

  return(
    <React.Fragment>
        <svg ref={ref}>
            <g className="x-axis"/>
            <g className="y-axis"/>
        </svg>
        <br/>
        <br/>
        <button onClick={()=>setData(data.map(item=>item+5))}>
            update data
        </button>
        <button onClick={()=>setData(data.filter(item=>item<35))}>
            filter data
        </button>
    </React.Fragment>
  )


//   return (
//     <>
//     <Grid container spacing={3} sx={{display:"flex",justifyContent:"center"}}>
//       {/* <SvgIcon
//         component="svg"
//         ref={ref}
//         // sx={{display:"flex",justifyContent:"center",width:"20%",height:"100%"}}
//         // viewBox="0 0 20 50"
//       > */}
//       <svg ref={ref}></svg>
//         {/* </SvgIcon> */}
//     </Grid>
//     <Grid container spacing={3} sx={{display:"flex",justifyContent:"center",mt:2}}>
//     <Button variant="contained" onClick={()=>setData(data.map(item=>item+5))}>
//         update
//       </Button>
//       <Button variant="contained" onClick={()=>setData(data.filter(item=>item<20))}>
//         filter
//       </Button>
//     </Grid>
//     </>

//   );
};

export default Barchart;
