<template>
  <view class="page">
    <u-navbar title="My Projects"></u-navbar>

    <!-- Project List -->
    <view class="projects-list">
      <view
          v-for="(project, index) in projects"
          :key="index"
          class="project-item"
          @click="goToProjectDetail(project.projectId)"
      >
        <u-avatar :src="project.avatar" class="project-image" size="100"></u-avatar>
        <view class="project-info">
          <text class="project-title">{{ project.projectName }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      projects: [],
    };
  },
  methods: {
    async loadProjects() {
      try {
        const res = await this.$u.api.getMyProjectList();
        if (res.code === 200) {
          console.log('projects:', res.data)
          this.projects = res.data;
        } else {
          uni.showToast({
            title: res.msg || 'Failed to load projects',
            icon: 'none',
          });
        }
      } catch (error) {
        console.error('Error loading projects:', error);
        uni.showToast({
          title: 'Error loading projects',
          icon: 'none',
        });
      }
    },

    goToProjectDetail(projectId) {
      uni.navigateTo({
        url: `/pages/home/add-or-update-projects?projectId=${projectId}`,
      });
    },
  },
  mounted() {
    this.loadProjects();
  },
};
</script>
<style lang="scss" scoped>
.page {
  padding: 0;
}

.projects-list {
  padding: 10rpx;
  background-color: #f8f9fa;
}

.project-item {
  display: flex;
  padding: 15rpx;
  margin-bottom: 10rpx;
  background-color: #fff;
  border-radius: 10rpx;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
}

.project-image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 10rpx;
  margin-right: 15rpx;
}

.project-info {
  flex: 1;
}

.project-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
  margin-bottom: 5rpx;
}

.project-description {
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
