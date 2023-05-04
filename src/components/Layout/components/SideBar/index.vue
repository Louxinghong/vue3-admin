<template>
  <div class="side-bar">
    <a-menu :default-open-keys="['0']" :default-selected-keys="['0_1']">
      <router-link to="/">
        <a-menu-item class="route-header" :key="routeHeader.path">
          <template #icon>
            <svg-icon :name="routeHeader.meta.icon" />
          </template>
          {{ routeHeader.meta.title }}
        </a-menu-item>
      </router-link>

      <bar-item :routes="routeList"></bar-item>
    </a-menu>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router/index'
import BarItem from './components/BarItem.vue'

const routeHeader = router.options.routes[0]
const routeList = router.options.routes.slice(1)
console.log(router.options.routes)
</script>

<style lang="scss" scoped>
.arco-menu {
  height: 100vh;
  background: #fff;

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
  }

  .arco-menu-item {
    padding: 4px 12px;

    &.arco-menu-selected {
      background: rgba(24, 144, 255, 0.1);
    }
  }

  .route-header {
    font-size: 20px;
    font-weight: bolder;
    color: #165dff;

    span {
      display: inline-block;
    }

    &.arco-menu-selected {
      font-weight: bolder;
      background: #fff;
    }

    &:hover {
      background: #fff;
      color: #165dff;
    }
  }
}
</style>
