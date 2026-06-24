<template>
  <div class="signin-page">
    <div class="signin-header">
      <h2 class="page-title">签到日历</h2>
      <div class="month-nav">
        <a-button type="text" @click="prevMonth">
          <icon-left />
        </a-button>
        <span class="month-label">{{ currentMonthLabel }}</span>
        <a-button type="text" @click="nextMonth">
          <icon-right />
        </a-button>
      </div>
    </div>

    <div class="signin-content">
      <div class="left-panel">
        <streak-badge />
        <points-panel />
        <signin-button />
        <a-button size="large" long class="makeup-trigger-btn" @click="makeupVisible = true">
          补签
        </a-button>
      </div>
      <div class="right-panel">
        <month-calendar />
      </div>
    </div>

    <makeup-modal v-model:visible="makeupVisible" />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "SigninCalendar",
});
import { ref, computed, onMounted } from "vue";
import dayjs from "dayjs";
import { IconLeft, IconRight } from "@arco-design/web-vue/es/icon";
import useSigninStore from "@/store/modules/signin";
import StreakBadge from "./components/StreakBadge.vue";
import PointsPanel from "./components/PointsPanel.vue";
import SigninButton from "./components/SigninButton.vue";
import MonthCalendar from "./components/MonthCalendar.vue";
import MakeupModal from "./components/MakeupModal.vue";

const signinStore = useSigninStore();
const currentMonth = ref(dayjs());
const makeupVisible = ref(false);

const currentMonthLabel = computed(() => {
  return currentMonth.value.format("YYYY年 M月");
});

const prevMonth = () => {
  currentMonth.value = currentMonth.value.subtract(1, "month");
  loadMonthData();
};

const nextMonth = () => {
  currentMonth.value = currentMonth.value.add(1, "month");
  loadMonthData();
};

const loadMonthData = () => {
  const y = currentMonth.value.year();
  const m = currentMonth.value.month() + 1;
  signinStore.fetchRecords(y, m);
};

onMounted(() => {
  signinStore.fetchInfo();
  loadMonthData();
});
</script>

<style lang="less" scoped>
.signin-page {
  padding: 24px;
  min-height: 100%;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%);
}

.signin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;

  .page-title {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: #1d2129;
  }

  .month-nav {
    display: flex;
    align-items: center;
    gap: 8px;

    .month-label {
      font-size: 16px;
      font-weight: 600;
      min-width: 120px;
      text-align: center;
      color: #1d2129;
    }
  }
}

.signin-content {
  display: flex;
  gap: 24px;
  align-items: flex-start;

  .left-panel {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 280px;
    flex-shrink: 0;
  }

  .right-panel {
    flex: 1;
    min-width: 0;
  }
}

.makeup-trigger-btn {
  border-radius: 12px;
  color: #86909c;
}

@media (max-width: 768px) {
  .signin-content {
    flex-direction: column;

    .left-panel {
      width: 100%;
      flex-direction: row;
      flex-wrap: wrap;
    }

    .left-panel > * {
      flex: 1;
      min-width: 200px;
    }
  }
}
</style>
