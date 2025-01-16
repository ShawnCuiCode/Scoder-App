<template>
  <view class="page">
    <!-- Navbar with dynamic title -->
    <Navbar :title="title"></Navbar>
    <view class="form">
      <!-- File upload component -->
      <u-upload
          ref="uUpload"
          :action="uploadUrl"
          :auto-upload="true"
          :deleteConfirmBtnColor="themeColor"
          :max-size="1024 * 1024 * 10"
          :preview-full-image="true"
          height="180"
          max-count="1"
          width="180"
          @on-success="uploadSuccess"
          @on-remove="uploadRemoved"
      ></u-upload>

      <!-- Form for project details -->
      <u-form ref="form" :model="form" label-position="top" label-width="180rpx">
        <u-form-item label="Project Name">
          <u-input v-model="form.projectName" placeholder="Please enter project name"/>
        </u-form-item>
        <u-form-item label="Description">
          <u-input v-model="form.description" placeholder="Please enter description" type="textarea"/>
        </u-form-item>
      </u-form>
    </view>

    <!-- Save or Update button -->
    <view class="btn">
      <u-button type="primary" @click="submitProject(form)">
        <text>{{ projectId ? 'Update' : 'Save' }}</text>
      </u-button>
    </view>

    <!-- Delete button, visible only during updates -->
    <view class="btn">
      <u-button v-if="projectId" type="error" @click="submitProject(form)">
        <text>Delete</text>
      </u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Create Project", // Default title
      themeColor: this.$appTheme.appThemeColor, // App theme color
      projectId: null, // To determine whether it's a create or update operation
      form: {
        projectId: null,
        avatar: "", // Avatar URL
        projectName: "", // Project name
        description: "", // Project description
      },
      uploadUrl: "http://127.0.0.1:8080/file/upload", // File upload URL
    };
  },
  onLoad(options) {
    // Check if projectId is passed to determine the operation type
    if (options.projectId) {
      this.projectId = options.projectId;
      this.title = "Update Project"; // Change title for update operation
      this.loadProjectData(this.projectId); // Load existing project data
    } else {
      this.title = "Create Project"; // Default title for creating a new project
    }
  },
  methods: {
    // Load existing project data by project ID
    async loadProjectData(projectId) {
      try {
        console.log("Loading project data for ID:", projectId);
        const res = await this.$u.api.getProjectById(projectId);
        console.log("Loaded project data:", res);
        if (res.code === 200) {
          // Populate form fields with existing data
          this.form = {
            avatar: res.data.avatar || "",
            projectName: res.data.projectName || "",
            description: res.data.description || "",
          };
        } else {
          this.$u.toast(res.msg || "Failed to load project data.");
        }
      } catch (err) {
        console.error("Error loading project data:", err);
        this.$u.toast("Network error, please try again later.");
      }
    },

    // Handle successful file upload
    uploadSuccess(data) {
      console.log("File upload successful:", data);
      this.form.avatar = data.data.url; // Save uploaded file URL
    },

    // Handle file removal
    uploadRemoved(index, lists) {
      console.log("File removed at index:", index, "Remaining files:", lists);
      if (lists.length === 0) {
        this.form.avatar = ""; // Clear avatar field if no files are left
      }
    },

    // Submit the form for either create or update operation
    submitProject(form) {
      console.log("Submitting project data:", form);
      // Validate required fields
      if (!this.form.avatar || !this.form.projectName || !this.form.description) {
        this.$u.toast("Please complete the form.");
        return;
      }
      // Determine if it's an update or create operation
      if (this.projectId) {
        this.updateProject(form); // Update existing project
      } else {
        this.createProject(form); // Create a new project
      }
    },

    // Create a new project
    async createProject(form) {
      try {
        console.log("Creating project with data:", form);
        const res = await this.$u.api.addProject(form);
        console.log("Create project response:", res);
        if (res.code === 200) {
          this.$u.toast("Project created successfully!");
          uni.switchTab({
            url: "/pages/home/index", // Redirect to home page
          });
        } else {
          this.$u.toast(res.msg || "Failed to create project.");
        }
      } catch (err) {
        console.error("Error creating project:", err);
        this.$u.toast("Network error, please try again later.");
      }
    },

    // Update an existing project
    async updateProject(form) {
      try {
        console.log("Updating project with ID:", this.projectId, "Data:", form);
        const res = await this.$u.api.updateProject({
          ...form,
          id: this.projectId, // Include project ID for update
        });
        console.log("Update project response:", res);
        if (res.code === 200) {
          this.$u.toast("Project updated successfully!");
          uni.switchTab({
            url: "/pages/home/index", // Redirect to home page
          });
        } else {
          this.$u.toast(res.msg || "Failed to update project.");
        }
      } catch (err) {
        console.error("Error updating project:", err);
        this.$u.toast("Network error, please try again later.");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding: 24rpx 30rpx;
  background-color: $app-theme-bg-color;

  .form {
    margin-bottom: 20rpx;
  }
}

.btn {
  padding: 20rpx 0rpx;
}
</style>
