<template>
  <div class="layout">
    <side-bar class="side-container"></side-bar>

    <nav-bar class="nav-container"></nav-bar>

    <main-container class="main-container"></main-container>
  </div>
</template>

<script lang="ts" setup>
import SideBar from './components/SideBar/index.vue'
import NavBar from './components/NavBar/index.vue'
import MainContainer from './components/MainContainer/index.vue'
</script>

<style lang="scss" scoped>
.side-container {
  width: 200px;
  height: 100vh;
  background: rgb(219, 218, 218);
}
</style>
