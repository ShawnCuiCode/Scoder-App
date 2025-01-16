<template>
  <view class="page">
    <!-- Navbar with page title -->
    <u-navbar title="My Teams"></u-navbar>

    <!-- Team List -->
    <view class="team-list">
      <view
          v-for="(team, index) in teams"
          :key="index"
          class="team-item"
          @click="goToTeamDetail(team.teamId)"
      >
        <u-avatar :src="team.avatar" class="team-image" size="100"></u-avatar>
        <view class="team-info">
          <text class="team-title">{{ team.team }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      teams: [], // List of teams
    };
  },
  methods: {
    // Load teams from API
    async loadTeams() {
      try {
        const res = await this.$u.api.getMyTeamList();
        if (res.code === 200) {
          console.log('teams:', res.data);
          this.teams = res.data; // Assign API response data to `teams`
        } else {
          uni.showToast({
            title: res.msg || 'Failed to load teams',
            icon: 'none',
          });
        }
      } catch (error) {
        console.error('Error loading teams:', error);
        uni.showToast({
          title: 'Error loading teams',
          icon: 'none',
        });
      }
    },

    // Navigate to team detail page
    goToTeamDetail(teamId) {
      uni.navigateTo({
        url: `/pages/home/add-or-update-team?teamId=${teamId}`, // Dynamic navigation to team details page
      });
    },
  },
  mounted() {
    this.loadTeams(); // Fetch teams when the component is mounted
  },
};
</script>
<style lang="scss" scoped>
.page {
  padding: 0;
}

.team-list {
  padding: 10rpx;
  background-color: #f8f9fa;
}

.team-item {
  display: flex;
  align-items: center;
  padding: 15rpx;
  margin-bottom: 10rpx;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
}

.team-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 10rpx;
  margin-right: 15rpx;
}

.team-info {
  flex: 1;
}

.team-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 5rpx;
}

.team-description {
  font-size: 28rpx;
  color: #666;
}

.no-data {
  text-align: center;
  padding: 50rpx;
  font-size: 28rpx;
  color: #888;
}
</style>
