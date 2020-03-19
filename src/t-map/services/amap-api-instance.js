let lazyAMapApiLoaderInstance = null
import AMapAPILoader from './amap-api-loader'
import Vue from 'vue'

export const initAMapApiLoader = config => {
  if (Vue.prototype.$isServer) return
  if (lazyAMapApiLoaderInstance) return
  if (!lazyAMapApiLoaderInstance)
    lazyAMapApiLoaderInstance = new AMapAPILoader(config)
  lazyAMapApiLoaderInstance.load()
}

export { lazyAMapApiLoaderInstance }
