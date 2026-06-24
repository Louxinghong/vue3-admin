<template>
  <div class="todo-item" :class="{ completed: todo.completed }">
    <a-checkbox :checked="todo.completed" @change="handleToggle" class="todo-checkbox" />
    <span class="todo-title">{{ todo.title }}</span>
    <a-button type="text" status="danger" @click="handleDelete" class="delete-btn"> 删除 </a-button>
  </div>
</template>

<script lang="ts">
import type { Todo } from "@/utils/interface";

export default {
  props: {
    todo: {
      type: Object as () => Todo,
      required: true,
    },
  },
  methods: {
    handleToggle() {
      this.$emit("toggle", this.todo.id);
    },
    handleDelete() {
      this.$emit("delete", this.todo.id);
    },
  },
};
</script>

<style lang="less" scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &.completed {
    .todo-title {
      text-decoration: line-through;
      color: #8f959e;
    }
  }

  .todo-checkbox {
    margin-right: 12px;
  }

  .todo-title {
    flex: 1;
    font-size: 14px;
    color: #1d2129;
  }

  .delete-btn {
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover .delete-btn {
    opacity: 1;
  }
}
</style>
