import { defineStore } from "pinia";
import { ref } from "vue";

const useStatusStore = defineStore(
  "status",
  () => {
    const isCollapsed = ref<boolean>(false);
    const changeSideBarStatus = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    return {
      isCollapsed,
      changeSideBarStatus
    };
  },
  {
    persist: true // 数据持久化, 防止浏览器刷新丢失数据
  }
);

export default useStatusStore;
