<template>
  <div class="coordinate-point">
    <div class="actions">
      <a-button class="btn-single" type="primary" size="mini" @click="onShowSingle"
        >单点展示</a-button
      >
      <a-button class="btn-batch" type="primary" size="mini">批量展示</a-button>
    </div>

    <div id="map-container" class="map-container"></div>
  </div>
</template>

<script lang="ts" setup>
import AMapLoader from '@amap/amap-jsapi-loader'
import { ref, onMounted } from 'vue'

let map = ref('')
onMounted(() => {
  console.log(`the component is now mounted.`)

  AMapLoader.load({
    key: '7243d2aa043b480d7b4808c9fd90d78b', // 申请好的Web端开发者Key，首次调用 load 时必填
    version: '1.4.15' // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
  })
    .then((AMap) => {
      map.value = new AMap.Map('map-container', {
        zoom: 11, //级别
        center: [116.397428, 39.90923], //中心点坐标
        viewMode: '2D' //使用3D视图
      })

      const marker = new AMap.Marker({
        icon: new AMap.Icon({
          size: new AMap.Size(25, 34),
          image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
          imageSize: new AMap.Size(135, 40),
          imageOffset: new AMap.Pixel(-95, -3)
        }),
        position: [116.406315, 39.908775],
        offset: new AMap.Pixel(-13, -30)
      })
      marker.setMap(map.value)
    })
    .catch((e) => {
      console.log(e)
    })
})

const onShowSingle = () => {}
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

.map-container {
  width: 100%;
  height: calc(100% - 35px);
  border-radius: 5px;
}
</style>
