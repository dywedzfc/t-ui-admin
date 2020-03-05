<template>
  <el-menu
    class="te-menu"
    :default-active="active"
    unique-opened
    @open="handleMenuOpen"
    @close="handleMenuClose"
    @select="handleMenuSelect"
    ref="menu-list"
  >
    <!-- 一级菜单 -->
    <template v-for="item in data">
      <el-submenu v-if="item.children" :index="item.id" :key="item.id">
        <template slot="title">
          <i v-if="item.icon" :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item-group>
          <!-- 二级菜单 -->
          <template v-for="item in item.children">
            <el-submenu
              class="te-submenu-two"
              v-if="item.children"
              :index="item.id"
              :key="item.id"
            >
              <!-- 三级菜单 -->
              <template slot="title">
                <i v-if="item.icon" :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item-group>
                <template v-for="item in item.children">
                  <el-menu-item
                    :key="item.id"
                    :index="item.id"
                    @click="handleMenuItemClick(item, 'three')"
                  >
                    <i v-if="item.icon" :class="item.icon"></i>
                    {{ item.name }}
                  </el-menu-item>
                </template>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item
              v-else
              :key="item.id"
              :index="item.id"
              @click="handleMenuItemClick(item, 'two')"
            >
              <i v-if="item.icon" :class="item.icon"></i>
              {{ item.name }}
            </el-menu-item>
          </template>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item
        v-else
        :index="item.id"
        :key="item.id"
        @click="handleMenuItemClick(item, 'one')"
      >
        <i v-if="item.icon" :class="item.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
export default {
  name: 'TMenuList',
  data() {
    return {
      active: ''
    }
  },
  mounted() {
    const path = this.$route.path
    const activePath = path.substring(1).split('/')
    if (activePath.length > 0) {
      this.active = activePath[activePath.length - 1]
    }
  },
  props: {
    data: { type: Array },
    // 是否只保持一个子菜单的展开
    uniqueOpened: { type: Boolean, default: true },
    // 是否使用源路径，使用条件：两个菜单联动操作并且使用了三级菜单
    appendRoot: { type: Boolean, default: false }
  },
  methods: {
    /**
     * 菜单选中事件
     * 优先于 Click 事件
     *
     * @param {*} key：选中菜单项的 index
     * @param {*} keyPath：选中菜单项的 [...index]
     */
    handleMenuSelect(key, keyPath) {
      if (this.$listeners['select']) this.$emit('select', key, keyPath)
    },
    /**
     * sub-menu 展开事件
     *
     * @param {*} key：选中菜单项的 index
     * @param {*} keyPath：选中菜单项的 [...index]
     */
    handleMenuOpen(key, keyPath) {
      if (this.$listeners['open']) this.$emit('open', key, keyPath)
    },
    /**
     * sub-menu 收起事件
     *
     * @param {*} key：选中菜单项的 index
     * @param {*} keyPath：选中菜单项的 [...index]
     */
    handleMenuClose(key, keyPath) {
      if (this.$listeners['close']) this.$emit('close', key, keyPath)
    },
    /**
     * 菜单项的点击事件
     *
     * @param {*} item：菜单项的数据
     * @param {*} level：菜单项的级别
     */
    handleMenuItemClick(item, level) {
      const { path } = item
      const _path = this.$route.path
      const newPath = this.sourcePath(item.path)
      const openedMenus = this.$refs['menu-list'].openedMenus
      // 判断菜单关联性
      if (newPath.indexOf(openedMenus.join('/')) === -1)
        openedMenus.splice(openedMenus.length - 1, 1)
      // 可以定义不同级别的点击事件
      // level: {one: 一级菜单, two: 二级菜单, three: 三级菜单}
      if (this.$listeners[`level-${level}-click`])
        this.$emit(`level-${level}-click`, item)
      if (path && _path !== path) this.$router.push(path)
    },
    /**
     * 获取源路径
     *
     * @param {*} path：路径
     */
    sourcePath(path) {
      if (this.appendRoot && path) {
        const mark = path.substring(1)
        const sIndex = mark ? mark.indexOf('/') + 1 : 0
        const eIndex = path.length
        if (eIndex - (sIndex + 1) > 0) return path.substring(sIndex, eIndex)
      }
      return path
    }
  }
}
</script>
