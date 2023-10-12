<template>
  <div class="test-son">
    <h2>{{ count }}</h2>
    <a-button type="primary" @click="onAddCount">点我count+1</a-button>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue'

// 父传子
interface Props {
  count: number
}
const props = withDefaults(defineProps<Props>(), {
  count: 0
})
watch(
  () => props.count,
  (newVal, oldVal) => {
    console.log('count', newVal, oldVal)
  }
)

// 子调父方法
const emit = defineEmits(['addCount'])
const onAddCount = () => emit('addCount')
</script>
