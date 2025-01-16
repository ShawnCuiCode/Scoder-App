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
        await this.$u.api.joinTeam(this.data.teamId);
        // Optionally emit an event or handle success state
        this.$emit('joined', this.data.teamId);
      } catch (error) {
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
