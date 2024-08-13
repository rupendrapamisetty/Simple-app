import * as vl from 'vega-lite-api'

const isOrigin = vl.selectPoint('isOrigin')
    .fields('origin')
    .bind('legend'); // bind to legend interactions
 

const isYear = vl.selectPoint('isYear')
    .fields('year').value(1970)
    .bind(vl.slider(1970, 1980, 1).name('year')); // bind to slider

    const show = vl.and(isOrigin, isYear); // combine selections
export const viz = vl
  .markCircle({
    // fill: true,
    // stroke: false,
    size: 100,
    opacity: 0.5,
  }).transform(
    vl.calculate('year(datum.year)').as('year')
  ).params(isOrigin,isYear)
  .encode(
    // vl.x().fieldQ('mpg').scale({ zero: false }),
    // vl.y().fieldQ('horsepower').scale({ zero: false }),
    // vl.color().fieldN('origin'),
    // vl.size().fieldQ('horsepower'),
    // vl.tooltip().fieldN('name'),
    vl.x().fieldQ('horsepower'),
    vl.y().fieldQ('mpg'),
    vl.color().if(show, vl.color().fieldN('origin')).value('grey'),
    vl.opacity().if(show, vl.value(1.0)).value(0.6)
  );