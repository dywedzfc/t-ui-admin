<!-- 年份控件 -->
<template>
  <div class="t-year-picker" :class="{ focus }" @click="handlePickerBoxClick">
    <el-date-picker
      :class="pickerClassName"
      v-model="startDate"
      :type="pickerType"
      :editable="editable"
      :clearable="clearable"
      :size="size"
      :placeholder="startPlaceholder"
      @change="handlePickerChange"
      @focus="handlePickerFocus"
      @blur="handlePickerBlur"
      ref="startYear"
    ></el-date-picker>
    <span class="picker-split">{{ rangeSeparator }}</span>
    <el-date-picker
      :class="pickerClassName"
      v-model="endDate"
      :type="pickerType"
      :editable="editable"
      :clearable="clearable"
      :size="size"
      :readonly="autoTwoYears"
      :placeholder="endPlaceholder"
      @focus="handlePickerFocus"
      @blur="handlePickerBlur"
      ref="endYear"
    ></el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'TYearPicker',
  data() {
    return {
      focus: false,
      startDate: '',
      endDate: '',
      autoTwoYears: false
    }
  },
  props: {
    startYear: { type: [Date, String], default: '' },
    endYear: { type: [Date, String], default: '' },
    editable: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    /* size: large, small, mini */
    size: { type: String, default: '' },
    startPlaceholder: { type: String, default: '开始年份' },
    endPlaceholder: { type: String, default: '结束年份' },
    rangeSeparator: { type: String, default: '-' },
    unlinkPanels: { type: Boolean, default: true },
    autoTwoYear: { type: Boolean, default: false },
    addYear: { type: Number, default: 0 }
  },
  mounted() {
    this.verificationAddYear()
    this.startDate = this.startYear
    this.endDate = this.endYear
    if (this.addYear === 0) this.autoTwoYears = this.autoTwoYear
  },
  computed: {
    pickerClassName() {
      return 't-date-picker date-year'
    },
    pickerType() {
      return 'year'
    }
  },
  methods: {
    handlePickerChange(date) {
      if (this.unlinkPanels && !this.autoTwoYears) {
        this.$refs.endYear.focus()
        setTimeout(() => (this.focus = true), 0)
      } else if (this.autoTwoYears) {
        const year = date.getFullYear() + this.addYear
        this.endDate = new Date(year, date.getMonth(), date.getDate())
        this.$emit('change', { year1: date, year2: this.endDate, type: true })
      }
    },
    handlePickerFocus() {
      if (this.focus) setTimeout(() => (this.focus = true), 140)
      else this.focus = true
    },
    handlePickerBlur() {
      this.focus = false
    },
    handlePickerBoxClick() {
      console.info('info:')
      if (this.autoTwoYears) this.$refs.startYear.focus()
    },
    verificationAddYear() {
      if (this.addYear !== 0) this.autoTwoYears = true
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
    },
    autoTwoYear() {
      this.autoTwoYears = this.autoTwoYear
    },
    autoTwoYears(value) {
      const name = 'update:autoTwoYear'
      if (this.$listeners[name]) this.$emit(name, value)
    },
    addYear() {
      this.verificationAddYear()
    }
  }
}
</script>

<style lang="scss" scoped></style>
