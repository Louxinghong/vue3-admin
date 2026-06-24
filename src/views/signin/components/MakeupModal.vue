<template>
  <a-modal
    v-model:visible="modalVisible"
    title="补签"
    :mask-closable="true"
    :esc-to-close="true"
    @close="onClose"
    width="400px"
  >
    <template #footer>
      <a-button @click="onClose">取消</a-button>
      <a-button
        type="primary"
        :disabled="!selectedDate || makeupCards <= 0"
        @click="onConfirm"
        :loading="signinStore.loading"
      >
        确认补签
      </a-button>
    </template>

    <div class="makeup-content">
      <div class="makeup-info">
        <span>补签卡剩余：</span>
        <span class="card-count">{{ makeupCards }}</span>
        <span> 张</span>
      </div>

      <div v-if="makeupCards <= 0" class="no-cards-tip">
        补签卡不足，无法补签
      </div>

      <div v-else class="makeup-dates">
        <div class="dates-title">可补签日期（过去7天内未签到）</div>
        <div class="dates-list">
          <div
            v-for="date in availableDates"
            :key="date"
            class="date-item"
            :class="{ selected: selectedDate === date }"
            @click="selectDate(date)"
          >
            {{ formatDateLabel(date) }}
          </div>
          <div v-if="availableDates.length === 0" class="empty-tip">
            没有可补签的日期
          </div>
        </div>
      </div>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
defineOptions({
  name: "MakeupModal",
});
import { computed, ref, watch } from "vue";
import { Message } from "@arco-design/web-vue";
import dayjs from "dayjs";
import useSigninStore from "@/store/modules/signin";

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  "update:visible": [value: boolean];
}>();

const signinStore = useSigninStore();
const selectedDate = ref<string | null>(null);
const makeupCards = computed(() => signinStore.makeupCards);

// Sync with parent via v-model
const modalVisible = computed({
  get: () => props.visible,
  set: (val: boolean) => emit("update:visible", val),
});

const availableDates = computed(() => {
  const dates: string[] = [];
  const today = dayjs();
  for (let i = 1; i <= 7; i++) {
    const date = today.subtract(i, "day");
    const dateStr = date.format("YYYY-MM-DD");
    const signed = signinStore.records[dateStr];
    if (!signed) {
      dates.push(dateStr);
    }
  }
  return dates;
});

const formatDateLabel = (dateStr: string) => {
  const d = dayjs(dateStr);
  const weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][d.day()];
  return `${d.format("M月D日")} ${weekday}`;
};

const selectDate = (date: string) => {
  selectedDate.value = date;
};

const onClose = () => {
  selectedDate.value = null;
  modalVisible.value = false;
};

const onConfirm = async () => {
  if (!selectedDate.value || makeupCards.value <= 0) return;
  try {
    const result = await signinStore.doMakeup(selectedDate.value);
    if (result.success) {
      Message.success(`补签成功！+${result.points} 积分`);
      selectedDate.value = null;
      emit("update:visible", false);
    }
  } catch (e: any) {
    Message.error(e.message || "补签失败");
  }
};

// Reset selection when modal opens
watch(() => props.visible, (val) => {
  if (val) selectedDate.value = null;
});
</script>

<style lang="less" scoped>
.makeup-content {
  padding: 8px 0;
}

.makeup-info {
  font-size: 14px;
  color: #4e5969;
  margin-bottom: 16px;

  .card-count {
    font-weight: 700;
    color: #f7ba1e;
    font-size: 18px;
  }
}

.no-cards-tip {
  text-align: center;
  color: #c0c4cc;
  padding: 20px 0;
  font-size: 14px;
}

.makeup-dates {
  .dates-title {
    font-size: 13px;
    font-weight: 600;
    color: #86909c;
    margin-bottom: 8px;
  }

  .dates-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .date-item {
    padding: 10px 14px;
    border-radius: 8px;
    border: 1px solid #e5e6eb;
    cursor: pointer;
    font-size: 14px;
    color: #4e5969;
    transition: all 0.2s;

    &:hover {
      border-color: #165dff;
      background: #f0f7ff;
    }

    &.selected {
      border-color: #165dff;
      background: #e8f3ff;
      color: #165dff;
      font-weight: 600;
    }
  }

  .empty-tip {
    text-align: center;
    color: #c0c4cc;
    padding: 20px 0;
    font-size: 14px;
  }
}
</style>
