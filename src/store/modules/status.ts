import { defineStore } from "pinia";
import { ref } from "vue";

const useStatusStore = defineStore(
  "status",
  () => {
    const isCollapsed = ref<boolean>(false);
    const changeSideBarStatus = (status: boolean) => {
      isCollapsed.value = status;
    };

    const isMobile = ref<boolean>(false);
    const changeIsMoblieStatus = (status: boolean) => {
      isMobile.value = status;
    };

    return {
      isCollapsed,
      changeSideBarStatus,
      isMobile,
      changeIsMoblieStatus
    };
  },
  {
    persist: true // 数据持久化, 防止浏览器刷新丢失数据
  }
);

export default useStatusStore;
