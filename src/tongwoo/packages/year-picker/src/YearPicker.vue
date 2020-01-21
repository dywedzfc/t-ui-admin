<!-- 年份控件 -->
<template>
  <div class="tw-year-picker">
    <el-date-picker
      :class="pickerClassName"
      v-model="startDate"
      :type="pickerType"
      :editable="false"
      :clearable="false"
      :placeholder="startPlaceholder"
      @change="handlePickerChange"
    ></el-date-picker>
    <span class="picker-split">-</span>
    <el-date-picker
      :class="pickerClassName"
      v-model="endDate"
      :type="pickerType"
      :editable="false"
      :clearable="false"
      :placeholder="endPlaceholder"
      ref="endYear"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'TYearPicker',
  data() {
    return {
      startDate: '',
      endDate: ''
    }
  },
  props: {
    startYear: { type: [Date, String], default: '' },
    endYear: { type: [Date, String], default: '' },
    startPlaceholder: { type: String, default: '开始年份' },
    endPlaceholder: { type: String, default: '结束年份' }
  },
  mounted() {
    this.startDate = this.startYear
    this.endDate = this.endYear
  },
  computed: {
    pickerClassName() {
      return 'tw-date-picker date-year'
    },
    pickerType() {
      return 'year'
    }
  },
  methods: {
    handlePickerChange() {
      this.$refs.endYear.focus()
    }
  },
  watch: {
    startYear(value) {
      this.startDate = value
    },
    startDate(value) {
      const name = 'update:startYear'
      if (this.$listeners[name]) this.$emit(name, value)
    },
    endYear(value) {
      this.endDate = value
    },
    endDate(value) {
      const name = 'update:endYear'
      if (this.$listeners[name]) this.$emit(name, value)
    }
  }
}
</script>

<style lang="scss" scoped>
.tw-date-picker {
  &.date-year {
    width: 120px;
    ~ .date-year {
      width: 100px;
    }
  }
}
.picker-split {
  margin-right: 10px;
}
</style>
