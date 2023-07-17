<template>
  <div :class="['layout', isCollapsed ? 'layout-collapsed' : '']">
    <side-bar></side-bar>

    <nav-bar></nav-bar>

    <main-container></main-container>
  </div>
</template>

<script lang="ts" setup>
import SideBar from './components/SideBar/index.vue'
import NavBar from './components/NavBar/index.vue'
import MainContainer from './components/MainContainer/index.vue'
import useStatusStore from '@/store/modules/status'
import { storeToRefs } from 'pinia'

const statusStore = useStatusStore()
const { isCollapsed } = storeToRefs(statusStore)
</script>

<style lang="scss" scoped>
.side-bar {
  width: 250px;
  background: #fff;
  box-shadow: 1px 0px 10px 1px #c1c1c1;
  border-right: 1px solid #dcdcdc;
  transition: width 0.5s;
}

.nav-bar {
  position: absolute;
  top: 0;
  left: 250px;
  width: calc(100% - 250px);
  height: 60px;
  background: #fff;
  border-bottom: 1px solid #dcdcdc;
  transition: width 0.5s, left 0.5s;
}

.main-container {
  position: absolute;
  top: 60px;
  left: 250px;
  padding: 10px;
  height: calc(100% - 60px);
  width: calc(100% - 250px);
  overflow-y: auto;
  background: #fff;
  transition: width 0.5s, left 0.5s;
}

.layout-collapsed {
  .side-bar {
    width: 50px;
  }

  .nav-bar,
  .main-container {
    left: 50px;
    width: calc(100% - 50px);
  }

  :deep(.route-header) {
    margin-left: -10px;
  }
}
</style>
