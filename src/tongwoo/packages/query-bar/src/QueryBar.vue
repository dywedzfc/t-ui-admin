<!-- 查询框 -->
<template>
  <el-form class="t-query-bar" :model="model" :size="size" :inline="hasInline">
    <slot></slot>
  </el-form>
</template>

<script>
export default {
  name: 'TQueryBar',
  props: {
    type: String,
    model: Object,
    size: {
      type: String,
      default: 'small'
    }
  },
  computed: {
    hasInline() {
      return this.type === 'search' ? false : true
    }
  }
}
</script>
