<template>
  <div class="todo-list">
    <TodoItem
      v-for="todo in todos"
      :key="todo.id"
      :todo="todo"
      @toggle="$emit('toggle', $event)"
      @delete="$emit('delete', $event)"
    />
    <div v-if="todos.length === 0" class="empty-tip">暂无待办事项，添加一个吧！</div>
  </div>
</template>

<script setup lang="ts">
import type { Todo } from "@/utils/interface";
import TodoItem from "./TodoItem.vue";

defineProps<{
  todos: Todo[];
}>();

defineEmits<{
  (e: "toggle", id: string): void;
  (e: "delete", id: string): void;
}>();
</script>

<style lang="less" scoped>
.todo-list {
  .empty-tip {
    text-align: center;
    padding: 40px;
    color: #8f959e;
    background: #f7f8fa;
    border-radius: 8px;
  }
}
</style>
