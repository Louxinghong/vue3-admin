<template>
  <div class="batch-point">
    <a-popover title="" trigger="click" position="bl" style="width: 360px">
      <a-button class="btn-batch" type="primary">
        <template #icon>
          <svg-icon name="upload" size="15px" />
        </template>
        点位信息
      </a-button>

      <template #content>
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" title="手动输入">
            <div class="manual-list">
              <a-space v-for="(item, index) in manualInputList" :key="index">
                <a-input
                  class="input-lng"
                  placeholder="请输入经度"
                  allow-clear
                  v-model="item.lng"
                />
                <a-input
                  class="input-lat"
                  placeholder="请输入纬度"
                  allow-clear
                  v-model="item.lat"
                />
                <svg-icon
                  v-if="index === manualInputList.length - 1"
                  class="coordinate-add"
                  name="add"
                  size="20px"
                  @click="onAddManualInputList"
                />
                <svg-icon
                  v-if="manualInputList.length > 1"
                  class="coordinate-delete"
                  name="delete"
                  size="20px"
                  @click="onDeleteManualInputList(index)"
                />
              </a-space>
            </div>

            <a-space class="manual-actions">
              <a-button @click="onClear">清除</a-button>
              <a-button type="primary" @click="onSubmit">确定</a-button>
            </a-space>
          </a-tab-pane>
          <a-tab-pane key="2" title="数据导入">
            <file-upload @success="onUploadFile" />
            <a-button type="text" @click="onDownloadBatchPointDemo">(模板下载)</a-button>
          </a-tab-pane>
        </a-tabs>
      </template>
    </a-popover>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface lngLatData {
  lng: string;
  lat: string;
}
let manualInputList = ref<Array<lngLatData>>([
  {
    lng: "",
    lat: ""
  }
]);
const onAddManualInputList = () => {
  manualInputList.value.push({
    lng: "",
    lat: ""
  });
};
const onDeleteManualInputList = (index: number) => {
  manualInputList.value.splice(index, 1);
};

const emit = defineEmits(["drawPoint"]);
const onSubmit = () => {
  emit("drawPoint", manualInputList.value);
};
const onClear = () => {
  manualInputList.value = [{ lng: "", lat: "" }];
  emit("drawPoint", manualInputList.value);
};

interface batchLngLatData {
  address: string;
  coordinate: string;
}
const onDownloadBatchPointDemo = () => {
  location.href = "/mgmt-tool/file/batchPoint.xlsx";
};
const onUploadFile = (list: Array<batchLngLatData>) => {
  emit(
    "drawPoint",
    list.map((item) => {
      return {
        address: item.address,
        lng: item.coordinate.split(",")[0],
        lat: item.coordinate.split(",")[1]
      };
    })
  );
};
</script>

<style lang="scss" scoped>
.input-lng,
.input-lat {
  width: 120px;
}

.manual-list {
  display: flex;
  flex-flow: column nowrap;
  max-height: 350px;
  overflow-x: hidden;
  overflow-y: auto;

  .arco-space {
    &:not(:last-child) {
      margin-bottom: 10px;
    }

    .coordinate-add,
    .coordinate-delete {
      cursor: pointer;
    }
  }
}

.manual-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
