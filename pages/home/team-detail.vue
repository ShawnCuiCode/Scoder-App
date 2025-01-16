<template>
  <view class="page">
    <!-- Navbar with title -->
    <Navbar title="Team Details"></Navbar>

    <view class="form">
      <!-- Team avatar display -->
      <u-form-item>
        <u-image
            :src="team.avatar"
            height="180rpx"
            mode="aspectFill"
            width="180rpx"
        ></u-image>
      </u-form-item>

      <!-- Team name display -->
      <u-form-item label="Team Name" label-position="top">
        <text>{{ team.team }}</text>
      </u-form-item>

      <!-- Team description display -->
      <u-form-item label="Description" label-position="top">
        <text>{{ team.description }}</text>
      </u-form-item>

      <!-- Skills list display -->
      <u-form-item label="Skills" label-position="top">
        <view class="skills">
          <text
              v-for="(skill, index) in team.skills"
              :key="index"
              class="skill-tag"
          >
            {{ skill }}
          </text>
        </view>
      </u-form-item>

      <!-- Number of team members -->
      <u-form-item label="Team Number" label-position="top">
        <text>{{ team.teamNumber }}</text>
      </u-form-item>

      <!-- Team's goal -->
      <u-form-item label="Goal" label-position="top">
        <text>{{ team.goal }}</text>
      </u-form-item>

      <!-- Team's experience level -->
      <u-form-item label="Experience" label-position="top">
        <text>{{ team.experience }}</text>
      </u-form-item>

    </view>
  </view>
</template>

<script>
import CommuntiyAvatar from '@/pages/home/components/community-avatar';

export default {
  components: {
    CommuntiyAvatar // Component for displaying community avatars
  },
  data() {
    return {
      team: {}, // Holds the team details fetched from the API
      teamId: '' // Holds the team ID passed via query parameters
    }
  },
  onLoad(query) {
    // Extract teamId from the query parameters
    this.teamId = query.teamId;
    console.log('Received teamId:', this.teamId);

    // Fetch team details once the page loads
    this.getTeamById();
  },
  methods: {
    // Fetch team details from the API using the teamId
    async getTeamById() {
      if (!this.teamId) {
        this.$u.toast('No teamId provided.');
        return;
      }
      try {
        const response = await this.$u.api.getTeamById(this.teamId);
        console.log('API Response:', response);

        // Check if the API response is successful
        if (response.code === 200) {
          this.team = response.data; // Populate the team data
        } else {
          this.$u.toast(response.msg || 'Failed to fetch team details.');
        }
      } catch (error) {
        console.error('Error fetching team details:', error);
        this.$u.toast('Network error, please try again later.');
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  padding: 24rpx 30rpx;
  background-color: $app-theme-bg-color;

  .skills {
    display: flex;
    flex-wrap: wrap;

    .skill-tag {
      background-color: #e0e0e0; /* Light grey background for skills */
      color: #333; /* Text color for skills */
      padding: 4rpx 8rpx; /* Padding inside each skill tag */
      margin: 4rpx; /* Margin between skill tags */
      border-radius: 8rpx; /* Rounded corners for skill tags */
      font-size: 24rpx; /* Font size for skill names */
    }
  }
}
</style>
