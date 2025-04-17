<template>
  <div class="waterfall-flow">
    <div
      :ref="setFlowItemRef"
      class="flow-item"
      v-for="item in 30"
      :key="item"
      :style="{
        gridRowEnd: `span ${(item % 2 === 0 ? 50 : 100) / 2}`
      }"
    ></div>
  </div>
</template>

<script name="WaterfallFlow" lang="ts" setup>
import { ref } from "vue";

const flowItemRefs = ref<Array<any>>([]);
const setFlowItemRef = (el: any) => {
  flowItemRefs.value.push(el);
};
</script>

<style lang="less" scoped>
.waterfall-flow {
  display: grid;
  grid-auto-flow: row dense;
  grid-gap: 5px;
  grid-auto-rows: 1px;
  grid-template-columns: repeat(5, minmax(20px, 1fr));
  width: 100%;
}

.flow-item {
  grid-row-start: auto;
  background: crimson;
}
</style>
