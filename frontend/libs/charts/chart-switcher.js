'use strict';

// Requirements
import ChartWrappers from '@/libs/charts/charts-wrappers';

// Generate chart based on its typology
const ChartSwitcher = function(chart_type, DOMid, dataset, fields) {
  switch(chart_type) {
    case 'timeseries': {
      const timefield = fields.timefield;
      const measures = fields.measures;
      return ChartWrappers.render_time_series(DOMid, dataset, timefield, measures);
    }
    case 'ranking': {
      const dimensions = fields.dimensions;
      const measures = fields.measures;
      return ChartWrappers.render_rankings(DOMid, dataset, dimensions, measures);
    }
    case 'time_heatmap': {
      const timefield = fields.timefield;
      const measure = fields.measure;
      return ChartWrappers.render_time_heatmaps(DOMid, dataset, timefield, measure);
    }
    case 'heatmap': {
      const xfield = fields.x;
      const yfield = fields.y;
      const measure = fields.measure;
      return ChartWrappers.render_heatmaps(DOMid, dataset, xfield, yfield, measure);
    }
    default: {
      toastr.error('Invalid chart type...');
      return null;
    }
  }
}

export default ChartSwitcher;
