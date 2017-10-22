import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/test'
import Login from '@/views/Login'
import Home from '@/views/HomePage'
import MyCenter from '@/views/MyCenter'

Vue.use(Router)

export default new Router({
  // base: '/html/appagriculture/',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/mycenter',
      name: 'Center',
      component: MyCenter
    }
  ]
})
