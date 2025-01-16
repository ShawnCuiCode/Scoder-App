<template>
  <u-navbar
      :back-icon-color="$appTheme.appThemeTextBlackColor"
      :back-icon-name="backIconName"
      :back-icon-size="32"
      :border-bottom="false"
      :custom-back="backFunction"
      :title="title"
      :title-color="$appTheme.appThemeTextBlackColor"
  ></u-navbar>
</template>

<script>
export default {
  name: 'navbar', // Component name
  props: {
    // Back icon name
    backIconName: {
      type: String,
      default: 'arrow-leftward'
    },
    // Title text
    title: {
      type: String,
      default: ''
    },
    // Custom back function
    backFunction: {
      type: Function,
      default: null
    },
  }
};
</script>
