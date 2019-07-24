<template>
  <div class="tw-grid-layout">
    <template v-if="$slots.default">
      <slot></slot>
    </template>
  </div>
</template>

<script>
import { hasNumber } from 'assets/js/util'
export default {
  name: 'TGridLayout',
  data() {
    return {
      equalType: [1, 4, 9, 16, 25]
    }
  },
  props: {
    margin: {
      type: [Number, String],
      default: 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initPanelInfo()
    })
  },
  methods: {
    initPanelInfo() {
      const panel = this.$slots.default
      console.info('init-each:', panel)
      if (panel && panel.length > 0) {
        if (this.equalType.indexOf(panel.length) >= 0) {
          this.$slots.default.forEach((item, index) => {
            const multiple = this.equalType.indexOf(panel.length) + 1
            this.equalPanleStyle(item.elm, multiple, index)
          })
        } else if (panel && panel.length === 2) {
          this.$slots.default.forEach((item, index) => {
            const flag = hasNumber(this.margin)
            const size = (flag && this.margin) || parseInt(this.margin) || 0
            item.elm.style.width = `${100 / 2}%`
            item.elm.style.height = '100%'
            if (size > 0) {
              item.elm.style.width = `calc(${100 / 2}% - ${size / 2}px)`
              if (index === 0) {
                item.elm.style.marginRight = `${size}px`
              }
            }
          })
        }
      }
    },
    equalPanleStyle(el, multiple, index) {
      const flag = hasNumber(this.margin)
      const size = (flag && this.margin) || parseInt(this.margin) || 0
      if (size > 0) {
        const margin = ((multiple - 1) * size) / multiple
        el.style.width = `calc(${100 / multiple}% - ${margin}px)`
        el.style.height = `calc(${100 / multiple}% - ${margin}px)`
        if ((index + 1) % multiple !== 0) el.style.marginRight = `${size}px`
        if (multiple * multiple - multiple > index)
          el.style.marginBottom = `${size}px`
      } else {
        el.style.width = `${100 / multiple}%`
        el.style.height = `${100 / multiple}%`
      }
    }
  },
  watch: {
    margin() {
      this.$nextTick(() => {
        this.initPanelInfo()
      })
    }
  }
}
</script>