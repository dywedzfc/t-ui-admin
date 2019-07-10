<template>
  <div class="tw-tabs-panel" :class="{'tw-tabs-panel__toolbar': toolbar}">
    <transition name="fade" appear>
      <div
        class="tw-tabs-toolbar tw-tabs-toolbar__small el-button-group"
        v-if="toolbar"
        ref="toolbar"
      >
        <slot name="toolbar"></slot>
      </div>
    </transition>
    <el-tabs class="tw-tabs" v-model="activeName" @tab-click="handleTabsClick" ref="tabs">
      <template v-if="$slots.default">
        <slot></slot>
      </template>
    </el-tabs>
  </div>
</template>

<script>
import { hasClass } from 'assets/js/util'
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
    if (tabPanels && tabPanels.length) this.activeName = tabPanels[0].child.name
    this.$nextTick(() => {
      console.info('123:', this.toolbar)
      if (this.toolbar) {
        const toolbarWidth = this.toolbarHtml.offsetWidth
        const tabPanelList = this.tabsPanel.$children
        if (tabPanelList.length > 1) {
          setTimeout(() => {
            if (!hasClass(tabPanelList[0].$el, 'is-scrollable')) return
            const tabHeaderLis = tabPanelList[0].$el.children
            if (hasClass(tabPanelList[0].$el.children[1], 'el-tabs__nav-next'))
              tabHeaderLis[1].style.right = `${toolbarWidth + 3}px`
            tabPanelList[0].$el.style.paddingRight = `${toolbarWidth + 23}px`
          }, 100)
          tabPanelList[0].$el.style.paddingRight = `${toolbarWidth}px`
        }
      }
    })
  },
  computed: {
    toolbar() {
      return this.$slots.toolbar
    },
    toolbarHtml() {
      return this.$refs.toolbar
    },
    tabsPanel() {
      return this.$refs.tabs
    }
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
      if (this.$listeners['update:active']) this.$emit('update:active', value)
    }
  }
}
</script>