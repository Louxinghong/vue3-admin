<template>
  <div class="todo-header">
    <h1 class="title">待办事项</h1>
    <div class="input-wrapper">
      <a-input
        v-model="inputValue"
        placeholder="添加新的待办事项..."
        @keyup.enter="handleAdd"
        class="todo-input"
      />
      <a-button type="primary" @click="handleAdd" class="add-btn"> 添加 </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits<{
  (e: "add", title: string): void;
}>();

const inputValue = ref("");

const handleAdd = () => {
  const title = inputValue.value.trim();
  if (title) {
    emit("add", title);
    inputValue.value = "";
  }
};
</script>

<style lang="less" scoped>
.todo-header {
  margin-bottom: 24px;

  .title {
    font-size: 24px;
    font-weight: 600;
    color: #1d2129;
    margin-bottom: 16px;
  }

  .input-wrapper {
    display: flex;
    gap: 12px;
  }

  .todo-input {
    flex: 1;
    max-width: 400px;
  }

  .add-btn {
    white-space: nowrap;
  }
}
</style>
