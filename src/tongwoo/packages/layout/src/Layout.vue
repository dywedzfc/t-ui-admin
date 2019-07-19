<template>
  <div class="tw-layout">
    <div class="tw-layout-header" v-if="$slots.header" :style="headerStyle">
      <slot name="header"></slot>
    </div>
    <div class="tw-layout-left" v-if="$slots.left" :style="leftStyle">
      <slot name="left"></slot>
      <div class="tw-control-strip"></div>
    </div>
    <div class="tw-layout-body" v-if="$slots.default" :style="bodyStyle">
      <slot></slot>
    </div>
    <div class="tw-layout-right" v-if="$slots.right" :style="rightStyle">
      <slot name="right"></slot>
      <div class="tw-control-strip"></div>
    </div>
    <div class="tw-layout-bottom" v-if="$slots.bottom" :style="bottomStyle">
      <slot name="bottom"></slot>
      <div class="tw-control-strip"></div>
    </div>
  </div>
</template>

<script>
import _ from 'underscore'
import { hasObject, hasString } from 'assets/js/util'
export default {
  name: 'TLayout',
  data() {
    return {
      defaultSize: {
        header: '50px',
        left: '300px',
        right: '250px',
        bottom: '300px'
      }
    }
  },
  props: {
    size: {
      type: [String, Object]
    }
  },
  computed: {
    panelSize() {
      if (hasObject(this.size)) return this.objectPanelSize
      if (hasString(this.size)) return this.stringPanelSize
      return this.cloneData(this.defaultSize)
    },
    objectPanelSize() {
      const type = ['header', 'left', 'right', 'bottom']
      const everyPanelSize = this.cloneData(this.defaultSize)
      _.each(this.size, (value, name) => {
        if (type.indexOf(name) >= 0 && this.regStyleValue(value))
          everyPanelSize[name] = value
      })
      return everyPanelSize
    },
    stringPanelSize() {
      const size = this.size.split(' ')
      if (size.length >= 4)
        return this.resetPanelSize(size[0], size[1], size[2], size[3])
      else if (size.length === 3)
        return this.resetPanelSize(size[0], size[1], size[2])
      else if (size.length === 2) return this.resetPanelSize(size[0], size[1])
      else if (size.length === 1) return this.resetPanelSize(size[0])
      return this.cloneData(this.defaultSize)
    },
    headerStyle() {
      const style = {}
      if (this.$slots.header) style.height = this.panelSize.header
      console.info('header:', style)
      return style
    },
    leftStyle() {
      return this.leftOfRight('left')
    },
    rightStyle() {
      return this.leftOfRight('right')
    },
    bottomStyle() {
      const style = {}
      if (this.$slots.bottom) style.height = this.panelSize.bottom
      return style
    },
    bodyStyle() {
      const { header, left, right, bottom } = this.panelSize
      const style = {}
      let width = 0
      let height = 0
      if (this.$slots.header) height += this.styleValueToInt(header)
      if (this.$slots.bottom) height += this.styleValueToInt(bottom)
      if (this.$slots.left) {
        if (this.styleValueToInt(left) > 0) style.marginLeft = left
        width += this.styleValueToInt(left)
      }
      if (this.$slots.right) {
        if (this.styleValueToInt(right) > 0) style.marginRight = right
        width += this.styleValueToInt(right)
      }
      if (width >= 0) style.width = `calc(100% - ${width}px)`
      if (height >= 0) style.height = `calc(100% - ${height}px)`
      console.info('body:', style)
      return style
    }
  },
  methods: {
    regStyleValue(value) {
      const regValue = /^[0-9]+px|em|rem|%$/
      const regNumber = /^[0-9]+$/
      if (regNumber.test(value)) return `${value}px`
      if (regValue.test(value)) return value
      return ''
    },
    resetPanelSize(t, r, b, l) {
      const everyPanelSize = this.cloneData(this.defaultSize)
      const { header, right, bottom, left } = everyPanelSize
      everyPanelSize.header = this.regStyleValue(t || header)
      everyPanelSize.right = this.regStyleValue(r || right)
      everyPanelSize.bottom = this.regStyleValue(b || bottom)
      everyPanelSize.left = this.regStyleValue(l || r || left)
      return everyPanelSize
    },
    styleValueToInt(value) {
      return parseInt(value.match(/^[0-9]+/)[0])
    },
    leftOfRight(type) {
      const { header, bottom } = this.panelSize
      const style = {}
      let height = 0
      if (this.$slots[type]) style.width = this.panelSize[type]
      if (this.$slots.header) {
        height += this.styleValueToInt(header)
        style.top = header
      }
      if (this.$slots.bottom) height += this.styleValueToInt(bottom)
      if (height > 0) style.height = `calc(100% - ${height}px)`
      return style
    },
    cloneData(data) {
      return JSON.parse(JSON.stringify(data))
    }
  }
}
</script>