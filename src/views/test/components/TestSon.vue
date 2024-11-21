<template>
  <div class="test-son">
    <h2>{{ count }}</h2>
    <a-button type="primary" @click="onAddCount">点我count+1</a-button>
    <a-button type="primary" @click="propCountWatch.pause()">暂停watch</a-button>
    <a-button type="primary" @click="propCountWatch.resume()">恢复watch</a-button>
  </div>
</template>

<script name="TestSon" lang="ts" setup>
import { watch, onWatcherCleanup } from "vue";

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
  }
);

// 子调父方法
const emit = defineEmits(["addCount", "update:title"]);
const onAddCount = () => emit("addCount");
</script>
