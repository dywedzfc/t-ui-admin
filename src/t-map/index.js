let components = []
let VueAMap = {}

VueAMap.install = Vue => {
  if (VueAMap.installed) return
  components.map(component => {
    Vue.component(component.name, component)
    VueAMap[component.name] = component
  })
}

// const install = function(Vue, opts = {}) {
const install = function(Vue) {
  if (install.installed) return
  VueAMap.install(Vue)
}

if (typeof window !== 'undefined' && window.Vue) install(window.Vue)

export default VueAMap
