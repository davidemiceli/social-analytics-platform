'use strict';

// Actions
import actions from  '@/store/actions';

// Sockets
import socket from '@/libs/sockets/index';

class HighstocksBuilder {

  constructor() {
    this.options = {
      chart : {
        backgroundColor: null, //'rgba(255, 255, 255, 0.1)',
        style: {
            fontFamily: 'Ubuntu Mono'
        },
        zoomType: 'x',
        events: {
          load: function() { }
        },
        borderWidth: 0
      },
      legend: {
        enabled: true
      },
      credits: {
          enabled: false
      },
      scrollbar: { enabled: true },
      navigator : {
          enabled: true
          /*
          adaptToUpdatedData: true,
          baseSeries: 'mixed',
          series : {
              //data : data,
              type: 'line'
          }
          */
      },
      plotOptions: {
        series: {
            cursor: 'pointer',
            dataLabels: { enabled: false, style: {"fontSize": "8px"} },
            // states: { hover: { enabled: false } },
        }
      },
      rangeSelector: {
          buttons: [{
              count: 1,
              type: 'minute',
              text: '1M'
          }, {
              count: 5,
              type: 'minute',
              text: '5M'
          }, {
              type: 'all',
              text: 'All'
          }],
          inputEnabled: false,
          selected: 0
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      lang: {
        noData: "No data to show"
      },
      noData: {
          style: {
              fontWeight: 'bold',
              fontSize: '15px',
              color: '#303030'
          }
      },
      /*
      xAxis : {
        ordinal: false,
        type: 'datetime'
      },
      yAxis : {
        min: 0
      },
      */
      exporting: {
        sourceWidth: 1200,
        sourceHeight: 500,
        // scale: 2 (default)
      },
      series: []
    };
  }

  select(chartype, chartinfo) {

    if (chartype === 'single') {
      // this.options.plotOptions.series.point.events.click = function() {};
      this.options.plotOptions.series.dataLabels.enabled = true;
      this.options.plotOptions.series.states = {hover: { enabled: false }};
    }

  }

  render(DOMid) {
    Highcharts.setOptions({ // This is for all plots, change Date axis to local timezone
      global : {
        useUTC : true
      },
      /*
      colors: [
        '#4083b9',
        '#5a5209','#ffb901','#d13e1c','#a0124a','#e591b2','#46c9dd',
        '#769434','#b2b1b1','#4b4a63','#e7b19d',
        '#c7df4a','#909ba7','#99c0b8'
      ]
      */
    });
    // const dashStyles = ['Solid','ShortDash','ShortDot','ShortDashDot','ShortDashDotDot','Dot','Dash','LongDash','DashDot','LongDashDot','LongDashDotDot'];
    for (var oi=0; oi<this.options.series.length; oi++) {
      this.options.series[oi].marker = {
        symbol: "circle",
        lineColor: null,
        // lineWidth: 2
      };
      // this.options.series[oi].color = '#000'
      // this.options.series[oi].dashStyle = dashStyles[Math.floor(Math.random()*dashStyles.length)];
    }
    return new Highcharts.StockChart(DOMid, this.options);
  }

};

export default HighstocksBuilder;
