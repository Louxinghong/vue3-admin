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
