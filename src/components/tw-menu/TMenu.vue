<template>
  <div class="tw-menu" :class="[typeClassName]">
    <template v-for="item in data">
      <t-menu-group
        :key="item.id"
        :data="item"
        :active="selectRouterPath"
        :open="open || openPanel"
        :type="type"
        @change-open="changeOpenPanel"
        @mousemove.native.stop="handleMenuGroupMousemove(item)"
        @mouseleave.native="handleMenuGroupMouseleave(item)"
        v-if="hasPathChildren(item)"
      ></t-menu-group>
      <t-menu-item
        :key="item.id"
        :data="item"
        :active="selectRouterPath"
        :open="openPanel"
        @click.native="handlerMenuTitleClick"
        v-else
      ></t-menu-item>
    </template>
  </div>
</template>

<script>
import _ from 'underscore'
import TMenuGroup from './TMenuGroup'
import TMenuItem from './TMenuItem'

export default {
  name: 'TMenu',
  data() {
    return {
      // active: '',
      open: '',
      openPanel: {}
    }
  },
  props: {
    data: Array,
    height: String,
    type: String
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        const open = this.currentOpenPanel
        if (this.type !== 'bigIcon') this.openPanel = open
      }, 0)
    })
  },
  computed: {
    selectRouterPath() {
      return this.$route.path
    },
    currentOpenPanel() {
      const menuList = this.data
      console.info('menuList:', menuList)
      return _.filter(menuList.children, this.filterMenuChildren)[0] || {}
    },
    typeClassName() {
      const type = this.type
      if (type) {
        if (type === 'bigIcon') return 'tw-icon-big'
      }
      return ''
    }
  },
  methods: {
    changeOpenPanel(item) {
      // this.active = ''
      this.openPanel = item
    },
    handlerMenuTitleClick() {
      this.openPanel = {}
    },
    hasPathChildren(item) {
      return item.children && item.children.length > 0
    },
    handleMenuGroupMousemove(item) {
      if (this.type === 'bigIcon') this.open = item
    },
    handleMenuGroupMouseleave() {
      if (this.type === 'bigIcon') this.open = {}
    },
    filterMenuChildren(item) {
      return item.fullPath && this.currentPath.indexOf(item.fullPath) === 0
    }
  },
  // watch: {
  // $route(value) {
  // this.active = value.path
  // }
  // },
  components: {
    TMenuGroup,
    TMenuItem
  }
}
</script>

<style lang="scss" scoped>
</style>