<template>
  <div
    :class="[
      'layout',
      `layout${isCollapsed ? '' : '-no'}-collapsed`,
      isMobile ? 'layout-mobile' : '',
    ]"
  >
    <div
      v-show="!isCollapsed && isMobile"
      class="layout-no-collapsed-mask"
      @click="onCollapsed"
    ></div>

    <side-bar></side-bar>

    <nav-bar></nav-bar>

    <main-container></main-container>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount } from "vue";
import SideBar from "./components/SideBar/index.vue";
import NavBar from "./components/NavBar/index.vue";
import MainContainer from "./components/MainContainer/index.vue";
import useStatusStore from "@/store/modules/status";
import { storeToRefs } from "pinia";

const statusStore = useStatusStore();
const { isCollapsed, isMobile } = storeToRefs(statusStore);
const MOBILE_WIDTH = 992;

// 添加自适应监听事件
onBeforeMount(() => {
  window.addEventListener("resize", onAdapation);
});
const onAdapation = () => {
  const screenWidth = document.body.getBoundingClientRect().width;
  statusStore.changeIsMoblieStatus(screenWidth <= MOBILE_WIDTH);
  statusStore.changeSideBarStatus(screenWidth <= MOBILE_WIDTH);
};
const onCollapsed = () => {
  statusStore.changeSideBarStatus(true);
};
</script>

<style lang="less" scoped>
.layout-collapsed {
  .side-bar {
    width: 55px;
  }

  .nav-bar,
  .main-container {
    left: 55px;
    width: calc(100% - 55px);
  }

  :deep(.route-header) {
    margin-left: -10px;
  }
}

.layout-mobile {
  .nav-bar,
  .main-container {
    left: 0;
    width: 100%;
  }

  &.layout-no-collapsed {
    .side-bar {
      position: fixed;
      left: 0;
      top: 0;
      z-index: 9999;
    }
  }

  .layout-no-collapsed-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999;
  }
}
</style>
