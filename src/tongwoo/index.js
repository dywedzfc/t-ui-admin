import Icon from './packages/icon'
import Menu from './packages/menu'
import MenuGroup from './packages/menu-group'
import MenuItem from './packages/menu-item'
import Tabs from './packages/tabs'
import Panel from './packages/panel'
import Group from './packages/group'

const components = [Icon, Menu, MenuGroup, MenuItem, Tabs, Panel, Group]

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
