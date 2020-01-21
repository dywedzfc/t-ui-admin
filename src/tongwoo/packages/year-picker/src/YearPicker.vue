<!-- 年份控件 -->
<template>
  <div class="tw-year-picker" :class="{ focus }">
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
    ></el-date-picker>
    <span class="picker-split">{{ rangeSeparator }}</span>
    <el-date-picker
      :class="pickerClassName"
      v-model="endDate"
      :type="pickerType"
      :editable="editable"
      :clearable="clearable"
      :size="size"
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
      endDate: ''
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
    unlinkPanels: { type: Boolean, default: true }
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
      if (this.unlinkPanels) {
        this.$refs.endYear.focus()
        setTimeout(() => (this.focus = true), 0)
      }
    },
    handlePickerFocus() {
      if (this.focus) setTimeout(() => (this.focus = true), 140)
      else this.focus = true
    },
    handlePickerBlur() {
      this.focus = false
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

<style lang="scss" scoped></style>
