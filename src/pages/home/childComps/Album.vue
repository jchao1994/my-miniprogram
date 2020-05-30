<template>
  <view class="album">
    <scroll-view scroll-y class="album-scroll-view" @scrolltolower="handleScrollToLower">
      <view class="banner">
        <swiper indicator-dots autoplay circular>
          <block v-for="swiperItem in bannerList" :key="swiperItem.id">
            <swiper-item>
              <image :src="swiperItem.thumb" mode="widthFix" />
            </swiper-item>
          </block>
        </swiper>
      </view>

      <view class="album">
        <block v-for="albumItem in albumList" :key="albumItem.id">
          <album-item :album-data="albumItem"></album-item>
        </block>
      </view>
    </scroll-view>
  </view>
</template>

<script>
import { getAlbumData } from "@/network/home";

import AlbumItem from "./AlbumItem";

export default {
  data() {
    return {
      queryInfo: {
        limit: 30,
        order: "new",
        skip: 0
      },
      bannerList: [],
      albumList: [],
      firstRequest: true,
      isRequestData: false
    };
  },
  methods: {
    async getAlbumData() {
      if (!this.isRequestData) {
        this.isRequestData = true;
        const result = await getAlbumData(this.queryInfo);
        if (this.firstRequest) {
          this.firstRequest = false;
          this.bannerList = result.data.res.banner;
        }
        const newAlbumList = result.data.res.album;
        if (newAlbumList.length > 0) {
          this.albumList = [...this.albumList, ...result.data.res.album];
        } else {
          uni.showToast({
            title: "没有数据啦！",
            icon: "none"
          });
        }
        this.isRequestData = false;
      }
    },
    handleScrollToLower() {
      this.queryInfo.skip += this.queryInfo.limit;
      this.getAlbumData();
    }
  },
  components: {
    AlbumItem
  },
  mounted() {
    this.getAlbumData();
  }
};
</script>

<style scoped>
.album-scroll-view {
  position: fixed;
  top: 36px;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>