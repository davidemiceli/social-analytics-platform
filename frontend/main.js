'use strict';

// Requirements
import Vue from 'vue';
import App from '@/components/App';
import router from '@/router';
import filters from '@/filters/filters';

Vue.config.productionTip = false;

// App
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
