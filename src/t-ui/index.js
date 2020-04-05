import Layout from './packages/layout'
import GridLayout from './packages/grid-layout'
import Icon from './packages/icon'
import Menu from './packages/menu'
import MenuGroup from './packages/menu-group'
import MenuItem from './packages/menu-item'
import MenuList from './packages/menu-list'
import YearPicker from './packages/year-picker'
import TablePage from './packages/table-page'
import Tabs from './packages/tabs'
import Panel from './packages/panel'
import CardQuery from './packages/card-query'
import QueryPanel from './packages/query-panel'
import QueryBar from './packages/query-bar'
import DragPicture from './packages/drag-picture'
import Dialog from './packages/dialog'
import Group from './packages/group'
import Drawer from './packages/drawer'

const components = [
  Layout,
  GridLayout,
  Icon,
  Menu,
  MenuGroup,
  MenuItem,
  MenuList,
  YearPicker,
  TablePage,
  Tabs,
  Panel,
  CardQuery,
  QueryPanel,
  QueryBar,
  DragPicture,
  Dialog,
  Group,
  Drawer,
]

const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component)
  })
}

export default {
  version: '1.0.6',
  install,
  ...components,
}
