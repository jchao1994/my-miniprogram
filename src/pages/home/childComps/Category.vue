<template>
  <view class="category">
    <block v-for="categoryItem in categoryList" :key="categoryItem.id">
      <navigator
        class="category-item"
        :url="`/pages/home/childPages/categoryPage/CategoryPage?id=${categoryItem.id}`"
      >
        <image :src="categoryItem.cover" class="category-item-image" mode="aspectFill" />
        <view class="category-item-name">{{ categoryItem.name }}</view>
      </navigator>
    </block>
  </view>
</template>

<script>
import { getCategoryData } from "@/network/home";

export default {
  data() {
    return {
      categoryList: []
    };
  },
  methods: {
    async getCategoryData() {
      const result = await getCategoryData();
      this.categoryList = result.data.res.category;
    }
  },
  mounted() {
    this.getCategoryData();
  }
};
</script>

<style scoped>
.category {
  display: flex;
  flex-wrap: wrap;
}

.category-item {
  width: 33.3%;
  border: 6rpx solid #fff;
  position: relative;
}

.category-item-image {
  width: 100%;
  border-radius: 6rpx;
}

.category-item-name {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 30rpx;
  padding: 6rpx 0;
  text-indent: 10rpx;
}
</style>