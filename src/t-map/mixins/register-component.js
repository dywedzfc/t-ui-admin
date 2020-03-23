import { upperCamelCase } from 'util'
import { lazyAMapApiLoaderInstance } from '../services/amap-api-instance'
import CONSTANTS from '../utils/constant'
import VueAMap from '../'
import eventHelper from '../utils/event-helper'

export default {
  data() {
    return {
      unwatchFns: []
    }
  },
  mounted() {
    if (lazyAMapApiLoaderInstance)
      lazyAMapApiLoaderInstance.load().then(() => {
        this.__contextReady &&
          this.__contextReady.call(this, this.convertProps())
      })
    this.$amap = this.$amap || this.$parent.$amap
    if (this.$amap) this.register()
    else
      this.$on(CONSTANTS.AMAP_READY_EVENT, map => {
        this.$amap = map
        this.register()
      })
  },
  destroyed() {
    this.unregisterEvents()
    if (!this.$amapComponent) return

    this.$amapComponent.setMap && this.$amapComponent.setMap(null)
    this.$amapComponent.close && this.$amapComponent.close()
    this.$amapComponent.editor && this.$amapComponent.editor.close()
    this.unwatchFns.forEach(item => item())
    this.unwatchFns = []
  },
  methods: {
    getHandlerHun(prop) {
      if (this.handlers && this.handlers[prop]) return this.handlers[prop]
      return (
        this.$amapComponent[`set${upperCamelCase(prop)}`] ||
        this.$amapComponent.setOptions
      )
    },
    convertProps() {
      const props = {}
      if (this.$amap) props.map = this.$amap
      const {
        $options: { propsData = {} },
        propsRedirect
      } = this
      return Object.keys(propsData).reduce((res, _key) => {
        let key = _key
        let propsValue = this.convertSignalProp(key, propsData[key])
        if (propsValue === undefined) return res
        if (propsRedirect && propsRedirect[_key]) key = propsRedirect[key]
        props[key] = propsValue
        return res
      }, props)
    },
    convertSignalProp(key, sourceData) {
      let converter = ''
      let type = ''
      if (this.amapTagName) {
        try {
          const name = upperCamelCase(this.amapTagName).replace(/^El/, '')
          const componentConfig = VueAMap[name] || ''
          type = componentConfig.props[key].$type
          // converter = commonConvertMap[type]
        } catch (e) {
          console.error(e)
        }
      }
      if (type && converter) return converter(sourceData)
      else if (this.converters && this.converters[key])
        return this.converters[key].call(this, sourceData)
      else {
        // const convertFn = commonConvertMap[key]
        // if (convertFn) return convertFn(sourceData)
        return sourceData
      }
    },
    registerEvents() {
      this.setEditorEvents && this.setEditorEvents()
      if (!this.$options.propsData) return
      if (this.$options.propsData.events) {
        for (let eventName in this.events) {
          eventHelper.addListener(
            this.$amapComponent,
            eventName,
            this.events[eventName]
          )
        }
      }
      if (this.$options.propsData.onceEvents) {
        for (let eventName in this.onceEvents) {
          eventHelper.addListenerOnce(
            this.$amapComponent,
            eventName,
            this.onceEvents[eventName]
          )
        }
      }
    },
    unregisterEvents() {
      eventHelper.clearListeners(this.$amapComponent)
    },
    setPropWatchers() {
      const {
        propsRedirect,
        $options: { propsData = {} }
      } = this

      Object.keys(propsData).forEach(prop => {
        let handleProp = prop
        if (propsRedirect && propsRedirect[prop])
          handleProp = propsRedirect[prop]
        let handleFun = this.getHandlerFun(handleProp)
        if (!handleFun && prop !== 'events') return

        const unwatch = this.$watch(prop, nv => {
          if (prop === 'events') {
            this.unregisterEvents()
            this.registerEvents()
            return
          }
          if (handleFun && handleFun === this.$amapComponent.setOptions)
            return handleFun.call(this.$amapComponent, {
              [handleProp]: this.convertSignalProp(prop, nv)
            })
          handleFun.call(this.$amapComponent, this.convertSignalProp(prop, nv))
        })
        this.unwatchFns.push(unwatch)
      })
    },
    registerToManager() {
      let manager = this.amapManager || this.$parent.amapManager
      if (manager && this.vid !== undefined)
        manager.setComponent(this.vid, this.$amapComponent)
    },
    initProps() {
      const props = ['editable', 'visible']
      props.forEach(propStr => {
        if (this[propStr] !== undefined) {
          const handleFun = this.getHandlerHun(propStr)
          handleFun &&
            handleFun.call(
              this.$amapComponent,
              this.convertSignalProp(propStr, this[propStr])
            )
        }
      })
    }
  }
}
