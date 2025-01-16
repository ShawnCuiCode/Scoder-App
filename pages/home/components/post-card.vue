<template>
  <view :class="{ border }" class="slot" @click="goPostDetail(data.teamId)">
    <!-- Avatar Section -->
    <CommuntiyAvatar :data="data"></CommuntiyAvatar>

    <!-- Description Section -->
    <view class="main-text">{{ data.description }}</view>

    <!-- Image Section -->
    <view class="imglist">
      <u-image :src="data.radarImg" height="640rpx" width="640rpx">
        <u-loading slot="loading"></u-loading>
      </u-image>
    </view>
  </view>
</template>

<script>
import CommuntiyAvatar from '@/pages/home/components/community-avatar';

export default {
  name: 'community-card',
  components: {CommuntiyAvatar},
  props: {
    // Card data
    data: {
      type: Object,
      default: () => ({})
    },
    // Toggle bottom border
    border: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // Navigate to post detail page
    goPostDetail(teamId) {
      uni.navigateTo({
        url: `/pages/home/team-detail?teamId=${teamId}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.slot {
  padding: 30rpx;
  background-color: $app-theme-bg-color;

  &.border {
    border-bottom: 1rpx solid $app-theme-border-color;
  }
}

.main-text {
  font-size: 28rpx;
  font-weight: 400;
  color: $app-theme-text-black-color;
  line-height: 40px;
  margin-left: 25rpx;
}

.imglist {
  display: flex;
  justify-content: space-between;
}
</style>
