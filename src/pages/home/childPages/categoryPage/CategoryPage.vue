<template>
  <view class="category-page">
    <view class="category-tabs">
      <view class="category-tabs-title">
        <uni-segmented-control
          :current="current"
          :values="categoryTabsList"
          @clickItem="categoryTabClick"
          style-type="text"
          active-color="#d4327a"
        ></uni-segmented-control>
      </view>
      <view class="iconfont iconsearch"></view>
    </view>
    <view class="category-content">
      <scroll-view
        scroll-y
        class="category-content-scroll-view"
        @scrolltolower="handleScrollToLower"
      >
        <category-sub :list="categorySubList"></category-sub>
      </scroll-view>
    </view>
  </view>
</template>

<script>
import { uniSegmentedControl } from "@dcloudio/uni-ui";

import { getCategorySubsData } from "@/network/home";

import CategorySub from "./childComps/CategorySub";

export default {
  data() {
    return {
      id: "",
      current: 0,
      categoryTabsList: ["最新", "热门"],
      queryInfo: {
        limit: 30,
        skip: 0,
        order: "new"
      },
      categorySubList: [],
      isRequestData: false
    };
  },
  onLoad(options) {
    this.id = options.id;
    // this.id = "4e4d610cdf714d2966000000";
  },
  mounted() {
    this.getCategorySubsData();
  },
  methods: {
    categoryTabClick(event) {
      const currentIndex = event.currentIndex;
      if (currentIndex !== this.current) {
        this.current = currentIndex;
      }
      this.categorySubList = [];
      this.queryInfo.skip = 0;
      this.queryInfo.order = this.current === 0 ? "new" : "hot";
      this.getCategorySubsData();
    },
    async getCategorySubsData() {
      if (!this.isRequestData) {
        this.isRequestData = true;
        const result = await getCategorySubsData(this.id, this.queryInfo);
        const newHotList = result.data.res.vertical;
        if (newHotList.length > 0) {
          this.categorySubList = [
            ...this.categorySubList,
            ...result.data.res.vertical
          ];
        } else {
          uni.showToast({
            title: '没有数据啦！',
            icon: 'none'
          })
        }

        this.isRequestData = false;
      }
    },
    handleScrollToLower() {
      this.queryInfo.skip += this.queryInfo.limit;
      this.getCategorySubsData();
    }
  },
  components: {
    uniSegmentedControl,
    CategorySub
  }
};
</script>

<style scoped>
.category-tabs {
  height: 36px;
  position: relative;
}

.category-tabs-title {
  width: 60%;
  margin: 0 auto;
}

.iconsearch {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 5%;
}

.category-content-scroll-view {
  position: fixed;
  top: 36px;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>