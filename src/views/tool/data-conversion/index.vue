<template>
  <div class="data-conversion">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" title="EXCEL转JSON">
        <excel-to-json></excel-to-json>
      </a-tab-pane>
      <a-tab-pane key="2" title="JSON转EXCEL">
        <json-to-excel></json-to-excel>
      </a-tab-pane>
      <a-tab-pane key="3" title="坐标转换">
        <coordinate-convert></coordinate-convert>
      </a-tab-pane>
      <a-tab-pane key="4" title="高德地址">
        <trans-address></trans-address>
      </a-tab-pane>
      <a-tab-pane key="5" title="时间戳转换">
        <timestamp-convert></timestamp-convert>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import ExcelToJson from "./components/ExcelToJson.vue";
import JsonToExcel from "./components/JsonToExcel.vue";
import CoordinateConvert from "./components/CoordinateConvert.vue";
import TransAddress from "./components/TransAddress.vue";
import TimestampConvert from "./components/TimestampConvert.vue";
</script>
