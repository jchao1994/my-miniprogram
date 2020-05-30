<template>
  <view class="new-comment">
    <view class="new-title">
      <text class="iconfont iconpinglun"></text>
      <text class="title-text">最新评论</text>
    </view>

    <view class="new-content">
      <block v-for="newItem in newList" :key="newItem.id">
        <comment-item :comment-item="newItem"></comment-item>
      </block>
    </view>
  </view>
</template>

<script>
import CommentItem from './CommentItem'

export default {
  props: {
    newList: {
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
  .new-title {
    padding: 20rpx;
  }

  .iconpinglun {
    color: aqua;
    font-size: 40rpx;
  }

  .title-text {
    margin-left: 10rpx;
    font-size: 30rpx;
  }
</style>