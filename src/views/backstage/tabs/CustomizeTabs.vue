<template>
  <div class="tw-template-wrapper tw-dark">
    <t-tabs
      :active.sync="active"
      specified-display="first"
      @tab-add="handleTabAdd"
      @tab-edit="handleTabEdit"
      @tab-remove="handleTabRemove"
    >
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
      <el-tab-pane label="用户管理" name="first">
        <t-layout left="200" left-strip right-strip footer-strip>
          <template v-slot:header>用户管理</template>
          <template v-slot:left>left</template>
          <template>body</template>
          <template v-slot:right>right</template>
          <template v-slot:footer>footer</template>
        </t-layout>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">
        <t-panel title="配置管理" size="small">
          <template v-slot:toolbar>
            <el-button type="text">操作按钮</el-button>
            <el-button class="el-icon-close" type="text"></el-button>
          </template>
          <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
        </t-panel>
        <!-- <t-menu :data="getMenuList">
          <t-menu-group icon="icon-kefu" title="张三" :visible.sync="display">
            <t-menu-item icon="icon-key" title="密钥"></t-menu-item>
            <t-menu-item icon="icon-key" title="密钥"></t-menu-item>
            <t-menu-item icon="icon-key" title="密钥"></t-menu-item>
            <t-menu-item icon="icon-key" title="密钥"></t-menu-item>
          </t-menu-group>
        </t-menu>-->
      </el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth2">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth3">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth4">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth5">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth6">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth7">定时任务补偿</el-tab-pane>
      <!-- <el-tab-pane label="定时任务补偿" name="fourth8">定时任务补偿</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth9">定时任务补偿</el-tab-pane>-->
    </t-tabs>
  </div>
</template>

<script>
// import TTabs from 'components/tw-tabs/TTabs'
import { getMenuList } from 'assets/js/menu'

export default {
  name: 'CustomizeTabs',
  data() {
    return {
      display: false,
      active: '',
      value: '',
      layoutSize: {
        header: '150px',
        left: '200px',
        right: '100px',
        bottom: '150px'
      },
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
  computed: {
    getMenuList
  },
  methods: {
    handleTabAdd() {
      console.info('add:')
    },
    handleTabEdit(targetName, action) {
      console.info('edit', targetName, action)
    },
    handleTabRemove(item) {
      console.info('remove:', item)
    }
  },
  components: {
    // TTabs
  }
}
</script>