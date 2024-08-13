import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = () => {
    const [options] = useState({
        chart: {
          id: "basic-bar"
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      });
    
      const [series] = useState([
        {
            // name:"Roopa",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]);
    
      return (
        <div className="app">
          <div className="row">
            <div className="mixed-chart">
              <ReactApexChart
                options={options}
                series={series}
                type="bar"
                width="500"
              />
            </div>
          </div>
        </div>
      );
    };

export default ApexChart
