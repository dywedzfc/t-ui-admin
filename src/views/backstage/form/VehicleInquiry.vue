<template>
  <t-query-panel :model="query">
    <template v-slot:querybar>
      <el-form-item>
        <el-date-picker v-model="query.time" type="month" popper-class="tw-dark" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-input v-model="query.staff" placeholder="人员"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleQueryClick">查询</el-button>
      </el-form-item>
    </template>
    <t-table-page
      :data="table.data"
      :page-total="table.total"
      :loading="table.display"
      :real-time-page.sync="table.currentPage"
      @current-change="handleTablePageCurrentChange"
    >
      <el-table-column type="index" label="编号" width="60" align="center"></el-table-column>
      <el-table-column prop="NAME" label="姓名" width="140" align="center"></el-table-column>
      <el-table-column prop="MOBILE_PHONE" label="车牌号码" width="140" align="center"></el-table-column>
      <el-table-column prop="ACCIDENT_RECORD_NUMBER" label="车辆颜色" width="140" align="center"></el-table-column>
      <el-table-column prop="AREA_CODE" label="车辆颜色" width="140" align="center"></el-table-column>
      <el-table-column prop="AREA_NAME" label="车辆颜色" width="140" align="center"></el-table-column>
      <el-table-column prop="ASSESS_SCORE" label="车辆颜色" width="140" align="center"></el-table-column>
      <el-table-column prop="ASSESS_YEAR" label="车辆颜色" width="140" align="center"></el-table-column>
      <el-table-column prop="AUDIT_STATUS" label="车辆颜色" width="140" align="center"></el-table-column>
      <el-table-column prop="CATEGORY" label="车辆颜色" width="140" align="center"></el-table-column>
      <el-table-column prop="CERTIFICATE_NAME" label="车辆颜色" width="140" align="center"></el-table-column>
      <el-table-column prop="CERTIFICATE_NUMBER" label="车辆颜色" width="140" align="center"></el-table-column>
      <el-table-column prop="CHECK_END_DATE" label="车辆颜色" width="140" align="center"></el-table-column>
      <el-table-column prop="COMPANY_LICENSE_NUMBER" label="车辆颜色" width="140" align="center"></el-table-column>
      <el-table-column prop="COMPANY_NAME" label="车辆颜色" width="140" align="center"></el-table-column>
      <el-table-column
        prop="HANDLE_PLACE"
        label="车牌颜色"
        min-width="140"
        :resizable="false"
        align="center"
      ></el-table-column>
    </t-table-page>
  </t-query-panel>
</template>

<script>
import axios from 'axios'

export default {
  name: 'VehicleInquiry',
  data() {
    return {
      query: {},
      table: {
        display: false,
        data: [],
        total: null,
        currentPage: 1
      }
    }
  },
  mounted() {
    this.getDataList()
  },
  computed: {},
  methods: {
    getDataList(currentPage = 1, pageSize = 20) {
      this.table.display = true
      axios
        .get(
          'http://192.168.0.140:8080/jgfwpt/transportationDataAccess/getDriverInformation',
          {
            params: {
              vehiNo: '',
              name: '',
              idNumber: '',
              areaName: '',
              currentPage,
              pageSize,
              tdsourcetag: 's_pctim_aiomsg'
            }
          }
        )
        .then(res => {
          console.info('data:', res.data)
          this.table.data = res.data.datas
          this.table.total = res.data.count
          this.table.display = false
        })
    },
    handleTablePageCurrentChange({ currentPage, pageSize }) {
      console.info('current:', currentPage, pageSize)
      this.getDataList(currentPage, pageSize)
    },
    handleQueryClick() {
      this.table.currentPage = 1
      this.getDataList()
    }
  }
}
</script>