<template>
  <div class="tw-template-wrapper">
    <t-query-bar :model="query">
      <el-form-item>
        <el-date-picker v-model="query.time" type="month" popper-class="tw-dark" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.staff" placeholder="人员"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
      </el-form-item>
    </t-query-bar>
    <div class="tw-query-panel">
      <el-table class="tw-table" :data="table.data" size="small" border v-scrollbar:table>
        <el-table-column type="index" label="编号" width="60" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" width="140" align="center"></el-table-column>
        <el-table-column prop="cphm" label="车牌号码" width="140" align="center"></el-table-column>
        <el-table-column prop="clys" label="车辆颜色" width="140" align="center"></el-table-column>
        <el-table-column prop="clys" label="车牌颜色" min-width="140" :resizable="false" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import TQueryBar from 'components/TQueryBar'

export default {
  name: 'VehicleInquiry',
  data() {
    return {
      query: {},
      table: {
        data: [
          { name: '张三', cphm: '浙A12345', clys: '蓝色', cpys: '蓝色' },
          { name: '李四', cphm: '浙A12346', clys: '蓝色', cpys: '蓝色' },
          { name: '王五', cphm: '浙A12347', clys: '蓝色', cpys: '蓝色' }
        ]
      }
    }
  },
  mounted() {},
  computed: {},
  methods: {
    handleQueryClick() {}
  },
  components: {
    TQueryBar
  }
}
</script>