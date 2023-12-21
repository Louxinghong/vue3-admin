<template>
  <div class="error-container">
    <a-empty>
      <template #image>
        <svg-icon class="icon-404" name="404"></svg-icon>
      </template>
      <p class="description">No auth</p>

      <a-button shape="round" @click="onBackDashboard">
        <template #icon>
          <svg-icon class="icon-back" name="back"></svg-icon>
        </template>
        返回首页
      </a-button>
    </a-empty>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
const onBackDashboard = () => {
  console.log(111)
  router.replace({ path: '/' })
}
</script>

<style lang="scss" scoped>
.error-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .icon-404 {
    font-size: 90px;
  }

  .description {
    margin-bottom: 10px;
    font-size: 40px;
  }
}
</style>
