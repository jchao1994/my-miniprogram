<template>
  <view class="recommend" v-if="recommendList.length > 0">
    <scroll-view scroll-y @scrolltolower="handleScrollToLower" class="recommend-scroll-view">
      <!-- 推荐 -->
      <view class="recommend-content">
        <block v-for="recommendItem in recommendList" :key="recommendItem.id">
          <view class="recommend-item">
            <image :src="recommendItem.thumb" class="recommend-item-image" mode="widthFix" />
          </view>
        </block>
      </view>

      <!-- 月份 -->
      <view class="month">
        <view class="title">
          <view class="month-item">
            <text class="month-item-day">{{ monthInfo.day }}</text>
            / {{ monthInfo.month }}月
          </view>
          <view class="month-title">{{ monthInfo.title }}</view>
          <view class="more">更多 ></view>
        </view>

        <view class="month-content">
          <block v-for="monthItem in monthInfo.items" :key="monthItem.id">
            <view class="month-content-item">
              <image
                :src="monthItem.thumb + monthItem.rule.replace('\$<Height>', 360)"
                class="month-content-item-image"
                mode="aspectFill"
              />
            </view>
          </block>
        </view>
      </view>

      <!-- 热门 -->
      <view class="hot">
        <view class="hot-title">热门</view>
        <view class="hot-content">
          <block v-for="(hotItem, hotIndex) in hotList" :key="hotItem.id">
            <view class="hot-item" @click="hotItemClick(hotIndex)">
              <image :src="hotItem.thumb" class="hot-item-image" mode="widthFix" />
            </view>
          </block>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { getRecommendData } from "@/network/home";

import moment from "moment";

export default {
  data() {
    return {
      queryInfo: {
        limit: 30,
        order: "hot",
        skip: 0
      },
      recommendList: [],
      monthInfo: {},
      hotList: [],
      firstRequest: true,
      hasMore: true,
      // 是否正在请求数据标识，防抖措施
      isRequestData: false
    };
  },
  methods: {
    async getRecommendData() {
      if (!this.isRequestData) {
        this.isRequestData = true;
        const result = await getRecommendData(this.queryInfo);
        if (this.firstRequest) {
          this.firstRequest = false;
          this.recommendList = result.data.res.homepage[1].items;
          this.monthInfo = result.data.res.homepage[2];
          this.monthInfo.month = moment(this.monthInfo.stime).format("MM");
          this.monthInfo.day = moment(this.monthInfo.stime).format("DD");
          this.hotList = result.data.res.vertical;
        } else {
          const newHotList = result.data.res.vertical;
          if (newHotList.length > 0) {
            this.hotList = [...this.hotList, ...newHotList];
          } else {
            uni.showToast({
              title: "没有数据啦！",
              icon: 'none'
            });
          }
        }
        this.isRequestData = false;
      }
    },
    handleScrollToLower() {
      this.queryInfo.skip += this.queryInfo.limit;
      this.getRecommendData();
    },
    hotItemClick(hotIndex) {
      getApp().globalData.imgList = this.hotList;
      getApp().globalData.imgIndex = hotIndex;
      uni.navigateTo({
        url: '/pages/imgDetail/ImgDetail'
      })
    }
  },
  mounted() {
    this.getRecommendData();
  }
};
</script>

<style scoped>
.recommend-scroll-view {
  position: fixed;
  top: 36px;
  left: 0;
  right: 0;
  bottom: 0;
}

.recommend-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.recommend-item {
  width: 50%;
  border: 6rpx solid #fff;
}

.recommend-item-image {
  width: 100%;
  border-radius: 10rpx;
}

.month {
  font-weight: 600;
}

.title {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 20rpx;
}

.month-item {
  color: #d52a7e;
  font-size: 30rpx;
}

.month-item-day {
  font-size: 36rpx;
}

.month-title {
  font-size: 36rpx;
  margin: 20rpx;
}

.month-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.month-content-item {
  width: 33.3%;
  height: 380rpx;
  border: 2rpx solid #fff;
}

.month-content-item-image {
  width: 100%;
  height: 100%;
  border-radius: 6rpx;
}

.more {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 5%;
  color: #d52a7e;
  margin-right: 10rpx;
}

.hot-title {
  font-size: 36rpx;
  font-weight: 600;
  border-left: 10rpx solid #ec1a80;
  padding-left: 10rpx;
  margin: 10rpx;
  background: #fff;
}

.hot-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.hot-item {
  width: 33.3%;
  border: 2rpx solid #fff;
}

.hot-item-image {
  width: 100%;
  border-radius: 6rpx;
}
</style>