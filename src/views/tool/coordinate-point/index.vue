<template>
  <div class="coordinate-point">
    <a-space class="actions">
      <!-- 绘制单点 -->
      <SinglePoint @drawPoint="onDrawPoint" />

      <!-- 绘制多点 -->
      <BatchPoint @drawPoint="onDrawPoint" />
    </a-space>

    <div id="map-container" class="map-container"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { getAMapData } from '@/api/index'
import SinglePoint from './components/SinglePoint.vue'
import BatchPoint from './components/BatchPoint.vue'

let map = ref<Object>({})
let AMap = ref<Object>({})
onMounted(async () => {
  AMap = await getAMapData()
  map.value = new AMap.Map('map-container', {
    zoom: 11, //级别
    center: [116.397428, 39.90923], //中心点坐标
    viewMode: '2D' //使用3D视图
  })
})

let markers = ref<Array<{}>>([])
interface lngLatData {
  id: number
  lng: string
  lat: string
}
const onDrawPoint = (params: Array<lngLatData>) => {
  markers.value && map.value.remove(markers.value)

  params.forEach((item) => {
    let marker = ref({})
    marker.value = new AMap.Marker({
      map: map.value,
      icon: new AMap.Icon({
        size: new AMap.Size(35, 35),
        image: new URL('@/assets/images/point-marker.png', import.meta.url).href,
        imageSize: new AMap.Size(35, 35),
        imageOffset: new AMap.Pixel(0, 0)
      }),
      position: [item.lng, item.lat],
      offset: new AMap.Pixel(-18, -18)
    })
    markers.value.push(marker.value)
  })
}
</script>

<style lang="scss" scoped>
.coordinate-point {
  width: 100%;
  height: 100%;
}

.actions {
  margin-bottom: 10px;
}

.map-container {
  width: 100%;
  height: calc(100% - 35px);
  border-radius: 5px;
}
</style>
