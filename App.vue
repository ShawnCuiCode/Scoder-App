<script>
export default {
  globalData: {

    menuTop: 0,

    navBarHeight: 0,

    menuRight: 0,

    menuBotton: 0,

    menuHeight: 0,

    statusBarHeight: 0,

    safeAreaHeight: 0,
    menuWidth: 0
  },
  onLaunch(options) {
    const that = this;
    const systemInfo = uni.getSystemInfoSync();

    // 设置默认值
    that.globalData.menuTop = 10;
    that.globalData.menuWidth = 87;
    that.globalData.navBarHeight = systemInfo.statusBarHeight + 44;
    that.globalData.menuRight = 10;
    that.globalData.menuBotton = 10;
    that.globalData.menuHeight = 32;
    that.globalData.statusBarHeight = systemInfo.statusBarHeight;
    that.globalData.safeAreaHeight = systemInfo.safeAreaInsets ? systemInfo.safeAreaInsets.bottom : 0;
  }
};
</script>

<style lang="scss">

@import 'uview-ui/index.scss';
/* #ifdef MP-WEIXIN || APP-PLUS */
::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
  color: transparent;
}

/* #endif */

/* #ifdef H5 */
uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
  display: none;
  width: 0 !important;
  height: 0 !important;
  -webkit-appearance: none;
  background: transparent;
  color: transparent;
}

/* #endif */
</style>
