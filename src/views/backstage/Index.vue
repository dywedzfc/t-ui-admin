<template>
  <t-layout border header="50" left="200" right="600" footer="30">
    <template v-slot:header>
      <div class="t-header">
        <div class="t-title">后台管理系统</div>
      </div>
    </template>
    <template v-slot:left>
      <!-- <t-multiple-menu
        :data="{systemMenu: getSystemMenuList, secondaryMenu: getSecondaryMenuList}"
        @display-state="handleSecondaryDisplayState"
      ></t-multiple-menu> -->
      <!-- <t-menu :data="getMenuList"></t-menu> -->
      <t-menu-list :data="getMenuList('backstage')" />
    </template>
    <router-view></router-view>
  </t-layout>
</template>

<script>
import { getMenuList } from 'assets/js/menu'
import { getCalendar } from 'util'

export default {
  name: 'Index',
  data() {
    return {
      hasHoverLeftBar: false,
      hasSecondaryMenu: false,
      data: this.getCalendar()
    }
  },
  computed: {},
  methods: {
    getMenuList,
    handleSecondaryDisplayState(state) {
      this.hasSecondaryMenu = state
    },
    getCalendar() {
      return getCalendar(new Date())
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>
.t-header {
  height: 100%;
  color: #ffffff;
  background-color: #4381e6;

  .t-title {
    padding-left: 20px;
    font-size: 24px;
    line-height: 49px;
  }
}
</style>
