<template>
  <div class="t-layout">
    <div class="t-float-panel">
      <div class="t-list">
        <router-link class="t-list-item" to="/backstage">后台页面</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {}
  },
  computed: {},
  components: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.t-float {
  &-panel {
    position: absolute;
    top: 50px;
    left: 50%;
  }
}
.t-list {
  width: 250px;
  margin-left: -125px;
  border: 1px solid #eeeeee;
  &-item {
    display: block;
    border-bottom: 1px solid #eeeeee;
    padding-left: 20px;
    padding-right: 20px;
    line-height: 40px;
    text-decoration: none;
    cursor: pointer;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      color: #ffffff;
      background-color: #4381e6;
    }
  }
}
</style>
