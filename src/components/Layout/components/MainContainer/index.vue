<template>
  <div class="main-container">
    <a-watermark
      class="water-mark"
      :content="['admin', dayjs().format('YYYY-MM-DD')]"
      :gap="[90, 50]"
    >
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
    </a-watermark>
  </div>
</template>

<script name="MainContainer" lang="ts" setup>
import dayjs from "dayjs";
</script>

<style lang="less" scoped>
.main-container {
  position: absolute;
  top: 92px;
  left: 250px;
  padding: 10px;
  height: calc(100% - 92px);
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
