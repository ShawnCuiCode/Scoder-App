<template>
  <view :style="{ padding, backgroundColor, alignItems: align }" class="slot">
    <!-- Title Section -->
    <view
        :style="{ fontSize: titleSize, color: titleColor }"
        class="name">
      {{ title }}
    </view>

    <!-- More Button or Slot -->
    <view v-if="showMore" class="more" @click="clickMore">
      {{ moreLabel }}
      <u-icon name="arrow-right" size="20"></u-icon>
    </view>
    <view v-else class="more">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  name: 'title-operate', // Component name
  props: {
    // Title text
    title: {
      type: String,
      default: ''
    },
    // Whether to show the "More" button
    showMore: {
      type: Boolean,
      default: false
    },
    // Label for the "More" button
    moreLabel: {
      type: String,
      default: 'more'
    },
    // Padding for the container
    padding: {
      type: String,
      default: '20rpx'
    },
    // Background color of the container
    backgroundColor: {
      type: String,
      default: ''
    },
    // Font size of the title
    titleSize: {
      type: String,
      default: '28rpx'
    },
    // Alignment of the content
    align: {
      type: String,
      default: 'flex-end'
    },
    // Color of the title text
    titleColor: {
      type: String,
      default: ''
    }
  },
  methods: {
    // Emit the "clickMore" event when the "More" button is clicked
    clickMore() {
      this.$emit('clickMore');
    }
  }
};
</script>

<style lang="scss" scoped>
.slot {
  display: flex;
  justify-content: space-between;

  .name {
    color: $app-theme-text-black-color; // Default text color for the title
  }

  .more {
    display: flex;
    align-items: center;
    color: $app-theme-text-gray-color; // Default text color for the "More" button
  }
}
</style>
