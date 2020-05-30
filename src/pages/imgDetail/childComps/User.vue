<template>
  <view class="user">
    <view class="user-info">
      <view class="user-avatar">
        <image :src="imgDetail.user.avatar" class="user-avatar-image" />
      </view>
      <view class="user-desc">
        <view class="user-name">{{ imgDetail.user.name }}</view>
        <view class="user-time">{{ imgDetail.cnTime }}</view>
      </view>
    </view>
    <swiper-action>
      <image :src="imgDetail.thumb" mode="widthFix" class="user-inner-image" />
    </swiper-action>
    <view class="user-rank">
      <view class="rank">
        <text class="iconfont icondianzan">{{ imgDetail.rank }}</text>
      </view>
      <view class="collect">
        <text class="iconfont iconshoucang">收藏</text>
      </view>
    </view>
  </view>
</template>

<script>
import moment from "moment";
moment.locale("zh-cn");

import SwiperAction from '@/components/swiperAction/SwiperAction'

export default {
  props: {
    userInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      imgDetail: {}
    }
  },
  components: {
    SwiperAction
  },
  mounted() {
    this.imgDetail = this.userInfo;
    this.createCnTime();
  },
  watch: {
    userInfo(newInfo) {
      this.imgDetail = newInfo;
      this.createCnTime();
    }
  },
  methods: {
    createCnTime() {
      this.imgDetail.cnTime = moment(this.imgDetail.atime * 1000).fromNow();
    }
  }
};
</script>

<style scoped>
.user-info {
  display: flex;
  padding: 20rpx;
  align-items: center;
}

.user-avatar-image {
  width: 72rpx;
  height: 72rpx;
  border-radius: 50%;
}

.user-desc {
  margin-left: 20rpx;
}

.user-name {
  font-weight: 600;
}

.user-rank {
  display: flex;
  height: 80rpx;
  justify-content: center;
  align-items: center;
  border-bottom: 6rpx solid #eee;
}

.rank,
.collect {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>