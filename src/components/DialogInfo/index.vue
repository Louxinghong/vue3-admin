<template>
  <div class="dialog">
    <a-modal
      :visible="visible"
      :width="`${width}px`"
      :title-align="titleAlign"
      :draggable="draggable"
      :mask-closable="maskClosable"
      :before-close="onCancel"
      @ok="onConfirm"
      @cancel="onCancel"
    >
      <template #title>{{ title }}</template>
      <slot></slot>
    </a-modal>
  </div>
</template>

<script name="DialogInfo" lang="ts" setup>
interface Props {
  visible: boolean;
  width?: number;
  titleAlign?: "start" | "center";
  title?: string;
  draggable?: boolean;
  maskClosable?: boolean;
}

const {
  visible = false,
  width = 600,
  titleAlign = "start",
  title = "title",
  draggable = false,
  maskClosable = false
} = defineProps<Props>();

const emit = defineEmits(["close"]);
// 确认操作
const onConfirm = () => {
  emit("close", true);
};
// 取消操作
const onCancel = () => {
  emit("close");
};
</script>
