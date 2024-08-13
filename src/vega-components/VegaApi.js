import React, { useEffect, useRef } from 'react';
import * as vega from 'vega';
import * as vegaLite from 'vega-lite';
import * as vl from 'vega-lite-api';
import { Handler } from 'vega-tooltip';
import { getData } from './getData';
import { viz } from './viz';
import { config } from './config';

vl.register(vega, vegaLite, {
  view: { renderer: 'svg' },
  init: view => { view.tooltip(new Handler().call); }
});

const RunVegaAPi = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const renderVega = async () => {
      const marks = viz
        .data(await getData())
        .width(window.innerWidth)
        .height(window.innerHeight)
        .autosize({ type: 'fit', contains: 'padding' })
        .config(config);

      const renderedView = await marks.render();
      
      // Clear any previous chart rendering
      if (chartRef.current) {
        chartRef.current.innerHTML = '';
        chartRef.current.appendChild(renderedView);
      }
    };

    renderVega();
  }, []); // Empty dependency array to run effect only once on mount

  // Render an empty div where the chart will be placed
  return <div ref={chartRef} />;
};

export default RunVegaAPi;
