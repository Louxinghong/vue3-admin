import { defineStore } from "pinia";
import { ref } from "vue";

const useRouterCacheStore = defineStore(
  "routerCache",
  () => {
    const routerCacheList = ref<Array<string>>([]);
    const addRouterCache = (name: string) => {
      !routerCacheList.value.includes(name) && routerCacheList.value.push(name);
    };

    return {
      routerCacheList,
      addRouterCache,
    };
  },
  {
    // persist: true // 数据持久化, 防止浏览器刷新丢失数据
  },
);

export default useRouterCacheStore;
