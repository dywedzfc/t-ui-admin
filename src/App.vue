<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import 't-ui/style/index';

html,
body {
  height: 100%;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
