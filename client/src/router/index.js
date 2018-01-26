import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import Logout from '@/components/Logout'
import Homepage from '@/components/Homepage'
import Dashboard from '@/components/Dashboard'
import Board from '@/components/Board'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/',
      component: Homepage,
      props: true,
      children: [
        {
          path: 'home',
          name: 'Homepage',
          component: Dashboard
        },
        {
          path: 'board/:id',
          name: 'Board',
          props: true,
          component: Board
        }
      ]
    }
  ]
})
