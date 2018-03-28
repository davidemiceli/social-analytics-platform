<template>
  <div></div>
</template>

<script>
// https://github.com/webpack/docs/wiki/shimming-modules#plugin-provideplugin => esempio per toastr e jQuery
// https://stackoverflow.com/questions/38777136/highcharts-in-vue-js-component

// Highstocks chart builder
import HighstocksBuilder from '@/libs/charts/highstocks-builder';

export default {
  name: 'Chart',
  props: {
    chart: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {
      target: undefined
    }
  },
  mounted: function() {
    const chart = this.chart;
    if (!chart.exists) return;
    this.target = ChartSwitcher(chart.type, this.$el, chart.data, chart.fields);
  },
  beforeDestroy: function() {
    if (this.target) {
      if (typeof(this.target.destroy) === 'function') {
        this.target.destroy();
      } else {
        this.target = undefined;
      }
    }
  },
}
</script>
