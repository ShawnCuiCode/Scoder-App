<template>
  <view class="page">
    <u-navbar is-back="false" title="Profile"></u-navbar>

    <u-form>
      <view class="profile-section">
        <u-form-item :border-bottom="true" style="align-items: center">
          <u-avatar size="180" src="user.avatar" @click="uploadAvatar"/>
        </u-form-item>
        <u-form-item :border-bottom="true" label="Username" label-position="top">
          <u-input v-model="user.userName" placeholder="Username"/>
        </u-form-item>
        <u-form-item :border-bottom="true" label="Nickname" label-position="top">
          <u-input v-model="user.nickName" placeholder="Nickname"/>
        </u-form-item>
        <u-form-item :border-bottom="true" label="Role">
          <u-radio-group v-model="user.userType">
            <u-radio :name="1">Student</u-radio>
            <u-radio :name="2">Professor</u-radio>
          </u-radio-group>
        </u-form-item>
        <u-form-item :border-bottom="true">
          <u-input v-model="user.email" :placeholder-style="'color: #ccc; font-size: 30rpx;'"
                   placeholder="Email"/>
        </u-form-item>
        <u-form-item :border-bottom="true" label="Gender" label-position="top">
          <u-radio-group v-model="user.gender">
            <u-radio name="0">Male</u-radio>
            <u-radio name="1">Female</u-radio>
            <u-radio name="2">Others</u-radio>
          </u-radio-group>
        </u-form-item>
        <!-- Skills Selection -->
        <u-form-item :border-bottom="true" label="Skills" label-position="top">
          <u-checkbox-group>
            <u-checkbox
                v-for="(skill, index) in skillsOptions"
                :key="index"
                v-model="skill.checked"
                :name="skill.name"
                @change="updateSkills"
            >
              {{ skill.name }}
            </u-checkbox>
          </u-checkbox-group>
        </u-form-item>

        <u-form-item :border-bottom="true" label="Goal">
          <u-button class="choose_btn" plain @click="showGoals = true">Choose Goal</u-button>
          <u-select v-model="showGoals" :list="goalsOptions" mode="single-column" @confirm="updateGoal"></u-select>
        </u-form-item>

        <u-form-item :border-bottom="true" label="Experience">
          <u-button class="choose_btn" plain @click="showExperience = true">Choose Experience</u-button>
          <u-select v-model="showExperience" :list="experienceOptions" mode="single-column"
                    @confirm="updateExperience"></u-select>
        </u-form-item>
        <!--        <view class="selected-skills">-->
        <!--          Selected skills: {{ user }}-->
        <!--        </view>-->
        {{ user }}
        <view class="register-btn" @click="updateProfile">Save</view>
      </view>
    </u-form>
  </view>
</template>

<script>
export default {
  data() {
    return {

      user: {
        skills: [],
      },
      skillsOptions: [],
      goalsOptions: [],
      experienceOptions: [],
      showGoals: false,
      showExperience: false,
      uploadUrl: "http://127.0.0.1:8080/file/upload",
      uploadFileList: []
    };
  },
  methods: {
    async updateProfile() {
      console.log('updateUser executed')
      const response = await this.$u.api.updateProfile(this.user)
      if (response.code === 200) {
        console.log('updateUser:', response.data)
        uni.setStorageSync('user', this.user)
        uni.navigateTo({
          url: '/pages/my/index'
        })
      }
    },
    uploadAvatar() {
      uni.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFilePath = res.tempFilePaths[0];
          console.log('tempFilePath:', tempFilePath);
          this.uploadToServer(tempFilePath);
        },
        fail: (err) => {
          console.error('failed:', err);
          uni.showToast({
            title: 'Failed to select image',
            icon: 'none',
          });
        },
      });
    },

    uploadToServer(filePath) {
      uni.uploadFile({
        url: this.uploadUrl,
        filePath: filePath,
        name: 'file',
        formData: {},
        success: (uploadFileRes) => {
          const res = JSON.parse(uploadFileRes.data);
          if (res.code === 200) {
            console.log("Upload successful:", res.data)
            this.user.avatar = res.data.url;
            this.avatar = res.data.url;
            uni.showToast({
              title: 'Upload successful',
              icon: 'success',
            });
          } else {
            uni.showToast({
              title: res.msg || 'Upload failed',
              icon: 'none',
            });
          }
        },
        fail: (err) => {
          console.error('上传失败:', err);
          uni.showToast({
            title: 'Upload failed. Please try again.',
            icon: 'none',
          });
        },
      });
    },

    updateSkills(e) {
      console.log(e)
      const skillOption = this.skillsOptions.find(skill => skill.name === e.name);
      if (e.value) {
        this.user.skills.push(skillOption.dictCode);
      } else {
        this.user.skills = this.user.skills.filter(code => code !== skillOption.dictCode);
      }
    },

    updateGoal(e) {
      console.log(e)
      this.user.goal = e[0].value
    },

    updateExperience(e) {
      console.log(e)
      this.user.experience = e[0].value
    },
    /**
     * Fetch skill options from the backend
     */
    async fetchSkillsOptions() {
      try {
        const response = await this.$u.api.getSkillDictData();
        if (response.code === 200) {
          this.skillsOptions = response.data.map((item) => ({
            name: item.dictLabel,
            dictCode: item.dictCode,
            checked: false,
            disable: false
          }));
          // console.log(this.skillsOptions)
        } else {
          uni.showToast({
            title: 'Failed to fetch skills',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('Error loading skills:', error);
        uni.showToast({
          title: 'Error loading skills',
          icon: 'none'
        });
      }
    },

    async fetchGoalsOptions() {
      try {
        const response = await this.$u.api.getGoalDictData();
        if (response.code === 200) {
          this.goalsOptions = response.data.map((item) => ({
            label: item.dictLabel,
            value: item.dictCode,
          }));
          // console.log(this.goalsOptions)
        } else {
          uni.showToast({
            title: 'Failed to fetch goals',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('Error loading goals:', error);
        uni.showToast({
          title: 'Error loading goals',
          icon: 'none'
        });
      }
    },

    async fetchExperienceOptions() {
      try {
        const response = await this.$u.api.getExperienceDictData();
        if (response.code === 200) {
          this.experienceOptions = response.data.map((item) => ({
            label: item.dictLabel,
            value: item.dictCode,
          }));
          // console.log(this.experienceOptions)
        } else {
          uni.showToast({
            title: 'Failed to fetch experience',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('Error loading experienceOption:', error);
        uni.showToast({
          title: 'Error loading experience',
          icon: 'none'
        });
      }
    },

  },
  mounted() {
    this.fetchSkillsOptions();
    this.fetchGoalsOptions();
    this.fetchExperienceOptions();
    this.user = uni.getStorageSync('user');
  },
};
</script>

<style lang="scss" scoped>

.page {
  padding: 0 40rpx;
  background-color: #f8f9fa;
}

.login-btn,
.register-btn {
  margin-top: 40rpx;
  width: 100%;
  height: 96rpx;
  text-align: center;
  line-height: 96rpx;
  font-size: 32rpx;
  color: #fff;
  background-color: #007bff;
  border-radius: 8rpx;
}

.selected-skills {
  margin-top: 20rpx;
  font-size: 28rpx;
  color: #333;
  background-color: #f5f5f5;
  padding: 10rpx;
  border-radius: 8rpx;
}

.choose_btn {
  margin-left: 100rpx;
  width: 100%;
}
</style>
