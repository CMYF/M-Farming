// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App'
import router from './router'
import LocalStore from 'store'
import FastClick from 'fastclick'
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
import store from './store/index'


Vue.use(VueAxios, axios);
Vue.use(MintUi);
FastClick.attach(document.body);
Vue.config.productionTip = false;
axios.defaults.baseURL = BASE_URL;
axios.defaults.transformRequest = function (data) {
  let token = LocalStore.get('token');
  if (token) {
    data += '&loginedtoken=' + token;
  }
  return data;
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
