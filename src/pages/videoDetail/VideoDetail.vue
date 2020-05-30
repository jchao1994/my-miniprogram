<template>
  <view class="video-detail">
    <view class="video-tool">
      <view :class="['iconfont', muted ? 'iconjingyin' : 'iconshengyin']" @click="handleMuted"></view>
      <view class="iconfont iconzhuanfa">
        <button open-type="share" class="zf-button"></button>
      </view>
    </view>

    <view class="video-content">
      <video :src="video" class="video" objectFit="fill" :muted="muted"></video>
    </view>

    <view class="video-download" @click="handleDownload">下载高清</view>

    <view class="video-image">
      <image :src="img" class="video-inner-image" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      img: "",
      video: "",
      muted: false
    };
  },
  onLoad(options) {
    this.img =
      "http://157.122.54.189:9088/uploads/5df4e9ea31f61363f7591de4.jpg";
    this.video =
      "http://157.122.54.189:9088/uploads/5df4e9ea31f61363f7591de4.mp4";
  },
  methods: {
    handleMuted() {
      this.muted = !this.muted;
    },
    async handleDownload() {
      uni.showLoading({
        title: "下载中"
      });
      const tempFiles = await uni.downloadFile({
        url: this.video
      });

      const { tempFilePath } = tempFiles[1];

      const result = await uni.saveVideoToPhotosAlbum({
        filePath: tempFilePath
      });
      uni.hideLoading();
      uni.showToast({
        title: "下载成功！",
        icon: "none"
      });
    }
  }
};
</script>

<style scoped>
.video-detail {
  position: relative;
}

.video-tool {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  display: flex;
  width: 160rpx;
  height: 60rpx;
  justify-content: space-around;
}

.iconfont {
  font-size: 40rpx;
  width: 60rpx;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  border-radius: 50%;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.2);
}

.iconzhuanfa {
  position: relative;
}

.zf-button {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  top: 0;
  left: 0;
}

.video-content {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video {
  width: 360rpx;
  height: 600rpx;
}

.video-inner-image {
  position: absolute;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  filter: blur(20px);
}

.video-download {
  font-size: 40rpx;
  width: 360rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  border: 2rpx solid #fff;
  border-radius: 40rpx;
  color: #fff;
  position: relative;
  top: -160rpx;
  left: 50vw;
  transform: translateX(-50%);
}
</style>