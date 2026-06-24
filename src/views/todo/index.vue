<template>
  <div class="todo-page">
    <TodoHeader @add="handleAdd" />
    <TodoFilter :current-filter="filter" @change="handleFilterChange" />
    <TodoList :todos="filteredTodos" @toggle="handleToggle" @delete="handleDelete" />
    <div class="stats">
      <span>总计: {{ todoList.length }}</span>
      <span>待完成: {{ activeCount }}</span>
      <span>已完成: {{ completedCount }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Todo, FilterType } from "@/utils/interface";
import TodoHeader from "./components/TodoHeader.vue";
import TodoFilter from "./components/TodoFilter.vue";
import TodoList from "./components/TodoList.vue";

const todoList = ref<Todo[]>([
  {
    id: "1",
    title: "学习 Vue 3 Composition API",
    completed: false,
    createdAt: new Date("2026-05-15"),
  },
  { id: "2", title: "完成项目文档编写", completed: false, createdAt: new Date("2026-05-16") },
  { id: "3", title: "代码审查", completed: true, createdAt: new Date("2026-05-14") },
  { id: "4", title: "测试用例编写", completed: false, createdAt: new Date("2026-05-17") },
  { id: "5", title: "部署到生产环境", completed: true, createdAt: new Date("2026-05-13") },
]);

const filter = ref<FilterType>("all");

const filteredTodos = computed(() => {
  switch (filter.value) {
    case "active":
      return todoList.value.filter((todo) => !todo.completed);
    case "completed":
      return todoList.value.filter((todo) => todo.completed);
    default:
      return todoList.value;
  }
});

const activeCount = computed(() => todoList.value.filter((todo) => !todo.completed).length);
const completedCount = computed(() => todoList.value.filter((todo) => todo.completed).length);

const handleAdd = (title: string) => {
  const newTodo: Todo = {
    id: Date.now().toString(),
    title,
    completed: false,
    createdAt: new Date(),
  };
  todoList.value.unshift(newTodo);
};

const handleToggle = (id: string) => {
  const todo = todoList.value.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};

const handleDelete = (id: string) => {
  todoList.value = todoList.value.filter((todo) => todo.id !== id);
};

const handleFilterChange = (newFilter: FilterType) => {
  filter.value = newFilter;
};
</script>

<style lang="less" scoped>
.todo-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 32px;

  .stats {
    margin-top: 16px;
    padding: 12px 16px;
    background: #f7f8fa;
    border-radius: 8px;
    display: flex;
    gap: 24px;
    font-size: 14px;
    color: #8f959e;
  }
}
</style>
