<!-- 面板框 -->
<template>
  <el-card
    class="t-panel"
    :class="sizeClassName"
    :body-style="bodyStyleStatus"
    :shadow="shadowStatus"
  >
    <template slot="header" v-if="hasTitle">
      <span class="t-title">{{ title }}</span>
      <div class="t-toolbar" v-if="toolbar">
        <slot name="toolbar"></slot>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<script>
export default {
  name: 'TPanel',
  props: {
    title: {
      type: String,
      default: ''
    },
    bodyStyle: {
      type: Object
    },
    shadow: {
      type: String,
      default: 'always'
    },
    size: String
  },
  mounted() {},
  computed: {
    toolbar() {
      return this.$slots.toolbar
    },
    hasTitle() {
      return this.title || this.toolbar
    },
    shadowStatus() {
      if (this.shadow === 'never' || this.shadow === 'hover ')
        return this.shadow
      else return 'always'
    },
    bodyStyleStatus() {
      const bodyStyle = this.bodyStyle
      const padding = this.paddingSize
      if (bodyStyle)
        return bodyStyle.padding ? bodyStyle : { ...bodyStyle, ...padding }
      return padding
    },
    paddingSize() {
      if (this.size === 'mini') return { padding: '10px' }
      else if (this.size === 'small') return { padding: '15px' }
      else return { padding: '20px' }
    },
    sizeClassName() {
      if (this.size === 'mini') return 't-panel__mini'
      if (this.size === 'small') return 't-panel__small'
      else return ''
    }
  }
}
</script>
