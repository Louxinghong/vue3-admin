<template>
  <div class="json-to-excel">
    <div class="type-select">
      <a-radio-group v-model="fileNumType">
        <a-radio value="single">单表</a-radio>
        <a-radio value="batch">多表</a-radio>
      </a-radio-group>
    </div>
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
import { ref } from "vue";
import * as XLSX from "xlsx";
import { ExcelFileResult } from "@/utils/interface";

const fileNumType = ref<string>("single");
const jsonToExcelData = ref<string>("");
const onConvertJsonToExcel = () => {
  const WB = XLSX.utils.book_new();
  if (fileNumType.value === "single") {
    const result = XLSX.utils.json_to_sheet(JSON.parse(jsonToExcelData.value));
    XLSX.utils.book_append_sheet(WB, result, "data");
  } else {
    JSON.parse(jsonToExcelData.value).map((item: ExcelFileResult) => {
      const result = XLSX.utils.json_to_sheet(item.sheetList);
      XLSX.utils.book_append_sheet(WB, result, item.sheetName);
    });
  }
  XLSX.writeFile(WB, "测试表格.xlsx");
};
</script>

<style lang="less" scoped>
.type-select {
  margin-bottom: 10px;
}

.json-excel {
  width: 100%;
  height: 75vh;
}

.btn-convert-json {
  margin-top: 10px;
}
</style>
