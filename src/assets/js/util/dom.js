import _ from 'underscore'

/**
 * 判断'class'属性是否匹配
 *
 * @export
 * @param {*} el
 * @param {*} cls
 * @returns
 */
export function hasClass(el, cls) {
  if (!el || !cls) return false
  if (el.classList) return el.classList.contains(cls)
  else return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
}

/**
 * 定义图标类型名
 * @param icon
 * @returns {string|*}
 */
export function iconClassName(icon) {
  if (icon) {
    if (icon.indexOf('el-icon-') === 0) return icon
    else if (icon.indexOf('icon-') === 0) return `iconfont ${icon}`
    else return icon
  }
  return ''
}

/**
 * 模块高度自适应
 * @param content：需要设置的dom
 * @param element：需要知道高度的dom
 * @param cb
 */
export function templateHeight(content, element, cb) {
  getDomHeight()
  window.onresize = () => {
    getDomHeight()
  }
  function getDomHeight() {
    const height = formatTemplateHeight(element)
    content.style.height = height
    if (cb) cb(height)
  }
}

/**
 * 获取模块剩余高度
 * @param elements
 * @returns {string}
 */
export function formatTemplateHeight(elements) {
  let height = 0
  if (!(elements instanceof Array) && !elements.offsetHeight) return ''
  if (elements instanceof Array)
    _.each(elements, item => {
      try {
        height += parseInt(item.offsetHeight)
      } catch (e) {
        console.error(e)
      }
    })
  else height = parseInt(elements.offsetHeight)
  return `calc(100% - ${height}px - 20px)`
}
