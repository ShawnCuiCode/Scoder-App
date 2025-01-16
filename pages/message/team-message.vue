<template>
  <view class="chat-page">
    <!-- Chat Header -->
    <u-navbar :title="teamName" @click-left="goBack">
      <view slot="right">
        <u-icon name="setting" size="40" @click="goToSettings"></u-icon>
      </view>
    </u-navbar>

    <!-- Chat Messages -->
    <scroll-view
        :scroll-into-view="scrollIntoView"
        :scroll-with-animation="true"
        class="chat-messages"
        scroll-y
    >
      <view
          v-for="(message, index) in messages"
          :id="'message-' + index"
          :key="index"
          :class="{'incoming': message.senderId !== userId, 'outgoing': message.senderId === userId}"
          class="message-item"
      >
        <!-- Incoming Message -->
        <view v-if="message.senderId !== userId" class="message-avatar">
          <u-avatar :src="message.avatar || defaultAvatar" size="60"/>
        </view>
        <view class="message-bubble">
          <view v-if="message.senderId !== userId" class="sender-name">{{ message.senderName }}</view>
          <view>{{ message.content }}</view>
        </view>

        <!-- Outgoing Message -->
        <view v-if="message.senderId === userId" class="message-avatar">
          <u-avatar :src="userAvatar || defaultAvatar" size="60"/>
        </view>
      </view>
      <!-- Anchor to scroll to the latest message -->
      <view :id="scrollIntoView"></view>
    </scroll-view>

    <!-- Input Area -->
    <view class="chat-input">
      <u-input
          v-model="newMessage"
          :clearable="true"
          class="input-field"
          placeholder="Type a message..."
      />
      <u-button type="primary" @click="sendMessage">Send</u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userId: uni.getStorageSync("user").userId,
      userAvatar: uni.getStorageSync("user").avatar,
      teamId: '',
      teamName: '',
      defaultAvatar: "../../../static/user/default-avatar.png",
      messages: [],
      newMessage: '',
      scrollIntoView: '',
    };
  },
  methods: {
    goToSettings() {
      uni.showToast({
        title: "setting clicked"
      })
      uni.navigateTo({
        url: `/pages/message/add-or-update-team?teamId=${this.teamId}`,
      });
    },
    async getTeamChatHistory() {
      try {
        const response = await this.$u.api.getTeamChatHistory(this.teamId);
        if (response.code === 200) {
          console.log(response.data);
          this.messages = response.data;
          this.scrollToBottom();
        } else {
          uni.showToast({
            title: response.msg || "Failed to load chat history",
            icon: "none",
          });
        }
      } catch (error) {
        console.error("Error fetching team chat history:", error);
        uni.showToast({
          title: "Error loading chat history",
          icon: "none",
        });
      }
    },

    sendMessage() {
      if (!this.newMessage.trim()) {
        uni.showToast({title: "Message cannot be empty", icon: "none"});
        return;
      }

      const newMessageObj = {
        type: "GROUP",
        senderId: this.userId,
        teamId: this.teamId,
        content: this.newMessage.trim(),
      };

      const socket = this.$store.state.websocket.socket;
      if (socket && this.$store.state.websocket.isConnected) {
        socket.send({
          data: JSON.stringify(newMessageObj),
          success: () => {
            console.log("Message sent successfully.");
            this.messages.push({
              ...newMessageObj,
              timestamp: Date.now(),
            });
            this.newMessage = "";
            this.scrollToBottom();
          },
          fail: (err) => {
            console.error("Failed to send message:", err);
            uni.showToast({
              title: "Failed to send message, Socket is Reconnecting, Please Resend Message!",
              icon: "none",
            });
          },
        });
      } else {
        uni.showToast({title: "WebSocket is not connected.", icon: "none"});
        this.$store.dispatch("websocket/reconnectWebSocket", this.userId);
      }
    },

    /**
     * Handle incoming WebSocket messages
     */
    handleGroupMessage(parsedMsg) {
      console.log("senderId:", parsedMsg.senderId)
      if (String(parsedMsg.senderId) === String(this.userId)) {
        return;
      }
      this.messages.push(parsedMsg);
      this.scrollToBottom();

    },

    /**
     * Scroll to the latest message
     */
    scrollToBottom() {
      this.$nextTick(() => {
        this.scrollIntoView = `message-${this.messages.length - 1}`;
      });
    },

    /**
     * Navigate back
     */
    goBack() {
      uni.navigateTo({
        url: '/pages/message/index'
      });
    },
  },
  mounted() {
    this.getTeamChatHistory();

    // Bind WebSocket listener for group messages
    uni.$on("group-message", this.handleGroupMessage);

    this.scrollToBottom();
  },
  onUnload() {
    // Remove WebSocket listener
    uni.$off("group-message", this.handleGroupMessage);
  },
  onLoad(options) {
    this.teamId = options.teamId;
    this.teamName = options.teamName;
  },
};
</script>

<style lang="scss" scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .u-navbar .u-icon {
    margin-right: 30rpx;
    color: #333;
  }

  .chat-messages {
    flex-grow: 1;
    padding: 20rpx;
    background-color: #f8f9fa;
    overflow-y: auto;

    .message-item {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
    }

    .message-item.incoming {
      justify-content: flex-start;

      .message-bubble {
        margin-left: 10rpx;
        background-color: #e5e5ea;
        color: #000;
        padding: 12rpx 20rpx;
        border-radius: 20rpx;
      }

      .sender-name {
        font-size: 24rpx;
        font-weight: bold;
        margin-bottom: 6rpx;
      }
    }

    .message-item.outgoing {
      justify-content: flex-end;
      margin-right: 35rpx;

      .message-bubble {
        margin-right: 10rpx;
        background-color: #007aff;
        color: #fff;
        padding: 12rpx 20rpx;
        border-radius: 20rpx;
      }
    }

    .message-avatar {
      flex-shrink: 0;
    }
  }

  .chat-input {
    display: flex;
    align-items: center;
    padding: 10rpx;
    background-color: #fff;
    box-shadow: 0 -2rpx 6rpx rgba(0, 0, 0, 0.1);

    .input-field {
      flex-grow: 1;
      margin-right: 10rpx;
    }
  }
}
</style>
