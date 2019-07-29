<template>
  <t-layout border header="50" left="200" right="600" footer="30">
    <template v-slot:header>
      <div class="tw-title">后台管理系统</div>
    </template>
    <template v-slot:left>
      <t-multiple-menu
        :data="{systemMenu: getSystemMenuList, secondaryMenu: getSecondaryMenuList}"
        @display-state="handleSecondaryDisplayState"
      ></t-multiple-menu>
    </template>
    <template>
      <router-view></router-view>
    </template>
  </t-layout>
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
