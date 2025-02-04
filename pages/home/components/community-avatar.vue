<template>
  <view class="slot">
    <!-- Left section: Avatar and Info -->
    <view class="left">
      <u-avatar :src="data.avatar" mode="circle" size="80"></u-avatar>
      <view class="info">
        <view>
          <text class="username">{{ data.team }}</text>
        </view>
        <view class="time">{{ data.time }}</view>
      </view>
    </view>

    <!-- Right section: Button and Match Score -->
    <view class="right">
      <u-button
          :disabled="data.isJoined === 1"
          :plain="false"
          :type="data.isJoined === 1 ? 'default' : 'primary'"
          class="join-button"
          size="mini"
          @click="handleButtonClick"
      >
        {{ data.isJoined === 1 ? 'Joined' : 'Join' }}
      </u-button>
      <view class="matchScore">
        <text>Matched: {{ data.matchScore }}%</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    // Data for rendering the component
    data: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    // Handle the join button click
    async handleButtonClick() {
      try {
        // Call the API to join the team
        const response = await this.$u.api.joinTeam(this.data.teamId);

        // If the response is successful, update the isJoined state to 1, indicating the user has joined
        if (response.code === 200) {
          console.log('success joined')
          this.$set(this.data, 'isJoined', 1); // Update the state
          // Optionally emit an event to notify the parent component
          this.$emit('joined', this.data.teamId);
          console.log('jump')
          uni.navigateTo({
            url: `/pages/message/team-message?teamId=${this.data.teamId}&teamName=${this.data.team}`
          })
        }
      } catch (error) {
        // Log any error that occurs while joining the team
        console.error('Error joining team:', error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.slot {
  display: flex;
  justify-content: space-between;
}

.left {
  display: flex;

  .info {
    margin-left: 16rpx;

    .username {
      font-size: 28rpx;
      font-weight: 400;
      color: $app-theme-text-black-color;
      margin-bottom: 8rpx;
    }
  }

  .time {
    font-size: 24rpx;
    font-weight: 400;
    color: $app-theme-text-gray-color;
    margin-top: 8rpx;
  }
}

.right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .matchScore {
    font-size: 24rpx;
    color: $app-theme-text-gray-color;
    margin-top: 5rpx;
    margin-bottom: 8rpx;
    text-align: right;
  }

  .join-button {
    width: 100rpx;
    height: 45rpx;
    font-size: 24rpx;
  }
}
</style>
