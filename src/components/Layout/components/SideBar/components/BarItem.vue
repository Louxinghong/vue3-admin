<template>
  <div class="bar-item">
    <template v-for="item in props.routes">
      <template v-if="item.children">
        <a-sub-menu :key="`${basePath}/${item.path}`">
          <template v-if="item.meta.icon" #icon>
            <svg-icon :name="item.meta.icon"></svg-icon>
          </template>
          <template #title>{{ item.meta.title }}</template>

          <bar-item :routes="item.children" :base-path="resolvePath(item.path)"></bar-item>
        </a-sub-menu>
      </template>

      <template v-else>
        <router-link :to="`${basePath}/${item.path}`">
          <a-menu-item class="route-header" :key="`${basePath}/${item.path}`">
            <template v-if="item.meta" #icon>
              <svg-icon :name="item.meta.icon"></svg-icon>
            </template>
            {{ item.meta.title }}
          </a-menu-item>
        </router-link>
      </template>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { resolve } from 'path'
import BarItem from './BarItem.vue'

const props = defineProps({
  routes: {
    type: Array,
    default: () => []
  },
  basePath: {
    type: String,
    default: ''
  }
})

const resolvePath = (path: string) => {
  return resolve(props.basePath, path)
}
</script>

<style lang="scss" scoped></style>
