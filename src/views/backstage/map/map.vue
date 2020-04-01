<template>
  <div class="t-template-wrapper">
    <div class="t-map-panel">
      <!-- <div class="t-map-dialog">
        <div class="t-map-dialog-header">地图弹框</div>
        <div class="t-map-dialog-body">
          <div class="t-list">
            <div class="t-list-item">123</div>
            <div class="t-list-item">123</div>
          </div>
        </div>
      </div> -->
      <t-amap
        vid="map"
        zoom="16"
        viewMode="3D"
        :rotateEnable="true"
        :center="[117.000923, 36.675807]"
        ref="map"
      >
        <t-amap-marker vid="amapMarker1" :position="position"></t-amap-marker>
      </t-amap>
      <!-- <el-button type="text" @click="dialog.display = true"
        >点击打开 Dialog</el-button
      >

      <el-dialog
        class="t-dialog"
        title="提示"
        :visible.sync="dialog.display"
        width="600px"
        :before-close="handleDialogClose"
      >
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog.dialog = false">取 消</el-button>
          <el-button type="primary" @click="dialog.dialog = false"
            >确 定</el-button
          >
        </span>
      </el-dialog> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Map',
  data() {
    return {
      position: [117.000923, 36.675807],
      markers: [
        {
          position: [117.000923, 36.675807],
          events: {
            click: () => {
              alert('click marker')
            },
            dragend: e => {
              console.log('---event---: dragend')
              this.markers[0].position = [e.lnglat.lng, e.lnglat.lat]
            }
          },
          visible: true,
          draggable: false,
          template: '<span>1</span>'
        }
      ],
      dialog: {
        display: false,
        title: ''
      }
    }
  },
  mounted() {
    console.info('MAP:', this.$refs['map'].$amap)
    setTimeout(() => {
      // const amap = this.$refs['map'].$amap
      // console.info('MAP:', amap.getSize())
    }, 1000)
  },
  methods: {
    handleDialogClose() {}
  }
}
</script>
