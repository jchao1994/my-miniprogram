<template>
  <view class="swiper-action" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
    <slot></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {
      startX: 0,
      startY: 0,
      startTime: 0
    }
  },
  methods: {
    handleTouchStart(event) {
      this.startX = event.changedTouches[0].clientX;
      this.startY = event.changedTouches[0].clientY;
      this.startTime = Date.now();
    },
    handleTouchEnd(event) {
      const endTime = Date.now();
      if (endTime - this.startTime > 2000) return;
      const endY = event.changedTouches[0].clientY;
      const distanceY = endY - this.startY;
      if (Math.abs(distanceY) > 10) return;
      const endX = event.changedTouches[0].clientX;
      const distanceX = endX - this.startX;
      if (Math.abs(distanceX) > 10) {
        if (endX > this.startX) {
          this.$bus.$emit('leftSwiperAction');
        } else {
          this.$bus.$emit('rightSwiperAction');
        }
      }
    }
  }
}
</script>

<style>

</style>