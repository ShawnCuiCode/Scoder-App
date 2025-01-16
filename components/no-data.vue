<template>
  <view :style="{ height }" class="slot">
    <!-- Display the image based on the type -->
    <view class="img">
      <image :src="'../static/nodata/' + type + '.png'" mode="widthFix"></image>
    </view>
    <!-- Display the tip text -->
    <view class="tip">{{ returnTip(tip) }}</view>
  </view>
</template>

<script>
export default {
  name: 'no-data',
  props: {
    // Type of the placeholder (used for image selection, located in /static/nodata/...)
    type: {
      type: String,
      default: 'content'
    },
    // Height of the placeholder component
    height: {
      type: String,
      default: '100%'
    },
    // Custom text to display as a tip
    tip: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // Default options for placeholder types and their corresponding tips
      ops: [
        {type: 'content', tip: 'No content available'},
        {type: 'collection', tip: 'No collections yet'},
        {type: 'fans', tip: 'No fans yet'},
        {type: 'network', tip: 'No network connection'},
        {type: 'order', tip: 'No orders found'},
        {type: 'news', tip: 'No messages available'},
        {type: 'result', tip: 'No search results'}
      ]
    };
  },
  methods: {
    // Return the appropriate tip text based on the type or use the custom tip
    returnTip(tip) {
      if (tip) {
        return tip; // Use the custom tip if provided
      } else {
        // Find and return the default tip based on the type
        return this.ops.filter(item => item.type == this.type)[0].tip;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.slot {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;

  .img {
    width: 400rpx;
    height: auto;
    margin: 0 auto;

    image {
      width: 100%;
      height: auto;
    }
  }

  .tip {
    margin-top: 48rpx;
    width: 100%;
    text-align: center;
    font-size: 30rpx;
    font-weight: 400;
    color: $app-theme-text-color; // Use app theme text color
  }
}
</style>
