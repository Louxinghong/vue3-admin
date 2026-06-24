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
