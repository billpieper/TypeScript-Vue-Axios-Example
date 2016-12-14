import * as Vue from 'vue'
import App from './App'

import './styles/style.scss'

import store from './store'

import * as axios from 'axios'
import * as VueAxios from 'vue-axios'
 
Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})