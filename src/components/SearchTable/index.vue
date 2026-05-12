<template>
  <div class="search-table">
    <search-content
      :loading="loading"
      :search-config="searchConfig"
      :search-form="searchForm"
      @search="onSearch"
    ></search-content>
    <table-content :loading="loading" :table-config="tableConfig" :table-data="tableData">
      <template v-for="item in Object.keys(slots)" :key="item" #[item]="{ record }">
        <slot :name="item" :record="record"></slot>
      </template>
    </table-content>
  </div>
</template>

<script name="SearchTable" lang="ts" setup>
import { ref, useSlots } from "vue";
import SearchContent from "./components/SearchContent.vue";
import TableContent from "./components/TableContent.vue";
import useTable from "@/hooks/useTable";

const slots = useSlots();

const { searchConfig, searchForm, tableConfig } = defineProps<{
  searchConfig: Array<CommonConfig.SearchConfig>;
  searchForm: Record<string, any>;
  tableConfig: Array<CommonConfig.TableColumnConfig>;
}>();

const { loading, tableData, pagination, getTableData } = useTable<{
  msg: number;
}>(() => {}, { msg: 123 });
// 搜索方法
const onSearch = async () => {
  getTableData();
};
</script>
