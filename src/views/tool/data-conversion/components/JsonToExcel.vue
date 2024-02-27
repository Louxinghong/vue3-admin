<template>
  <div class="json-to-excel">
    <a-textarea class="json-excel" placeholder="请输入JSON内容" v-model="jsonToExcelData" />
    <a-button class="btn-convert-json" type="primary" @click="onConvertJsonToExcel">
      <template #icon>
        <svg-icon name="convert" size="15px" />
      </template>
      转换EXCEL
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import * as XLSX from 'xlsx'

let jsonToExcelData = ref<string>('')
const onConvertJsonToExcel = () => {
  const result = XLSX.utils.json_to_sheet(JSON.parse(jsonToExcelData.value))
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, result, 'data')
  XLSX.writeFile(wb, '测试表格.xlsx')
}
</script>

<style lang="scss" scoped>
.json-excel {
  width: 100%;
  height: 75vh;
}

.btn-convert-json {
  margin-top: 10px;
}
</style>
