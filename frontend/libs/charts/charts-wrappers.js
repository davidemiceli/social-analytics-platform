'use strict';

// Requirements
import ChartUtilities from '@/libs/charts/utils';
import HighchartsBuilder from '@/libs/charts/highcharts-builder';
import HighstocksBuilder from '@/libs/charts/highstocks-builder';

class ChartWrappers {

  constructor() { }

  // Render time series charts
  render_time_series(DOMid, dataset, timefield, measures) {
    dataset = dataset || [];
    const chartype = (measures.length > 1) ? 'multi' : 'single';
    const series_data = [];
    for (let di=0; di<measures.length; di++) {
      const one_measure = String(measures[di]);
      series_data.push({
        name: one_measure,
        type: (chartype == 'multi') ? 'line' : 'column',
        /* color: '#64788c', */
        tooltip: {valueDecimals: 0},
        data: []
      });
      for (let ri=0; ri<dataset.length; ri++) {
        series_data[di].data.push([
          new Date(dataset[ri][timefield]).getTime(),
          Number(dataset[ri][one_measure])
        ]);
      }
    }
    const highstocksBuilt = new HighstocksBuilder();
    highstocksBuilt.select(chartype, {title: ''});
    highstocksBuilt.options.series = series_data;
    return highstocksBuilt.render(DOMid);
  }

  // Render rankings (column charts)
  render_rankings(DOMid, dataset, dimensions, measures) {
    dataset = dataset || [];
    const series_data = [];
    const highchartsBuilt = new HighchartsBuilder();
    highchartsBuilt.select('column', {title: ''});
    for (let di=0; di<measures.length; di++) {
      const one_measure = String(measures[di]);
      const one_dimension = String(dimensions[di]);
      series_data.push({name: one_measure, data: []});
      for (let ri=0; ri<dataset.length; ri++) {
        highchartsBuilt.options.xAxis.categories.push(dataset[ri][one_dimension]);
        /*
        to_add = {
          y: Number(dataset[ri].num),
          color: '#3d6bac'
        };
        */
        const to_add = Number(dataset[ri][one_measure]);
        series_data[di].data.push(to_add);
      }
    }
    highchartsBuilt.options.series = series_data;
    return highchartsBuilt.render(DOMid);
  }

  // Render time heatmap
  render_time_heatmaps(DOMid, dataset, timefield, measure) {
    dataset = dataset || [];
    const series_data = [{
      name: measure,
      borderWidth: 0,
      data: [],
      dataLabels: {enabled: true}
    }];
    const highchartsBuilt = new HighchartsBuilder();
    highchartsBuilt.select('time_heatmap', {title: ''});
    dataset = dataset.map(function(obj) {
      const obj_datetime = moment(obj[timefield]);
      return {
        datehour: obj_datetime.hour(),
        dayofweek: obj_datetime.day(),
        num: Number(obj[measure])
      };
    });
    series_data[0].data = ChartUtilities.manipulateAsDayHour(dataset);
    highchartsBuilt.options.series = series_data;
    return highchartsBuilt.render(DOMid);
  }

  // Render heatmap
  render_heatmaps(DOMid, dataset, x, y, measure) {
    dataset = dataset || [];
    const series_data = [{
      name: measure,
      borderWidth: 0,
      data: [],
      dataLabels: {enabled: true}
    }];
    const highchartsBuilt = new HighchartsBuilder();
    highchartsBuilt.select('heatmap', {title: ''});
    const x_axis = {};
    const y_axis = {};
    for (let di=0; di<dataset.length; di++) {
      x_axis[dataset[di][x]] = true;
      y_axis[dataset[di][y]] = false;
      series_data[0].data.push([dataset[di][x], dataset[di][y], dataset[di][measure]]);
    }
    highchartsBuilt.options.xAxis.categories = Object.keys(x_axis);
    highchartsBuilt.options.yAxis.categories = Object.keys(y_axis);
    highchartsBuilt.options.series = series_data;
    return highchartsBuilt.render(DOMid);
  }
};

export default new ChartWrappers;
