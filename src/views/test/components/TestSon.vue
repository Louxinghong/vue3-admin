<template>
  <div class="test-son">
    <h2>{{ count }}</h2>
    <a-button type="primary" @click="onAddCount">点我count+1</a-button>
    <a-button type="primary" @click="onDeleteCount">点我count-1</a-button>
    <a-button type="primary" @click="propCountWatch.pause()">暂停watch</a-button>
    <a-button type="primary" @click="propCountWatch.resume()">恢复watch</a-button>
    <a-input v-model="testSonCount"></a-input>

    <slot :message="'hello world'"></slot>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts" setup>
import { watch, onWatcherCleanup } from "vue";

defineOptions({
  name: "TestSon",
});

// 父传子
interface Props {
  count: number;
}
const { count = 0 } = defineProps<Props>();
console.log("1111", count);
const propCountWatch = watch(
  () => count,
  (newVal, oldVal) => {
    console.log("count", newVal, oldVal);

    // const timer = setInterval(() => {
    //   // 做一些事情
    //   console.log("do something");
    // }, 2000);
    // onWatcherCleanup(() => {
    //   console.log("清理定时器");
    //   clearInterval(timer);
    // });
  },
);

// 子调父方法
const emit = defineEmits(["addCount", "update:count"]);
const onAddCount = () => emit("addCount");
// VUe3中子组件修改父组件传参，用v-model:count代替.sync方法
const onDeleteCount = () => emit("update:count", count - 1);

// 通过将字符串作为第一个参数传递给 defineModel() 来支持相应的参数
const testSonCount = defineModel("testSonCount", {
  type: Number,
  default: 0,
});
</script>
