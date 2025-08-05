<template>
  <div class="search-container">
    <a-form class="search-form" :model="searchForm" layout="inline">
      <a-form-item v-for="item in searchConfig">
        <template #label>
          {{ item.label }}
        </template>
        <template v-if="item.type === 'input'">
          <a-input
            v-model="searchForm[item.prop]"
            :placeholder="`请输入${item.label}`"
            allow-clear
            :style="{
              width: `${item.width || 180}px`,
            }"
          />
        </template>
        <template v-else-if="item.type === 'select'">
          <a-select
            v-model="searchForm[item.prop]"
            :placeholder="`请选择${item.label}`"
            allow-search
            allow-clear
            :style="{
              width: `${item.width || 180}px`,
            }"
          >
            <a-option v-for="option in item.options" :key="option.value" :value="option.value">{{
              option.label
            }}</a-option>
          </a-select>
        </template>
        <template v-else-if="item.type === 'dateRange'">
          <a-range-picker v-model="searchForm[item.prop]" style="width: 254px" />
        </template>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" :loading="loading" @click="onSearch">
          <template #icon>
            <svg-icon name="search"></svg-icon>
          </template>
          查询
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script name="SearchContent" lang="ts" setup>
import { inject } from "vue";

interface Props {
  loading: boolean;
}

const { loading = false } = defineProps<Props>();
// 获取父组件传递的数据
const { searchForm, searchConfig } = inject<{
  searchForm: Record<string, any>;
  searchConfig: Array<CommonConfig.SearchConfig>;
}>("provideData")!;

// 搜索方法
const emit = defineEmits(["search"]);
const onSearch = () => {
  emit("search", searchForm);
};
</script>

<style lang="less" scoped>
.search-form {
  :deep(.arco-form-item-label) {
    color: #222;
    font-weight: 500;
  }

  :deep(.arco-input-wrapper) {
    border-radius: 6px;
  }

  :deep(.arco-select) {
    border-radius: 6px;
  }

  :deep(.arco-picker) {
    border-radius: 6px;
  }

  .arco-btn {
    border-radius: 6px;
  }
}
</style>
