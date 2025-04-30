<template>
  <div class="excel-to-json">
    <file-upload @success="onUploadFile" />

    <json-viewer class="json-viewer" :value="jsonResult" :copyable="true" :expand-depth="2" boxed />
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import JsonViewer from "vue-json-viewer";

const jsonResult = ref<Array<[]>>([]);
const onUploadFile = (list: []) => {
  console.log(JSON.stringify(list));
  jsonResult.value = list;
};
</script>

<style lang="less" scoped>
.json-viewer {
  margin-top: 10px;
}
</style>
