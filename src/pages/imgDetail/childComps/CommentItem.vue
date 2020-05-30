<template>
  <view class="comment-item">
    <view class="user-avatar">
      <image :src="item.user.avatar" class="user-avatar-image" />
    </view>
    <view class="user-info">
      <view class="user-desc">
        <view class="user-name">
          <text>{{ item.user.name }}</text>
          <view class="user-title">
            <block v-for="(titleItem, titleIndex) in item.user.title" :key="titleIndex">
              <view class="title-item">
                <image :src="titleItem.icon" class="title-item-image">
              </view>
            </block>
          </view>
        </view>
        <view class="user-time">{{ item.cnTime }}</view>
      </view>
      <view class="user-comment">
        <text class="comment-content">{{ item.content }}</text>
        <text class="iconfont icondianzan rank">{{ item.size }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import moment from "moment";
moment.locale("zh-cn");

export default {
  data() {
    return {
      item: {}
    };
  },
  props: {
    commentItem: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  mounted() {
    this.item = this.commentItem;
    this.item.cnTime = moment(this.item.atime * 1000).fromNow();
  }
};
</script>

<style scoped>
.comment-item {
  display: flex;
  padding: 15rpx;
  position: relative;
  border-bottom: 10rpx solid #eee;
}

.user-avatar-image {
  width: 72rpx;
  height: 72rpx;
}

.user-info {
  margin-left: 20rpx;
}

.user-name {
  display: flex;
}

.user-title {
  position: absolute;
  right: 1%;
  display: flex;
}

.title-item-image {
  width: 30rpx;
  height: 30rpx;
}

.user-comment {
  height: 80rpx;
  line-height: 80rpx;
  display: flex;
}

.comment-content {
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 500rpx;
}

.rank {
  position: absolute;
  right: 1%;
}
</style>