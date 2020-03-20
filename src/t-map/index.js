import { upperCamelCase } from 'util'

// 初始化接口
import { initAMapApiLoader } from './services/amap-api-instance'

let components = []
let VueAMap = {}

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

export { initAMapApiLoader }
export { lazyAMapApiLoaderInstance } from './services/amap-api-instance'
