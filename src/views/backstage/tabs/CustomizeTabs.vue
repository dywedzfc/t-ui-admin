<template>
  <div class="tw-template-wrapper">
    <t-tabs :active.sync="active">
      <template v-slot:toolbar>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-date-picker v-model="value" placeholder="选择时间"></el-date-picker>
        <el-button type="primary">搜索</el-button>
      </template>
      <el-tab-pane label="用户管理1" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth2">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth3">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth4">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth5">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth6">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth7">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth8">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth9">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth10">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth11">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth12">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth13">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth14">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth15">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth16">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth17">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth18">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth19">定时任务补偿</el-tab-pane>
    </t-tabs>
  </div>
</template>

<script>
// import TTabs from 'components/tw-tabs/TTabs'

export default {
  name: 'CustomizeTabs',
  data() {
    return {
      active: '',
      value: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ]
    }
  },
  components: {
    // TTabs
  }
}
</script>