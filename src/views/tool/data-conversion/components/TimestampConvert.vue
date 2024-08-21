<template>
  <div class="timestamp-convert">
    <a-radio-group v-model="convertType">
      <a-radio :value="0">时间转换时间戳</a-radio>
      <a-radio :value="1">时间戳转换时间</a-radio>
    </a-radio-group>
    <div v-show="convertType === 0" class="convert-content">
      <a-date-picker v-model="dateString" show-time format="YYYY-MM-DD HH:mm:ss" />
      <span class="exchange" @click="onExchange">-></span>
      <a-input class="timestamp" v-model="timestamp" placeholder="请输入时间戳"></a-input>
    </div>
    <div v-show="convertType === 1" class="convert-content">
      <a-input class="timestamp" v-model="timestamp" placeholder="请输入时间戳"></a-input>
      <span class="exchange" @click="onExchange">-></span>
      <a-date-picker v-model="dateString" show-time format="YYYY-MM-DD HH:mm:ss" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import dayjs from "dayjs";

const convertType = ref<number>(0);
const dateString = ref<string>("");
const timestamp = ref<string>("");
const onExchange = () => {
  convertType.value === 0 && (timestamp.value = String(dayjs(dateString.value).valueOf()));
  convertType.value === 1 &&
    (dateString.value = dayjs(Number(timestamp.value)).format("YYYY-MM-DD HH:mm:ss"));
};
</script>

<style lang="scss" scoped>
.convert-content {
  display: flex;
  align-items: center;
  margin-top: 10px;

  .exchange {
    margin: 0 10px;
    cursor: pointer;
  }

  .timestamp {
    width: 200px;
  }
}
</style>
