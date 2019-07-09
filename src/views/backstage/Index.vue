<template>
  <div class="tw-layout">
    <div class="tw-layout-header">
      <div class="tw-title">后台管理系统</div>
    </div>
    <div class="tw-layout-left" :class="{hover: hasSecondaryMenu}">
      <!-- <t-menu :data="getMenuList"></t-menu> -->
      <t-multiple-menu
        :data="{systemMenu: getSystemMenuList, secondaryMenu: getSecondaryMenuList}"
        @display-state="handleSecondaryDisplayState"
      ></t-multiple-menu>
    </div>
    <div class="tw-layout-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// import TMenu from 'components/tw-menu/TMenu'
import TMultipleMenu from 'components/tw-multiple-menu/TMultipleMenu'
import {
  getMenuList,
  getSystemMenuList,
  getSecondaryMenuList
} from 'assets/js/menu'

export default {
  name: 'Index',
  data() {
    return {
      hasHoverLeftBar: false,
      hasSecondaryMenu: false
    }
  },
  computed: {
    getMenuList,
    getSystemMenuList,
    getSecondaryMenuList
  },
  components: {
    TMultipleMenu
  },
  methods: {
    handleSecondaryDisplayState(state) {
      this.hasSecondaryMenu = state
    }
  }
}
</script>

<style lang="scss" scoped>
.tw-layout {
}
</style>
