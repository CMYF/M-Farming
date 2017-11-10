import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/test'
import APPLogin from '@/views/app_login'
import Home from '@/views/_Index'
import MyCenter from '@/views/MyCenter'
import TaskList from '@/views/HomePage'
Vue.use(Router)
export default new Router({
  // base: '/html/appagriculture/',
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        Home: Home,
        Login: ''
      },

      children: [
        {
          path: '/home',
          name: 'Task',
          components: {
            VMMain: TaskList
          }
        },
        {
          path: '/mycenter',
          name: 'Center',
          components: {
            VMMain: MyCenter
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      components: {
        Login: APPLogin
      }
    },

  ]

})
