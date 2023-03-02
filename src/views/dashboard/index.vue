<template>
  <div>
    123
    <el-button @click="onShowData">点我</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import { getViewData } from '@/api/index'

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const onShowData = async () => {
      const result = await getViewData()
      console.log(result)
    }

    return {
      onShowData
    }
  }
})
</script>
