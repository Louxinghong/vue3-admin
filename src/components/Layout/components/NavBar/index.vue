<template>
  <div class="nav-bar">
    <div class="menu-user">
      <div class="current-menu">
        <svg-icon
          class="is-collapsed"
          size="35px"
          :name="`scale-${isCollapsed ? 'out' : 'in'}`"
          @click="onChangeSideBarStatus"
        ></svg-icon>
        <span class="menu-title">{{ currentRouteData.title }}</span>
      </div>

      <img class="user-img" :src="USER_IMG" alt="logo" />
    </div>

    <router-tag-view :current-route-data="currentRouteData"></router-tag-view>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import useStatusStore from "@/store/modules/status";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { RouterTagViewConfig } from "@/utils/interface";
import RouterTagView from "./components/RouterTagView.vue";

const USER_IMG = new URL("@/assets/images/user.jpg", import.meta.url).href;
// 侧栏状态管理
const statusStore = useStatusStore();
const { isCollapsed } = storeToRefs(statusStore);
const onChangeSideBarStatus = () => {
  statusStore.changeSideBarStatus(!isCollapsed.value);
};

const router = useRouter();
const currentRouteData = computed<RouterTagViewConfig>(() => {
  const currentRoute = router.currentRoute.value;
  const currentData = {
    title: currentRoute.meta.title,
    path: currentRoute.path
  };
  return currentData;
});
</script>

<style lang="scss" scoped>
.nav-bar {
  position: absolute;
  top: 0;
  left: 250px;
  width: calc(100% - 250px);
  height: 92px;
  background: #fff;
  border-bottom: 1px solid #efefef;
  transition: width 0.5s, left 0.5s;
}

.menu-user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  width: 100%;

  .current-menu {
    display: flex;
    align-items: center;

    .is-collapsed {
      cursor: pointer;
    }

    .menu-title {
      margin-left: 10px;
    }
  }

  .user-img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
}
</style>
