import { defineStore } from 'pinia'
import { ref } from 'vue'

const useStatusStore = defineStore(
  'status',
  () => {
    const isCollapsed = ref<boolean>(false)
    const changeSideBarStatus = () => {
      isCollapsed.value = !isCollapsed.value
    }

    return {
      isCollapsed,
      changeSideBarStatus
    }
  },
  {
    persist: true
  }
)
export default useStatusStore
