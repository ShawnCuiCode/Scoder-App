<template>
  <view class="slot">
    <!-- Section for projects -->
    <TitleOperate title="Projects"></TitleOperate>
    <view class="hot-nav">
      <!-- Display a horizontal scrollable list of projects -->
      <communityHotNav
          :list="projectList"
          imgSize="100rpx"
          @selectProject="handleProjectSelect"
      ></communityHotNav>
    </view>

    <!-- Section for teams -->
    <TitleOperate title="Teams"></TitleOperate>
    <!-- Display a list of teams associated with the selected project -->
    <PostCard
        v-for="(item, index) in teamList"
        :key="index"
        :border="index != teamList.length - 1"
        :data="item"
    ></PostCard>
  </view>
</template>

<script>
import communityHotNav from '@/pages/home/components/community-hot-nav.vue';
import TitleOperate from '@/components/title-operate.vue';
import PostCard from '@/pages/home/components/post-card';

export default {
  components: {
    TitleOperate, // Reusable title section with optional operations
    communityHotNav, // Horizontal navigation for project list
    PostCard, // Card component for displaying team details
  },
  data() {
    return {
      projectList: [], // List of projects to display in the "Projects" section
      teamList: [] // List of teams under the selected project
    };
  },
  methods: {
    // Triggered when a project is selected from the list
    async handleProjectSelect(projectId) {
      console.log("Selected Project ID:", projectId);
      await this.getTeamListByUser(projectId); // Fetch the teams associated with the selected project
    },

    // Fetch the list of projects from the server
    async getProjectList() {
      try {
        const response = await this.$u.api.getProjectList();
        if (response.code === 200) {
          // Transform the response data into a format suitable for the UI
          this.projectList = response.data.map(project => ({
            projectId: project.projectId, // Project ID
            img: project.avatar, // Project avatar image
            name: project.projectName, // Project name
          }));
          console.log('Project list fetched successfully:', this.projectList);

          // Automatically load the teams for the first project in the list
          if (this.projectList.length > 0) {
            this.getTeamListByUser(this.projectList[0].projectId);
          }
        } else {
          // Show a toast if the server response indicates failure
          this.$u.toast(response.msg || 'Failed to fetch project list');
        }
      } catch (error) {
        console.error('Error fetching project list:', error);
        this.$u.toast('Network error, please try again later');
      }
    },

    // Fetch the list of teams for the selected project and user
    async getTeamListByUser(projectId) {
      const userId = uni.getStorageSync('user').userId; // Retrieve the user ID from local storage
      const token = uni.getStorageSync('token'); // Retrieve the token from local storage
      console.log('Token:', token);
      try {
        const response = await this.$u.api.getTeamListByUser(projectId, userId);
        if (response.code === 200) {
          // Transform the response data into a format suitable for the UI
          this.teamList = response.data.map(team => ({
            teamId: team.teamId, // Team ID
            avatar: team.avatar, // Team avatar image
            team: team.team, // Team name
            description: team.description, // Team description
            radarImg: team.radarImg, // Radar chart image for the team
            time: team.createTime, // Creation time
            matchScore: Math.round(team.matchScore * 10) / 10, // Match score (rounded to one decimal place)
            isJoined: team.isJoined // Whether the user has joined the team
          }));
          console.log('Team list fetched successfully:', this.teamList);
        } else {
          // Show a toast if the server response indicates failure
          this.$u.toast(response.msg || 'Failed to fetch Team list');
        }
      } catch (error) {
        console.error('Error fetching Team list:', error);
        this.$u.toast('Network error, please try again later');
      }
    },
  },
  mounted() {
    // Automatically fetch the project list when the page is loaded
    this.getProjectList();
  },
};
</script>

<style lang="scss" scoped>
.hot-nav {
  padding: 0rpx 0rpx 0rpx 0rpx; // Adjust padding if needed
  background-color: #f8f9fa; // Light background color for the navigation
}
</style>
