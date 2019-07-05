<template>
  <div class="tw-menu-item" :class="{ active: hasActive }">
    <router-link tag="div" class="tw-menu-link" :to="data.href">
      <t-icon :icon="data.icon"></t-icon>
      <span class="tw-title" v-text="data.title"></span>
    </router-link>
  </div>
</template>

<script>
import TIcon from '../TIcon'
import { hasObject } from 'assets/js/util'

export default {
  name: 'TMenuItem',
  props: {
    data: Object,
    type: String
  },
  computed: {
    hasActive() {
      const { data } = this
      const { path } = this.$route
      const hasPath = data.fullPath && data.fullPath.indexOf(path) === 0
      return hasObject(data) && (hasPath || data.href === path)
    }
  },
  methods: {},
  components: {
    TIcon
  }
}
</script>

<style lang="scss" scoped>
// @import '../../assets/css/tw-menu-variable';

// .tw-icon {
//   width: $tw-menu-totalWidth - 10px;
//   text-align: center;
// }
</style>