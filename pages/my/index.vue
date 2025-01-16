<template>
  <view>
    <u-navbar :border-bottom="false" :is-back="false" title=" "></u-navbar>
    <view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
      <view class="u-m-r-10">
        <u-avatar :src="user.avatar" size="140"></u-avatar>
      </view>
      <view class="u-flex-1" @click="navigateToProfile">
        <view class="u-font-18 u-p-b-20">{{ user.nickName }}</view>
        <view class="u-font-14 u-tips-color">Username: {{ user.userName }}</view>
      </view>
      <view class="u-m-l-10 u-p-10">
        <u-icon color="#969799" name="arrow-right" size="28"></u-icon>
      </view>
    </view>

    <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item title="Change Password" @click="navigateToChangePassword"></u-cell-item>
        <u-cell-item title="My Projects" @click="navigateToMyProjects"></u-cell-item>
        <u-cell-item title="My Teams" @click="navigateToMyTeams"></u-cell-item>
      </u-cell-group>
    </view>

    <view class="u-m-t-20">
      <u-cell-group>
        <u-cell-item title="Logout" @click="navigateToLogin"></u-cell-item>
      </u-cell-group>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      user: uni.getStorageSync('user'),
    }
  },
  onLoad() {

  },
  methods: {
    navigateToProfile() {
      uni.navigateTo({
        url: "/pages/my/profile"
      })
    },
    navigateToChangePassword() {
      uni.navigateTo({
        url: "/pages/my/change-password"
      })
    },
    navigateToMyProjects() {
      uni.navigateTo({
        url: "/pages/my/my-projects"
      })
    },
    navigateToMyTeams() {
      uni.navigateTo({
        url: "/pages/my/my-teams"
      })
    },
    navigateToLogin() {
      uni.navigateTo({
        url: "/pages/login/index"
      })
    },
  }
}
</script>

<style lang="scss">
page {
  background-color: #ededed;
}

.user-box {
  background-color: #fff;
}
</style>
