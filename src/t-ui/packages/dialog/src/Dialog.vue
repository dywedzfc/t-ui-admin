<template>
  <el-dialog
    class="t-dialog"
    :visible.sync="display"
    :title="title"
    :width="width"
    :fullscreen="fullscreen"
    :top="top"
    :modal="modal"
    :modal-append-to-body="modalAppendToBody"
    :lock-scroll="lockScroll"
    :custom-class="customClass"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="showClose"
    :before-close="beforeClose"
    :center="center"
    :destroy-on-close="destroyOnClose"
    @open="handleDialogOpen"
    @opened="handleDialogOpened"
    @close="handleDialogClose"
    @closed="handleDialogClosed"
    ref="dialog"
  >
    <template v-slot:title :is="$slots.title">
      <slot name="title"></slot>
    </template>
    <slot></slot>
    <template v-slot:footer :is="$slots.footer">
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script>
export default {
  name: 'TDialog',
  props: {
    visible: Boolean,
    title: String,
    width: String,
    fullscreen: Boolean,
    top: String,
    modal: { type: Boolean, default: true },
    modalAppendToBody: { type: Boolean, default: true },
    lockScroll: { type: Boolean, default: true },
    customClass: String,
    closeOnClickModal: { type: Boolean, default: true },
    closeOnPressEscape: { type: Boolean, default: true },
    showClose: { type: Boolean, default: true },
    beforeClose: Function,
    center: Boolean,
    destroyOnClose: Boolean
  },
  data() {
    return {
      display: false,
      className: {
        dialog: '.el-dialog',
        header: '.el-dialog__header'
      },
      position: {
        flag: false,
        x: '',
        y: '',
        top: '',
        left: ''
      }
    }
  },
  mounted() {
    this.display = this.visible
    this.hasCloseClickModal = this.closeOnClickModal
  },
  computed: {
    topNumber() {
      return this.toNumber(this.position.top)
    },
    leftNumber() {
      return this.toNumber(this.position.left)
    }
  },
  methods: {
    handleDialogOpen() {
      if (this.$listeners['open']) this.$emit('open')
    },
    handleDialogOpened() {
      if (this.$listeners['opened']) this.$emit('opened')
      this.$nextTick(() => {
        this.dialogHeaderEvent()
      })
    },
    handleDialogClose() {
      if (this.$listeners['close']) this.$emit('close')
    },
    handleDialogClosed() {
      if (this.$listeners['closed']) this.$emit('closed')
      this.dialogHeaderEvent('remove')
      this.dragMoveRemoveStyle('clear')
    },
    handleHeaderMousedown(e) {
      const { pageX, pageY } = e
      const dialogTag = this.$refs['dialog'].$el.querySelector('.el-dialog')
      if (!dialogTag.style.position) dialogTag.style.position = 'relative'
      this.position.x = pageX
      this.position.y = pageY
      this.position.flag = true
      this.dragMoveAddStyle()
    },
    handleHeaderMouseup() {
      if (!this.position.flag) return
      const { dialog } = this.className
      this.position.flag = false
      this.position.x = ''
      this.position.y = ''
      const dialogTag = this.$refs['dialog'].$el.querySelector(dialog)
      const { top, left } = dialogTag.style
      this.position.top = parseInt(top)
      this.position.left = parseInt(left)
      this.dragMoveRemoveStyle()
    },
    handleHeaderMousemove(e) {
      const { flag, x, y } = this.position
      if (!flag) return
      const { pageX, pageY } = e
      const { dialog } = this.className
      const { topNumber, leftNumber } = this
      const dialogTag = this.$refs['dialog'].$el.querySelector(dialog)
      dialogTag.style.top = topNumber + pageY - y + 'px'
      dialogTag.style.left = leftNumber + pageX - x + 'px'
    },
    dialogHeaderEvent(type = 'add') {
      const { header } = this.className
      const {
        handleHeaderMousedown,
        handleHeaderMouseup,
        handleHeaderMousemove
      } = this
      const bodyTag = document.body
      const headerTag = this.$refs['dialog'].$el.querySelector(header)
      if (type === 'add') {
        headerTag.addEventListener('mousedown', handleHeaderMousedown, false)
        bodyTag.addEventListener('mousemove', handleHeaderMousemove, false)
        bodyTag.addEventListener('mouseup', handleHeaderMouseup, false)
      } else if (type === 'remove') {
        headerTag.removeEventListener('mousedown', handleHeaderMousedown, false)
        bodyTag.removeEventListener('mousemove', handleHeaderMousemove, false)
        bodyTag.removeEventListener('mouseup', handleHeaderMouseup, false)
      }
    },
    dragMoveAddStyle() {
      const { header } = this.className
      const headerTag = this.$refs['dialog'].$el.querySelector(header)
      headerTag.style.cursor = 'move'
      headerTag.style.userSelect = 'none'
    },
    dragMoveRemoveStyle(type) {
      const { header } = this.className
      const headerTag = this.$refs['dialog'].$el.querySelector(header)
      headerTag.style.cursor = ''
      headerTag.style.userSelect = ''
      if (type === 'clear') {
        this.position.flag = false
        this.position.x = ''
        this.position.y = ''
        this.position.top = ''
        this.position.left = ''
      }
    },
    toNumber(value) {
      return value ? parseInt(value) : 0
    }
  },
  watch: {
    display(value) {
      if (this.$listeners['update:visible']) this.$emit('update:visible', value)
    },
    visible(value) {
      this.display = value
    }
  }
}
</script>

<style lang="scss" scoped>
</style>