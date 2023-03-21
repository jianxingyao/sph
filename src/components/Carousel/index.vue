<template>
  <!--banner轮播-->
  <div class="swiper" ref="mySwiper">
    <!-- swiper-wrapper里面每一个slider即为一张图片 -->
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in bannerList" :key="item.id">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper/bundle';
export default {
  name: "Carousel",
  props: ["bannerList"],
  watch: {
    immediate: true,
    bannerList: {
      handler() {
        this.$nextTick(() => {
          console.log("执行了");
          var mySwiper = new Swiper(".swiper", {
            loop: true, // 循环模式选项
            direction: "horizontal",
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>