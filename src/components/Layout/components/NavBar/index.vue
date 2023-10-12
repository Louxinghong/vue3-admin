<template>
  <div class="nav-bar">
    <svg-icon
      class="is-collapsed"
      size="35px"
      :name="`scale-${isCollapsed ? 'out' : 'in'}`"
      @click="onChangeSideBarStatus"
    ></svg-icon>
    <span class="menu-title">{{ currentRouteTitle }}</span>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import useStatusStore from '@/store/modules/status'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const statusStore = useStatusStore()
const { isCollapsed } = storeToRefs(statusStore)
const onChangeSideBarStatus = () => {
  statusStore.changeSideBarStatus()
}

const currentRouteTitle = computed(() => {
  const currentRoute = useRouter().currentRoute.value
  return currentRoute.meta ? currentRoute.meta.title : '-'
})
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  align-items: center;
  padding: 5px 15px;

  .is-collapsed {
    cursor: pointer;
  }

  .menu-title {
    margin-left: 10px;
  }
}
</style>
