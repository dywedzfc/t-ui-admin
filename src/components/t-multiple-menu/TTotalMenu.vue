<template>
  <div class="t-total-menu-panel">
    <t-icon
      class="t-total-menu-close"
      icon="icon-shut-down"
      font-size="14px"
      @click.native="handleTotalMenuCloseClick"
    ></t-icon>
    <div class="t-total-menu-query-bar">
      <t-icon
        class="t-prefix-icon"
        icon="icon-search"
        font-size="18px"
      ></t-icon>
      <input type="text" class="t-total-menu-query-box" v-model="query" />
      <t-icon
        class="t-suffix-icon"
        icon="icon-shut-down"
        font-size="12px"
        v-if="query.length > 0"
        @click.native="handleTotalMenuQueryClearClick"
      ></t-icon>
      <div class="t-total-menu-query-prompt" v-if="query.length > 0">
        {{ totalMenuTextPromptBefore }}
        "
        <span class="t-total-menu-query-text" v-text="query"></span>
        "
        {{ totalMenuTextPromptAfter }}
      </div>
    </div>
    <div
      class="t-total-menu-box t-scrollbar"
      :class="{ filter: query.length > 0 }"
      ref="totalMenuScrollbar"
      v-scrollbar
    >
      <div class="t-total-menu-group">
        <div
          class="t-total-menu-group-item"
          v-for="(item, index) in filterSystemMenuColumnOne"
          :key="'t-total-menu-group-1_' + index"
          :index="item.id"
        >
          <div class="t-total-menu-group-item-header" v-text="item.title"></div>
          <ul class="t-total-menu-group-item-body">
            <li
              class="t-total-menu-group-item-body-item"
              v-for="secondaryItem in filterSecondaryMenu(item.id)"
              :key="secondaryItem.id"
            >
              <router-link
                tag="div"
                class="t-menu-link"
                :to="secondaryItem.href || ''"
                @click.native="handleTotalMenuGroupItemClick(secondaryItem)"
                >{{ secondaryItem.title }}</router-link
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="t-total-menu-group">
        <div
          class="t-total-menu-group-item"
          v-for="(item, index) in filterSystemMenuColumnTwo"
          :key="'t-total-menu-group-2_' + index"
          :index="item.id"
        >
          <div class="t-total-menu-group-item-header" v-text="item.title"></div>
          <ul class="t-total-menu-group-item-body">
            <li
              class="t-total-menu-group-item-body-item"
              v-for="secondaryItem in filterSecondaryMenu(item.id)"
              :key="secondaryItem.id"
            >
              <router-link
                tag="div"
                class="t-menu-link"
                :to="secondaryItem.href || ''"
                @click.native="handleTotalMenuGroupItemClick(secondaryItem)"
                >{{ secondaryItem.title }}</router-link
              >
            </li>
          </ul>
        </div>
      </div>
      <div class="t-total-menu-group">
        <div
          class="t-total-menu-group-item"
          v-for="(item, index) in filterSystemMenuColumnThree"
          :key="'t-total-menu-group-3_' + index"
          :index="item.id"
        >
          <div class="t-total-menu-group-item-header" v-text="item.title"></div>
          <ul class="t-total-menu-group-item-body">
            <li
              class="t-total-menu-group-item-body-item"
              v-for="secondaryItem in filterSecondaryMenu(item.id)"
              :key="secondaryItem.id"
            >
              <router-link
                tag="div"
                class="t-menu-link"
                :to="secondaryItem.href || ''"
                @click.native="handleTotalMenuGroupItemClick(secondaryItem)"
                >{{ secondaryItem.title }}</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="t-total-menu-multiple-bar">
      <div
        class="t-total-menu-multiple-item"
        v-for="item in filterSystemMenu"
        :key="item.id"
        v-text="item.title"
        @click="handleTotalSystemMenuClick(item)"
      ></div>
    </div>
  </div>
</template>

<script>
import _ from 'underscore'
import TIcon from '../TIcon'

export default {
  name: 'TTotalMenu',
  data() {
    return {
      query: ''
    }
  },
  props: {
    systemMenu: Array,
    secondaryMenu: Object
  },
  mounted() {
    this.filterSystemMenuColumnOne
    this.$nextTick(() => {})
  },
  computed: {
    filterSystemMenu() {
      const menuList = this.systemMenu
      return _.filter(
        menuList,
        item => this.filterSecondaryMenu(item.id).length > 0
      )
    },
    filterSystemMenuColumnOne() {
      return _.filter(this.filterSystemMenu, (item, index) => index % 3 === 0)
    },
    filterSystemMenuColumnTwo() {
      return _.filter(this.filterSystemMenu, (item, index) => index % 3 === 1)
    },
    filterSystemMenuColumnThree() {
      return _.filter(this.filterSystemMenu, (item, index) => index % 3 === 2)
    },
    totalSystemMenu() {
      return this.filterSystemMenu.length > 0
    },
    totalMenuTextPromptBefore() {
      return this.totalSystemMenu ? '以下是与' : '未找到与'
    },
    totalMenuTextPromptAfter() {
      return '相关的模块' + (this.totalSystemMenu ? '：' : '。')
    }
  },
  methods: {
    filterSecondaryMenu(number) {
      const menuList = this.secondaryMenu[number]
      // return _.filter(menuList, item => (item.title.indexOf(this.query) >= 0 || this.query.length === 0));
      return this.filterSecondaryMenuList(menuList)
    },
    filterSecondaryMenuList(menuList) {
      let newMenuList = []
      _.each(menuList, item => {
        if (item.children)
          newMenuList.push(...this.filterSecondaryMenuList(item.children))
        else if (item.title.indexOf(this.query) >= 0 || this.query.length === 0)
          newMenuList.push(item)
      })
      return newMenuList
    },
    handleTotalMenuCloseClick() {
      this.$emit('close')
    },
    handleTotalMenuQueryClearClick() {
      this.query = ''
    },
    handleTotalMenuGroupItemClick(item) {
      this.handleTotalMenuCloseClick()
      const systemId = item.href.split('/')[1]
      const systemMenu = _.filter(
        this.systemMenu,
        item => item.id === systemId
      )[0]
      this.$emit('total-menu-change', {
        systemMenuItem: { ...systemMenu },
        secondaryMenuItem: { ...item }
      })
    },
    handleTotalSystemMenuClick(item) {
      let jump = document.querySelectorAll('.t-total-menu-group-item')
      let total = _.filter(
        jump,
        _item => _item.getAttribute('index') === item.id
      )
      let length = total[0].offsetTop
      this.$refs.totalMenuScrollbar.$el.scrollTop = length
      // $(this.$refs.totalMenuScrollbar.wrap).animate({ scrollTop: length }, 500)
    }
  },
  components: {
    TIcon
  }
}
</script>

<style lang="scss" scoped></style>
