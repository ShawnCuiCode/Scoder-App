<template>
  <view
      :style="{ top: buttonTop + 'px', left: buttonLeft + 'px' }"
      class="slot"
      @touchend="buttonEnd"
      @touchmove="buttonMove"
      @touchstart="buttonStart">
    <view class="btn" @click="click">
      <u-icon name="plus" size="54"></u-icon>
    </view>
  </view>
</template>

<script>
var startPoint; // Variable to store the starting point of the touch
export default {
  data() {
    return {
      buttonTop: 0, // Initial top position of the button
      buttonLeft: 0, // Initial left position of the button
      windowHeight: '', // Screen height
      windowWidth: '' // Screen width
    };
  },
  mounted() {
    let $this = this;
    uni.getSystemInfo({
      success(res) {
        // Get screen height and width in px
        $this.windowHeight = res.windowHeight;
        $this.windowWidth = res.windowWidth;
        // Define the initial position of the button (bottom right corner)
        $this.buttonTop = res.windowHeight * 0.8;
        $this.buttonLeft = res.windowWidth * 0.8;
      }
    });
  },
  methods: {
    // Click event
    click() {
      this.$emit('click'); // Emit a custom click event
    },
    // Start dragging the button
    buttonStart: function (e) {
      // Get the starting point of the drag
      startPoint = e.touches[0];
    },
    // Dragging the button
    buttonMove: function (e) {
      // Get the end point of the drag
      var endPoint = e.touches[e.touches.length - 1];
      // Calculate the distance moved along the X and Y axes
      var translateX = endPoint.clientX - startPoint.clientX;
      var translateY = endPoint.clientY - startPoint.clientY;
      startPoint = endPoint; // Reset the starting point for the next movement
      var buttonTop = this.buttonTop + translateY;
      var buttonLeft = this.buttonLeft + translateX;
      // Ensure the button does not go beyond the screen boundaries
      if (buttonLeft + 50 >= this.windowWidth) {
        buttonLeft = this.windowWidth - 50;
      }
      if (buttonLeft <= 0) {
        buttonLeft = 0;
      }
      if (buttonTop <= 0) {
        buttonTop = 0;
      }
      if (buttonTop + 50 >= this.windowHeight) {
        buttonTop = this.windowHeight - 50;
      }
      this.buttonTop = buttonTop; // Update the button's top position
      this.buttonLeft = buttonLeft; // Update the button's left position
    },
    // End dragging the button (currently does nothing but can be expanded)
    buttonEnd: function (e) {
    }
  }
};
</script>

<style lang="scss" scoped>
.slot {
  position: fixed;
  z-index: $app-zIndex-fixed; // Fixed positioning with a high z-index
  box-shadow: $app-theme-shadow; // Add a shadow effect
  overflow: hidden;
  border-radius: 50%; // Rounded shape
  .btn {
    background-color: $app-theme-color; // Button background color
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100rpx; // Button width
    height: 100rpx; // Button height
    border-radius: 50%; // Rounded button
    color: $app-theme-text-white-color; // Button text/icon color
    overflow: hidden;
  }
}
</style>
