<template>
  <div class="bar-item">
    <template v-for="item in props.routes">
      <template v-if="!item.meta?.hidden">
        <!-- 若child里面都是hidden的子目录，那就采用a-menu-item而不是a-sub-item（不展示父目录右侧的展开肩头） -->
        <template
          v-if="
            item.children && item.children.filter((itemChild) => !itemChild.meta?.hidden).length > 0
          "
        >
          <a-sub-menu :key="resolvePath(item.path)">
            <template v-if="item.meta?.icon" #icon>
              <svg-icon :name="item.meta?.icon"></svg-icon>
            </template>
            <template #title>{{ item.meta?.title }}</template>

            <bar-item :routes="item.children" :base-path="resolvePath(item.path)"></bar-item>
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
import { resolve } from "path";
import { RouteRecordRaw } from "vue-router";
import useRouterTagStore from "@/store/modules/routerTag";
import BarItem from "./BarItem.vue";

interface Props {
  routes: RouteRecordRaw[];
  basePath?: string;
}
const props = withDefaults(defineProps<Props>(), {
  routes: () => [],
  basePath: ""
});

const resolvePath = (path: string) => {
  return resolve(props.basePath, path);
};

const routerTagStore = useRouterTagStore();
const onAddToRouterTag = (data: any, path: string) => {
  routerTagStore.addTag({
    title: data.meta.title,
    path
  });
};
</script>

<style lang="scss" scoped>
.bar-item {
  a {
    text-decoration: none;
  }
}
</style>
