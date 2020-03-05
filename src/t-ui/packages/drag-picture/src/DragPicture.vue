<!-- 图片拖拽控件 -->
<template>
  <div
    class="t-drag-picture"
    :class="[{ border }]"
    @mousemove="handleImageMousemove"
    @mouseout="handleImageMouseout"
    @mousewheel="handleImageMounseScroll"
    ref="dragPanel"
    v-loading="loading"
  >
    <canvas
      class="t-image"
      id="hddd"
      :class="{ focus: hasMove }"
      @mousedown="handleImageMousedown"
      @mouseup="handleImageMouseup"
      ref="canvas"
    >
      当前浏览器不支持canvas，请更换浏览器后再试！
    </canvas>
    <div class="t-toolbar">
      <el-tooltip content="刷新图片" placement="top">
        <div
          class="t-toolbar-item el-icon-refresh-right"
          @click="handleImageRefreshChick"
        ></div>
      </el-tooltip>
    </div>
    <div class="t-notice-box" :class="noticePositionClassName" v-if="noticeSrc">
      <div
        class="t-notice-close t-button"
        :class="{ 'not-display': !notice.display }"
        @click="handleNoticeCloseClick"
      >
        <template v-if="notice.display">&times;</template>
        <template v-else>↖</template>
      </div>
      <img
        v-if="notice.display"
        :src="noticeSrc"
        alt=""
        class="t-notice-image"
      />
    </div>
  </div>
</template>

<script>
import { Image } from 'image-js'

export default {
  name: 'TDragPicture',
  data() {
    return {
      loading: false,
      hasMove: false,
      locate: {
        x: '',
        y: ''
      },
      canvasText: null,
      image: {
        data: null,
        currentX: 0,
        currentY: 0,
        width: 0,
        height: 0,
        size: 1
      },
      notice: {
        display: true
      }
    }
  },
  props: {
    // 是否显示边框
    border: {
      type: Boolean,
      default: false
    },
    src: String,
    alt: String,
    //缩略图路径
    noticeSrc: String,
    // 缩略图位置
    noticePosition: {
      type: String,
      default: 'bottom-right'
    }
  },
  mounted() {
    this.$nextTick(() => {
      const path = this.src
      const panel = this.$refs.dragPanel
      const canvas = this.$refs.canvas
      canvas.width = panel.offsetWidth
      canvas.height = panel.offsetHeight
      this.canvasText = canvas.getContext('2d')
      this.loadImage(path)
    })
  },
  computed: {
    noticePositionClassName() {
      const position = this.noticePosition
      if (position === 'top-left') return 't-top-left'
      else if (position === 'top-right') return 't-top-right'
      else if (position === 'bottom-left') return 't-bottom-left'
      else return 't-bottom-right'
    }
  },
  methods: {
    handleImageMousedown(e) {
      const { screenX, screenY } = e
      this.hasMove = true
      this.locate.x = screenX
      this.locate.y = screenY
    },
    handleImageMouseup(e) {
      if (!this.hasMove) return
      const { screenX, screenY } = e
      const { x, y } = this.locate
      this.hasMove = false
      this.image.currentX += screenX - x
      this.image.currentY += screenY - y
      this.locate.x = ''
      this.locate.y = ''
    },
    handleImageMousemove(e) {
      if (!this.hasMove) return
      const panel = this.$refs.dragPanel
      const { x, y } = this.locate
      const { screenX, screenY } = e
      const { data: image } = this.image
      const { currentX, currentY, width, height, size } = this.image

      let pointX = currentX + screenX - x
      let pointY = currentY + screenY - y

      const canvasW = width * size
      const canvasH = height * size

      const drawWidth = panel.offsetWidth / 2 - canvasW / 2
      const drawHeight = panel.offsetHeight / 2 - canvasH / 2

      this.canvasText.clearRect(0, 0, panel.offsetWidth, panel.offsetHeight)

      const point = { x: drawWidth + pointX, y: drawHeight + pointY }
      this.canvasText.drawImage(image, point.x, point.y, canvasW, canvasH)
    },
    handleImageMouseout(e) {
      if (!this.hasMove) return
      const { screenX, screenY } = e
      const { x, y } = this.locate
      this.hasMove = false
      this.image.currentX += screenX - x
      this.image.currentY += screenY - y
      this.locate.x = ''
      this.locate.y = ''
    },
    handleImageMounseScroll(e) {
      const panel = this.$refs.dragPanel
      const { deltaY } = e
      const { data: image, currentX, currentY, width, height } = this.image

      const size = deltaY / 1000
      this.image.size = Math.round((this.image.size - size) * 10) / 10
      if (this.image.size < 0.4) this.image.size = 0.4
      if (this.image.size > 3) this.image.size = 3

      const canvasW = width * this.image.size
      const canvasH = height * this.image.size
      const drawWidth = (panel.offsetWidth - canvasW) / 2
      const drawHeight = (panel.offsetHeight - canvasH) / 2

      this.canvasText.clearRect(0, 0, panel.offsetWidth, panel.offsetHeight)
      const point = { x: drawWidth + currentX, y: drawHeight + currentY }
      this.canvasText.drawImage(image, point.x, point.y, canvasW, canvasH)
    },
    handleImageRefreshChick() {
      const panel = this.$refs.dragPanel
      const { data: image, width, height } = this.image

      this.image.currentX = 0
      this.image.currentY = 0
      this.image.size = 1

      const canvasW = width * this.image.size
      const canvasH = height * this.image.size

      const drawWidth = panel.offsetWidth / 2 - canvasW / 2
      const drawHeight = panel.offsetHeight / 2 - canvasH / 2

      this.canvasText.clearRect(0, 0, panel.offsetWidth, panel.offsetHeight)
      this.canvasText.drawImage(image, drawWidth, drawHeight, width, height)
    },
    handleNoticeCloseClick() {
      this.notice.display = !this.notice.display
    },
    loadImage(path) {
      if (path) {
        this.loading = true
        const image = Image.load(path)
        const panel = this.$refs.dragPanel
        image.then(image => {
          const panelWidth = panel.offsetWidth
          let width = image.width
          let height = image.height
          if ((panelWidth / 2) * 3 < width) {
            width = (width / 3) * 2
            height = (height / 3) * 2
          }
          const img = (this.image.data = image.getCanvas())
          this.image.width = width
          this.image.height = height
          const drawWidth = panel.offsetWidth / 2 - width / 2
          const drawHeight = panel.offsetHeight / 2 - height / 2
          this.canvasText.drawImage(img, drawWidth, drawHeight, width, height)
          this.loading = false
        })
      }
    }
  },
  watch: {
    src(path) {
      this.loadImage(path)
      this.locate.x = ''
      this.locate.y = ''
      this.image.currentX = 0
      this.image.currentY = 0
      this.image.width = 0
      this.image.height = 0
      this.image.size = 1
    }
  }
}
</script>

<style lang="scss" scoped></style>
