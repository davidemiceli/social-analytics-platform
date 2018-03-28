'use strict';

class HighchartsBuilder {

  constructor() {
    this.options = {
      chart: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          style: {
              fontFamily: 'Ubuntu Mono', // 'roboto', //'PT Sans'
          },
          events: {
              load: function() {
                  //this.renderer.image('/immagine.png', 280, 180, 384, 89).add();
              }
          },
          borderWidth: 0,
          plotBorderWidth: 0,
      },
      legend: {
          enabled: true
      },
      credits: {
          enabled: false,
          href: 'http://www.website.it',
          text: 'Site.it',
          position: {y: 0}
      },
      title: {
          text: ''
      },
      subtitle: {
          text: ''
      },
      xAxis: {
          categories: [],
          crosshair: true,
          title: { text: null },
          labels: {
            style: {
                fontWeight: 'bold'
            }
          }
      },
      yAxis: {
          // min: 0,
          title: { text: null },
          labels: {
            style: {
                fontWeight: 'bold'
            }
          }
      },
      plotOptions: {
          dataLabels: { enabled: true },
          series: {
              cursor: 'pointer',
              dataLabels: { enabled: true, style: {"fontSize": "9px"} },
              point: {
                  events: {
                      click: function() {}
                  }
              }
          }
      },
      exporting: {
          sourceWidth: 1200,
          sourceHeight: 500,
          // scale: 2 (default)
      },
      series: []
    };
  }

  select(chartype, chartinfo) {

    if (chartype === 'time_heatmap') {
      // http://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/heatmap
      this.options.chart.type = 'heatmap';
      this.options.colorAxis = {min: 0, minColor: '#f9f9f9', maxColor: '#337ab7'};
      this.options.tooltip = {
        formatter: function () {
            return '<b>' + this.series.yAxis.categories[this.point.y] + ' at ' + this.series.xAxis.categories[this.point.x] + ':00</b>: <b>' + this.point.value + ' ' + this.point.series.name + '</b>';
        }
      };
      // Hours
      this.options.xAxis.categories = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
      this.options.yAxis.categories = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      this.options.plotOptions.series.point.events.click = function() {};
    } else if (chartype === 'heatmap') {
      // http://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/demo/heatmap
      this.options.chart.type = 'heatmap';
      this.options.colorAxis = {min: 0, minColor: '#FFFFFF', maxColor: '#4CAF50'};
      this.options.tooltip = {
        formatter: function () {
            /*
            return '<b>' + this.series.yAxis.categories[this.point.y] + '</b>: <b>' + this.point.value + '</b> '
            + chartinfo.text.toLowerCase() + ' on <b>' + this.series.xAxis.categories[this.point.x] + '</b>';
            */
        }
      };
      this.options.plotOptions.series.point.events.click = function() {};
    } else if (chartype === 'column') {
      this.options.chart.type = 'column';
      this.options.chart.style.fontFamily = 'PT Sans';
      this.options.xAxis.categories = [];
    }
    // Common options
    this.options.title.text = chartinfo.title || '';

  }

  render(DOMid) {
    Highcharts.setOptions({ // This is for all plots, change Date axis to local timezone
      global : {
        useUTC : true
      }
    });
    return new Highcharts.chart(DOMid, this.options);
  }

};

export default HighchartsBuilder;
