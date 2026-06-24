<template>
  <div class="todo-filter">
    <a-space>
      <a-button
        v-for="item in filterOptions"
        :key="item.value"
        :type="currentFilter === item.value ? 'primary' : 'default'"
        @click="handleFilter(item.value)"
      >
        {{ item.label }}
      </a-button>
    </a-space>
  </div>
</template>

<script setup lang="ts">
import type { FilterType } from "@/utils/interface";

defineProps<{
  currentFilter: FilterType;
}>();

const emit = defineEmits<{
  (e: "change", filter: FilterType): void;
}>();

const filterOptions = [
  { label: "全部", value: "all" as FilterType },
  { label: "待完成", value: "active" as FilterType },
  { label: "已完成", value: "completed" as FilterType },
];

const handleFilter = (filter: FilterType) => {
  emit("change", filter);
};
</script>

<style lang="less" scoped>
.todo-filter {
  margin-bottom: 16px;
}
</style>
