<template>
  <div class="tw-template-wrapper">
    <el-tabs class="tw-tabs" type="border-card">
      <el-tab-pane label="用户管理">
        <div class="tw-map-panel">用户管理-地图</div>
      </el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'CardTabs2'
}
</script>