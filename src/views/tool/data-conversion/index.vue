<template>
  <div class="data-conversion">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" title="EXCEL转JSON">
        <file-upload @success="onUploadFile" />

        <json-viewer
          class="json-viewer"
          :value="jsonResult"
          :copyable="true"
          :expand-depth="2"
          boxed
        />
      </a-tab-pane>
      <a-tab-pane key="2" title="JSON转EXCEL">
        <a-textarea class="json-excel" placeholder="请输入JSON内容" v-model="jsonToExcelData" />
        <a-button class="btn-convert-json" type="primary" @click="onConvertJsonToExcel">
          <template #icon>
            <svg-icon name="convert" size="15px" />
          </template>
          转换EXCEL
        </a-button>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import * as XLSX from 'xlsx'

let jsonResult = ref<Array<[]>>([])
const onUploadFile = (value: []) => {
  console.log(value)
  jsonResult.value = value
}

let jsonToExcelData = ref<string>('')
const onConvertJsonToExcel = () => {
  console.log(jsonToExcelData.value)
  console.log(JSON.parse(jsonToExcelData.value))
  const result = XLSX.utils.json_to_sheet(JSON.parse(jsonToExcelData.value))
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, result, 'data')
  XLSX.writeFile(wb, '测试表格.xlsx')
}
</script>

<style lang="scss" scoped>
.json-viewer {
  margin-top: 10px;
}

.json-excel {
  width: 100%;
  height: 75vh;
}

.btn-convert-json {
  margin-top: 10px;
}
</style>
