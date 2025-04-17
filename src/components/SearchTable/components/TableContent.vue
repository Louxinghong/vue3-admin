<template>
  <div class="table-container">
    <a-table
      :loading="loading"
      :data="tableData"
      :bordered="{ cell: true }"
      :scroll="{
        x: '120%',
      }"
      scrollbar
    >
      <template #columns>
        <table-item
          v-for="item in provideData.tableConfig"
          :key="item.dataIndex"
          :column-config="item"
        >
          <template
            v-for="item in Object.keys(slots)"
            :key="item"
            #[item]="{ record }"
          >
            <slot :name="item" :record="record"></slot>
          </template>
        </table-item>
      </template>
    </a-table>
  </div>
</template>

<script name="TableContent" lang="ts" setup>
import { inject, useSlots } from "vue";
import TableItem from "./TableItem.vue";

const slots = useSlots();

interface Props {
  loading: boolean;
  tableData: any[];
}
const { loading = false, tableData = [] } = defineProps<Props>();

// 获取最上级组件传递的数据
const provideData: any = inject("provideData");
</script>
