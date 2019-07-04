import Vue from 'vue'
import App from './App.vue'
import router from './router'
import PerfectScrollbar from 'vue2-perfect-scrollbar'
import 'vue2-perfect-scrollbar/dist/vue2-perfect-scrollbar.css'
import './plugins/element.js'
// import './plugins/scrollbar.js'

Vue.use(PerfectScrollbar)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
