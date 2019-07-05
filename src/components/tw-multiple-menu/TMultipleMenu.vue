<template>
  <div class="tw-multiple-menu">
    <div
      class="tw-multiple-menu-bar"
      :class="{ hover: multipleMenuHover || hasTotalMenu }"
      @mouseenter.stop="handleMultipleMenuMouseenter"
      @mouseleave.stop="handleMultipleMenuMouseleave"
    >
      <perfect-scrollbar class="tw-scrollbar">
        <div
          class="tw-multiple-menu-item tw-app-menu-item"
          @mouseenter.stop="handleMultipleMenuMouseenter"
          @click="handleMultipleMenuClick"
        >
          <t-icon class="tw-icon" icon="icon-application" font-size="24px"></t-icon>
          <span class="tw-title">所有服务</span>
          <t-icon class="tw-suffix-icon" icon="icon-expansion-r" font-size="24px"></t-icon>
        </div>
        <div
          class="tw-multiple-menu-item"
          :class="{ active: hasMultipleMenuActive(item) }"
          v-for="item in systemMenuList"
          :key="item.id"
          @mouseenter.stop="handleMultipleMenuMouseenter"
          @click="handleMultipleMenuItemClick(item)"
        >
          <t-icon class="tw-icon" :icon="item.icon" font-size="24px"></t-icon>
          <span class="tw-title" v-text="item.title"></span>
        </div>
      </perfect-scrollbar>
    </div>
    <transition name="control-strip-fade">
      <div class="tw-secondary-menu-bar" v-show="hasDisplaySecondaryMenu">
        <div class="tw-secondary-menu-header" v-text="multipleMenuActive.title"></div>
        <t-menu
          class="tw-secondary-menu-body"
          :data="secondaryMenuList[multipleMenuActive.id]"
          height="calc(100% - 50px)"
          :active="secondaryMenuActive.id"
        ></t-menu>
      </div>
    </transition>
    <div
      class="tw-menu-control-strip iconfont"
      :class="[
        hasDisplaySecondaryMenu ? 'icon-collapse-left' : 'icon-collapse-right',
        { 'multiple-hover': multipleMenuHover || hasTotalMenu }
      ]"
      @mouseenter.stop="handleControlStripMouseenter"
      @mouseleave.stop="handleControlStripMouseleave"
      @click="handleControlStripClick"
    ></div>
    <t-total-menu
      class="tw-total-menu"
      :class="{ active: hasTotalMenu }"
      :system-menu="systemMenuList"
      :secondary-menu="secondaryMenuList"
      @total-menu-change="handleTotalMenuChange"
      @close="handleTotalMenuClose"
    ></t-total-menu>
  </div>
</template>

<script>
import _ from 'underscore'
import TIcon from '../TIcon'
import TMenu from '../tw-menu/TMenu'
import TTotalMenu from './TTotalMenu'

/**
 * 接受父主件传递的参数
 * data: 菜单数据 {
 *       systemMenu：主菜单数据
 *       secondaryMenu：次级菜单数据
 * }
 *
 * 接受父组件传递的方法
 * display-state: 显示状态，如：收缩按钮。展开：true，收起：false
 * multiple-item-click: 点击主菜单的点击事件
 */
export default {
  name: 'TMultipleMenu',
  data() {
    return {
      multipleMenuHover: false,
      multipleMenuActive: {},
      hasSecondaryMenu: true,
      secondaryMenuActive: {},
      hasTotalMenu: false
    }
  },
  props: {
    data: {
      type: Object
    }
  },
  mounted() {
    const systemMenuList = this.systemMenuList
    const filterMenuItem = _.filter(systemMenuList, item => {
      return this.menuComparison(item)
    })
    this.multipleMenuActive = filterMenuItem[0] || systemMenuList[0] || {}
    if (this.$listeners['display-state']) {
      if (this.multipleMenuActive.id === 'home')
        this.$emit('display-state', false)
      else this.$emit('display-state', true)
    }
  },
  computed: {
    selectRouterPath() {
      return this.$route
    },
    systemMenuList() {
      return this.data.systemMenu || []
    },
    secondaryMenuList() {
      return this.data.secondaryMenu || {}
    },
    hasDisplaySecondaryMenu() {
      const { id } = this.multipleMenuActive
      if (!id) return false
      const flag = !!this.secondaryMenuList[id] && this.hasSecondaryMenu
      if (this.$listeners['display-state']) this.$emit('display-state', flag)
      return flag
    }
  },
  methods: {
    handleMultipleMenuMouseenter() {
      this.multipleMenuHover = true
    },
    handleMultipleMenuMouseleave() {
      setTimeout(() => {
        this.multipleMenuHover = false
      }, 300)
    },
    handleMultipleMenuClick() {
      this.hasTotalMenu = !this.hasTotalMenu
    },
    handleMultipleMenuItemClick(item) {
      this.multipleMenuActive = item
      this.multipleMenuHover = false
      this.hasSecondaryMenu = true
      this.hasTotalMenu = false
      if (this.$listeners['display-state']) this.$emit('display-state', true)
      if (this.$listeners['multiple-item-click'])
        this.$emit('multiple-item-click', item)
    },
    handleControlStripMouseenter() {
      if (this.multipleMenuHover) {
        setTimeout(() => {
          this.multipleMenuHover = true
        }, 300)
      }
    },
    handleControlStripMouseleave() {
      this.multipleMenuHover = false
    },
    handleControlStripClick() {
      const flag = (this.hasSecondaryMenu = !this.hasSecondaryMenu)
      if (this.$listeners['display-state']) this.$emit('display-state', flag)
    },
    handleTotalMenuChange(item) {
      this.multipleMenuActive = item.multipleMenuItem
      this.secondaryMenuActive = item.secondaryMenuItem
      this.hasSecondaryMenu = true
      if (this.$listeners['display-state']) this.$emit('display-state', true)
    },
    handleTotalMenuClose() {
      this.hasTotalMenu = false
    },
    hasMultipleMenuActive(item) {
      return this.multipleMenuActive.id === item.id
    },
    menuComparison(item) {
      return this.selectRouterPath.path.indexOf(`/${item.id}`) === 0
    }
  },
  components: {
    TIcon,
    TMenu,
    TTotalMenu
  }
}
</script>

<style lang="scss" scoped>
</style>