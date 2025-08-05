<template>
  <div class="waterfall-flow">
    <div
      v-for="item in 30"
      :key="item"
      ref="flowItem"
      class="flow-item"
      :style="{
        gridRowEnd: `span ${(item % 2 === 0 ? 50 : 100) / 2}`,
      }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, useTemplateRef } from "vue";

defineOptions({
  name: "WaterfallFlow",
});

const flowItemRefs = useTemplateRef("flowItem");
onMounted(() => {
  console.log(flowItemRefs.value);
});
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
