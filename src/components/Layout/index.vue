<template>
  <div class="layout">
    <side-bar></side-bar>

    <nav-bar></nav-bar>

    <main-container></main-container>
  </div>
</template>

<script lang="ts" setup>
import SideBar from './components/SideBar/index.vue'
import NavBar from './components/NavBar/index.vue'
import MainContainer from './components/MainContainer/index.vue'
</script>

<style lang="scss" scoped>
.side-bar {
  width: 250px;
  background: #fff;
  box-shadow: 1px 0px 10px 1px #c1c1c1;
}

.nav-bar {
  position: absolute;
  top: 0;
  left: 250px;
  width: calc(100% - 250px);
  height: 60px;
  background: #c1c1c1;
}

.main-container {
  position: absolute;
  top: 60px;
  left: 250px;
  height: calc(100% - 60px);
  width: calc(100% - 250px);
  background: crimson;
}
</style>
