<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style lang="scss">
@import url('./assets/fonts/iconfont.css');
@import'./assets/sass/_rem.scss';
@import './assets/sass/cmy_variable.scss';
@import './assets/sass/_utilities.scss';
@include global-reset;
@import './assets/sass/common.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
