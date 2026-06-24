<template>
  <div class="month-calendar-card">
    <div class="calendar-header">
      <span class="weekday" v-for="day in weekDays" :key="day">{{ day }}</span>
    </div>
    <div class="calendar-grid">
      <div
        v-for="cell in calendarCells"
        :key="cell.date"
        class="calendar-cell"
        :class="{
          'is-today': cell.isToday,
          'is-signed': cell.signed,
          'is-future': cell.isFuture,
          'is-empty': cell.isEmpty,
        }"
        @click="onCellClick(cell)"
      >
        <span class="day-num">{{ cell.day || "" }}</span>
        <span v-if="cell.signed && !cell.isEmpty" class="signed-dot">✓</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "MonthCalendar",
});
import { computed } from "vue";
import dayjs from "dayjs";
import useSigninStore from "@/store/modules/signin";

const signinStore = useSigninStore();
const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

const calendarCells = computed(() => {
  const now = dayjs();
  const startOfMonth = now.startOf("month");
  const daysInMonth = now.daysInMonth();
  const startWeekday = startOfMonth.day(); // 0=Sun
  const cells: Array<{
    date: string;
    day: number | null;
    signed: boolean;
    isToday: boolean;
    isFuture: boolean;
    isEmpty: boolean;
  }> = [];

  // Empty cells before the 1st
  for (let i = 0; i < startWeekday; i++) {
    cells.push({ date: "", day: null, signed: false, isToday: false, isFuture: false, isEmpty: true });
  }

  // Day cells
  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = now.format(`YYYY-MM-${String(day).padStart(2, "0")}`);
    const dateObj = dayjs(dateStr);
    cells.push({
      date: dateStr,
      day,
      signed: signinStore.records[dateStr] ?? false,
      isToday: dateStr === now.format("YYYY-MM-DD"),
      isFuture: dateObj.isAfter(now, "day"),
      isEmpty: false,
    });
  }

  return cells;
});

const onCellClick = (cell: { date: string; signed: boolean; isFuture: boolean; isEmpty: boolean }) => {
  if (cell.isEmpty || cell.isFuture) return;
  if (!cell.signed) {
    signinStore.doSignin();
  }
};
</script>

<style lang="less" scoped>
.month-calendar-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 12px;

  .weekday {
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    color: #86909c;
  }
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-cell {
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  color: #1d2129;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;

  &:hover:not(.is-empty):not(.is-future):not(.is-signed) {
    background: #f0f7ff;
  }

  &.is-today {
    background: #e8f3ff;
    font-weight: 700;
    color: #165dff;
  }

  &.is-signed {
    background: linear-gradient(135deg, #00b42a 0%, #009a29 100%);
    color: #fff;
    cursor: default;

    .day-num {
      color: #fff;
    }
  }

  &.is-future {
    color: #c0c4cc;
    cursor: default;
  }

  &.is-empty {
    cursor: default;
  }

  .signed-dot {
    font-size: 12px;
    color: #fff;
    position: absolute;
    bottom: 4px;
  }

  .day-num {
    color: #1d2129;
  }

  &.is-signed .day-num {
    color: #fff;
  }

  &.is-today .day-num {
    color: #165dff;
  }
}
</style>
