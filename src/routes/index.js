import { useRoutes } from "react-router-dom";
import PostContent from "../component/PostContent";
// import MainPage from "../component/MainPage";
import MainComponent from "../component/MainComponent";
import Barchart from "../component/Barchart";
import AnimatedBarchart from "../component/AnimatedBarchart";
import LinePlot from "../component/LinePlot";
import GuageChart from "../component/GuageChart";
import MovableLineplot from "../component/MovableLineplot";
import { useState } from "react";
import * as d3 from "d3";
import TabulatorComponent from "../component/TabulatorComponent";
import TabulatorExample from "../component/TabulatorExample";
import BreakingBad from "../component/BreakingBad";
import Donut from "../react-apex/Donut";
import RunVegaAPi from "../vega-components/VegaApi";
import ApexChart from "../vega-components/ApexChart";

export default function Routes() {
  const [data, setData] = useState(() => d3.ticks(-2, 2, 200).map(Math.sin));

function onMouseMove(event) {
  const [x, y] = d3.pointer(event);
  setData(data.slice(-200).concat(Math.atan2(x, y)));
}

  let routesArray = [
    {
      path: "/",
      element: <MainComponent/>,
    },
    {
      path: "/post-details",
      element: <PostContent />,
    },
    {
      path:"/d3-demo",
      element:<Barchart/>
    },
    {
      path:"/animated-bar",
      element:<AnimatedBarchart/>
    },
    {
      path:"/line-plot",
      element:<LinePlot/>
    },
    {
      path:"/guage-chart",
      element:<GuageChart/>
    },
    {
      path:"/movable-line-plot",
      element:<div onMouseMove={onMouseMove}>
      <MovableLineplot data={data}/>
      </div>
    },
    {
      path:"/tabulator",
      element:<TabulatorComponent/>
    },
    {
      path:"/tabulator-demo",
      element:<TabulatorExample/>
    },
    {
      path:"/breaking-bad",
      element:<BreakingBad/>
    },
    {
      path:"/apex-donut",
      element:<Donut/>
    },
    {
      path:"/react-vega-lite-api",
      element:<RunVegaAPi/>
    },
    {
      path:"/apex-bar-chart",
      element:<ApexChart/>
    }
  ];



  return useRoutes(routesArray);
}
