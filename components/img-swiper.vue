<template>
  <view class="slot">
    <u-swiper :list="list" border-radius="0" height="750" indicator-pos="bottomRight" mode="number"></u-swiper>
  </view>
</template>

<script>
export default {
  name: 'goods-img-swiper',
  props: {
    list: {
      type: Array,
      default: () => {
        return [];
      }
    },
  }
};
</script>

<style></style>
