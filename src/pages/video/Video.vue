<template>
  <view class="video">
    <view class="video-tabs">
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

    <view class="video-content">
      <view v-if="current <= 3">
        <show :current="current"></show>
      </view>
      <view v-else>
        <category></category>
      </view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";


import Show from "./childComps/Show";
import Category from "./childComps/Category";

export default {
  data() {
    return {
      tabsList: ["推荐", "娱乐", "最新", "热门", "分类"],
      current: 0
    };
  },
  methods: {
    tabClick({ currentIndex }) {
      if (currentIndex !== this.current) {
        this.current = currentIndex;
      }
    }
  },
  components: {
    uniSegmentedControl,
    Show,
    Category
  }
};
</script>

<style scoped>
.video-tabs {
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