<template>
  <div class="tw-template-wrapper">
    <div class="tw-map-panel">
      <div class="tw-map-dialog">
        <div class="tw-map-dialog-header">地图弹框</div>
        <div class="tw-map-dialog-body">
          <div class="tw-list">
            <div class="tw-list-item">123</div>
            <div class="tw-list-item">123</div>
          </div>
        </div>
      </div>
      <el-button type="text" @click="dialog.display = true">点击打开 Dialog</el-button>

      <el-dialog
        class="tw-dialog"
        title="提示"
        :visible.sync="dialog.display"
        width="600px"
        :before-close="handleDialogClose"
      >
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog.dialog = false">取 消</el-button>
          <el-button type="primary" @click="dialog.dialog = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'map',
  data() {
    return {
      dialog: {
        display: false,
        title: ''
      }
    }
  },
  methods: {
    handleDialogClose() {}
  }
}
</script>