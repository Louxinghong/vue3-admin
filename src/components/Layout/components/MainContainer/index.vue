<template>
  <div class="main-container">
    <router-view class="view" v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
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

  & > div {
    position: relative;
    width: 100%;
    height: 100%;
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
