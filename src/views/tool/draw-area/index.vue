<template>
  <div class="draw-area">
    <div id="map-container" class="map-container"></div>

    <div class="action-content">
      <template v-if="!drawAreaLoading">
        <a-button type="primary" @click="onDrawArea">绘制区域</a-button>
        <a-button type="primary" @click="onInputArea">输入区域</a-button>
        <!-- <file-upload @success="onTransPPoint"></file-upload> -->
      </template>
      <template v-else>
        <a-button @click="onExitEdit">退出编辑</a-button>
        <a-button type="primary" @click="onSaveArea">保存编辑</a-button>
      </template>
    </div>

    <!-- 区域配置弹窗 -->
    <dialog-info :visible="showAreaConfigDialog" :title="'区域经纬度'" @close="onCloseInputArea">
      <a-textarea
        class="area-input-list"
        placeholder="请输入区域经纬度，例如'[{\'lng\':117.392853,\'lat\':32.945922},{\'lng\':117.390888,\'lat\':32.96572},{\'lng\':117.373084,\'lat\':32.961718}']'"
        v-model="inputAreaInfo"
      />
    </dialog-info>
  </div>
</template>

<script name="DrawArea" lang="ts" setup>
import { ref, onMounted } from "vue";
import { getAMapData } from "@/api/index";
import { Message, Notification } from "@arco-design/web-vue";

const drawAreaLoading = ref<boolean>(false); // 编辑loading
const showAreaConfigDialog = ref<boolean>(false); // 显示区域配置弹窗
let map: any = null; // 地图实例
let AMap: any = null; // AMap实例
let mouseTool: any = null; // 鼠标工具实例
let polygonEditor: any = null; // 区域编辑实例
let inputAreaPolygon: any = null; // 输入区域实例
let pointMarkers: any = null; // 点标记实例

onMounted(async () => {
  AMap = await getAMapData({
    mapPlugins: ["AMap.MouseTool", "AMap.PolygonEditor"]
  });
  map = new AMap.Map("map-container", {
    center: [116.397428, 39.90923]
  });
  pointMarkers = new AMap.LabelsLayer({
    zooms: [3, 20],
    zIndex: 1000,
    collision: false
  });

  mouseTool = new AMap.MouseTool(map);
  mouseTool.on("draw", (event: any) => {
    inputAreaPolygon = event.obj;
    polygonEditor = new AMap.PolygonEditor(map, inputAreaPolygon);
    polygonEditor.open();
    mouseTool.close();
  });
});

// 绘制区域
const onDrawArea = () => {
  drawAreaLoading.value = true;
  inputAreaPolygon && inputAreaPolygon.setPath([]);
  mouseTool.polygon({
    strokeStyle: "dashed"
  });
  map.setDefaultCursor("crosshair");
};
// 保存绘制
const onSaveArea = () => {
  if (polygonEditor) {
    polygonEditor.close();
    let resultPath = polygonEditor.getTarget().getPath();
    inputAreaPolygon.setPath(resultPath);
    Notification.success({
      id: "1",
      title: "绘制结果",
      content: `${JSON.stringify(
        resultPath.map((item: any) => {
          return { lng: item.lng, lat: item.lat };
        })
      )}`,
      closable: true,
      duration: 0
    });
    map.remove(polygonEditor);
  }
  mouseTool && mouseTool.close();
  drawAreaLoading.value = false;
};

const inputAreaInfo = ref<string>("");
// 输入区域
const onInputArea = () => {
  showAreaConfigDialog.value = true;
};
// 关闭输入区域弹窗
const onCloseInputArea = (value: boolean) => {
  if (value) {
    if (!inputAreaInfo.value) {
      Message.warning("请输入区域经纬度");
      return;
    } else {
      // 因为JSON数据放入输入框，故需两次JSON.parse
      inputAreaPolygon = new AMap.Polygon({
        map: map,
        path: JSON.parse(inputAreaInfo.value).map((item: { lng: number; lat: number }) => [
          item.lng,
          item.lat
        ]),
        strokeColor: "#FF7A00",
        strokeStyle: "dashed",
        fillColor: "#FF7A00",
        fillOpacity: 0.2
      });
      map.setFitView();
    }
  }

  showAreaConfigDialog.value = false;
};
// 退出编辑
const onExitEdit = () => {
  map.setDefaultCursor("");
  polygonEditor && polygonEditor.close();
  mouseTool && mouseTool.close();
  inputAreaPolygon && inputAreaPolygon.setPath([]);
  drawAreaLoading.value = false;
};
// 获取停车点数据
const onTransPPoint = (list: Array<any>) => {
  let markerList: any = [];
  list[0].sheetList.forEach((item: any) => {
    let itemMarker = new AMap.LabelMarker({
      map: map,
      position: [JSON.parse(item.coordinate).lng, JSON.parse(item.coordinate).lat],
      icon: {
        type: "image",
        image: new URL("@/assets/images/point-marker.png", import.meta.url).href,
        size: [36, 36],
        anchor: "bottom-center"
      }
    });
    markerList.push(itemMarker);
  });
  pointMarkers.add(markerList);
  map.add(pointMarkers);
};
</script>

<style lang="scss" scoped>
.map-container {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.action-content {
  display: flex;
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 5px;

  .arco-btn {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}

.area-input-list {
  height: 200px;
}
</style>
