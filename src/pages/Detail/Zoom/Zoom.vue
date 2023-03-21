<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="changeLoaction"></div>
    <div class="big" ref="big">
      <img :src="imgObj.imgUrl" />
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask" ></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList'],
    data() {
      return {
        //当前展示盒子在 数组中的索引
        currentIndex: 0,
      };
    },
    computed:{
      imgObj(){
        return this.skuImageList[this.currentIndex] || {}
      }
    },
    methods:{
      //改变展示图片盒子
      changeImage(imgId){
        this.currentIndex = this.skuImageList.findIndex(item => item.id === imgId);
      },
      //改变遮罩层的位置
      changeLoaction(e){
        let { mask,big  } = this.$refs
        //拿到big下的图片盒子
        let bigImg = big.children[0]

        //计算出 遮罩层的定位 left 和 top
        let X = e.offsetX - (mask.offsetWidth / 2)
        let Y = e.offsetY - (mask.offsetHeight / 2)

        if(X < 0) X = 0;
        if(X >= mask.offsetParent.offsetWidth - mask.offsetWidth) X = mask.offsetParent.offsetWidth - mask.offsetWidth
        if(Y < 0) Y = 0
        if(Y >= mask.offsetParent.offsetHeight - mask.offsetHeight) Y = mask.offsetParent.offsetHeight - mask.offsetHeight
        
        let bigImgX = (X / mask.offsetWidth) * big.offsetWidth
        let bigImgY = (Y / mask.offsetHeight) * big.offsetHeight

        mask.style.left = X + 'px'
        mask.style.top = Y + 'px'

        //取负  相对运动
        bigImg.style.left = - bigImgX + 'px'
        bigImg.style.top = - bigImgY + 'px'
      },
    },
   mounted() {
    //改变展示图片盒子全局事件绑定
    this.$bus.$on('changeImage',this.changeImage)
   },
   beforeDestroy(){
    this.$bus.$off('changeImage')
   }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>