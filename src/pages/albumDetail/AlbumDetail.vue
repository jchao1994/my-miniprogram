<template>
  <view class="album-detail">
    <view class="album-top">
      <image :src="albumData.cover" mode="widthFix" />
      <view class="album-name">{{ albumData.name }}</view>
      <view class="album-attention">关注专辑</view>
    </view>

    <view class="album-user">
      <view class="user-info">
        <view class="user-avatar">
          <image :src="albumData.user.avatar" class="user-avatar-image" />
        </view>
        <view class="user-name">{{ albumData.user.name }}</view>
      </view>
      <view class="user-desc">{{ albumData.desc }}</view>
    </view>

    <view class="album-wallpaper">
      <block v-for="wallpaperItem in wallpaper" :key="wallpaperItem.id">
        <image :src="wallpaperItem.thumb" mode="aspectFill" class="wallpaper-item">
      </block>
    </view>
  </view>
</template>
<script>
import { getAlbumDetailData } from "@/network/albumDetail";

export default {
  data() {
    return {
      id: "",
      queryInfo: {
        limit: 30,
        order: "new",
        skip: 0,
        first: 1
      },
      albumData: {},
      wallpaper: []
    };
  },
  onLoad(options) {
    this.id = options.id;
  },
  mounted() {
    this.getAlbumDetailData();
  },
  methods: {
    async getAlbumDetailData() {
      const result = await getAlbumDetailData(this.id, this.queryInfo);
      this.albumData = result.data.res.album;
      this.wallpaper = result.data.res.wallpaper;
    }
  }
};
</script>

<style scoped>
.album-top {
  position: relative;
}

.album-name {
  position: absolute;
  left: 30rpx;
  bottom: 30rpx;
  font-size: 40rpx;
  color: #fff;
}

.album-attention {
  position: absolute;
  font-size: 26rpx;
  height: 50rpx;
  width: 140rpx;
  color: #fff;
  background-color: #eb519b;
  border-radius: 10rpx;
  line-height: 50rpx;
  text-align: center;
  right: 30rpx;
  bottom: 30rpx;
}

.album-user {
  padding: 20rpx;
}

.user-info {
  display: flex;
}

.user-avatar-image {
  width: 60rpx;
  height: 60rpx;
}

.user-name {
  margin-left: 30prx;
  font-size: 24rpx;
  font-weight: 400;
}

.user-desc {
  margin-top: 20rpx;
  color: #b4b4b4;
  font-size: 24rpx;
}

.album-wallpaper {
  display: flex;
  flex-wrap: wrap;
}

.wallpaper-item {
  width: 33.3%;
  border: 6rpx solid #fff;
}
</style>