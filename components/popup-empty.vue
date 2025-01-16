<template>
  <u-popup
      v-model="show"
      closeable
      mask
      mask-close-able
      mode="bottom">
    <view class="inner">
      <slot></slot>
    </view>
  </u-popup>
</template>

<script>
export default {
  data() {
    return {
      show: false, // Controls the visibility of the popup
      data: {} // Data source for the popup content
    };
  },
  methods: {
    // Open the popup and set the data
    open(data) {
      this.data = data; // Assign the provided data to the popup's data
      this.show = true; // Show the popup
    },
    // Close the popup (additional logic can be added here if needed)
    close() {
      this.show = false; // Hide the popup
    }
  }
};
</script>

<style lang="scss" scoped>
.inner {
  padding: 30rpx 30rpx 0 30rpx; // Padding for the inner container
  display: flex; // Flexbox layout
  align-items: flex-end; // Align content to the bottom
}
</style>
