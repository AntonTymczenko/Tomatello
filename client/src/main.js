// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost:8081'
}
axios.defaults.headers.get['Accept'] = 'application/json'
axios.defaults.headers.put['Content-Type'] = 'application/json'

Vue.config.productionTip = false
Vue.use(Vuetify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
