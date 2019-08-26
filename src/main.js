import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import apis from './apis/index'

//require("./mock")
//import 'vant/lib/vant-css/icon-local.css';
import './reset.css'

Vue.prototype.$apis = apis

FastClick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')