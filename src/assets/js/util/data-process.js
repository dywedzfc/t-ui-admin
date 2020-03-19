import _ from 'underscore'
import { hasArray } from 'util'

/**
 * 克隆数据
 *
 * @export
 * @param {*} data：数据
 * @returns
 */
export function clone(data) {
  return JSON.parse(JSON.stringify(data))
}

/**
 * 冻结数据
 *
 * @export
 * @param {*} data
 * @returns
 */
export function freezeData(data) {
  return Object.freeze(Object.assign([], data))
}

/**
 * 数据长度限制
 *
 * @export
 * @param {*} data
 * @param {number} [length=5]
 * @returns
 */
export function listLengthLimit(data, length = 5) {
  let list = []
  if (hasArray(data)) list = data
  if (list.length > length) list.length = length
  return list
}

/**
 * 前端分页
 *
 * @export
 * @param {*} {
 *   data = [],
 *   pageSize = 10,
 *   currentPage = 1
 * }
 * @returns
 */
export function filterFrontEndPage({
  data = [],
  pageSize = 10,
  currentPage = 1
} = {}) {
  const currentPageIndex = currentPage - 1
  const startPageItem = currentPageIndex * pageSize
  const endPageItem = currentPage * pageSize
  return _.filter(data, (item, index) => {
    return startPageItem <= index && endPageItem > index
  })
}
