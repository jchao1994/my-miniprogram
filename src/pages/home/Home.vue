<template>
  <view class="home">
    <view class="tabs">
      <view class="tabs-title">
        <uni-segmented-control
          :current="current"
          :values="tabsList"
          @clickItem="tabClick"
          style-type="text"
          active-color="#d4327a"
        ></uni-segmented-control>
      </view>
      <view class="iconfont iconsearch"></view>
    </view>

    <view class="tabs-content">
      <!-- 推荐 -->
      <view v-if="current === 0">
        <recommend></recommend>
      </view>

      <!-- 分类 -->
      <view v-else-if="current === 1">
        <category></category>
      </view>

      <!-- 最新 -->
      <view v-else-if="current === 2">最新</view>

      <!-- 专辑 -->
      <view v-else>
        <album></album>
      </view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";

import Recommend from "./childComps/Recommend";
import Category from "./childComps/Category";
import Album from "./childComps/Album"

export default {
  data() {
    return {
      tabsList: ["推荐", "分类", "最新", "专辑"],
      current: 0
    };
  },
  components: {
    uniSegmentedControl,
    Recommend,
    Category,
    Album
  },
  methods: {
    tabClick(event) {
      const currentIndex = event.currentIndex;
      if (currentIndex !== this.current) {
        this.current = currentIndex;
      }
      uni.setNavigationBarTitle({
        title: this.tabsList[this.current]
      });
    }
  },
  mounted() {
    uni.setNavigationBarTitle({
      title: '推荐'
    });
  }
};
</script>

<style scoped>
.tabs {
  position: relative;
  height: 36px;
}

.tabs-title {
  width: 60%;
  margin: 0 auto;
}

.iconsearch {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 5%;
}
</style>