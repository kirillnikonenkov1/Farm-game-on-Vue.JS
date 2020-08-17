import Vue from 'vue';
import Vuex from 'vuex';
import './assets/scss/main.scss';

Vue.component('v-page', require('./pages/index.vue').default);
Vue.use(Vuex);

import farmStore from './store/index.js';
const store = new Vuex.Store({
  modules: {
    farmStore,
  }
});

new Vue({
  store,
  el: '#app',
});

export const eventBus = new Vue();
