<template>
  <div class="tw-menu-group">
    <div
      class="tw-menu-title"
      :class="{
        active: hasActiveMenuPanel(data),
        open: hasOpenMenuPanel(data)
      }"
      @click="handlerMenuTitleClick(data)"
    >
      <t-icon :icon="data.icon"></t-icon>
      {{ data.title }}
      <t-icon class="tw-suffix-icon" icon="el-icon-arrow-down"></t-icon>
    </div>
    <div class="tw-menu-panel" :class="{ open: hasOpenMenuPanel(data) }">
      <template v-for="item in data.children">
        <t-w-menu-group
          :key="item.id"
          :data="item"
          :active.sync="active"
          :open="openPanelItem"
          @change-open="changeOpenPanel"
          v-if="item.children"
        ></t-w-menu-group>
        <t-menu-item
          :key="item.id"
          :data="item"
          :active.sync="active"
          @click.native="handlerMenuItemClick"
          v-else
        ></t-menu-item>
      </template>
    </div>
  </div>
</template>

<script>
import _ from 'underscore'
import TMenuItem from './TMenuItem'
import TIcon from '../TIcon'

export default {
  name: 'TMenuGroup',
  data() {
    return {
      openPanelItem: {}
    }
  },
  props: {
    data: Object,
    active: String,
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
    }
  },
  methods: {
    changeOpenPanel(item) {
      this.openPanelItem = item
      console.info('TWMenuGroup-changeOpenPanel:', item)
    },
    handlerMenuItemClick() {
      this.openPanelItem = {}
    },
    handlerMenuTitleClick(item) {
      console.info(
        'TWMenuGroup-handlerMenuTitleClick:',
        item,
        this.open.id,
        this.open.fullPath,
        item.fullPath
      )
      if (this.open.id && this.open.fullPath === item.fullPath)
        this.$emit('change-open', {})
      else
        this.$emit('change-open', {
          id: item.id,
          title: item.title,
          fullPath: item.fullPath
        })
    },
    hasActiveMenuPanel(item) {
      const routerPath = this.currentPath
      return routerPath.indexOf(item.fullPath) === 0
    },
    hasOpenMenuPanel(item) {
      const active = this.active
      const openPanelItem = this.open
      return openPanelItem
        ? openPanelItem.fullPath === item.fullPath
        : active.indexOf(item.fullPath) === 0
    },
    filterMenuChildren(item) {
      return item.fullPath && this.currentPath.indexOf(item.fullPath) === 0
    }
  },
  components: {
    TMenuItem,
    TIcon
  }
}
</script>

<style lang="scss" scoped>
</style>