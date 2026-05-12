<template>
  <div class="main-container">
    <a-watermark
      class="water-mark"
      :content="[userName, dayjs().format('YYYY-MM-DD')]"
      :gap="[90, 50]"
    >
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <keep-alive :include="routerCacheList">
            <component :is="Component" :key="$route.name" />
          </keep-alive>
        </transition>
      </router-view>
    </a-watermark>
  </div>
</template>

<script name="MainContainer" lang="ts" setup>
import dayjs from "dayjs";
import { getLocalStorage } from "@/utils/localStorage";
import useRouterCacheStore from "@/store/modules/routerCache";
import { storeToRefs } from "pinia";

const userName = getLocalStorage("userName"); // 获取userName
// 获取路由缓存
const routerCacheStore = useRouterCacheStore();
const { routerCacheList } = storeToRefs(routerCacheStore);
</script>

<style lang="less" scoped>
.main-container {
  position: absolute;
  top: 80px;
  left: 250px;
  padding: 10px;
  height: calc(100% - 80px);
  width: calc(100% - 250px);
  overflow-y: auto;
  background: #fff;
  transition: width 0.5s, left 0.5s;

  .arco-watermark {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-y: auto !important;

    & > div {
      position: relative;
      width: 100%;
      height: 100%;
    }
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.5s ease;
}
</style>
