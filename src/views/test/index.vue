<template>
  <div class="test">
    <TestSon :count="count" @addCount="onAddCount"></TestSon>

    <span>state.count: {{ state.count }}</span>
    <span>computedEven2: {{ computedEven2 }}</span>
    <el-button type="primary" @click="onChangeComputed">改变计算属性</el-button>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'fs'
import { ref, toRef, reactive, computed } from 'vue'
import TestSon from './components/TestSon.vue'

const count = ref<number>(12)
const state = reactive({
  count: 1,
  userInfo: {
    name: 'xiaohong',
    age: 25,
    gender: '男'
  }
})

// 只读计算属性
const computedEven1 = computed(() => state.count % 2)
// 可读可写
const computedEven2 = computed<number>({
  get: () => {
    return state.count % 2
  },
  set: (value) => {
    state.count = value
  }
})

const onAddCount = () => count.value++
const onChangeComputed = () => (computedEven2.value += 2)
</script>
