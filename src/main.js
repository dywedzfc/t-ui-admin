import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './plugins/scrollbar.js'
// import { initAMapApiLoader } from 'TAMap'
import TAMap from 't-amap'
import TUI from 't-ui'

Vue.use(TAMap)
Vue.use(TUI)

TAMap.initAMapApiLoader({
  key: 'd0face2397384365119fbf558c48c10a',
  plugin: [
    'Autocomplete',
    'PlaceSearch',
    'Scale',
    'OverView',
    'ToolBar',
    'MapType',
    'PolyEditor',
    'AMap.CircleEditor'
  ],
  v: '1.4.4'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
