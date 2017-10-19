import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/test'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  // base: '/html/appagriculture/',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
