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
