<template>
  <div class="tw-tabs-panel">
    <el-tabs class="tw-tabs" v-model="activeName" @tab-click="handleTabsClick">
      <template v-if="$slots.default">
        <slot></slot>
      </template>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'TTabs',
  data() {
    return {
      activeName: this.active
    }
  },
  props: {
    active: {
      type: String,
      default: ''
    }
  },
  mounted() {
    const tabPanels = this.$slots.default
    console.info('123:', tabPanels[0].child.name)
    if (tabPanels.length > 0) this.activeName = tabPanels[0].child.name
  },
  methods: {
    handleTabsClick(item) {
      if (this.$listeners['tab-click']) this.$emit('tab-click', item)
    }
  },
  watch: {
    active(value) {
      this.activeName = value
    },
    activeName(value) {
      console.info('activeName-change:', value)
      if (this.$listeners['update:active']) this.$emit('update:active', value)
    }
  }
}
</script>