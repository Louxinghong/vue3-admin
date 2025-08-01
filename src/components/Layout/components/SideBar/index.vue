<template>
  <div class="side-bar">
    <a-menu
      :collapsed="isCollapsed"
      :auto-scroll-into-view="true"
      :auto-open-selected="true"
      :selected-keys="[useRouter().currentRoute.value.path]"
    >
      <router-link to="/">
        <a-menu-item class="route-header" :key="routeHeader.path">
          <template #icon>
            <svg-icon size="40px" :name="routeHeader.meta?.icon" />
          </template>
          {{ routeHeader.meta?.title }}
        </a-menu-item>
      </router-link>

      <bar-item :routes="routeList"></bar-item>
    </a-menu>
  </div>
</template>

<script name="SideBar" setup lang="ts">
import router from "@/router/index";
import BarItem from "./components/BarItem.vue";
import { useRouter } from "vue-router";
import useStatusStore from "@/store/modules/status";
import { storeToRefs } from "pinia";

const routeHeader = router.options.routes.filter((item) => item.meta?.isDashboard)[0];
const routeList = router.options.routes.filter(
  (item) => !item.meta?.hidden && !item.meta?.isDashboard
);
const statusStore = useStatusStore();
const { isCollapsed } = storeToRefs(statusStore);
</script>

<style lang="less" scoped>
.side-bar {
  width: 250px;
  background: #fff;
  transition: width 0.5s;
}

.arco-menu {
  height: 100vh;
  border-right: 1px solid #ececec;

  &-collapsed {
    width: 55px;
  }

  :deep(.arco-menu-inner) {
    padding: 10px 5px;

    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 0; /*高宽分别对应横竖滚动条的尺寸*/
    }
    &::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 10px;
      background-color: #eeeeee;
    }
    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      background-color: #fff;
      border-radius: 10px;
    }

    .arco-menu-selected {
      border-radius: 6px;
    }
  }

  .route-header {
    font-size: 20px;
    font-weight: bolder;
    color: #222;

    &.arco-menu-selected {
      font-weight: bolder;
      background: #fff;
    }

    &:hover {
      background: #fff;
    }
  }
}
</style>
