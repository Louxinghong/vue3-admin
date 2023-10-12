<template>
  <div class="test">
    <a-button @click="onAddCount">给我+1</a-button>
    <TestSon :count="count" @addCount="onAddCount"></TestSon>

    <p>state.count: {{ state.count }}</p>
    <p>computedEven2: {{ computedEven2 }}</p>
    <a-button type="primary" @click="onChangeComputed">改变计算属性</a-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import TestSon from './components/TestSon.vue'
import { getAIData } from '@/api/index'

const count = ref<number>(12)
const state = ref({
  count: 1,
  userInfo: {
    name: 'xiaohong',
    age: 25,
    gender: '男'
  }
})
let nameOptions = ref({
  name: 'xiaohong'
})
console.log(nameOptions.value.name)

interface enumOptions {
  label: string
  value: number
}
const options = ref<Array<enumOptions>>([
  {
    label: '123',
    value: 1
  }
])

console.log(options.value[0].label)

// 只读计算属性
const computedEven1 = computed(() => state.value.count % 2)
// 可读可写
const computedEven2 = computed<number>({
  get: () => {
    return state.value.count + 1
  },
  set: (value) => {
    state.value.count = value
  }
})
watch(
  () => state.value.count,
  (newVal, oldVal) => {
    console.log(newVal, oldVal)
  },
  {
    immediate: true
  }
)

const onAddCount = () => count.value++
const onChangeComputed = async () => {
  computedEven2.value += 2
  // const result = await getAIData()
  // console.log(result)
}

const swap = <T, U>(tuple: [T, U]): [U, T] => {
  return [tuple[1], tuple[0]]
}
const result = swap<string, number>(['xiaohong', 111])
console.log(result)

interface Iprint<T, U> {
  (param1: T, param2: U): U
}
const myPrint: Iprint<number, string> = (param1, param2) => {
  return `${param1} + 1 + ${param2}`
}
console.log(myPrint(123, '小红'))
</script>
