<template>
  <div class="nav-bar">
    <div class="menu-user">
      <div class="current-menu">
        <svg-icon
          class="menu-icon"
          v-show="isCollapsed"
          size="18px"
          name="menu-fold"
          @click="onChangeSideBarStatus"
        ></svg-icon>
        <svg-icon
          class="menu-icon"
          v-show="!isCollapsed"
          size="18px"
          name="menu-unfold"
          @click="onChangeSideBarStatus"
        ></svg-icon>
        <a-breadcrumb class="menu-title">
          <a-breadcrumb-item v-for="(item, index) in currentRouteData.title" :key="index">{{
            item
          }}</a-breadcrumb-item>
        </a-breadcrumb>
      </div>

      <a-dropdown trigger="hover">
        <div class="user-info">
          <svg-icon class="user-icon" size="35px" name="dashboard"></svg-icon>
          {{ userName }}
        </div>
        <template #content>
          <a-doption @click="onLogout">退出</a-doption>
        </template>
      </a-dropdown>
    </div>

    <router-tag-view :current-route-data="currentRouteData"></router-tag-view>
  </div>
</template>

<script name="NavBar" lang="ts" setup>
import { computed } from "vue";
import useStatusStore from "@/store/modules/status";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import RouterTagView from "./components/RouterTagView.vue";
import { getLocalStorage, clearLocalStorage } from "@/utils/localStorage";

// 侧栏状态管理
const statusStore = useStatusStore();
const { isCollapsed } = storeToRefs(statusStore);
const onChangeSideBarStatus = () => {
  statusStore.changeSideBarStatus(!isCollapsed.value);
};

// 用户名
const userName = computed(() => {
  return getLocalStorage("userName");
});

// 当前路由数据
const router = useRouter();
const currentRouteData = computed<CommonConfig.RouterTagViewConfig>(() => {
  const currentRoute = router.currentRoute.value;
  const currentData = {
    title: currentRoute.matched.map((item) => item.meta.title),
    path: currentRoute.path,
  };
  return currentData;
});

// 退出登录
const onLogout = () => {
  clearLocalStorage();
  router.replace("/login");
};
</script>

<style lang="less" scoped>
.nav-bar {
  position: absolute;
  top: 0;
  left: 250px;
  width: calc(100% - 250px);
  height: 80px;
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

    .menu-icon {
      cursor: pointer;
    }

    .is-collapsed {
      cursor: pointer;
    }

    .menu-title {
      margin-left: 15px;
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    padding: 0 5px;
    font-weight: 500;
    cursor: pointer;

    .user-icon {
      margin-right: 5px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
}
</style>
