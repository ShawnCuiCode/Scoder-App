<template>
  <view class="page">
    <!-- Navbar at the top of the page -->
    <u-navbar :is-back="false" :title="title"></u-navbar>

    <!-- Main content for the group page -->
    <GroupPage></GroupPage>

    <!-- Floating add button -->
    <AddBtnFixed @click="add"></AddBtnFixed>

    <!-- Popup menu for adding projects or teams -->
    <AddPopup ref="AddPopup" :ops="addOps" @close="closeAddPopup"></AddPopup>
  </view>
</template>

<script>
import AddBtnFixed from '@/components/add-btn-fixed.vue'; // Floating add button component
import AddPopup from '@/components/add-popup.vue'; // Popup menu component
import GroupPage from './projects.vue'; // Main content for group page

export default {
  components: {
    GroupPage, // Main group page component
    AddBtnFixed, // Floating button component
    AddPopup // Popup for additional actions
  },
  data() {
    return {
      title: 'Scoder', // Page title
      showSearch: true, // Placeholder for potential search functionality
      addOps: [
        {
          label: 'Create Project', // Option to create a new project
          icon: require('../../static/operate/publish-community.png'), // Icon for the option
          url: '/pages/home/add-or-update-projects?type=add', // Navigation URL
          type: 'page' // Type of action (page navigation)
        },
        {
          label: 'Publish Team', // Option to publish a new team
          icon: require('../../static/operate/create-community.png'), // Icon for the option
          url: '/pages/home/add-or-update-team?type=add', // Navigation URL
          type: 'page' // Type of action (page navigation)
        }
      ]
    };
  },
  methods: {
    // Triggered when the floating add button is clicked
    add() {
      let $this = this;
      // Hide the tab bar with an animation before opening the popup
      uni.hideTabBar({
        animation: true,
        complete() {
          $this.$refs.AddPopup.open(); // Open the popup menu
        }
      });
    },

    // Triggered when the popup is closed
    closeAddPopup() {
      // Show the tab bar again with an animation
      uni.showTabBar({
        animation: true
      });
    }
  }
};
</script>

<style lang="scss" scoped></style>
