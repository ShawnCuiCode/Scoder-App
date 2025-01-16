<template>
  <view class="page">
    <u-navbar title="Change Password"></u-navbar>
    <u-form>
      <u-form-item label="Old Password" label-position="top">
        <u-input v-model="oldPassword" placeholder="Please Input Old Password" type="password"></u-input>
      </u-form-item>

      <u-form-item label="New Password" label-position="top">
        <u-input v-model="newPassword" placeholder="Please Input New Password" type="password"></u-input>
      </u-form-item>
    </u-form>
    {{ oldPassword }} {{ newPassword }}
    <u-button style="margin-top: 50rpx" type="primary" @click="resetPwd">Change</u-button>
  </view>
</template>
<script>

export default {
  data() {
    return {
      oldPassword: '',
      newPassword: ''
    }
  },
  methods: {
    async resetPwd() {
      const res = await this.$u.api.resetPwd(this.oldPassword, this.newPassword);
      if (res.code === 200) {
        uni.showToast({
          title: 'Password Changed',
          icon: 'none'
        });
        setTimeout(() => {
          uni.switchTab({
            url: '/pages/my/index'
          })
        }, 500)

      }
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  padding: 0 40rpx;
  background-color: #f8f9fa;
}
</style>
