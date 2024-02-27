<template>
  <div class="excel-to-json">
    <file-upload @success="onUploadFile" />

    <json-viewer class="json-viewer" :value="jsonResult" :copyable="true" :expand-depth="2" boxed />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

let jsonResult = ref<Array<[]>>([])
const onUploadFile = (list: []) => {
  jsonResult.value = list
}
</script>

<style lang="scss" scoped>
.json-viewer {
  margin-top: 10px;
}
</style>
