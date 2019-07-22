<template>
  <div
    class="tw-layout"
    :class="{ 'tw-drag': footerOption.mousedown }"
    @mouseup="handleLayoutMouseup"
    @mousemove="handleLayoutMousemove"
  >
    <div
      class="tw-layout-header"
      v-if="$slots.header"
      :style="layoutHeaderHeigth"
    >
      <slot name="header"></slot>
    </div>
    <div class="tw-layout-left" v-if="$slots.left" :style="layoutLeftWidth">
      <slot name="left"></slot>
      <div class="tw-control-strip" v-if="leftStrip"></div>
    </div>
    <div class="tw-layout-body" v-if="$slots.default" :style="layoutBodyStyle">
      <slot></slot>
    </div>
    <div class="tw-layout-right" v-if="$slots.right" :style="layoutRightWidth">
      <slot name="right"></slot>
      <div class="tw-control-strip" v-if="rightStrip"></div>
    </div>
    <div
      class="tw-layout-footer"
      :class="{
        'tw-control': footerStrip,
        'tw-selected': footerOption.mousedown
      }"
      v-if="$slots.footer"
      :style="layoutFooterHeigth"
    >
      <slot name="footer"></slot>
      <div
        class="tw-control-strip"
        v-if="footerStrip"
        @mousedown="handleFooterStripMousedown"
      ></div>
    </div>
  </div>
</template>

<script>
import { hasNumber } from 'assets/js/util'
export default {
  name: 'TLayout',
  data() {
    return {
      layoutSize: {
        left: JSON.parse(this.left),
        right: JSON.parse(this.right),
        header: JSON.parse(this.header),
        footer: JSON.parse(this.footer)
      },
      footerOption: {
        mousedown: false,
        mousePoint: null,
        offset: 0
      }
    }
  },
  props: {
    header: {
      type: [String, Number],
      default: 50
    },
    left: {
      type: [String, Number],
      default: 300
    },
    leftStrip: {
      type: Boolean,
      default: false
    },
    right: {
      type: [String, Number],
      default: 300
    },
    rightStrip: {
      type: Boolean,
      default: false
    },
    footer: {
      type: [String, Number],
      default: 40
    },
    footerStrip: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // console.info('header:', this.header, this.layoutSize.header, this.leftStrip)
  },
  computed: {
    layoutLeftWidth() {
      const style = this.layoutLeftOfRightPanelHeight()
      const width = this.layoutPanelSize('left')
      if (this.$slots.left) style.width = width
      return style
    },
    layoutRightWidth() {
      const style = this.layoutLeftOfRightPanelHeight()
      const width = this.layoutPanelSize('right')
      if (this.$slots.right) style.width = width
      return style
    },
    layoutHeaderHeigth() {
      const style = {}
      const height = this.layoutPanelSize('header')
      if (this.$slots.header) style.height = height
      return style
    },
    layoutFooterHeigth() {
      const style = {}
      const height = this.layoutPanelSize('footer')
      const intFooter = this.styleValueToInt(height)
      const offset = this.footerOption.offset
      if (this.$slots.footer)
        style.height = offset !== 0 ? intFooter + offset + 'px' : height
      return style
    },
    layoutBodyStyle() {
      const style = this.layoutBodyWidth()
      return this.layoutBodyHeight(style)
    }
  },
  methods: {
    handleLayoutMousemove() {
      const { y } = event
      if (this.$slots.footer) {
        const { mousedown, mousePoint } = this.footerOption
        if (mousedown) {
          this.footerOption.offset = mousePoint - y
        }
      }
    },
    handleLayoutMouseup() {
      if (this.$slots.footer) {
        if (this.footerOption.mousedown) {
          if (this.footerOption.offset !== 0) {
            const footer = this.layoutPanelSize('footer')
            const intFooter = this.styleValueToInt(footer)
            this.layoutSize.footer = intFooter + this.footerOption.offset + 'px'
          }
          this.footerOption.offset = 0
          this.footerOption.mousedown = false
          this.footerOption.mousePoint = null
        }
      }
    },
    handleFooterStripMousedown() {
      this.footerOption.mousedown = true
      this.footerOption.mousePoint = event.y
    },
    layoutPanelSize(type) {
      if (hasNumber(this.layoutSize[type])) return this.layoutSize[type] + 'px'
      return this.layoutSize[type]
    },
    layoutLeftOfRightPanelHeight(style = {}) {
      const header = this.layoutPanelSize('header')
      const footer = this.layoutPanelSize('footer')
      const intFooter = this.styleValueToInt(footer)
      const offset = this.footerOption.offset
      const footerStrip = offset !== 0 ? intFooter + offset + 'px' : footer
      if (this.$slots.header && this.$slots.footer)
        style.height = `calc(100% - (${(style.top = header)} + ${footerStrip}))`
      else if (this.$slots.header)
        style.height = `calc(100% - ${(style.top = header)})`
      else if (this.$slots.footer) style.height = `calc(100% - ${footerStrip})`
      return style
    },
    layoutBodyWidth(style = {}) {
      const left = this.layoutPanelSize('left')
      const right = this.layoutPanelSize('right')
      const intLeft = this.styleValueToInt(left)
      const intRight = this.styleValueToInt(right)
      if (this.$slots.left && this.$slots.right) {
        if (intLeft > 0) style.marginLeft = left
        if (intRight > 0) style.marginRight = right
        if (intLeft > 0 || intRight > 0)
          style.width = `calc(100% - (${left} + ${right}))`
      } else if (this.$slots.left && intLeft > 0) {
        style.marginLeft = left
        style.width = `calc(100% - ${left})`
      } else if (this.$slots.right && intRight > 0) {
        style.marginRight = right
        style.width = `calc(100% - ${right})`
      }
      return style
    },
    layoutBodyHeight(style = {}) {
      const header = this.layoutPanelSize('header')
      const footer = this.layoutPanelSize('footer')
      const intHeader = this.styleValueToInt(header)
      const intFooter = this.styleValueToInt(footer)
      const offset = this.footerOption.offset
      const footerStrip = offset !== 0 ? intFooter + offset + 'px' : footer
      const flag = intHeader > 0 || intFooter > 0
      if (this.$slots.header && this.$slots.footer && flag) {
        style.height = `calc(100% - (${header} + ${footerStrip}))`
      } else if (this.$slots.header && intHeader > 0)
        style.height = `calc(100% - ${header})`
      else if (this.$slots.footer && intFooter > 0)
        style.height = `calc(100% - ${footerStrip})`
      return style
    },
    regStyleValue(value) {
      const regString = /^[0-9]+px$/
      const regNumber = /^[0-9]+$/
      if (regNumber.test(value)) return `${value}px`
      if (regString.test(value)) return value
      return ''
    },
    styleValueToInt(value) {
      return parseInt(value && value.match(/^[0-9]+/)[0])
    },
    getStyleValueUnit(value) {
      return value && value.match(/px|em|rem|%$/)[0]
    },
    cloneData(data) {
      return JSON.parse(JSON.stringify(data))
    }
  },
  watch: {
    left(value) {
      this.layoutSize.left = JSON.parse(value)
    },
    right(value) {
      this.layoutSize.right = JSON.parse(value)
    },
    header(value) {
      this.layoutSize.header = JSON.parse(value)
    },
    footer(value) {
      this.layoutSize.footer = JSON.parse(value)
    },
    'layoutSize.left'(value) {
      if (this.$listeners['update:left-widht'])
        this.$emit('update:left-width', value)
    },
    'layoutSize.right'(value) {
      if (this.$listeners['update:right-widht'])
        this.$emit('update:right-width', value)
    },
    'layoutSize.header'(value) {
      if (this.$listeners['update:header-widht'])
        this.$emit('update:header-width', value)
    },
    'layoutSize.footer'(value) {
      if (this.$listeners['update:footer-widht'])
        this.$emit('update:footer-width', value)
    }
  }
}
</script>