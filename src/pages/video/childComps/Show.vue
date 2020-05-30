<template>
  <scroll-view scroll-y @scrolltolower="handleScrollToLower" class="show-scroll-view">
    <view class="show">
      <block v-for="item in showList" :key="item.id">
        <image :src="item.img" mode="aspectFill" class="show-item-image" @click="imageClick(item.img, item.video)"/>
      </block>
    </view>
  </scroll-view>
</template>

<script>
import {
  getVideoRecommendData,
  getVideoEntertainmentData,
  getVideoNewOrHotData
} from "@/network/video";

export default {
  props: {
    current: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      queryInfo: {
        limit: 30,
        skip: 0,
        order: "hot"
      },
      showList: [],
      isRequestData: false
    };
  },
  methods: {
    async getShowData() {
      if (!this.isRequestData) {
        this.isRequestData = true;
        let result;
        if (this.current === 0) {
          result = await getVideoRecommendData(this.queryInfo);
        } else if (this.current === 1) {
          result = await getVideoEntertainmentData(this.queryInfo);
        } else {
          result = await getVideoNewOrHotData(this.queryInfo);
        }
        const newList = result.data.res.videowp;
        if (newList.length > 0) {
          this.showList = [...this.showList, ...result.data.res.videowp];
        } else {
          uni.showToast({
            title: "没有数据啦",
            icon: "none"
          });
        }
        this.isRequestData = false;
      }
    },
    handleScrollToLower() {
      this.queryInfo.skip += this.queryInfo.limit;
      this.getShowData();
    },
    imageClick(imgPath, videoPath) {
      uni.navigateTo({
        url: `/pages/videoDetail/VideoDetail?img=${imgPath}&video=${videoPath}`
      })
    }
  },
  mounted() {
    this.getShowData();
  },
  watch: {
    current(newVal) {
      this.queryInfo.skip = 0;
      this.showList = [];
      if (newVal === 0 || newVal === 3) {
        this.queryInfo.order = "hot";
      } else {
        this.queryInfo.order = "new";
      }
      this.getShowData();
    }
  }
};
</script>

<style scoped>
.show {
  display: flex;
  flex-wrap: wrap;
}

.show-item-image {
  width: 33.3%;
  border: 6rpx solid #fff;
}

.show-scroll-view {
  position: fixed;
  top: 36px;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>