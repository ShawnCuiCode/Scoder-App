<template>
  <view class="page">
    <!-- Custom Navbar -->
    <u-navbar :background="{ backgroundColor: 'rgba(0,0,0,0)' }" :border-bottom="false" :custom-back="navbarBack"
              :is-back="pageStatus !== 'home'" back-icon-name="arrow-left"
              title=" "></u-navbar>
    <!-- Login Section -->
    <u-form>
      <view v-if="pageStatus === 'home'" class="login-section">
        <view class="logo-wrap">
          <image class="logo" src="../../static/app/logo.png"></image>
        </view>
        <u-form-item :border-bottom="true">
          <u-input v-model="loginForm.userName" :placeholder-style="'color: #ccc; font-size: 30rpx;'"
                   placeholder="Username"/>
        </u-form-item>
        <u-form-item :border-bottom="true">
          <u-input v-model="loginForm.password" :placeholder-style="'color: #ccc; font-size: 30rpx;'"
                   placeholder="Password"
                   type="password"/>
        </u-form-item>
        <view class="login-btn" @click="handleLogin">Login</view>
        <view class="register-btn" @click="showRegisterPage">Register</view>
      </view>

      <!-- Register Section -->

      <view v-else class="register-section">
        <u-form-item :border-bottom="true">
          <u-input v-model="registerForm.userName" :placeholder-style="'color: #ccc; font-size: 30rpx;'"
                   placeholder="Username"/>
        </u-form-item>
        <u-form-item :border-bottom="true">
          <u-input v-model="registerForm.nickName" :placeholder-style="'color: #ccc; font-size: 30rpx;'"
                   placeholder="Nickname"/>
        </u-form-item>
        <u-form-item :border-bottom="true">
          <u-input v-model="registerForm.password" :placeholder-style="'color: #ccc; font-size: 30rpx;'"
                   placeholder="Password"
                   type="password"/>
        </u-form-item>
        <u-form-item :border-bottom="true" label="Role">
          <u-radio-group v-model="registerForm.userType">
            <u-radio :name="1">Student</u-radio>
            <u-radio :name="2">Professor</u-radio>
          </u-radio-group>
        </u-form-item>
        <u-form-item :border-bottom="true">
          <u-input v-model="registerForm.email" :placeholder-style="'color: #ccc; font-size: 30rpx;'"
                   placeholder="Email"/>
        </u-form-item>

        <u-form-item :border-bottom="true" label="Gender" label-position="top">
          <u-radio-group v-model="registerForm.gender">
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
          <u-button plain style="width: 100%;margin-left: 60rpx" @click="showGoals = true">Choose Goal
          </u-button>
          <u-select v-model="showGoals" :list="goalsOptions" mode="single-column" @confirm="updateGoal"></u-select>
        </u-form-item>

        <u-form-item :border-bottom="true" label="Experience">
          <u-button plain style="width: 100%;margin-left: 60rpx" @click="showExperience = true">Choose
            Experience
          </u-button>
          <u-select v-model="showExperience" :list="experienceOptions" mode="single-column"
                    @confirm="updateExperience"></u-select>
        </u-form-item>


        <!--        <view class="selected-skills">-->
        <!--          Selected skills: {{ registerForm }}-->
        <!--        </view>-->

        <view class="register-btn" @click="handleRegister">Register</view>
      </view>
    </u-form>
  </view>
</template>

<script>

export default {
  data() {
    return {
      pageStatus: 'home', // Current page status ('home' or 'register')
      loginForm: {
        userName: '', // Username field for login
        password: '', // Password field for login
      },
      registerForm: {
        userName: '', // Username for registration
        password: '', // Password for registration
        email: '', // Email for registration
        userType: '1', // Default: Student (1 = Student, 2 = Professor)
        gender: 'Male', // Gender field: 'Male' or 'Female'
        nickName: '',
        skills: [],
        goal: '',
        experience: ''
      },
      skillsOptions: [],
      goalsOptions: [],
      experienceOptions: [],
      showGoals: false,
      showExperience: false,
      socket: null
    };
  },
  methods: {
    updateSkills(e) {
      console.log(e)
      const skillOption = this.skillsOptions.find(skill => skill.name === e.name);
      if (e.value) {
        this.registerForm.skills.push(skillOption.dictCode);
      } else {
        this.registerForm.skills = this.registerForm.skills.filter(code => code !== skillOption.dictCode);
      }
    },

    updateGoal(e) {
      console.log(e)
      this.registerForm.goal = e[0].value
    },

    updateExperience(e) {
      console.log(e)
      this.registerForm.experience = e[0].value
    },
    /**
     * Fetch skill options from the backend
     */
    async fetchSkillsOptions() {
      try {
        const response = await this.$u.api.getSkillDictData();
        // console.log('fetchSkillsOptions:', response)
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

    /**
     * Handle login action
     */
    async handleLogin() {
      if (!this.loginForm.userName || !this.loginForm.password) {
        uni.showToast({
          title: 'Please enter username and password',
          icon: 'none',
        });
        return;
      }

      try {
        const response = await this.$u.api.login(this.loginForm);
        console.log(response)
        if (response.code === 200) {
          uni.setStorageSync('token', response.data.access_token);
          uni.showToast({
            title: 'Login successful',
            icon: 'success'
          });
          this.getUserByToken()
          uni.switchTab({
            url: '/pages/home/index'
          });
        } else {
          uni.showToast({
            title: response.msg || 'Login failed',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('Login request error:', error);
        uni.showToast({
          title: 'Login failed. Please try again later.',
          icon: 'none'
        });
      }
    },

    async getUserByToken() {
      try {
        const response = await this.$u.api.getUserByToken();
        // console.log(response)
        if (response.code === 200) {
          uni.setStorageSync('user', response.data);
          // console.log("userData saved to local storage")
          this.$store.dispatch('websocket/initWebSocket', response.data.userId);
        } else {
          uni.showToast({
            title: response.msg || 'Login failed',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('getUserByToken request error:', error);
        uni.showToast({
          title: 'getUserByToken failed. Please try again later.',
          icon: 'none'
        });
      }
    },

    /**
     * Handle register action
     */
    async handleRegister() {
      if (!this.registerForm.userName || !this.registerForm.password || !this.registerForm.email) {
        uni.showToast({
          title: 'Please complete all fields',
          icon: 'none'
        });
        return;
      }

      try {
        const response = await this.$u.api.register(this.registerForm);
        if (response.code === 200) {
          uni.showToast({
            title: 'Register successful',
            icon: 'success'
          });
          this.pageStatus = 'home';
        } else {
          uni.showToast({
            title: response.msg || 'Register failed',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('Register request error:', error);
        uni.showToast({
          title: 'Register failed. Please try again later.',
          icon: 'none',
        });
      }
    },

    /**
     * Navigate to the register page
     */
    showRegisterPage() {
      this.pageStatus = 'register';
    },

    /**
     * Handle back button on the navbar
     */
    navbarBack() {
      if (this.pageStatus !== 'home') {
        this.pageStatus = 'home';
      }
    },
  },
  mounted() {
    this.fetchSkillsOptions();
    this.fetchGoalsOptions();
    this.fetchExperienceOptions();
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding: 0 40rpx;
  background-color: #f8f9fa;
}

.logo-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100rpx;
  padding-bottom: 200rpx;

  .logo {
    width: 220rpx;
    height: 220rpx;
    border-radius: 50%;
    overflow: hidden;
  }

  .app-name {
    font-size: 44rpx;
    font-weight: bold;
    margin-top: 20rpx;
  }
}

.login-section,
.register-section {
  width: 100%;
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
</style>
