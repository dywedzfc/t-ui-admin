<!-- 图片拖拽控件 -->
<template>
  <div
    class="tw-panel__drag"
    @mousemove="handleImageMousemove"
    @mouseout="handleImageMouseout"
    @mousewheel="handleImageMounseScroll"
    ref="dragPanel"
    v-loading="loading"
  >
    <canvas
      class="tw-image"
      id="hddd"
      :class="{ focus: hasMove }"
      @mousedown="handleImageMousedown"
      @mouseup="handleImageMouseup"
      ref="canvas"
    >
      当前浏览器不支持canvas，请更换浏览器后再试！
    </canvas>
    <div class="tw-toolbar">
      <el-tooltip content="刷新图片" placement="top">
        <div
          class="tw-toolbar-item el-icon-refresh-right"
          @click="handleImageRefreshChick"
        ></div>
      </el-tooltip>
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
      }
    }
  },
  props: {
    src: String,
    alt: String
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
  methods: {
    handleImageMousedown(e) {
      const { screenX, screenY } = e
      this.hasMove = true
      console.info('index:', screenX, screenY)
      // if (this.image.currentX === 0)
      this.locate.x = screenX
      // if (this.image.currentY === 0)
      this.locate.y = screenY
    },
    handleImageMouseup(e) {
      if (!this.hasMove) return
      const { screenX, screenY } = e
      const { x, y } = this.locate
      // const { currentX, currentY } = this.image
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

      this.canvasText.clearRect(0, 0, panel.offsetWidth, panel.offsetHeight)

      this.canvasText.drawImage(image, pointX, pointY, canvasW, canvasH)
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

      // const oldSize = this.image.size
      // const oldCW = width * this.image.size
      // const oldCH = height * this.image.size

      this.image.size = Math.round((this.image.size - size) * 10) / 10
      if (this.image.size < 0.4) this.image.size = 0.4
      if (this.image.size > 3) this.image.size = 3
      const canvasW = width * this.image.size
      const canvasH = height * this.image.size
      // const pw = canvasW - oldCW / 2
      // console.info('width:', pw)

      this.canvasText.clearRect(0, 0, panel.offsetWidth, panel.offsetHeight)
      this.canvasText.drawImage(image, currentX, currentY, canvasW, canvasH)
    },
    handleImageRefreshChick() {
      const panel = this.$refs.dragPanel
      const { data: image, width, height } = this.image
      this.image.currentX = 0
      this.image.currentY = 0
      this.image.size = 1
      this.canvasText.clearRect(0, 0, panel.offsetWidth, panel.offsetHeight)
      this.canvasText.drawImage(image, 0, 0, width, height)
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
          this.image.data = image.getCanvas()
          this.image.width = width
          this.image.height = height
          this.canvasText.drawImage(image.getCanvas(), 0, 0, width, height)
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

<style lang="scss" scoped>
@import '../../../style/mixin';

.tw-toolbar {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #ffffff;
  z-index: 100;
  @include border-shadow;

  &-item {
    display: flex;
    padding: 10px;
    cursor: pointer;

    @include list-radius;
  }
}
</style>
