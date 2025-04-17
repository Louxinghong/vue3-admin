<template>
  <div class="table-item">
    <a-table-column
      :title="columnConfig.title"
      :align="columnConfig.align"
      :fixed="columnConfig.fixed || ''"
    >
      <template
        v-if="columnConfig.children && columnConfig.children.length > 0"
      >
        <table-item
          v-for="item in columnConfig.children"
          :key="item.dataIndex"
          :column-config="item"
        ></table-item>
      </template>
      <template
        v-if="!columnConfig.children"
        #cell="{ record, column, rowIndex }"
      >
        <template v-if="columnConfig.filterOptions">
          {{
            filterDataInOptions(
              record[columnConfig.dataIndex],
              columnConfig.filterOptions
            )
          }}
        </template>
        <template v-else-if="columnConfig.dataIndex === 'action'">
          <a-button
            v-for="itemAction in columnConfig.actions"
            :key="itemAction.methods"
            :type="itemAction.type"
            @click="onClickAction(itemAction.methods, rowIndex)"
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
import { inject } from "vue";
import enumOptions from "@/utils/enumOptions";

interface Props {
  columnConfig: {
    title: string;
    dataIndex: string;
    align?: string;
    fixed?: string;
    filterOptions?: keyof typeof enumOptions;
    slotName?: string;
    actions?: {
      label: string;
      methods: string;
      type: "text" | "dashed" | "outline" | "primary" | "secondary" | undefined;
    }[];
    children?: {
      title: string;
      dataIndex: string;
      align: string;
    }[];
  };
}

const { columnConfig } = defineProps<Props>();

// 根据枚举类展示转换后的数据
const filterDataInOptions = (data: any, options: keyof typeof enumOptions) => {
  return enumOptions[options].find(
    (item: CommonConfig.EnumOptions) => Number(item.value) === Number(data)
  )?.label;
};

// 获取最上级组件传递的数据
const provideData: any = inject("provideData");
// 调用最上级编辑方法
const onClickAction = (methods: string, rowIndex: number) => {
  provideData[methods](rowIndex);
};
</script>
