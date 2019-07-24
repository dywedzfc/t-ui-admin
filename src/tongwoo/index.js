import Layout from './packages/layout'
import GridLayout from './packages/grid-layout'
import Icon from './packages/icon'
// import Menu from './packages/menu'
import MenuGroup from './packages/menu-group'
import MenuItem from './packages/menu-item'
import Tabs from './packages/tabs'
import Panel from './packages/panel'
import PanelQuery from './packages/panel-query'
import Group from './packages/group'

// const components = [Layout, GridLayout, Icon, Menu, MenuGroup, MenuItem, Tabs, Panel, PanelQuery, Group]
const components = [
  Layout,
  GridLayout,
  Icon,
  MenuGroup,
  MenuItem,
  Tabs,
  Panel,
  PanelQuery,
  Group
]

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
