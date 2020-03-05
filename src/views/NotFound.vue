<template>
  <div class="t-notFound-wrapper">
    <div class="t-notFound-box">
      <el-button class="t-button-notFound" @click="handleReturnHomeClick"
        >返回首页</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    handleReturnHomeClick() {
      this.$router.push({ name: '首页', path: '/' })
    }
  }
}
</script>

<style lang="scss" scoped>
.t-notFound {
  &-wrapper {
    height: 100%;
  }

  &-box {
    position: absolute;
    top: 35%;
    left: 50%;
    width: 670px;
    height: 373px;
    background-image: url('../assets/image/not_found.png');
    background-repeat: no-repeat;
    background-position: center 30%;
    transform: translate(-50%, -50%);
  }
}
.t-button {
  &-notFound {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
  }
}
</style>
