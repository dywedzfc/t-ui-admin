<template>
  <div class="t-map-container">
    <div class="t-map"></div>
    <slot></slot>
  </div>
</template>

<script>
import AMap from 'AMap'
import registerMixin from '../mixins/register-component'
import { lazyAMapApiLoaderInstance } from '../services/amap-api-instance'
import { resetTimer } from 'util'

export default {
  name: 't-amap',
  mixins: [registerMixin],
  props: [
    'vid',
    'events',
    /**
     * 地图中心点坐标值
     */
    'center',
    /**
     * 地图显示的缩放级别
     * 若center与level未赋值，地图初始化默认显示用户所在城市 3D地图下，zoom值，可以设置为浮点数。
     */
    'zoom',
    'level',
    /**
     * 地图显示的缩放级别范围
     * 在PC上，默认为[3,18]，取值范围[3-18]；在移动设备上，默认为[3,19],取值范围[3-19]
     */
    'zooms',
    /**
     * 地图显示语言
     * 可选值：zh_cn：中文简体，en：英文，zh_en：中英文对照 默认为: zh_cn：中文简体
     */
    'lang',
    /**
     * 地图默认鼠标样式
     */
    'defaultCursor',
    /**
     * 地图显示的参考坐标系
     * 'EPSG3857'、'EPSG3395'、'EPSG4326'
     */
    'crs',
    /**
     * 地图平移过程中是否使用动画
     */
    'animateEnable',
    /**
     * 是否开启地图热点和标注的hover效果
     * PC端默认是true，移动端默认是false
     */
    'isHotspot',
    /**
     * 当前地图中默认显示的图层
     * 默认图层可以是TileLayer.Satellite等切片地图
     */
    'defaultLayer',
    /**
     * 地图是否可旋转
     * 3D视图默认为true，2D视图默认false
     */
    'rotateEnable',
    /**
     * 是否监控地图容器尺寸变化
     * 默认值为false
     */
    'resizeEnable',
    /**
     * 是否在有矢量底图的时候自动展示室内地图
     * PC端默认是true，移动端默认是false
     */
    'showIndoorMap',
    /**
     * 在展示矢量图的时候自动展示室内地图图层
     * 当地图complete之后可以获取到该对象
     */
    'indoorMap',
    /**
     * 是否支持可以扩展最大缩放级别,和zooms属性配合使用
     * 设置为true的时候，zooms的最大级别在PC上可以扩大到20级，移动端还是高清19/非高清20
     */
    'expandZoomRange',
    /**
     * 地图是否可通过鼠标拖拽平移
     * 默认为true
     * 此属性可被setStatus/getStatus 方法控制
     */
    'dragEnable',
    /**
     * 地图是否可缩放
     * 默认值为true
     * 此属性可被setStatus/getStatus 方法控制
     */
    'zoomEnable',
    /**
     * 地图是否可通过双击鼠标放大地图
     * 默认为true
     * 此属性可被setStatus/getStatus 方法控制
     */
    'doubleClickZoom',
    /**
     * 地图是否可通过键盘控制
     * 默认为true
     * 方向键控制地图平移，"+"和"-"可以控制地图的缩放，Ctrl+“→”顺时针旋转，Ctrl+“←”逆时针旋转
     * 此属性可被setStatus/getStatus 方法控制
     */
    'keyboardEnable',
    /**
     * 地图是否使用缓动效果
     * 默认值为true
     * 此属性可被setStatus/getStatus 方法控制
     */
    'jogEnable',
    /**
     * 地图是否可通过鼠标滚轮缩放浏览
     * 默认为true
     * 此属性可被setStatus/getStatus 方法控制
     */
    'scrollWheel',
    /**
     * 地图在移动终端上是否可通过多点触控缩放浏览地图
     * 默认为true
     * 关闭手势缩放地图，请设置为false
     */
    'touchZoom',
    /**
     * 可缺省，当touchZoomCenter=1的时候，手机端双指缩放的以地图中心为中心，否则默认以双指中间点为中心
     */
    'touchZoomCenter',
    /**
     * 设置地图的显示样式
     * 目前支持两种地图样式:
     *    1:自定义地图样式,如"amap://styles/d6bf8c1d69cea9f5c696185ad4ac4c86"
     *    2:官方样式模版,如"amap://styles/grey"
     * 开发指南：https://lbs.amap.com/api/javascript-api/guide/create-map/mapstye/
     */
    'mapStyle',
    /**
     * 设置地图上显示的元素种类
     * 支持'bg'（地图背景）、'point'（POI点）、'road'（道路）、'building'（建筑物）
     */
    'features',
    /**
     * 设置地图显示3D楼块效果，移动端也可使用。推荐使用。
     */
    'showBuildingBlock',
    /**
     * 地图显示模式
     * 默认为‘2D’，可选’3D’
     */
    'viewMode',
    /**
     * 俯仰角度
     * 默认0
     * [0,83]，2D地图下无效
     */
    'pitch',
    /**
     * 是否允许设置俯仰角度
     * 3D视图下为true，2D视图下无效
     * 当此属性为false时，地图以初始属性设置的pitch值为倾斜角度，同时setPitch和鼠标手势交互操作将不能改变倾斜角度
     */
    'pitchEnable',
    /**
     * 调整天空颜色，配合自定义地图
     * 3D视图有效，如‘#ff0000’
     */
    'skyColor',
    /**
     * 为 Map 实例指定掩模的路径
     * 各图层将只显示路径范围内图像，3D视图下有效
     */
    'mask',
    /**
     * 楼块出现和消失的时候是否显示动画过程，3D视图有效
     * PC端默认true，手机端默认false。
     */
    'buildingAnimation',
    'amapManager'
  ],
  beforeCreate() {
    this._loadPromise = lazyAMapApiLoaderInstance.load()
  },
  mounted() {
    this.createMap()
    resetTimer(this.$el.querySelector('.t-map'), ele => {
      if (ele.id) return
      this._loadPromise = lazyAMapApiLoaderInstance.load()
      this.createMap()
    })
  },
  methods: {
    createMap() {
      this._loadPromise.then(() => {
        let mapElement = this.$el.querySelector('.t-map')
        const elementID = this.vid
        mapElement.id = elementID
        resetTimer(elementID, this.initMap)
      })
    },
    initMap(elementID) {
      const props = this.convertProps()
      this.$amap = this.$amapComponent = new AMap.Map(elementID, props)
      if (this.amapManager) this.amapManager.setMap(this.$amap)
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
