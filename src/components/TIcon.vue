<template>
  <i
    class="t-icon"
    :class="icon_className"
    :style="{ fontSize: styleFontSize }"
  ></i>
</template>

<script>
import { iconClassName } from 'assets/js/util'

export default {
  name: 'TIcon',
  props: {
    icon: String,
    fontSize: String
  },
  computed: {
    icon_className() {
      return iconClassName(this.icon)
    },
    styleFontSize() {
      return this.fontSize || '16px'
    }
  }
}
</script>

<style scoped>
.t-icon {
  display: inline-block;
}
</style>
