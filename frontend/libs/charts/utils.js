'use strict';

// Utilities
class ChartUtilities {

  constructor() { }

  // Process an object time based dataset like an array dataset for data visualization
  manipulateAsDayHour(dataset) {
    const numtoweeks = {'00': 0, '01': 1, '02': 2, '03': 3, '04': 4, '05': 5, '06': 6, '07': 7, '08': 8, '09': 9};
    const timing = {};
    for (let j = 0; j < 7; j++) {
      for (let i = 0; i < 24; i++) {
        const iadd = (i < 10) ? '0'+i : String(i);
        timing[j+'-'+iadd] = 0;
      }
    }

    for (var di=0; di<dataset.length; di++) {
      const iadd = (dataset[di].datehour < 10) ? '0'+dataset[di].datehour : String(dataset[di].datehour);
      timing[dataset[di].dayofweek+'-'+iadd] = Number(dataset[di].num);
    }

    const thetiming = Object.keys(timing).map(function(key) { return { key: key, value: this[key] }; }, timing);
    thetiming.sort(function(a, b) {
      if (a.key < b.key) return -1;
      else if (a.key > b.key) return 1;
      else return 0;
    });

    const lastiming = thetiming.map(function(obj) {
      const objkey = obj.key.split('-');
      const dayofweek = Number(objkey[0]);
      const datehour = String(objkey[1]);
      const thedatehour = (numtoweeks[datehour]) ? Number(numtoweeks[datehour]) : String(datehour);
      return [Number(thedatehour), Number(dayofweek), Number(obj.value)];
    }, timing);

    return lastiming;
  }
};

export default new ChartUtilities();
