<template>
  <div class="search-container">
    <a-form :model="searchForm" layout="inline">
      <a-form-item v-for="item in searchConfig">
        <template #label>
          {{ item.label }}
        </template>
        <template v-if="item.type === 'input'">
          <a-input
            v-model="searchForm[item.prop]"
            :placeholder="`请输入${item.label}`"
          />
        </template>
        <template v-else-if="item.type === 'select'">
          <a-select
            v-model="searchForm[item.prop]"
            :placeholder="`请选择${item.label}`"
          >
            <a-option
              v-for="option in item.options"
              :key="option.value"
              :value="option.value"
              >{{ option.label }}</a-option
            >
          </a-select>
        </template>
        <template v-else-if="item.type === 'dateRange'">
          <a-range-picker
            v-model="searchForm[item.prop]"
            style="width: 254px"
          />
        </template>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" :loading="loading" @click="onSearch">
          <template #icon>
            <icon-search />
          </template>
          查询
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script name="SearchContent" lang="ts" setup>
import { inject } from "vue";
import { IconSearch } from "@arco-design/web-vue/es/icon";

interface Props {
  loading: boolean;
}

const { loading = false } = defineProps<Props>();
// 获取父组件传递的数据
const { searchForm, searchConfig } = inject<{
  searchForm: Record<string, any>;
  searchConfig: Array<{
    label: string;
    type: string;
    prop: string;
    options?: Array<{ value: any; label: string }>;
  }>;
}>("provideData")!;

// 搜索方法
const emit = defineEmits(["search"]);
const onSearch = () => {
  emit("search", searchForm);
};
</script>
