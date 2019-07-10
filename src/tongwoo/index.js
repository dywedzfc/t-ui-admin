import Icon from './packages/icon'
import Tabs from './packages/tabs'

const components = [Icon, Tabs]

const install = function(Vue) {
  components.forEach(component => {
    Vue.component(component.name, component)
  })
}

export default {
  version: '1.0.0',
  install,
  ...components
}
