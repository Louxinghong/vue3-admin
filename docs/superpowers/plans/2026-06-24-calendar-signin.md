# 日历签到模块 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a gamified calendar sign-in module with daily check-in, streak rewards, makeup check-in, and points display.

**Architecture:** Pinia Store + modular Vue 3 SFC components. API layer with mock data, Pinia store for state management, 5 sub-components assembled in a main page view.

**Tech Stack:** Vue 3.5 `<script setup>`, TypeScript, Arco Design, Pinia (composition API with persist), dayjs, Less

## Global Constraints

- Use `<script setup lang="ts">` for all Vue components (follow existing codebase pattern)
- Use Less for component styles (`lang="less" scoped`)
- Pinia stores use `defineStore` composition API with `persist: true`
- API calls go through `@/utils/axios` (imported as `axios`)
- Route files export `routes` array from `src/router/routes/*.ts` (auto-discovered)
- Use dayjs for all date operations
- Follow Arco Design component conventions (`a-button`, `a-modal`, `a-progress`, etc.)
- Date key format: `YYYY-MM-DD`
- Initial makeup cards: 3
- Makeup range: past 7 days only
- Points: normal +1, 7-day streak bonus +7, 30-day streak bonus +30, makeup +1

---

### Task 1: API Layer & Pinia Store

**Files:**
- Create: `src/api/signin.ts`
- Create: `src/store/modules/signin.ts`

**Interfaces:**
```typescript
// src/api/signin.ts exports
export interface SigninRecord { date: string; signed: boolean }
export interface SigninResult { success: boolean; points: number; streakDays: number }
export function getSigninRecords(year: number, month: number): Promise<SigninRecord[]>
export function doSignin(): Promise<SigninResult>
export function doMakeup(date: string): Promise<SigninResult>
export function getSigninInfo(): Promise<{ makeupCards: number; points: number }>

// Store exports
export default useSigninStore  // Pinia store with composition API
```

- [ ] **Step 1: Create API module with mock data**

```typescript
// src/api/signin.ts
import axios from "@/utils/axios";

export interface SigninRecord {
  date: string;
  signed: boolean;
}

export interface SigninResult {
  success: boolean;
  points: number;
  streakDays: number;
}

// Generate mock sign-in records for a given month
// Returns records with ~60% of past days signed in, random pattern
function generateMockRecords(year: number, month: number): SigninRecord[] {
  const records: SigninRecord[] = [];
  const daysInMonth = new Date(year, month, 0).getDate();
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() + 1 === month;

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const date = new Date(year, month - 1, day);
    // Don't include future dates
    if (isCurrentMonth && date > today) continue;
    // ~60% chance of signed in for past dates
    records.push({
      date: dateStr,
      signed: Math.random() > 0.4,
    });
  }
  return records;
}

// Mock: get sign-in records for a month
export const getSigninRecords = (year: number, month: number): Promise<SigninRecord[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockRecords(year, month));
    }, 300);
  });
};

// Mock: perform daily sign-in
export const doSignin = (): Promise<SigninResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, points: 1, streakDays: 1 });
    }, 300);
  });
};

// Mock: perform makeup sign-in
export const doMakeup = (date: string): Promise<SigninResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, points: 1, streakDays: 1 });
    }, 300);
  });
};

// Mock: get user sign-in info (makeup cards, points)
export const getSigninInfo = (): Promise<{ makeupCards: number; points: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ makeupCards: 3, points: 0 });
    }, 300);
  });
};
```

- [ ] **Step 2: Create Pinia store**

```typescript
// src/store/modules/signin.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import dayjs from "dayjs";
import {
  getSigninRecords,
  doSignin as apiDoSignin,
  doMakeup as apiDoMakeup,
  getSigninInfo,
  type SigninRecord,
} from "@/api/signin";

const useSigninStore = defineStore(
  "signin",
  () => {
    // State
    const records = ref<Map<string, boolean>>(new Map());
    const streakDays = ref<number>(0);
    const makeupCards = ref<number>(3);
    const points = ref<number>(0);
    const lastSigninDate = ref<string | null>(null);
    const loading = ref<boolean>(false);

    // Computed
    const currentMonthRecords = computed(() => {
      const now = dayjs();
      const daysInMonth = now.daysInMonth();
      const result: { date: string; signed: boolean; day: number }[] = [];
      for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = now.format(`YYYY-MM-${String(day).padStart(2, "0")}`);
        result.push({
          date: dateStr,
          signed: records.value.get(dateStr) ?? false,
          day,
        });
      }
      return result;
    });

    const isTodaySigned = computed(() => {
      const today = dayjs().format("YYYY-MM-DD");
      return records.value.get(today) ?? false;
    });

    // Actions
    const fetchRecords = async (year: number, month: number) => {
      loading.value = true;
      try {
        const data = await getSigninRecords(year, month);
        const newMap = new Map<string, boolean>();
        data.forEach((r: SigninRecord) => {
          newMap.set(r.date, r.signed);
        });
        records.value = newMap;
        calculateStreak();
      } finally {
        loading.value = false;
      }
    };

    const fetchInfo = async () => {
      const info = await getSigninInfo();
      makeupCards.value = info.makeupCards;
      points.value = info.points;
    };

    const calculateStreak = () => {
      let count = 0;
      let date = dayjs();
      // If today is not signed, start from yesterday
      if (!records.value.get(date.format("YYYY-MM-DD"))) {
        date = date.subtract(1, "day");
      }
      while (records.value.get(date.format("YYYY-MM-DD"))) {
        count++;
        date = date.subtract(1, "day");
      }
      streakDays.value = count;
    };

    const calculatePoints = (streak: number, isMakeup: boolean): number => {
      if (isMakeup) return 1;
      let pts = 1;
      if (streak >= 30) pts += 30;
      else if (streak >= 7) pts += 7;
      return pts;
    };

    const doSignin = async () => {
      const today = dayjs().format("YYYY-MM-DD");
      if (records.value.get(today)) return { success: false, points: 0, streakDays: streakDays.value };

      loading.value = true;
      try {
        const result = await apiDoSignin();
        records.value.set(today, true);
        lastSigninDate.value = today;
        calculateStreak();
        const earnedPoints = calculatePoints(streakDays.value, false);
        points.value += earnedPoints;
        return { ...result, points: earnedPoints, streakDays: streakDays.value };
      } finally {
        loading.value = false;
      }
    };

    const doMakeup = async (date: string) => {
      if (makeupCards.value <= 0) throw new Error("No makeup cards available");
      const makeupDate = dayjs(date);
      const today = dayjs().endOf("day");
      const sevenDaysAgo = dayjs().subtract(7, "day").startOf("day");

      if (makeupDate.isAfter(today) || makeupDate.isBefore(sevenDaysAgo)) {
        throw new Error("Date out of makeup range");
      }
      if (records.value.get(date)) throw new Error("Already signed on this date");

      loading.value = true;
      try {
        await apiDoMakeup(date);
        records.value.set(date, true);
        makeupCards.value -= 1;
        calculateStreak();
        const earnedPoints = calculatePoints(0, true);
        points.value += earnedPoints;
        return { success: true, points: earnedPoints, streakDays: streakDays.value };
      } finally {
        loading.value = false;
      }
    };

    return {
      records,
      streakDays,
      makeupCards,
      points,
      lastSigninDate,
      loading,
      currentMonthRecords,
      isTodaySigned,
      fetchRecords,
      fetchInfo,
      doSignin,
      doMakeup,
      calculateStreak,
    };
  },
  {
    persist: true,
  },
);

export default useSigninStore;
```

- [ ] **Step 3: Commit**

```bash
git add src/api/signin.ts src/store/modules/signin.ts
git commit -m "feat: add signin API layer and Pinia store"
```

---

### Task 2: Route & Main Page Scaffold

**Files:**
- Create: `src/router/routes/signin.ts`
- Create: `src/views/signin/index.vue`
- Create: `src/views/signin/components/` (directory only, components in later tasks)

**Interfaces:**
- Consumes: Route auto-discovery from `src/router/routes/*.ts`
- Produces: `/signin` route accessible in browser

- [ ] **Step 1: Create signin route**

```typescript
// src/router/routes/signin.ts
import Layout from "@/components/Layout/Layout.vue";

export const routes = [
  {
    path: "/signin",
    name: "Signin",
    component: Layout,
    meta: { title: "签到日历", icon: "person" },
    children: [
      {
        path: "",
        name: "SigninCalendar",
        component: () => import("@/views/signin/index.vue"),
        meta: { title: "签到日历", icon: "" },
      },
    ],
  },
];
```

- [ ] **Step 2: Create main page scaffold**

```vue
<!-- src/views/signin/index.vue -->
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
```

- [ ] **Step 3: Create component placeholder files**

Create empty component files to prevent import errors during development. Each will be filled in subsequent tasks.

```vue
<!-- src/views/signin/components/StreakBadge.vue -->
<template><div class="streak-badge">StreakBadge</div></template>
<script setup lang="ts">defineOptions({ name: "StreakBadge" });</script>
<style lang="less" scoped></style>
```

```vue
<!-- src/views/signin/components/PointsPanel.vue -->
<template><div class="points-panel">PointsPanel</div></template>
<script setup lang="ts">defineOptions({ name: "PointsPanel" });</script>
<style lang="less" scoped></style>
```

```vue
<!-- src/views/signin/components/SigninButton.vue -->
<template><div class="signin-button">SigninButton</div></template>
<script setup lang="ts">defineOptions({ name: "SigninButton" });</script>
<style lang="less" scoped></style>
```

```vue
<!-- src/views/signin/components/MonthCalendar.vue -->
<template><div class="month-calendar">MonthCalendar</div></template>
<script setup lang="ts">defineOptions({ name: "MonthCalendar" });</script>
<style lang="less" scoped></style>
```

```vue
<!-- src/views/signin/components/MakeupModal.vue -->
<template><div>MakeupModal</div></template>
<script setup lang="ts">defineOptions({ name: "MakeupModal" });</script>
<style lang="less" scoped></style>
```

- [ ] **Step 4: Verify the route loads**

Run: `npm run dev`, open browser to `#/signin`, verify page header and placeholders render.

- [ ] **Step 5: Commit**

```bash
git add src/router/routes/signin.ts src/views/signin/
git commit -m "feat: add signin route and page scaffold"
```

---

### Task 3: MonthCalendar Component

**Files:**
- Modify: `src/views/signin/components/MonthCalendar.vue`

**Interfaces:**
- Consumes: `useSigninStore().records`, `useSigninStore().currentMonthRecords`
- Produces: Calendar grid UI with signed/unsigned/today visual states

- [ ] **Step 1: Implement MonthCalendar**

Replace the placeholder with the full implementation:

```vue
<!-- src/views/signin/components/MonthCalendar.vue -->
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
      signed: signinStore.records.get(dateStr) ?? false,
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
    // Trigger sign-in action via store
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
```

- [ ] **Step 2: Commit**

```bash
git add src/views/signin/components/MonthCalendar.vue
git commit -m "feat: implement MonthCalendar component"
```

---

### Task 4: StreakBadge Component

**Files:**
- Modify: `src/views/signin/components/StreakBadge.vue`

**Interfaces:**
- Consumes: `useSigninStore().streakDays`

- [ ] **Step 1: Implement StreakBadge**

```vue
<!-- src/views/signin/components/StreakBadge.vue -->
<template>
  <div class="streak-badge-card">
    <div class="badge-header">
      <span class="badge-icon">{{ badgeIcon }}</span>
      <span class="badge-title">{{ badgeTitle }}</span>
    </div>
    <div class="streak-count">
      <span class="count-num">{{ streakDays }}</span>
      <span class="count-label">天连续签到</span>
    </div>
    <a-progress
      :percent="progressPercent"
      :color="progressColor"
      :show-text="false"
      size="medium"
    />
    <div class="progress-label">
      距离下一里程碑 {{ nextMilestone - streakDays }} 天
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "StreakBadge",
});
import { computed } from "vue";
import useSigninStore from "@/store/modules/signin";

const signinStore = useSigninStore();

const streakDays = computed(() => signinStore.streakDays);

const milestones = [7, 30];

const nextMilestone = computed(() => {
  for (const m of milestones) {
    if (streakDays.value < m) return m;
  }
  return milestones[milestones.length - 1];
});

const progressPercent = computed(() => {
  if (streakDays.value >= nextMilestone.value) return 100;
  const prevMilestone = milestones.filter((m) => m < nextMilestone.value).pop() ?? 0;
  const range = nextMilestone.value - prevMilestone;
  const progress = streakDays.value - prevMilestone;
  return Math.min(100, Math.round((progress / range) * 100));
});

const progressColor = computed(() => {
  if (streakDays.value >= 30) return "#f7ba1e";
  if (streakDays.value >= 7) return "#00b42a";
  return "#165dff";
});

const badgeIcon = computed(() => {
  if (streakDays.value >= 30) return "🏆";
  if (streakDays.value >= 7) return "🔥";
  return "⭐";
});

const badgeTitle = computed(() => {
  if (streakDays.value >= 30) return "月度签到大师";
  if (streakDays.value >= 7) return "周签到达人";
  return "签到中";
});
</script>

<style lang="less" scoped>
.streak-badge-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  text-align: center;
}

.badge-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 12px;

  .badge-icon {
    font-size: 28px;
  }

  .badge-title {
    font-size: 16px;
    font-weight: 700;
    color: #1d2129;
  }
}

.streak-count {
  margin-bottom: 16px;

  .count-num {
    font-size: 36px;
    font-weight: 800;
    background: linear-gradient(135deg, #165dff, #4080ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .count-label {
    font-size: 13px;
    color: #86909c;
    margin-left: 6px;
  }
}

.progress-label {
  margin-top: 8px;
  font-size: 12px;
  color: #86909c;
  text-align: center;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/views/signin/components/StreakBadge.vue
git commit -m "feat: implement StreakBadge component"
```

---

### Task 5: SigninButton Component

**Files:**
- Modify: `src/views/signin/components/SigninButton.vue`

**Interfaces:**
- Consumes: `useSigninStore().doSignin`, `useSigninStore().isTodaySigned`, `useSigninStore().loading`
- Produces: Sign-in button UI with animation

- [ ] **Step 1: Implement SigninButton**

```vue
<!-- src/views/signin/components/SigninButton.vue -->
<template>
  <div class="signin-btn-wrapper">
    <a-button
      type="primary"
      size="large"
      long
      :loading="signinStore.loading"
      :disabled="isTodaySigned"
      @click="handleSignin"
      class="signin-btn"
    >
      {{ buttonText }}
    </a-button>
    <div v-if="showSuccess" class="success-animation">
      <span class="success-icon">✨</span>
      <span class="success-text">签到成功！+{{ earnedPoints }} 积分</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "SigninButton",
});
import { ref, computed } from "vue";
import { Message } from "@arco-design/web-vue";
import useSigninStore from "@/store/modules/signin";

const signinStore = useSigninStore();
const showSuccess = ref(false);
const earnedPoints = ref(0);

const isTodaySigned = computed(() => signinStore.isTodaySigned);

const buttonText = computed(() => {
  if (signinStore.loading) return "签到中...";
  if (isTodaySigned.value) return "今日已签到 ✓";
  return "立即签到";
});

const handleSignin = async () => {
  if (isTodaySigned.value || signinStore.loading) return;
  try {
    const result = await signinStore.doSignin();
    if (result.success) {
      earnedPoints.value = result.points;
      showSuccess.value = true;
      setTimeout(() => {
        showSuccess.value = false;
      }, 2500);
    } else {
      Message.warning("今日已签到");
    }
  } catch (e: any) {
    Message.error(e.message || "签到失败，请稍后重试");
  }
};
</script>

<style lang="less" scoped>
.signin-btn-wrapper {
  position: relative;
}

.signin-btn {
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
}

.success-animation {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #00b42a, #009a29);
  color: #fff;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  white-space: nowrap;
  animation: popIn 0.3s ease-out, fadeUp 2s ease-out 0.3s forwards;
  box-shadow: 0 4px 12px rgba(0, 180, 42, 0.3);

  .success-icon {
    margin-right: 4px;
  }
}

@keyframes popIn {
  0% {
    opacity: 0;
    transform: translateX(-50%) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
}

@keyframes fadeUp {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px);
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/views/signin/components/SigninButton.vue
git commit -m "feat: implement SigninButton component"
```

---

### Task 6: PointsPanel Component

**Files:**
- Modify: `src/views/signin/components/PointsPanel.vue`

**Interfaces:**
- Consumes: `useSigninStore().points`

- [ ] **Step 1: Implement PointsPanel**

```vue
<!-- src/views/signin/components/PointsPanel.vue -->
<template>
  <div class="points-card">
    <div class="points-header">
      <span class="points-icon">💎</span>
      <span class="points-title">我的积分</span>
    </div>
    <div class="points-value">
      <span class="points-num">{{ points }}</span>
    </div>
    <div class="points-rules">
      <div class="rule-title">积分规则</div>
      <div class="rule-item">
        <span class="rule-dot daily"></span>
        <span>每日签到 <strong>+1</strong> 积分</span>
      </div>
      <div class="rule-item">
        <span class="rule-dot streak7"></span>
        <span>连续 7 天 <strong>+7</strong> 积分</span>
      </div>
      <div class="rule-item">
        <span class="rule-dot streak30"></span>
        <span>连续 30 天 <strong>+30</strong> 积分</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: "PointsPanel",
});
import { computed } from "vue";
import useSigninStore from "@/store/modules/signin";

const signinStore = useSigninStore();
const points = computed(() => signinStore.points);
</script>

<style lang="less" scoped>
.points-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.points-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;

  .points-icon {
    font-size: 20px;
  }

  .points-title {
    font-size: 14px;
    font-weight: 600;
    color: #86909c;
  }
}

.points-value {
  margin-bottom: 16px;

  .points-num {
    font-size: 32px;
    font-weight: 800;
    background: linear-gradient(135deg, #f7ba1e, #f59f00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.points-rules {
  background: #f7f8fa;
  border-radius: 10px;
  padding: 12px;

  .rule-title {
    font-size: 12px;
    font-weight: 600;
    color: #86909c;
    margin-bottom: 8px;
  }

  .rule-item {
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #4e5969;
    margin-bottom: 4px;

    &:last-child {
      margin-bottom: 0;
    }

    strong {
      color: #f7ba1e;
      margin: 0 2px;
    }
  }

  .rule-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 8px;
    flex-shrink: 0;

    &.daily {
      background: #165dff;
    }

    &.streak7 {
      background: #00b42a;
    }

    &.streak30 {
      background: #f7ba1e;
    }
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add src/views/signin/components/PointsPanel.vue
git commit -m "feat: implement PointsPanel component"
```

---

### Task 7: MakeupModal Component

**Files:**
- Modify: `src/views/signin/components/MakeupModal.vue`

**Interfaces:**
- Consumes: `useSigninStore().doMakeup`, `useSigninStore().makeupCards`, `useSigninStore().records`
- Emits: `v-model:visible` boolean

- [ ] **Step 1: Implement MakeupModal**

```vue
<!-- src/views/signin/components/MakeupModal.vue -->
<template>
  <a-modal
    :visible="visible"
    title="补签"
    :mask-closable="false"
    :esc-to-close="true"
    @cancel="onCancel"
    width="400px"
  >
    <template #footer>
      <a-button @click="onCancel">取消</a-button>
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

const availableDates = computed(() => {
  const dates: string[] = [];
  const today = dayjs();
  for (let i = 1; i <= 7; i++) {
    const date = today.subtract(i, "day");
    const dateStr = date.format("YYYY-MM-DD");
    const signed = signinStore.records.get(dateStr);
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

const onCancel = () => {
  selectedDate.value = null;
  emit("update:visible", false);
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
```

- [ ] **Step 2: Wire MakeupModal trigger to main page**

The main page already has `makeupVisible` ref and `<makeup-modal v-model:visible="makeupVisible" />`. We need a trigger button. Add a makeup button next to the signin button in the main page.

In `src/views/signin/index.vue`, add a makeup button after `<signin-button />`:

```vue
<!-- Add after <signin-button /> in the left-panel -->
<a-button size="large" long class="makeup-trigger-btn" @click="makeupVisible = true">
  补签
</a-button>
```

Add the corresponding style at the bottom of the `<style>` block:

```less
.makeup-trigger-btn {
  border-radius: 12px;
  color: #86909c;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/views/signin/components/MakeupModal.vue src/views/signin/index.vue
git commit -m "feat: implement MakeupModal component and wire trigger"
```

---

### Task 8: Integration Review & Polish

**Files:**
- Review all `src/views/signin/**` files
- Modify: `src/store/modules/signin.ts` (if needed for bugs found)

**Verification checklist:**
- [ ] `npm run dev` starts without errors
- [ ] Navigate to `#/signin` — page renders with all components
- [ ] Month navigation buttons work, data reloads
- [ ] Click "立即签到" button — shows success animation, date turns green in calendar
- [ ] Click "今日已签到" — button is disabled
- [ ] StreakBadge shows correct count and progress
- [ ] PointsPanel shows correct points, rules displayed
- [ ] Click "补签" — modal opens with available dates
- [ ] Select a date and confirm — makeup card count decreases, date turns green
- [ ] With 0 makeup cards — confirm button disabled
- [ ] Page layout responsive on narrow screen

- [ ] **Step 1: Run dev server and verify all features**

Run: `npm run dev`, open browser, verify all checklist items above.

- [ ] **Step 2: Fix any issues found**

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete calendar signin module"
```
