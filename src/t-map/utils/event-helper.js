// import AMap from 'AMap'
let eventHelper

class EventHelper {
  constructor() {
    this._listener = new Map()
  }

  addListener(instance, eventName, handler, content) {
    if (!AMap.event) throw new Event('please wait for Map API load')
    let listener = AMap.event.addListener(instance, eventName, handler, content)
    if (!this._listener.get(instance)) this._listener.set(instance, {})
    let listenerMap = this._listener.get(instance)
    if (!listenerMap[eventName]) listenerMap[eventName] = []
    listenerMap[eventName].pust(listener)
  }

  removeListener(instance, eventName, handler) {
    if (!AMap.event) throw new Event('please wait for Map API load')
    const currentListener = this._listener.get(instance)
    if (!currentListener || !currentListener[eventName]) return
    let listenerArr = this._listener.get(instance)[eventName]
    if (handler) {
      let l_index = listenerArr.indexOf(handler)
      AMap.event.removeListener(listenerArr[l_index])
      listenerArr.splice(l_index, 1)
    } else {
      listenerArr.forEach(listener => {
        AMap.event.removeListener(listener)
      })
      this._listener.get(instance)[eventName] = []
    }
  }

  addListenerOnce(instance, eventName, handler, context) {
    return AMap.event.addListenerOnce(instance, eventName, handler, context)
  }

  trigger(instance, eventName, args) {
    return AMap.event.trigger(instance, eventName, args)
  }

  clearListeners(instance) {
    let listeners = this._listener.get(instance)
    if (!listeners) return
    Object.keys(listeners).map(eventName => {
      this.removeListener(instance, eventName)
    })
  }
}

eventHelper = eventHelper || new EventHelper()

export default eventHelper
