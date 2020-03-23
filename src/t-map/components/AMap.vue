<template>
  <div class="t-map-container">
    <div class="t-map"></div>
    <slot></slot>
  </div>
</template>

<script>
import AMap from 'AMap'
import { lazyAMapApiLoaderInstance } from '../services/amap-api-instance'
export default {
  name: 't-amap',
  props: { vid: String },
  beforeCreate() {
    this._loadPromise = lazyAMapApiLoaderInstance.load()
  },
  mounted() {
    this.createMap()
  },
  methods: {
    createMap() {
      console.info('loadPromise:', this._loadPromise, this.vid)
      this._loadPromise.then(() => {
        let mapElement = this.$el.querySelector('.t-map')
        const elementID = this.vid
        mapElement.id = elementID
        this.$amap = this.$amapComponent = new AMap.Map(elementID, {})
        // this.convertProps()
        if (this.amapManager) this.amapManager.setMap(this.$amap)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.t-map-container {
  height: 100%;

  .t-map {
    height: 100%;
  }
}
</style>
