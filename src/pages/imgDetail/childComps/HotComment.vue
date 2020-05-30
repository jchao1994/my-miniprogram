<template>
  <view class="hot-comment">
    <view class="hot-title">
      <text class="iconfont iconhot1"></text>
      <text class="title-text">最热评论</text>
    </view>

    <view class="hot-content">
      <block v-for="hotItem in hotList" :key="hotItem.id">
        <comment-item :comment-item="hotItem"></comment-item>
      </block>
    </view>

  </view>
</template>

<script>
import CommentItem from './CommentItem'

export default {
  props: {
    hotList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    CommentItem
  }
}
</script>

<style scoped>
  .hot-title {
    padding: 20rpx;
  }

  .iconhot1 {
    color: red;
    font-size: 40rpx;
  }

  .title-text {
    margin-left: 10rpx;
    font-size: 30rpx;
  }
</style>