<template>
  <view class="chat-page">
    <!-- Chat Header -->
    <u-navbar :title="receiverName" @click-left="goBack"></u-navbar>

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
          :class="{ incoming: message.senderId !== userId, outgoing: message.senderId === userId }"
          class="message-item"
      >
        <!-- Incoming Message -->
        <view v-if="message.senderId !== userId" class="message-avatar">
          <u-avatar :src="receiverAvatar || defaultAvatar" size="60"/>
        </view>
        <view class="message-bubble">{{ message.content }}</view>

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
      userId: uni.getStorageSync("user").userId, // Current user ID
      userAvatar: uni.getStorageSync("user").avatar, // User's avatar
      receiverId: "",
      receiverName: "",
      receiverAvatar: "",
      defaultAvatar: "../../../static/user/default-avatar.png", // Default avatar
      messages: [], // Chat messages
      newMessage: "", // Input message content
      scrollIntoView: "", // Scroll target for smooth scrolling
    };
  },
  methods: {
    /**
     * Fetch chat history from the server
     */
    async getDirectChatHistory() {
      try {
        const response = await this.$u.api.getDirectChatHistory(this.userId, this.receiverId);
        if (response.code === 200) {
          this.messages = response.data;
          this.scrollToBottom();
        } else {
          uni.showToast({
            title: response.msg || "Failed to load chat history",
            icon: "none",
          });
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
        uni.showToast({
          title: "Error loading chat history",
          icon: "none",
        });
      }
    },

    /**
     * Send a message
     */
    sendMessage() {
      if (!this.newMessage.trim()) {
        uni.showToast({title: "Message cannot be empty", icon: "none"});
        return;
      }

      const newMessageObj = {
        type: "DIRECT",
        senderId: this.userId,
        receiverId: this.receiverId,
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
              title: "Failed to send message. Attempting to reconnect...",
              icon: "none",
            });

            // Call Vuex action to handle reconnection
            this.$store.dispatch("websocket/reconnectWebSocket", this.userId);
          },
        });
      } else {
        uni.showToast({title: "WebSocket is not connected. Attempting to reconnect...", icon: "none"});
        // Call Vuex action to reconnect
        this.$store.dispatch("websocket/reconnectWebSocket", this.userId);
      }
    },

    /**
     * Handle incoming WebSocket messages
     */
    handleWebSocketMessage(msg) {
      console.log("handleWebSocketMessage start....", msg)

      this.messages.push(msg);
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
      uni.switchTab({
        url: '/pages/message/index'
      });
    },
  },
  mounted() {
    // Load chat history
    this.getDirectChatHistory();


    // Listen for WebSocket messages
    uni.$on("direct-message", this.handleWebSocketMessage);

    this.$nextTick(() => {
      this.scrollToBottom(); // Ensure initial scroll to bottom
    });
  },

  onUnload() {
    uni.$off("direct-message", this.handleWebSocketMessage);
  },

  onLoad(options) {
    // Get parameters from the URL
    this.receiverId = options.receiverId;
    this.receiverName = options.receiverName || "Unknown User";
    this.receiverAvatar = options.receiverAvatar || this.defaultAvatar;
  },
};
</script>

<style lang="scss" scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;

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
