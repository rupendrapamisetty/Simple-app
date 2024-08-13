import React, { useState } from 'react';
import Chart from 'react-apexcharts';

const Donut = () => {
  const [options] = useState({});
  const [series] = useState([44, 55, 41, 17, 15]);
//   const [labels] = useState(['A', 'B', 'C', 'D', 'E']);

  return (
    <div className="donut">
      <Chart options={options} series={series} type="donut" width="380" />
    </div>
  );
};

export default Donut;
