<template>
  <view class="page">
    <Navbar title="Publish Team"></Navbar>
    <view class="form">
      <u-form ref="form" :model="form">
        <u-form-item class="upload">
          <u-upload
              ref="uUpload"
              :action="uploadUrl"
              :auto-upload="true"
              :deleteConfirmBtnColor="appThemeColor"
              :max-size="1024 * 1024 * 10"
              :preview-full-image="true"
              :value="form.avatar"
              height="180"
              max-count="1"
              width="180"
              @on-success="uploadSuccess"
              @on-remove="uploadRemoved"
          ></u-upload>
        </u-form-item>
        <u-form-item label="Team Name" label-position="top">
          <u-input v-model="form.team" placeholder="Please Entry Project Name"/>
        </u-form-item>
        <u-form-item label="Description" label-position="top">
          <u-input v-model="form.description" placeholder="Please Entry Description" type="textarea"/>
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

        <u-form-item :border-bottom="true" label="Team Number" label-position="top">
          <u-number-box v-model="value" @change="valChange"></u-number-box>
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

        <u-form-item :border-bottom="true" label="Project">
          <u-button class="choose_btn" plain @click="showProjects = true">Choose Project</u-button>
          <u-select v-model="showProjects" :list="projectsOptions" mode="single-column"
                    @confirm="updateProject"></u-select>
        </u-form-item>

      </u-form>

      {{ this.form }}
    </view>
    <view class="btn">
      <u-button type="primary" @click="submit (form)">
        <text>Save</text>
      </u-button>
    </view>

    <view v-if="isUpdate" class="btn">
      <u-button type="error" @click="submit (form)">
        <text>Delete</text>
      </u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isUpdate: false,
      appThemeColor: this.$appTheme.appThemeColor,
      appThemeTextGrayColor: this.$appTheme.appThemeTextGrayColor,
      form: {
        teamId: '',
        avatar: '',
        team: '',
        description: '',
        skills: [],
        goal: 'Choose Goal',
        experience: '',
        projectId: '',
        teamNumber: 1,
      },
      uploadUrl: 'http://scoder.co.uk/api/file/upload',
      skillsOptions: [],
      goalsOptions: [],
      experienceOptions: [],
      projectsOptions: [],
      showGoals: false,
      showExperience: false,
      showProjects: false,
      value: 2,
    };
  },
  onLoad(options) {
    if (options.teamId) {
      this.teamId = options.teamId;
      this.isUpdate = true;
      this.getTeamById(this.teamId);
    }
  },
  methods: {
    async getTeamById(teamId) {
      try {
        const response = await this.$u.api.getTeamById(teamId);
        if (response.code === 200) {
          const teamData = response.data;
          this.form = {
            teamId: teamData.teamId,
            avatar: teamData.avatar || '',
            team: teamData.team || '',
            description: teamData.description || '',
            skills: teamData.skills || [],
            goal: teamData.goal || '',
            experience: teamData.experience || '',
            projectId: teamData.projectId || '',
            teamNumber: teamData.teamNumber || 1,
          };
          this.value = teamData.teamNumber
          this.skillsOptions = this.skillsOptions.map((skill) => ({
            ...skill,
            checked: this.form.skills.includes(skill.dictCode),
          }));
        } else {
          uni.showToast({
            title: response.msg || 'Failed to fetch team data',
            icon: 'none',
          });
        }
      } catch (error) {
        console.error('Error fetching team data:', error);
        uni.showToast({
          title: 'Error fetching team data',
          icon: 'none',
        });
      }
    },
    async submit(form) {
      if (!form.team || !form.description || !form.goal || !form.experience || !form.skills.length) {
        uni.showToast({
          title: 'Please fill in all required fields',
          icon: 'none',
        });
        return;
      }

      try {
        let response;
        if (this.isUpdate) {
          response = await this.$u.api.updateTeam(form);
        } else {
          response = await this.$u.api.addTeam(form);
        }

        if (response.code === 200) {
          uni.showToast({
            title: this.isUpdate ? 'Team updated successfully' : 'Team created successfully',
            icon: 'success',
          });
          uni.switchTab({
            url: '/pages/home/index',
          });
        } else {
          uni.showToast({
            title: response.msg || (this.isUpdate ? 'Failed to update team' : 'Failed to create team'),
            icon: 'none',
          });
        }
      } catch (error) {
        console.error(this.isUpdate ? 'Error updating team:' : 'Error creating team:', error);
        uni.showToast({
          title: this.isUpdate ? 'Error updating team' : 'Error creating team',
          icon: 'none',
        });
      }
    },
    valChange(e) {
      console.log('current teamNumber: ' + e.value)
      this.form.teamNumber = e.value
    },
    uploadSuccess(data) {
      console.log('Upload successful:', data);
      this.form.avatar = data.data.url; // Save the file path to the form
    },
    uploadRemoved(index, lists) {
      console.log('Image removed:', index, lists);
      if (lists.length === 0) {
        this.form.avatar = ''; // Clear the image path if no files remain
      }
    },

    updateSkills(e) {
      console.log(e)
      const skillOption = this.skillsOptions.find(skill => skill.name === e.name);
      if (e.value) {
        this.form.skills.push(skillOption.dictCode);
      } else {
        this.form.skills = this.form.skills.filter(code => code !== skillOption.dictCode);
      }
    },

    updateGoal(e) {
      console.log(e)
      this.form.goal = e[0].value
    },

    updateExperience(e) {
      console.log(e)
      this.form.experience = e[0].value
    },

    updateProject(e) {
      console.log(e)
      this.form.projectId = e[0].value
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
          console.log(this.experienceOptions)
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

    async fetchProjectsOptions() {
      try {
        const response = await this.$u.api.getProjectList();
        if (response.code === 200) {
          this.projectsOptions = response.data.map((item) => ({
            label: item.projectName,
            value: item.projectId,
          }));
          console.log(this.projectsOptions)
        } else {
          uni.showToast({
            title: 'Failed to fetch projects',
            icon: 'none'
          });
        }
      } catch (error) {
        console.error('Error loading projectsOption:', error);
        uni.showToast({
          title: 'Error loading projects',
          icon: 'none'
        });
      }
    },
  },
  mounted() {
    this.fetchSkillsOptions();
    this.fetchGoalsOptions();
    this.fetchExperienceOptions();
    this.fetchProjectsOptions();
  },
};
</script>

<style lang="scss" scoped>

.page {
  padding: 24rpx 30rpx;
  background-color: $app-theme-bg-color;
}

.card {
  .form {
  }

  .pics {
    padding-bottom: 30rpx;
    border-bottom: 1rpx solid $app-theme-border-color;
    margin-left: -12rpx;
  }
}

.satellite {
  margin-top: 24rpx;

  .item {
    border-top: 1px solid $app-theme-border-color;
    padding: 24rpx 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;

      view {
        padding-left: 24rpx;
        font-size: 28rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: $app-theme-text-gray-color;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 80vw;
      }
    }
  }
}

.btn {
  margin-top: 50rpx;
}

.choose_btn {
  margin-left: 100rpx;
  width: 100%;
}

.upload {
  align-items: center;
}
</style>
