<template>
  <view class="img-detail">
    <user :user-info="imgDetail"></user>
    <hot-comment :hot-list="hotList" v-if="hotList.length > 0"></hot-comment>
    <new-comment :new-list="newList" v-if="newList.length > 0"></new-comment>
    <img-download :img-url="imgDetail.img"></img-download>
  </view>
</template>

<script>
import { getImgDetailData } from "@/network/imgDetail";

import User from './childComps/User';
import HotComment from './childComps/HotComment';
import NewComment from './childComps/NewComment';
import ImgDownload from './childComps/ImgDownload';

export default {
  
  data() {
    return {
      imgList: [],
      imgIndex: 0,
      imgDetail: {},
      newList: [],
      hotList: []
    };
  },
  onLoad(options) {
    this.imgList = getApp().globalData.imgList;
    this.imgIndex = getApp().globalData.imgIndex;
    this.imgDetail = this.imgList[this.imgIndex];
  },
  components: {
    User,
    HotComment,
    NewComment,
    ImgDownload
  },
  mounted() {
    this.getImgDetailData();

    const imgLength = this.imgList.length;
    this.$bus.$on('rightSwiperAction', () => {
      if (this.imgIndex < imgLength - 1) {
        this.imgIndex++;
        this.imgDetail = this.imgList[this.imgIndex];
        this.getImgDetailData();
      } else {
        uni.showToast({
          title: '已经到头了',
          icon: 'none'
        })
      }
    })
    this.$bus.$on('leftSwiperAction', () => {
      if (this.imgIndex > 0) {
        this.imgIndex--;
        this.imgDetail = this.imgList[this.imgIndex];
        this.getImgDetailData();
      } else {
        uni.showToast({
          title: '已经到头了',
          icon: 'none'
        })
      }
    })
  },
  methods: {
    async getImgDetailData() {
      const result = await getImgDetailData(this.imgDetail.id);
      // const result = await getImgDetailData("5a893cdde7bce735ab45cc86");
      this.hotList = result.data.res.hot;
      this.newList = result.data.res.comment;
    }
  }
};
</script>

<style scoped>

</style>