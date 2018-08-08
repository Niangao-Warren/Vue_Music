import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import './common/stylus/index.styl'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
  loading: require('common/image/default.png')
})

Vue.use(MintUI)
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router
})
