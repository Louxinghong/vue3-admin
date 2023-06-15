<template>
  <div class="batch-point">
    <a-popover title="" trigger="click" position="bl">
      <a-button class="btn-batch" type="primary" size="small">批量展示</a-button>
      <template #content>
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" title="手动输入">
            <div v-for="item in manualInputList" :key="item.id" class="manual-list">
              <a-space>
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
                  v-if="item.id === manualInputList.length"
                  class="coordinate-add"
                  name="add"
                  size="20px"
                  @click="onAddManualInputList"
                />
                <svg-icon v-if="item.id > 1" class="coordinate-delete" name="delete" size="20px" />
              </a-space>
            </div>

            <a-button @click="onSubmit">确定</a-button>
          </a-tab-pane>
          <a-tab-pane key="2" title="数据导入"> Content of Tab Panel 2 </a-tab-pane>
        </a-tabs>
      </template>
    </a-popover>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

interface lngLatData {
  id: number
  lng: string
  lat: string
}
let manualInputList = ref<Array<lngLatData>>([
  {
    id: 1,
    lng: '',
    lat: ''
  }
])
const onAddManualInputList = () => {
  manualInputList.value.push({
    id: manualInputList.value.length + 1,
    lng: '',
    lat: ''
  })
}

const emit = defineEmits(['drawPoint'])
const onSubmit = () => {
  emit('drawPoint', manualInputList.value)
}
</script>

<style lang="scss" scoped>
.input-lng,
.input-lat {
  width: 120px;
}

.manual-list {
  &:not(:last-child) {
    margin-bottom: 10px;
  }

  .coordinate-add,
  .coordinate-delete {
    cursor: pointer;
  }
}
</style>
