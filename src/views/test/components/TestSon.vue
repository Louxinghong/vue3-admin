<template>
  <div class="test-son">
    <h2>{{ count }}</h2>
    <el-button type="primary" @click="onAddCount">点我count+1</el-button>
  </div>
</template>

<script lang="ts" setup>
// 父传子
interface Props {
  count: number
}
const props = withDefaults(defineProps<Props>(), {
  count: 0
})

// 子调父方法
const emit = defineEmits(['addCount'])
const onAddCount = () => emit('addCount')
</script>
