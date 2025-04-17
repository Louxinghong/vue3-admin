<template>
  <div class="search-table">
    <search-content :loading="loading" @search="onSearch"></search-content>
    <table-content :loading="loading" :table-data="tableData">
      <template
        v-for="item in Object.keys(slots)"
        :key="item"
        #[item]="{ record }"
      >
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

const tableData = ref<any[]>([]);

// 搜索方法
const onSearch = async () => {
  // const { loading, tableData, pagination, getTableData } = useTable<{
  //   msg: number;
  // }>(api, { msg: 123 });

  tableData.value = [
    {
      phone: "1",
    },
  ];
};
</script>
