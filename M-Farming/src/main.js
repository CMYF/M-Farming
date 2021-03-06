// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'


Vue.use(VueAxios, axios);
Vue.use(MintUi);
FastClick.attach(document.body);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
