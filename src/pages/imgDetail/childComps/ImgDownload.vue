<template>
  <view class="img-download">
    <view class="button" @click.native="downloadClick">下载壁纸</view>
  </view>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      default() {
        return '';
      }
    }
  },
  methods: {
    async downloadClick() {
      uni.showLoading({
        title: '下载中'
      })
      const tempFiles = await uni.downloadFile({
        url: this.imgUrl
      })
      const { tempFilePath } = tempFiles[1];

      const result = await uni.saveImageToPhotosAlbum({
        filePath: tempFilePath
      })
      
      uni.hideLoading();
      uni.showToast({
        title: '下载成功！',
        icon: 'none'
      })
    }
  }
};
</script>

<style scoped>
.img-download {
  padding: 20rpx 30rpx;
}

.button {
  background: #eb5ea2;
  color: #fff;
  font-size: 50rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
}
</style>