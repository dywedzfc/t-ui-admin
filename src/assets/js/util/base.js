import { msgError } from 'util'

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

export function resetTimer(item, cb, time = 200) {
  if (!item) msgError('resetTimer：无数据')
  if (!cb) msgError('resetTimer：无函数')
  if (!hasFunction(cb)) msgError('resetTimer：cb函数不符合')
  setTimeout(() => cb(item), time)
}
