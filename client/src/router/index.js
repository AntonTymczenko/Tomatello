import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/components/Auth'
import Homepage from '@/components/Homepage'

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
      name: 'Homepage',
      component: Homepage,
      props: true
    }
  ]
})
