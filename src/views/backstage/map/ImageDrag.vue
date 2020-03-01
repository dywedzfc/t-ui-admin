<template>
  <div class="t-template-wrapper">
    <t-drag-picture
      class="drag-picture"
      border
      :src="picture"
      :notice-src="noticePicture"
    ></t-drag-picture>
  </div>
</template>

<script>
export default {
  name: 'ImageDrag',
  data() {
    return {
      picture:
        'https://cn.bing.com/th?id=OHR.AcadiaSunrise_ZH-CN5619713848_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp',
      noticePicture:
        'https://cn.bing.com/th?id=OHR.AcadiaSunrise_ZH-CN5619713848_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp&w=271&h=180&c=7&o=5&pid=1.7'
    }
  }
}
</script>

<style lang="scss" scoped>
.t-template-wrapper {
  position: relative;
}
.drag-picture {
  position: absolute;
  width: 90%;
  height: 90%;
  margin: 2.5% 5%;
}
</style>
