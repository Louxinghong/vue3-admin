<template>
  <div class="ruler-slider-container">
    <!-- 滑块值显示 -->
    <div class="value-display">{{ currentValue }}°</div>

    <!-- 尺子滑块容器：核心是尺子背景+滑块 -->
    <div class="ruler-wrapper">
      <!-- 尺子刻度：主刻度（10°间隔，长+数值）+ 副刻度（2°间隔，短） -->
      <div class="ruler-scale">
        <!-- 主刻度（步长10） -->
        <div
          class="main-tick"
          v-for="tick in Math.ceil((max - min) / mainStep)"
          :key="`main-${tick}`"
          :style="{ left: `${((tick * mainStep - min) / (max - min)) * 100}%` }"
        >
          <span class="tick-label">{{ tick * mainStep }}°</span>
        </div>

        <!-- 副刻度（步长2，填充主刻度之间的小刻度） -->
        <div
          class="sub-tick"
          v-for="tick in Math.ceil((max - min) / subStep)"
          :key="`sub-${tick}`"
          v-if="(tick * subStep) % mainStep !== 0"
          :style="{ left: `${((tick * subStep - min) / (max - min)) * 100}%` }"
        ></div>
      </div>

      <!-- 滑动轨道 + 滑块（核心：step=2 强制定格到刻度点） -->
      <input
        type="range"
        class="ruler-slider"
        v-model.number="currentValue"
        :min="min"
        :max="max"
        :step="subStep"
        @input="handleSliderInput"
      />

      <!-- 滑块指针（美化，可选） -->
      <div
        class="slider-pointer"
        :style="{ left: `${((currentValue - min) / (max - min)) * 100}%` }"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 配置项：可根据需求调整
const min = ref(0); // 最小值
const max = ref(360); // 最大值
const mainStep = ref(10); // 主刻度步长（长刻度+数值）
const subStep = ref(2); // 副刻度步长（短刻度）
const currentValue = ref(10); // 初始值

// 可选：强制值对齐（防止手动输入非刻度值）
const handleSliderInput = () => {
  // 取最近的副刻度值（确保定格）
  const closest = Math.round(currentValue.value / subStep.value) * subStep.value;
  currentValue.value = Math.min(max.value, Math.max(min.value, closest));
};
</script>

<style scoped>
/* 容器整体样式 */
.ruler-slider-container {
  width: 90%;
  margin: 50px auto;
  font-family: Arial, sans-serif;
}

/* 当前值显示 */
.value-display {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
}

/* 尺子容器：相对定位，承载刻度和滑块 */
.ruler-wrapper {
  position: relative;
  height: 80px;
  padding-top: 30px;
  box-sizing: border-box;
}

/* 尺子刻度容器：绝对定位，铺满宽度 */
.ruler-scale {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  pointer-events: none; /* 避免遮挡滑块 */
}

/* 主刻度：长刻度 + 数值标注 */
.main-tick {
  position: absolute;
  top: 0;
  width: 2px;
  height: 25px; /* 长刻度高度 */
  background: #333;
  transform: translateX(-50%); /* 居中对齐 */
}

/* 主刻度数值标签 */
.tick-label {
  position: absolute;
  top: 28px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: #333;
  white-space: nowrap;
}

/* 副刻度：短刻度 */
.sub-tick {
  position: absolute;
  top: 5px;
  width: 1px;
  height: 20px; /* 短刻度高度 */
  background: #999;
  transform: translateX(-50%); /* 居中对齐 */
}

/* 原生滑块样式重置 + 美化 */
.ruler-slider {
  position: absolute;
  top: 30px;
  left: 0;
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: #f0f0f0;
  border-radius: 3px;
  outline: none;
  margin: 0;
  padding: 0;
}

/* 滑块按钮隐藏（用自定义指针替代） */
.ruler-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 0;
  height: 0;
  opacity: 0;
}

/* 自定义滑块指针：贴合尺子风格 */
.slider-pointer {
  position: absolute;
  top: 25px;
  width: 4px;
  height: 35px;
  background: #ff4400;
  border-radius: 2px;
  transform: translateX(-50%);
  box-shadow: 0 0 5px rgba(255, 68, 0, 0.5);
  z-index: 10;
}

/* 兼容Firefox滑块样式 */
.ruler-slider::-moz-range-thumb {
  width: 0;
  height: 0;
  opacity: 0;
}
.ruler-slider::-moz-range-track {
  height: 6px;
  background: #f0f0f0;
  border-radius: 3px;
  border: none;
}
</style>
