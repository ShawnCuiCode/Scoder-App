export const copyByUniappApi = (data, msg = '已复制到剪贴板') => {
    uni.setClipboardData({
        data: data.toString(),
        success: function () {
            uni.showToast({
                title: msg,
                icon: 'none'
            });
        }
    });
}
