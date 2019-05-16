import Vue from 'vue';
import Vuex from 'vuex';
import App from './components/App.vue';

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {

  },
  mutations: {

  },
})

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
