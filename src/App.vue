<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>
<script>
import "vant/lib/vant-css/icon-local.css";

export default {
  name: "App"
};
</script>
<style>
#app {
  height: 100%;
  background-color: #dee4e5;
}
button.van-dialog__confirm,
button.van-dialog__confirm:active {
  color: #00a0e9;
}
</style>
