import { upperCamelCase } from 'util'

// 初始化接口
import { initAMapApiLoader } from './services/amap-api-instance'

// 导入组件
import AMap from './components/AMap.vue'

import AMapManager from './managers/amap-manager'

let components = [AMap]
let VueAMap = {
  initAMapApiLoader,
  AMapManager
}

VueAMap.install = Vue => {
  if (VueAMap.installed) return
  components.map(component => {
    // 注册组件
    Vue.component(component.name, component)
    // VueAMap[component.name] = component
    // 组件缓存
    VueAMap[upperCamelCase(component.name).replace(/^El/, '')] = component
  })
}

// const install = function(Vue, opts = {}) {
const install = function(Vue) {
  if (install.installed) return
  VueAMap.install(Vue)
}

if (typeof window !== 'undefined' && window.Vue) install(window.Vue)

export default VueAMap

export { AMapManager, initAMapApiLoader }
export { lazyAMapApiLoaderInstance } from './services/amap-api-instance'
