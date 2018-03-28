<template>
  <div>
    <!-- Charts components -->
    <Chart v-if="chart.exists" v-bind:chart="chart" style="min-height: 660px;" />
    <div v-if="!chart.exists" class="text-center">
      <!-- img src="https://www.shareicon.net/download/2017/06/01/886657_chart_512x512.png" style="margin-top: 30px; height: 512px;" -->
    </div>
  </div>
</template>

<script>
// Components
import Chart from '@/components/commons/charts/chart';

export default {
  name: 'ChartFrame',
  components: {
    'Chart': Chart
  },
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
  }
}
</script>
