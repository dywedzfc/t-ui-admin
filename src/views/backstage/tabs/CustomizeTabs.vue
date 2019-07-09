<template>
  <div class="tw-template-wrapper">
    <t-tabs></t-tabs>
    <!-- <el-tabs class="tw-tabs" v-model="active">
      <slot></slot>
    </el-tabs>-->
  </div>
</template>

<script>
import { TTabs } from 'components/tw-tabs/TTabs'

export default {
  name: 'CustomizeTabs',
  data() {
    return {}
  },
  components: {
    TTabs
  }
}
</script>