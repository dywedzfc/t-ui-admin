<!-- 地图点标记 -->
<script>
import Vue from 'vue'
import registerMixin from '../mixins/register-component'

const TAG = 't-amap-marker'

export default {
  name: TAG,
  mixins: [registerMixin],
  props: [
    'vid',
    /**
     * 点标记在地图上显示的位置
     * 默认为地图中心点
     */
    'position',
    /**
     * 设置点标记锚点
     * 默认值：'top-left'
     * 可选值：'top-left'|'top-center'|'top-right'|'middle-left'|'center'|'middle-right'|'bottom-left'|'bottom-center'|'bottom-right'
     */
    'anchor',
    /**
     * 点标记显示位置偏移量
     * 默认值为Pixel(-10,-34)
     * Marker指定position后，默认以marker左上角位置为基准点
     */
    'offset',
    /**
     * 需在点标记中显示的图标
     * 可以是一个本地图标地址，或者Icon对象。有合法的content内容时，此属性无效
     */
    'icon',
    /**
     * 点标记显示内容
     * 可以是HTML要素字符串或者HTML DOM对象。content有效时，icon属性将被覆盖
     */
    'content',
    /**
     * 鼠标点击时marker是否置顶
     * 默认false ，不置顶
     */
    'topWhenClick',
    /**
     * 是否将覆盖物的鼠标或touch等事件冒泡到地图上
     * 默认值：false
     */
    'bubble',
    /**
     * 设置点标记是否可拖拽移动
     * 默认为false
     */
    'draggable',
    /**
     * 设置拖拽点标记时是否开启点标记离开地图的效果
     * 默认为false
     */
    'raiseOnDrag',
    /**
     * 指定鼠标悬停时的鼠标样式
     * 自定义cursor，IE仅支持cur/ani/ico格式，Opera不支持自定义cursor
     */
    'cursor',
    /**
     * 点标记是否可见
     * 默认为true
     */
    'visible',
    /**
     * 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示
     * 默认zIndex：100
     */
    'zIndex',
    /**
     * 点标记的旋转角度
     * 广泛用于改变车辆行驶方向
     * 注：angle属性是使用CSS3来实现的，支持IE9及以上版本
     */
    'angle',
    /**
     * 是否自动旋转
     * 点标记在使用moveAlong动画时，路径方向若有变化，点标记是否自动调整角度
     * 默认为false
     * 广泛用于自动调节车辆行驶方向。
     * IE8以下不支持旋转，autoRotation属性无效
     */
    'autoRotation',
    /**
     * 点标记的动画效果
     * 默认值：“AMAP_ANIMATION_NONE”
     * 可选值：“AMAP_ANIMATION_NONE”，无动画效果; “AMAP_ANIMATION_DROP”，点标掉落效果; “AMAP_ANIMATION_BOUNCE”，点标弹跳效果
     */
    'animation',
    /**
     * 点标记阴影
     * 不设置该属性则点标记无阴影
     */
    'shadow',
    /**
     * 鼠标滑过点标记时的文字提示
     * 不设置则鼠标滑过点标无文字提示
     */
    'title',
    /**
     * 点标记是否可点击
     */
    'clickable',
    /**
     * 设置Marker的可点击区域
     * 在定义的区域内可触发Marker的鼠标点击事件
     */
    'shape',
    /**
     * 用户自定义属性
     * 支持JavaScript API任意数据类型，如Marker的id等
     */
    'extData',
    /**
     * 添加文本标注
     * content 为文本标注的内容
     * direction 为文本标注方位
     * 可选值：'top'|'right'|'bottom'|'left'|'center'
     * 默认值：'top', offset 为偏移量（默认基准点为图标左上角），如设置了 direction，以 direction 方位为基准点进行偏移。
     */
    'label'
  ],
  data() {
    return {
      $tagName: TAG,
      tmpVM: null,
      handlers: {
        zIndex(index) {
          this.setzIndex(index)
        },
        visible(flag) {
          flag === false ? this.hide() : this.show()
        }
      }
    }
  },
  created() {
    this.tmpVM = new Vue({
      data() {
        return { node: '' }
      },
      render(h) {
        const { node } = this
        return h('div', { ref: 'node' }, Array.isArray(node) ? node : [node])
      }
    }).$mount()
    console.info('map-marker:', this.tmpVM)
  },
  methods: {
    __initComponent(options) {
      if (this.$slots.default && this.$slots.default.length)
        options.content = this.tmpVM.$refs.node
      this.$amapComponent = new AMap.Marker(options)
    }
  },
  render() {
    const slots = this.$slots.default || []
    console.info('render:', slots)
    if (slots.length) this.tmpVM.node = slots
    return null
  },
  destroyed() {
    this.tmpVM.$destroy()
  }
}
</script>
