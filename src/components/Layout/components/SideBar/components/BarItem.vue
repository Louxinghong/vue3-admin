<template>
  <div class="bar-item">
    <template v-for="item in props.routes">
      <template v-if="!item.meta?.hidden">
        <!-- 若child里面都是hidden的子目录，那就采用a-menu-item而不是a-sub-item（不展示父目录右侧的展开肩头） -->
        <template
          v-if="
            item.children &&
            item.children.filter((itemChild) => !itemChild.meta?.hidden)
              .length > 0
          "
        >
          <a-sub-menu :key="resolvePath(item.path)">
            <template v-if="item.meta?.icon" #icon>
              <svg-icon :name="item.meta?.icon"></svg-icon>
            </template>
            <template #title>{{ item.meta?.title }}</template>

            <bar-item
              :routes="item.children"
              :base-path="resolvePath(item.path)"
            ></bar-item>
          </a-sub-menu>
        </template>

        <template v-else>
          <router-link :to="resolvePath(item.path)">
            <a-menu-item
              class="route-header"
              :key="resolvePath(item.path)"
              @click="onAddToRouterTag(item, resolvePath(item.path))"
            >
              <template v-if="item.meta?.icon" #icon>
                <svg-icon :name="item.meta?.icon"></svg-icon>
              </template>
              {{ item.meta?.title }}
            </a-menu-item>
          </router-link>
        </template>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
// 在浏览器环境中，无法直接使用 Node.js 的 'path' 模块，需要使用 vue-router 提供的 resolvePath 方法来处理路径
// 由于原代码中没有引入，这里假设已经引入了 useRoute 和 useRouter 用于处理路径
import { useRouter } from "vue-router";
const router = useRouter();

// 定义一个 resolve 函数来模拟 path.resolve 的功能
const resolve = (basePath: string, path: string) => {
  return router.resolve({ path: `${basePath}${basePath ? "/" : ""}${path}` })
    .fullPath;
};
import { RouteRecordRaw } from "vue-router";
import useRouterTagStore from "@/store/modules/routerTag";
import BarItem from "./BarItem.vue";

interface Props {
  routes: RouteRecordRaw[];
  basePath?: string;
}
const props = withDefaults(defineProps<Props>(), {
  routes: () => [],
  basePath: "",
});

const resolvePath = (path: string) => {
  return resolve(props.basePath, path);
};

const routerTagStore = useRouterTagStore();
const onAddToRouterTag = (data: any, path: string) => {
  routerTagStore.addTag({
    title: data.meta.title,
    path,
  });
};
</script>

<style lang="less" scoped>
.bar-item {
  a {
    text-decoration: none;
  }
}
</style>
