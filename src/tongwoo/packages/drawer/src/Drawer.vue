<template>
  <transition name="drawer-right">
    <div class="tw-map-panel tw-float tw-drawer-panel" v-if="drawer.display">
      <div class="tw-drawer-header">
        <div class="tw-title" v-if="$slots.title">
          <slot name="title"></slot>
        </div>
        <div class="tw-title" v-else>{{title}}</div>
        <div class="tw-btn-close el-icon-close" @click="handleDrawerClosed"></div>
      </div>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TDrawer',
  data() {
    return {
      display: false
    }
  },
  props: {
    title: String,
    visible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleDrawerClosed() {
      if (this.$listeners['closed']) this.$emit('closed')
    }
  },
  watch: {
    visible(value) {
      this.display = value
    },
    display(value) {
      if (this.$listeners['update:visible']) this.$emit('update:visible', value)
    }
  }
}
</script>