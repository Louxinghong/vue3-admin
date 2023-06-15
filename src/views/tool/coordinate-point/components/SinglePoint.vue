<template>
  <div class="single-point">
    <a-popover title="经纬度" trigger="click" position="bl">
      <a-button class="btn-single" type="primary" size="small">单点展示</a-button>
      <template #content>
        <a-input class="input-lng" placeholder="请输入经度" allow-clear v-model="coordinateLng" />
        <a-input class="input-lat" placeholder="请输入纬度" allow-clear v-model="coordinateLat" />
        <a-button type="primary" @click="onSubmit">确定</a-button>
      </template>
    </a-popover>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Message } from '@arco-design/web-vue'

let coordinateLng = ref('')
let coordinateLat = ref('')
const emit = defineEmits(['drawPoint'])
const onSubmit = () => {
  if (!coordinateLng.value || !coordinateLat.value) {
    Message.warning('请输入经纬度')
    return
  }

  emit('drawPoint', [{ lng: coordinateLng.value, lat: coordinateLat.value }])
}
</script>

<style lang="scss" scoped>
.input-lng,
.input-lat {
  margin-right: 10px;
  width: 120px;
}
</style>
