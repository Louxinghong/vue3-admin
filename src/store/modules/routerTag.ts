import { ref } from "vue";
import { defineStore } from "pinia";
import { RouterTagViewConfig } from "@/utils/interface";

const useRouterTagStore = defineStore(
  "routerTag",
  () => {
    let tagList = ref<Array<RouterTagViewConfig>>([
      {
        title: "首页",
        path: "/dashboard"
      }
    ]);
    const addTag = (data: RouterTagViewConfig) => {
      const findData = tagList.value.find((item) => item.path === data.path);
      !findData && tagList.value.push(data);
    };
    const removeTag = (index: number) => {
      tagList.value.splice(index, 1);
    };

    return {
      tagList,
      addTag,
      removeTag
    };
  },
  {
    persist: true // 数据持久化, 防止浏览器刷新丢失数据
  }
);

export default useRouterTagStore;
