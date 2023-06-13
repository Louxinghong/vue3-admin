<template>
  <div class="coordinate-point">
    <div class="actions">
      <a-popover title="经纬度" trigger="click" position="bl">
        <a-button class="btn-single" type="primary" size="small">单点展示</a-button>
        <template #content>
          <a-input class="input-lng" placeholder="请输入经度" allow-clear v-model="coordinateLng" />
          <a-input class="input-lat" placeholder="请输入纬度" allow-clear v-model="coordinateLat" />
          <a-button type="primary" @click="onDrawPoint">确定</a-button>
        </template>
      </a-popover>

      <a-button class="btn-batch" type="primary" size="small">批量展示</a-button>
    </div>

    <div id="map-container" class="map-container"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getAMapData } from '@/api/index'

let map = ref('')
let AMap = ref({})
onMounted(async () => {
  AMap = await getAMapData()
  map = new AMap.Map('map-container', {
    zoom: 11, //级别
    center: [116.397428, 39.90923], //中心点坐标
    viewMode: '2D' //使用3D视图
  })
})

let coordinateLng = ref<string>('')
let coordinateLat = ref<string>('')
const onDrawPoint = () => {
  const marker = new AMap.Marker({
    icon: new AMap.Icon({
      size: new AMap.Size(35, 35),
      image: new URL('@/assets/images/point-marker.png', import.meta.url).href,
      imageSize: new AMap.Size(35, 35),
      imageOffset: new AMap.Pixel(0, 0)
    }),
    position: [coordinateLng.value, coordinateLat.value],
    offset: new AMap.Pixel(-18, -18)
  })
  marker.setMap(map)
}
</script>

<style lang="scss" scoped>
.coordinate-point {
  width: 100%;
  height: 100%;
}

.actions {
  margin-bottom: 10px;

  .btn-batch {
    margin-left: 10px;
  }
}

.input-lng,
.input-lat {
  margin-right: 10px;
  width: 120px;
}

.map-container {
  width: 100%;
  height: calc(100% - 35px);
  border-radius: 5px;
}
</style>
