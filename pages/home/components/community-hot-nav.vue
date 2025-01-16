<template>
  <view class="slot">
    <scroll-view scroll-x="true" style="white-space: nowrap;">
      <view
          v-for="(item, index) in list"
          :key="index"
          class="list"
          @click="selectProject(item.projectId)"
      >
        <view class="inner">
          <u-image
              :height="imgSize"
              :src="item[imgName]"
              :width="imgSize"
              mode="widthFix"
          ></u-image>
          <view :style="{ fontSize: nameSize }" class="list-text">
            {{ item[labelName] }}
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  name: 'community-hot-nav',
  props: {
    // Key for image source
    imgName: {
      type: String,
      default: 'img'
    },
    // Key for label text
    labelName: {
      type: String,
      default: 'name'
    },
    // Data list for items
    list: {
      type: Array,
      default: () => []
    },
    // Image size
    imgSize: {
      type: String,
      default: '84rpx'
    },
    // Font size for names
    nameSize: {
      type: String,
      default: '28rpx'
    }
  },
  methods: {
    // Emit the selected project's ID
    selectProject(projectId) {
      this.$emit('selectProject', projectId);
    }
  }
};
</script>

<style lang="scss" scoped>
.slot {
  border-radius: 16rpx;
  background-color: $app-theme-bg-color;
  overflow: hidden;

  .list {
    margin: 10rpx;
    display: inline-block;
    width: 180rpx;
  }

  .inner {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .list-text {
    padding-top: 16rpx;
    margin-bottom: 12rpx;
    font-size: 28rpx;
    color: $app-theme-text-black-color;
    text-align: center;
    width: 100%;
  }
}
</style>
