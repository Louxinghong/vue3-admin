<template>
  <div class="coordinate-convert">
    <div class="type-select">
      <a-radio-group v-model="coordinateSingleOrBatch">
        <a-radio value="single">单量</a-radio>
        <a-radio value="batch">批量</a-radio>
      </a-radio-group>
    </div>
    <div class="coordinate-type-select">
      <span>坐标系 : </span>
      <a-radio-group v-model="coordinateType">
        <a-radio v-for="item in coordinateOptions" :value="item.value" :key="item.value">
          {{ item.label }}
        </a-radio>
      </a-radio-group>
    </div>
    <temlpate v-if="coordinateSingleOrBatch === 'single'">
      <div class="initial-coordinate">
        <span>坐标 : </span>
        <a-input
          class="coordinate-value"
          placeholder="请输入经纬度(逗号隔开)"
          allow-clear
          v-model="initialSingleCoordinate"
        />
        <a-button type="primary" @click="onConvertCoordinate">
          <template #icon>
            <svg-icon name="convert" size="15px" />
          </template>
          转换
        </a-button>
      </div>
      <ul class="result-coordinate">
        <li v-for="item in coordinateOptions" :key="item.value" class="item-result">
          <span>{{ item.label }}</span>
          <span>{{ singleCoordinateResult[item.value] }}</span>
        </li>
      </ul>
    </temlpate>
    <template v-else>
      <a-textarea
        class="coordinate-list"
        :placeholder="
          '请输入经纬度以换行隔开, 例如: ' +
          '\n' +
          '121.222222,23.342122' +
          '\n' +
          '121.222223,23.342123' +
          '\n' +
          '121.222224,23.342124'
        "
        v-model="initialBatchCoordinate"
      />
      <div class="coordinate-type-select">
        <span>目标坐标系 : </span>
        <a-radio-group v-model="batchCoordinateResultType">
          <a-radio v-for="item in coordinateOptions" :value="item.value" :key="item.value">
            {{ item.label }}
          </a-radio>
        </a-radio-group>
      </div>
      <a-button type="primary" @click="onConvertCoordinate">
        <template #icon>
          <svg-icon name="convert" size="15px" />
        </template>
        转换
      </a-button>

      <a-modal v-model:visible="showBatchResultCoordinate">
        <template #title> 批量转换经纬度结果 </template>
        <div class="batch-coordinate-result">{{ batchCoordinateResult }}</div>
      </a-modal>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  wgs84ToGcj02,
  wgs84ToBd09,
  gcj02ToBd09,
  gcj02ToWgs84,
  bd09ToWgs84,
  bd09ToGcj02
} from "@/utils/mapUtils";
import { Message } from "@arco-design/web-vue";

const coordinateSingleOrBatch = ref<string>("single"); // 坐标转换单量或批量
const coordinateType = ref<string>(""); // 初始坐标类型
const coordinateOptions = ref([
  {
    label: "WGS84(国际通用)",
    value: "wgs84"
  },
  {
    label: "BD09(百度地图)",
    value: "bd09"
  },
  {
    label: "GCJ02(高德、QQ地图)",
    value: "gcj02"
  }
  // {
  //   label: 'CGCS2000(2000国家大地坐标)',
  //   value: 'cgcs2000'
  // }
]);
// 单量经纬度
const initialSingleCoordinate = ref<string>("");
interface coordinateList {
  [key: string]: string;
}
const singleCoordinateResult = ref<coordinateList>({
  wgs84: "",
  gcj02: "",
  bd09: "",
  address: ""
  // cgcs2000: ''
});
// 批量经纬度
const initialBatchCoordinate = ref<string>("");
const batchCoordinateResultType = ref<string>(""); // 批量结果坐标类型
const showBatchResultCoordinate = ref<boolean>(false); // 批量结果弹窗状态
const batchCoordinateResult = ref<string>("");
// 经纬度转换
const onConvertCoordinate = async () => {
  if (!coordinateType.value) {
    Message.warning("请选择初始坐标系类型");
    return;
  }

  if (coordinateSingleOrBatch.value === "single") {
    if (!initialSingleCoordinate.value) {
      Message.warning("请输入初始坐标");
      return;
    }

    const transformCoordinate = initialSingleCoordinate.value.split(",");
    // 先给选中类型的自身赋值
    singleCoordinateResult.value[coordinateType.value] = initialSingleCoordinate.value;
    // 经纬度转换
    switch (coordinateType.value) {
      case "wgs84":
        singleCoordinateResult.value.gcj02 = wgs84ToGcj02(
          Number(transformCoordinate[0]),
          Number(transformCoordinate[1])
        ).join(",");
        singleCoordinateResult.value.bd09 = wgs84ToBd09(
          Number(transformCoordinate[0]),
          Number(transformCoordinate[1])
        ).join(",");
        break;
      case "gcj02":
        singleCoordinateResult.value.wgs84 = gcj02ToWgs84(
          Number(transformCoordinate[0]),
          Number(transformCoordinate[1])
        ).join(",");
        singleCoordinateResult.value.bd09 = gcj02ToBd09(
          Number(transformCoordinate[0]),
          Number(transformCoordinate[1])
        ).join(",");
        break;
      case "bd09":
        singleCoordinateResult.value.wgs84 = bd09ToWgs84(
          Number(transformCoordinate[0]),
          Number(transformCoordinate[1])
        ).join(",");
        singleCoordinateResult.value.gcj02 = bd09ToGcj02(
          Number(transformCoordinate[0]),
          Number(transformCoordinate[1])
        ).join(",");
        break;
      default:
        break;
    }
  } else {
    if (!initialBatchCoordinate.value || !batchCoordinateResultType.value) {
      Message.warning(!initialBatchCoordinate.value ? "请输入初始坐标" : "请选择目标坐标系类型");
      return;
    }
    if (coordinateType.value === batchCoordinateResultType.value) {
      Message.warning("经纬度初始类型与转换类型一致");
      return;
    }

    showBatchResultCoordinate.value = true;
    let result: string[] = [];
    switch (batchCoordinateResultType.value) {
      case "wgs84":
        result = initialBatchCoordinate.value
          .split("\n")
          .map((item) =>
            wgs84ToBd09(Number(item.split(",")[0]), Number(item.split(",")[1])).join(",")
          );
        break;
      case "gcj02":
        result = initialBatchCoordinate.value
          .split("\n")
          .map((item) =>
            gcj02ToBd09(Number(item.split(",")[0]), Number(item.split(",")[1])).join(",")
          );
        break;
      case "bd09":
        result = initialBatchCoordinate.value
          .split("\n")
          .map((item) =>
            bd09ToGcj02(Number(item.split(",")[0]), Number(item.split(",")[1])).join(",")
          );
        break;
      default:
        break;
    }
    batchCoordinateResult.value = result.join("\n");
  }
};
</script>

<style lang="scss" scoped>
.type-select {
  margin: 10px 0 20px;
}

.coordinate-type-select,
.initial-coordinate {
  display: flex;
  align-items: center;
  margin: 10px 0 15px;
}

.coordinate-value {
  margin: 0 10px;
  width: 80%;
}

.result-coordinate {
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    margin-bottom: 5px;
    width: 100%;

    span {
      display: inline-block;
      padding-left: 15px;
      height: 40px;
      line-height: 40px;

      &:nth-of-type(1) {
        width: 30%;
        background: rgba(190, 190, 190, 0.4);
        border-radius: 5px 0 0 5px;
      }

      &:nth-of-type(2) {
        width: 70%;
        background: rgba(190, 190, 190, 0.2);
        border-radius: 0 5px 5px 0;
      }
    }
  }
}

.coordinate-list {
  width: 100%;
  height: 300px;
}

.batch-coordinate-result {
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
