<template>
  <div class="table-container">
    <a-table
      :loading="loading"
      :data="tableData"
      :bordered="{ cell: true }"
      :scroll="{
        x: '100%',
      }"
      stripe
      scrollbar
    >
      <template #columns>
        <table-item v-for="item in tableConfig" :key="item.dataIndex" :column-config="item">
          <template v-for="item in Object.keys(slots)" :key="item" #[item]="{ record }">
            <slot :name="item" :record="record"></slot>
          </template>
        </table-item>
      </template>
    </a-table>
  </div>
</template>

<script name="TableContent" lang="ts" setup>
import { useSlots } from "vue";
import TableItem from "./TableItem.vue";

const slots = useSlots();

const {
  loading = false,
  tableConfig,
  tableData = [],
} = defineProps<{
  loading: boolean;
  tableConfig: Array<CommonConfig.TableColumnConfig>;
  tableData: any[];
}>();
</script>
