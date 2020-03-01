<template>
  <div class="t-template-wrapper">
    <t-query-panel footer="300" min-height="300">
      <template v-slot:querybar>
        <el-form-item>
          <el-input value="审批人" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select value="shanghai" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <t-year-picker
            :start-year.sync="startYear1"
            :end-year.sync="endYear1"
          ></t-year-picker>
        </el-form-item>
        <el-form-item>
          <t-year-picker
            :start-year.sync="startYear2"
            :end-year.sync="endYear2"
            :add-year="2"
            @change="handleYearPickerChange"
          ></t-year-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </template>
      <template v-slot:footer>footer</template>
      <el-table class="t-table" :data="tableData" border stripe>
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </t-query-panel>
  </div>
</template>

<script>
export default {
  name: 'QueryPanelInfo',
  data() {
    return {
      startYear1: '2020',
      endYear1: '2021',
      startYear2: '2020',
      endYear2: '2022',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    handleYearPickerChange(item) {
      console.info('yearPickerValue', item.year1, item.year2, item.type)
    }
  }
}
</script>
