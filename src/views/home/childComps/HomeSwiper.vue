<template>
  <swiper>
    <swiper-item v-for="(item,index) in swiperLists" :key="index">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title" @load="swiperImgLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name:'HomeSwiper',
  data(){
    return {
      isLoaded:false
    }
  },
  props:{
    swiperLists:{
      type:Array,
      default(){
        return []
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  methods:{
    //监听轮播图的图片是否加载完成
    swiperImgLoad(){
      //获取高度只需要获取一次即可，所以只需要发出一次事件即可
      //以下方式，可只发送一次事件
      //没有使用debounce,和debounce的区别
      if(!this.isLoaded){
        this.$emit("swiperImgLoad");
        this.isLoaded = true;
      }
    }
  }
}
</script>

<style scoped>
  
</style>