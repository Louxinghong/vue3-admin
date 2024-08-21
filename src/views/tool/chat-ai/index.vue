<template>
  <div class="chat-ai">
    <ul ref="chatListRef" class="chat-list">
      <li v-for="item in messageList" :key="item.id">
        <template v-if="item.id % 2 === 0">
          <svg-icon class="" :name="item.avatar" size="50px" />
          <div v-show="!item.isLoading" class="ai-message">{{ item.content }}</div>
          <a-skeleton v-show="item.isLoading" class="message-skeleton" animation>
            <a-space direction="vertical" :style="{ width: '100%' }" size="large">
              <a-skeleton-line :rows="3" />
            </a-space>
          </a-skeleton>
        </template>
        <template v-else>
          <div class="user-message">{{ item.content }}</div>
          <img class="user-img" :src="item.avatar" alt="logo" />
        </template>
      </li>
    </ul>

    <div class="send-content">
      <a-input
        class="send-message"
        v-model="sendMessage"
        placeholder="请输入..."
        @keyup.enter="onSendMessage"
      />
      <svg-icon class="send-icon" name="convert" color="#000" @click="onSendMessage" />
    </div>
  </div>
</template>

<script name="ChatAI" lang="ts" setup>
import { ref } from "vue";
import { getGptMessage } from "@/api/index";
import { ChatData } from "@/utils/interface";
import { cloneDeep } from "lodash";

const loading = ref<boolean>(false);
const sendMessage = ref<string>(""); // 每次发送的信息
const messageList = ref<Array<ChatData>>([]); // 发送信息合集
const USER_IMG = new URL("@/assets/images/user.jpg", import.meta.url).href;
const chatListRef = ref(); // 聊天列表dom

const onSendMessage = async () => {
  if (loading.value) {
    return;
  }

  loading.value = true;

  const sendData = cloneDeep(sendMessage.value);
  sendMessage.value = "";
  messageList.value.push({
    id: messageList.value.length + 1,
    avatar: USER_IMG,
    content: sendData
  });
  // 预设骨架内容
  messageList.value.push({
    id: messageList.value.length + 1,
    avatar: "dashboard",
    content: "",
    isLoading: true
  });
  // 暂缓等待最新两天信息加入dom
  setTimeout(() => {
    chatListRef.value.scrollTop = chatListRef.value.scrollHeight - chatListRef.value.clientHeight;
  }, 0);

  const changeAIMessageData = messageList.value[messageList.value.length - 1];
  try {
    const result = await getGptMessage({ content: sendData });
    changeAIMessageData.content = result.choices
      ? result.choices[0].message.content
      : "出错啦~再试一下哦";
  } catch {
    changeAIMessageData.content = "哎呀刚才我开小差啦，麻烦你再问一遍~";
  } finally {
    loading.value = false;
    changeAIMessageData.isLoading = false;
  }
};
</script>

<style lang="scss" scoped>
.chat-ai {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  height: 100%;
}

.chat-list {
  margin: 0;
  padding: 0;
  list-style: none;
  max-height: calc(100% - 70px);
  overflow-y: auto;

  li {
    display: flex;
    align-items: flex-start;
    width: 100%;

    &:nth-child(odd) {
      justify-content: flex-end;
    }

    &:not(:last-child) {
      margin-bottom: 20px;
    }

    .ai-message,
    .user-message {
      max-width: 60%;
      min-height: 40px;
      margin-top: 5px;
      padding: 10px 20px;
      border-radius: 20px;
      background: #ebebeb;
      white-space: wrap;
      line-height: 1.5;
      color: #616161;
    }

    .ai-message {
      margin-left: 10px;
    }

    .user-message {
      margin-right: 10px;
    }

    .message-skeleton {
      width: 60%;
      height: 90px;
    }

    .user-img {
      margin: 5px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}

.send-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 30px;
  width: 100%;
  height: 50px;
  border-radius: 30px;
  background: #ebebeb;

  .send-message {
    margin-right: 20px;
    background: none;
    border: none;
  }

  .send-icon {
    cursor: pointer;
  }
}
</style>
