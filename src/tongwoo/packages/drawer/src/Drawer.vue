<!-- 抽屉式面板 -->
<template>
  <transition :name="transitionClassName">
    <div class="tw-drawer-panel" :class="[directionClassName]" v-if="display">
      <div class="tw-drawer-header">
        <div class="tw-title" v-if="$slots.title">
          <slot name="title"></slot>
        </div>
        <div class="tw-title" v-else>{{title}}</div>
        <div class="tw-btn-close el-icon-close" @click="handleDrawerCloseClick"></div>
      </div>
      <div class="tw-drawer-body">
        <slot></slot>
      </div>
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
    /** 标题 */
    title: String,
    /** 是否显示 */
    visible: {
      type: Boolean,
      default: false
    },
    /** 方向 */
    direction: {
      type: String,
      default: 'right'
    }
  },
  computed: {
    /** 模块显示方向 */
    directionClassName() {
      const direction = this.direction
      if (direction === 'top') return 'tw-drawer-top'
      if (direction === 'bottom') return 'tw-drawer-bottom'
      if (direction === 'left') return 'tw-drawer-left'
      return 'tw-drawer-right'
    },
    /** 动画运动方向 */
    transitionClassName() {
      const direction = this.direction
      if (direction === 'top') return 'drawer-top'
      if (direction === 'bottom') return 'drawer-bottom'
      if (direction === 'left') return 'drawer-left'
      return 'drawer-right'
    }
  },
  methods: {
    /** 关闭事件 */
    handleDrawerCloseClick() {
      this.display = false
      // 关闭后事件
      if (this.$listeners['closed']) this.$emit('closed')
    }
  },
  watch: {
    /** 开关绑定-外部传入数据 */
    visible(value) {
      this.display = value
    },
    /** 开关绑定-内部传出数据 */
    display(value) {
      if (this.$listeners['update:visible']) this.$emit('update:visible', value)
    }
  }
}
</script>