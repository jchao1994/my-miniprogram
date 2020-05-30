<template>
  <view class="category-sub">
    <block v-for="(item, index) in list" :key="item.id">
      <view class="category-sub-item" @click="itemClick(index)">
        <image :src="item.thumb" mode="aspectFill" class="category-sub-item-image">
      </view>
    </block>
  </view>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    itemClick(index) {
      getApp().globalData.imgList = this.list;
      getApp().globalData.imgIndex = index;
      uni.navigateTo({
        url: `/pages/imgDetail/ImgDetail`
      })
    }
  }
}
</script>

<style scoped>
  .category-sub {
    display: flex;
    flex-wrap: wrap;
  }

  .category-sub-item {
    width: 33.3%;
    border: 6rpx solid #fff;
  }

  .category-sub-item-image {
    width: 100%;
    border-radius: 6rpx;
  }
</style>