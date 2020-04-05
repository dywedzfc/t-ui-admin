<template>
  <div class="t-template-wrapper">
    <t-dialog
      :visible.sync="dialog.display"
      :title="dialog.title"
      :destroy-on-close="true"
      @open="handleDialogOpen"
      @opened="handleDialogOpened"
      @close="handleDialogClose"
      @closed="handleDialogClosed"
    >
      <el-input v-model="input"></el-input>sdfkjskajfkl
    </t-dialog>
    <el-button @click="handleButtonClick">对话框</el-button>
  </div>
</template>

<script>
export default {
  name: 'dialog-test',
  data() {
    return {
      input: '',
      dialog: {
        display: false,
        title: '对话框'
      }
    }
  },
  methods: {
    handleButtonClick() {
      this.dialog.display = true
    },
    handleDialogOpen() {
      console.info('Open:')
    },
    handleDialogOpened() {
      console.info('Opened:')
    },
    handleDialogClose() {
      console.info('Close:')
    },
    handleDialogClosed() {
      console.info('Closed:')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>