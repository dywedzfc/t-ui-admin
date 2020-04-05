import { lazyAMapApiLoaderInstance } from '../services/amap-api-instance'
import { commonConvertMap } from '../utils/convert-helper'
import { upperCamelCase } from 'util'
// import CONSTANTS from '../utils/constant'
import VueAMap from '../'
// import eventHelper from '../utils/event-helper'

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
    // else
    //   this.$on(CONSTANTS.AMAP_READY_EVENT, map => {
    //     this.$amap = map
    //     this.register()
    //   })
  },
  destroyed() {
    // this.unregisterEvents()
    if (!this.$amapComponent) return

    this.$amapComponent.setMap && this.$amapComponent.setMap(null)
    this.$amapComponent.close && this.$amapComponent.close()
    this.$amapComponent.editor && this.$amapComponent.editor.close()
    this.unwatchFns.forEach(item => item())
    this.unwatchFns = []
  },
  methods: {
    getHandlerFun(prop) {
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
          const name = upperCamelCase(this.amapTagName)
          const componentConfig = VueAMap[name] || ''
          type = componentConfig.props[key].$type
          converter = commonConvertMap[type]
        } catch (e) {
          console.error(e)
        }
      }
      if (type && converter) return converter(sourceData)
      else if (this.converters && this.converters[key])
        return this.converters[key].call(this, sourceData)
      else {
        const convertFn = commonConvertMap[key]
        if (convertFn) return convertFn(sourceData)
        return sourceData
      }
    },
    registerEvents() {},
    setPropWatchers() {},
    registerToManager() {},
    initProps() {
      const props = ['editable', 'visible']

      props.forEach(propStr => {
        if (this[propStr] !== undefined) {
          const handleFun = this.getHandlerFun(propStr)
          if (handleFun) {
            const _this = this.$amapComponent
            handleFun(_this, this.convertSignalProp(propStr, this[propStr]))
          }
        }
      })
    },
    register() {
      const props = this.convertProps()
      const res = this.__initComponent && this.__initComponent(props)
      console.info('register:', res && res.then)
      if (res && res.then) res.then(instance => this.registerRest(instance))
      else this.registerRest(res)
    },
    registerRest(instance) {
      if (!this.$amapComponent && instance) this.$amapComponent = instance
    }
  }
}
