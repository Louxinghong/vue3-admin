<template>
  <div class="history-menu-list">
    <a-button class="arrow" type="primary" @click="onHistoryMenuLeft">
      <icon-left />
    </a-button>

    <div ref="menuListRef" class="list">
      <div ref="menuScrollContentRef" class="scroll-content">
        <router-link
          :id="[props.currentRouteData.path === item.path ? 'list-item-actived' : 'list-item']"
          class="list-item"
          v-for="(item, index) in tagList"
          :key="item.path"
          :to="item.path"
          @click="onChangeRouter(index)"
        >
          <span
            :class="['tag', props.currentRouteData.path === item.path ? 'tag-actived' : '']"
          ></span>
          {{ item.title }}
          <icon-close
            v-if="item.path !== '/dashboard'"
            @click.prevent.stop="onCloseRouterTag(index)"
          />
        </router-link>
      </div>
    </div>

    <a-button class="arrow" type="primary" @click="onHistoryMenuRight">
      <icon-right />
    </a-button>
  </div>
</template>

<script name="RouterTagView" lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import useRouterTagStore from "@/store/modules/routerTag";
import { storeToRefs } from "pinia";
import { IconLeft, IconRight, IconClose } from "@arco-design/web-vue/es/icon";
import { RouterTagViewConfig } from "@/utils/interface";

interface Props {
  currentRouteData: RouterTagViewConfig;
}
const props = withDefaults(defineProps<Props>(), {
  currentRouteData: () => ({
    title: "",
    path: ""
  })
});

// 路由模块管理
const routerTagStore = useRouterTagStore();
const { tagList } = storeToRefs(routerTagStore);
const router = useRouter();
const onCloseRouterTag = (index: number) => {
  routerTagStore.removeTag(index);
  router.push(tagList.value[0].path);
};

const menuListRef = ref(); // 历史目录dom
const menuScrollContentRef = ref(); // 历史目录内部可滚动区域dom
// 历史目录dom宽度
const menuListlWidth = computed(() => {
  return menuListRef.value.offsetWidth;
});
// 历史目录内部可滚动区域dom宽度
const menuScrollContentWidth = computed(() => {
  return menuScrollContentRef.value.offsetWidth;
});
// 可滚动区域的left值
const menuScrollContentLeft = computed(() => {
  return menuScrollContentRef.value.offsetLeft;
});
// 左侧内容展示(向右滚动)
const onHistoryMenuLeft = () => {
  menuScrollContentRef.value.style.left = `${
    menuScrollContentLeft.value < 75 ? 0 : menuScrollContentLeft.value + 75
  }px`;
};
// 右侧内容展示(向左滚动)
const onHistoryMenuRight = () => {
  const restMoveWidth =
    menuScrollContentWidth.value - menuListlWidth.value - Math.abs(menuScrollContentLeft.value);
  menuScrollContentRef.value.style.left = `${
    menuScrollContentLeft.value - (restMoveWidth < 0 ? 0 : restMoveWidth < 75 ? restMoveWidth : 75)
  }px`;
};
// 点击路由tagview
const onChangeRouter = (index: number) => {
  const listItemEl: any = document.getElementsByClassName("list-item")[index];
  const moveWidth = listItemEl.offsetWidth + listItemEl.offsetLeft - menuListlWidth.value;
  moveWidth > 0 && (menuScrollContentRef.value.style.left = `-${moveWidth}px`);
};
</script>

<style lang="scss" scoped>
.history-menu-list {
  display: flex;
  align-items: center;
  padding: 1px;
  width: 100%;
  height: 32px;
  background: #f3f3f3;

  .arrow {
    padding: 0;
    width: 20px;
    height: 30px;
    border-radius: 2px;
    background: #fff;
    color: #a7a7a7;

    &:hover {
      background: #dddddd;
    }
  }

  .list {
    position: relative;
    margin: 0 2px;
    padding: 1px 0;
    width: calc(100% - 40px);
    height: 30px;
    font-size: 12px;
    overflow: hidden;

    .scroll-content {
      position: absolute;
      white-space: nowrap;
      overflow: visible;
      transition: left 0.3s ease, right 0.3s ease;

      &::-webkit-scrollbar {
        height: 0; /*高宽分别对应横竖滚动条的尺寸...*/
      }
    }

    .list-item {
      display: inline-block;
      padding: 0 5px;
      height: 28px;
      line-height: 28px;
      background: #fff;
      color: #797979;
      border-radius: 2px;
      cursor: pointer;
      text-decoration: none;

      &:not(:last-child) {
        margin-right: 5px;
      }

      .tag {
        display: inline-block;
        margin-right: 5px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #e5e5e5;

        &-actived {
          background: #165dff;
        }
      }

      .arco-icon-close {
        margin-left: 5px;
      }
    }
  }
}
</style>
