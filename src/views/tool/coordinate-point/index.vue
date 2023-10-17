<template>
  <div class="coordinate-point">
    <a-space class="actions">
      <!-- 绘制多点 -->
      <point-info @drawPoint="onDrawPoint"></point-info>
    </a-space>

    <div id="map-container" class="map-container"></div>
  </div>
</template>

<script lang="ts" setup>
// 在Vue3中使用时,需要引入Vue3中的shallowRef方法(使用shallowRef进行非深度监听, 因为在Vue3中所使用的Proxy拦截操作会改变JSAPI原生对象,所以此处需要区别Vue2使用方式对地图对象进行非深度监听, 否则会出现问题,建议JSAPI相关对象采用非响应式的普通对象来存储)
import { ref, shallowRef, onMounted } from 'vue'
import { getAMapData } from '@/api/index'
import PointInfo from './components/PointInfo.vue'

let map = shallowRef<any>({})
let AMap = ref<any>({})
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
  id?: number
  lng: string
  lat: string
  address?: string
}
const onDrawPoint = (params: Array<lngLatData>) => {
  map.value.clearMap()
  markers.value = []

  params.forEach((item) => {
    let marker = ref({})
    marker.value = new AMap.Marker({
      map: map.value,
      icon: new AMap.Icon({
        size: new AMap.Size(36, 36),
        image: new URL('@/assets/images/point-marker.png', import.meta.url).href,
        imageSize: new AMap.Size(36, 36),
        imageOffset: new AMap.Pixel(0, 0)
      }),
      position: [item.lng, item.lat],
      offset: new AMap.Pixel(-18, -36)
    })
    markers.value.push(marker.value)
  })

  map.value.setFitView()
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
