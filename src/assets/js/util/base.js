const _toString = Object.prototype.toString

export function hasObject(value) {
  return _toString.call(value) === '[object Object]'
}

export function hasFunction(value) {
  return _toString.call(value) === '[object Function]'
}

export function hasArray(value) {
  return _toString.call(value) === '[object Array]'
}

export function hasString(value) {
  return _toString.call(value) === '[object String]'
}

export function hasNumber(value) {
  return _toString.call(value) === '[object Number]'
}

export function hasBoolean(value) {
  return _toString.call(value) === '[object Boolean]'
}

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
