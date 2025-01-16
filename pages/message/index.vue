<template>
  <view class="page">
    <u-navbar :is-back="false" :title="title"></u-navbar>
    <!-- Chat List -->
    <view class="list">
      <scroll-view scroll-y="true" style="height: calc(100vh - 350rpx);">
        <!-- Team Chat Section -->
        <view v-if="teamChatList.length" class="section">
          <view class="section-title">Team Chat</view>
          <view v-for="(teamChat, i) in teamChatList" :key="i">
            <view class="card" @click="navigateToTeamMessage(teamChat)">
              <view class="inner community">
                <u-avatar :src="teamChat.avatar || '../../../static/user/default-avatar.png'" size="100"/>
                <view class="right">
                  <view class="info">
                    <view class="name">{{ teamChat.name }}</view>
                    <view class="time">{{ formatTime(teamChat.timestamp) }}</view>
                  </view>
                  <view class="content">{{ teamChat.content }}</view>
                </view>
              </view>
            </view>
          </view>
        </view>

        <!-- Direct Chat Section -->
        <view v-if="directChatList.length" class="section">
          <view class="section-title">Single Chat</view>
          <view v-for="(directChat, i) in directChatList" :key="i">
            <view class="card" @click="navigateToDirectMessage(directChat)">
              <view class="inner community">
                <u-avatar :src="directChat.avatar || '../../../static/user/default-avatar.png'" size="100"/>
                <view class="right">
                  <view class="info">
                    <view class="name">{{ directChat.name }}</view>
                    <view class="time">{{ formatTime(directChat.timestamp) }}</view>
                  </view>
                  <view class="content">{{ directChat.content }}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'Message',
      teamChatList: [],
      directChatList: [],
    };
  },
  methods: {
    navigateToDirectMessage(directChat) {
      console.log(directChat)
      const {receiverId, nickName, avatar} = directChat;
      uni.navigateTo({
        url: `/pages/message/direct-message?receiverId=${receiverId}&receiverName=${nickName}&receiverAvatar=${avatar}`,
      });
    },

    navigateToTeamMessage(teamChat) {
      console.log(teamChat)
      const {teamId, name} = teamChat;
      uni.navigateTo({
        url: `/pages/message/team-message?teamId=${teamId}&teamName=${name}`,
      });
    },


    async getTeamChatList() {
      try {
        const userId = uni.getStorageSync("user").userId;
        const response = await this.$u.api.getTeamChatList(userId);
        if (response.code === 200) {
          console.log(response.data)
          this.teamChatList = response.data.map((chat) => ({
            ...chat,
            name: chat.name,
            avatar: chat.avatar || "",
          }));
        } else {
          uni.showToast({title: response.msg, icon: "none"});
        }
      } catch (error) {
        console.error("Error fetching team chats:", error);
        uni.showToast({title: "Error fetching team chats", icon: "none"});
      }
    },

    /**
     * Fetch direct chat list
     */
    async fetchDirectChatList() {
      try {
        const userId = uni.getStorageSync("user").userId;
        const response = await this.$u.api.getDirectChatList(userId);
        if (response.code === 200) {
          this.directChatList = response.data.map((chat) => ({
            ...chat,
            name: chat.nickName || "Direct Chat", // Fallback name
            avatar: chat.avatar || "", // Avatar for direct chat
          }));
        } else {
          uni.showToast({title: response.msg || "Failed to fetch direct chats", icon: "none"});
        }
      } catch (error) {
        console.error("Error fetching direct chats:", error);
        uni.showToast({title: "Error fetching direct chats", icon: "none"});
      }
    },

    /**
     * Format timestamp into relative time
     */
    formatTime(timestamp) {
      if (!timestamp) return "Unknown";

      const now = Date.now();
      const diff = now - timestamp;

      if (diff < 60 * 1000) {
        return "just now";
      } else if (diff < 60 * 60 * 1000) {
        const minutes = Math.floor(diff / (60 * 1000));
        return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
      } else if (diff < 24 * 60 * 60 * 1000) {
        const hours = Math.floor(diff / (60 * 60 * 1000));
        return `${hours} hour${hours > 1 ? "s" : ""} ago`;
      } else {
        const days = Math.floor(diff / (24 * 60 * 60 * 1000));
        return `${days} day${days > 1 ? "s" : ""} ago`;
      }
    },
  },
  async mounted() {
    // Fetch chat lists on component mount
    await Promise.all([this.getTeamChatList(), this.fetchDirectChatList()]);
  },
};
</script>

<style lang="scss" scoped>
.list {
  .section-title {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin: 20rpx 0;
    padding-left: 20rpx;
  }

  .card {
    margin: 20rpx 0;

    .inner {
      display: flex;
      align-items: center;
      padding: 20rpx;
      background-color: #f8f9fa;
      border-radius: 16rpx;
      box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);

      .right {
        margin-left: 20rpx;
        flex: 1;

        .info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10rpx;

          .name {
            font-size: 28rpx;
            color: #333;
            font-weight: bold;
          }

          .time {
            font-size: 24rpx;
            color: gray;
          }
        }

        .content {
          font-size: 24rpx;
          color: gray;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>
