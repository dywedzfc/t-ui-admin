<template>
  <div class="tw-tabs-panel">
    <el-tabs class="tw-tabs" v-model="active" @tab-click="handleTabsClick">
      <slot></slot>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  data() {
    return {}
  },
  props: {
    active: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleTabsClick(item) {
      if (this.$listeners['tab-click']) this.$emit('tab-click', item)
    }
  }
}
</script>