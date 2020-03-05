import _ from 'underscore'
import { data as menu } from './menu.config.json'
import { hasObject, clone } from 'util'

/**
 * 获取二、三级菜单列表
 *
 * @param {*} menu：菜单
 * @returns 返回子菜单
 */
function childrenList(menu) {
  return _.filter(menu, item => item.pid)
}

/**
 * 获取子菜单的某一个属性列表
 *
 * @param {*} menu：菜单
 * @param {*} attr：属性
 * @returns
 */
function childrenIndexs(menu, attr) {
  return _.pluck(menu, attr)
}

/**
 * 循环生成树形菜单
 *
 * @param {*} menu：需要循环的菜单
 * @param {*} children：子菜单 例[childrenList(menu)]
 * @param {*} superior：上级项
 * @returns
 */
function childrenCycleList(menu, children, superior) {
  return _.map(menu, item => {
    if (superior) item.path = `${superior.path}/${item.id}`
    const index = childrenIndexs(children, 'pid').indexOf(item.id)
    if (index !== -1) {
      const currentMenu = _.filter(children, _item => _item.pid === item.id)
      item.children = childrenCycleList(currentMenu, children, item)
    }
    if (item.value) item.path += item.value
    return item
  })
}

/**
 * 对应菜单项
 *
 * @param {*} root：主菜单项
 * @returns
 */
function resetMenuList(root) {
  if (!root.children) return []
  const menu = clone(root.children)
  return childrenCycleList(menu, childrenList(menu), root)
}

/* ******************** 生成菜单结构 ******************** */

/**
 * 生成菜单列表
 *
 * @export
 * @param {*} name：过滤主菜单
 * @returns
 */
export function getMenuList(name) {
  const menuRoot = _.filter(clone(menu), item => item.id === name)[0]
  if (!hasObject(menuRoot)) return []
  return _.filter(resetMenuList(menuRoot), item => !item.pid)
}

/* ******************** 生成 vue-router 结构 ******************** */

/**
 * 获取子菜单列表
 *
 * @param {*} menu：菜单
 * @returns
 */
function getChildrenList(menu) {
  const childrens = []
  _.each(menu, item => {
    item.children && childrens.push(...getChildrenItem(item.children))
  })
  return _.uniq(childrens)
}

/**
 * 树形菜单转成菜单列表
 *
 * @param {*} menu：菜单
 * @returns
 */
function getChildrenItem(menu) {
  const childrens = []
  _.each(menu, item => {
    if (item.children) childrens.push(...getChildrenItem(item.children))
    else childrens.push(item)
  })
  return childrens
}

/**
 * 过滤没有component属性
 *
 * @param {*} menu：菜单
 * @returns
 */
function filterRouterItem(menu) {
  return _.filter(menu, item => item.component)
}

/**
 * 合并菜单
 *
 * @param {*} menu:树形菜单
 * @param {*} uniqMenu：子菜单列表
 * @returns
 */
function mergeMenuItem(menu, uniqMenu) {
  return _.map(menu, item => {
    const menuItem = _.filter(uniqMenu, _item => {
      return _item.id === item.id && _item.name === item.name
    })
    return resetRouterItem(menuItem.length > 0 ? menuItem[0] : item)
  })
}

/**
 * 转成vue-router结构
 *
 * @param {*} item
 * @returns
 */
function resetRouterItem(item) {
  const data = {}
  data.path = item.path
  if (item.name) data.name = item.name
  if (item.meta) data.meta = item.meta
  if (item.redirect) data.redirect = item.redirect
  if (item.component) {
    // data.component = resolve => require([`../../${item.component}`], resolve)
    data.component = () => import(`../../${item.component}`)
  }
  return data
}

/**
 * 生成vue-router菜单
 *
 * @export
 * @returns
 */
export function getRouterList() {
  return _.map(clone(menu), item => {
    const menuList = resetMenuList(item)
    const childrenMenu = getChildrenList(menuList)
    item = resetRouterItem(item)
    item.children = filterRouterItem(mergeMenuItem(menuList, childrenMenu))
    return item
  })
}
