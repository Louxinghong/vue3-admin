<template>
  <div class="table-item">
    <a-table-column
      :title="columnConfig.title"
      :align="columnConfig.align || 'center'"
      :fixed="columnConfig.fixed || ''"
    >
      <template v-if="columnConfig.children && columnConfig.children.length > 0">
        <table-item
          v-for="item in columnConfig.children"
          :key="item.dataIndex"
          :column-config="item"
        >
          <template v-for="item in Object.keys(slots)" :key="item" #[item]="{ record }">
            <slot :name="item" :record="record"></slot>
          </template>
        </table-item>
      </template>
      <template v-if="!columnConfig.children" #cell="{ record, column, rowIndex }">
        <template v-if="columnConfig.options">
          <a-tag
            v-if="columnConfig.type === 'tag'"
            :color="filterDataInOptions(record)?.tagColor || 'red'"
          >
            {{ filterDataInOptions(record)?.label }}
          </a-tag>
          <template v-else>{{ filterDataInOptions(record)?.label }}</template>
        </template>
        <template v-else-if="columnConfig.dataIndex === 'action'">
          <a-button
            v-for="(itemAction, actionIndex) in columnConfig.actions"
            :key="`action-${actionIndex}`"
            :type="itemAction.type"
            @click="onClickAction(itemAction.method, rowIndex)"
            >{{ itemAction.label }}</a-button
          >
        </template>
        <slot
          v-else-if="columnConfig.slotName"
          :name="columnConfig.slotName"
          :record="record"
        ></slot>
        <template v-else>{{ record[columnConfig.dataIndex] }}</template>
      </template>
    </a-table-column>
  </div>
</template>

<script name="TableItem" lang="ts" setup>
import { useSlots } from "vue";
import * as enumOptions from "@/utils/enumOptions";

const slots = useSlots();

interface Props {
  columnConfig: CommonConfig.TableColumnConfig;
}

const { columnConfig } = defineProps<Props>();

// 根据枚举类展示转换后的数据
const filterDataInOptions = (record: { [key: string]: any }) => {
  if (!columnConfig.options) {
    return;
  }

  return enumOptions[columnConfig.options].find(
    (item: CommonConfig.EnumOptions) =>
      Number(item.value) === Number(record[columnConfig.dataIndex]),
  );
};

// 调用最上级编辑方法
const onClickAction = (method: Function, rowIndex: number) => {
  method(rowIndex);
};
</script>
