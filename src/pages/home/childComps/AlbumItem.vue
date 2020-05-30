<template>
  <navigator class="album-item" :url="`/pages/albumDetail/AlbumDetail?id=${albumData.id}`">
    <view class="album-cover">
      <image :src="albumData.cover" class="album-cover-image"/>
    </view>
    <view class="album-info">
      <view class="album-name">{{ albumData.name }}</view>
      <view class="album-desc">{{ albumData.desc }}</view>
    </view>
    <view class="attention">+ 关注</view>
  </navigator>
</template>

<script>
export default {
  props: {
    albumData: {
      type: Object,
      default() {
        return {};
      }
    }
  }
};
</script>

<style scoped>
.album-item {
  padding: 15rpx;
  display: flex;
  position: relative;
  border-bottom: 6rpx solid #eee;
}

.album-cover-image {
  width: 250rpx;
  height: 250rpx;
}

.album-info {
  flex: 1;
  margin-left: 20rpx;
}

.album-name {
  font-size: 35rpx;
  font-weight: 600;
  margin: 10rpx 0;
}

.album-desc {
  font-size: 24rpx;
  width: 450rpx;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.attention {
  position: absolute;
  padding: 6rpx 10rpx;
  border: 4rpx solid #d52a7e;
  color: #d52a7e;
  right: 20rpx;
  bottom: 40rpx;
}
</style>