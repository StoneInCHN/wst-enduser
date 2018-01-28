import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import api from './apis'

import './reset.css'


Vue.prototype.$api = api
//FastClick.attach(document.body)
Vue.config.productionTip = false


new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})