<template>
  <div class="trans-address">
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
      v-model="coordinateList"
    />

    <svg-icon
      class="exchange"
      name="exchange"
      :width="'40px'"
      :height="'40px'"
      @click="coordinateToAddress"
    ></svg-icon>

    <a-textarea class="coordinate-list" v-model="addressList" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { customGetAddress } from '@/utils/mapUtils'
import { getAMapData } from '@/api/index'

let AMap = ref<any>({})
onMounted(async () => {
  AMap = await getAMapData()
})

let coordinateList = ref<string>('')
let addressList = ref<string>('')

const coordinateToAddress = async () => {
  addressList.value = ''

  await Promise.all(
    coordinateList.value.split('\n').map(async (item) => {
      const result = await customGetAddress(AMap, item.split(',')[0], item.split(',')[1])
      if (!addressList.value) {
        addressList.value = result
      } else {
        addressList.value += `\n${result}`
      }
    })
  )
}
</script>

<style lang="scss" scoped>
.trans-address {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.coordinate-list,
.address-list {
  width: 45%;
  height: 80vh;
}

.address-list {
  background: #dfdfdf;
}

.exchange {
  cursor: pointer;

  &:hover {
    width: 60px;
    height: 60px;
    transition: all 1s;
  }
}
</style>
