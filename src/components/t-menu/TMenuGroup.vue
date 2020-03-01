<template>
  <div class="t-menu-group">
    <div
      class="t-menu-title"
      :class="{ active: hasActiveMenuPanel, open: hasOpenMenuPanel }"
      @click="handlerMenuTitleClick(data)"
    >
      <t-icon :icon="data.icon"></t-icon>
      <span class="t-title" v-text="data.title"></span>
      <t-icon
        class="t-suffix-icon"
        :icon="iconClassName('icon-expansion-d')"
      ></t-icon>
    </div>
    <transition name="menu-panel-fade">
      <div class="t-menu-panel" :class="{ open: hasOpenMenuPanel }">
        <template v-for="item in data.children">
          <t-menu-group
            :key="item.id"
            :data="item"
            :open="openPanelItem"
            @change-open="changeOpenPanel"
            v-if="item.children"
          ></t-menu-group>
          <t-menu-item
            :key="item.id"
            :data="item"
            @click.native="handlerMenuItemClick"
            v-else
          ></t-menu-item>
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
import _ from 'underscore'
import TMenuItem from './TMenuItem'
import TIcon from '../TIcon'
import { iconClassName } from 'assets/js/util'

export default {
  name: 'TMenuGroup',
  data() {
    return {
      openPanelItem: {}
    }
  },
  props: {
    data: Object,
    open: Object
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.openPanelItem = this.currentOpenPanel
      }, 0)
    })
  },
  computed: {
    currentPath() {
      return this.$route.path
    },
    currentOpenPanel() {
      const menuList = this.data
      return _.filter(menuList.children, this.filterMenuChildren)[0] || {}
    },
    hasActiveMenuPanel() {
      const item = this.data
      const routerPath = this.currentPath
      return routerPath.indexOf(item.fullPath) === 0
    },
    hasOpenMenuPanel() {
      const item = this.data
      const path = this.currentPath
      const { fullPath } = this.open
      const activePath = path.indexOf(item.fullPath) === 0
      if (fullPath === item.fullPath && activePath) return true
      else if (fullPath === item.fullPath) return true
      else if (!fullPath && activePath) return true
      else return false
    }
  },
  methods: {
    iconClassName,
    changeOpenPanel(item) {
      this.openPanelItem = item
    },
    handlerMenuItemClick() {
      this.openPanelItem = {}
    },
    handlerMenuTitleClick(item) {
      const { fullPath } = this.open
      if (fullPath === item.fullPath) this.$emit('change-open', {})
      else this.$emit('change-open', this.resetMenuItem(item))
    },
    filterMenuChildren(item) {
      return item.fullPath && this.currentPath.indexOf(item.fullPath) === 0
    },
    resetMenuItem(item) {
      return { id: item.id, title: item.title, fullPath: item.fullPath }
    }
  },
  components: {
    TMenuItem,
    TIcon
  }
}
</script>

<style lang="scss" scoped></style>
