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
      <div class="current-user">
        <svg-icon name="dashboard" size="40px" />
      </div>
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

// 侧栏状态管理
let statusStore = useStatusStore();
let { isCollapsed } = storeToRefs(statusStore);
const onChangeSideBarStatus = () => {
  statusStore.changeSideBarStatus();
};

let router = useRouter();
let currentRouteData = computed<RouterTagViewConfig>(() => {
  let currentRoute = router.currentRoute.value;
  let currentData = {
    title: currentRoute.meta.title,
    path: currentRoute.path
  };
  return currentData;
});
</script>

<style lang="scss" scoped>
.menu-user {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
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
}

.history-menu-list {
  display: flex;
  align-items: center;
  padding: 1px;
  width: 100%;
  height: 32px;
  background: #f3f3f3;

  .arrow {
    padding: 0;
    width: 20px;
    height: 30px;
    border-radius: 2px;
    background: #fff;
    color: #a7a7a7;

    &:hover {
      background: #dddddd;
    }
  }

  .list {
    position: relative;
    margin: 0 2px;
    padding: 1px 0;
    width: calc(100% - 40px);
    height: 30px;
    font-size: 12px;
    overflow: hidden;

    .scroll-content {
      position: absolute;
      white-space: nowrap;
      overflow: visible;
      transition: left 0.3s ease, right 0.3s ease;

      &::-webkit-scrollbar {
        height: 0; /*高宽分别对应横竖滚动条的尺寸...*/
      }
    }

    .list-item {
      display: inline-block;
      padding: 0 5px;
      height: 28px;
      line-height: 28px;
      background: #fff;
      color: #797979;
      border-radius: 2px;
      cursor: pointer;
      text-decoration: none;

      &:not(:last-child) {
        margin-right: 5px;
      }

      .tag {
        display: inline-block;
        margin-right: 5px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #e5e5e5;

        &-actived {
          background: #165dff;
        }
      }

      .arco-icon-close {
        margin-left: 5px;
      }
    }
  }
}
</style>
