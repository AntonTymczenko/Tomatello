import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import Homepage from '@/components/Homepage'
import Dashboard from '@/components/Dashboard'
import Board from '@/components/Board'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/home',
      component: Homepage,
      props: true,
      children: [
        {
          path: '/',
          name: 'Homepage',
          props: true,
          component: Dashboard
        },
        {
          path: '/board/:id',
          name: 'Board',
          props: true,
          component: Board
        }
      ]
    }
  ]
})
