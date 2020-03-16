<template>
  <!-- ref可绑定到组件，可通过this.$refs.组件名来获取该组件 ---该方式获取到的是组件 -->
  <!-- 普通元素上(如div)也可绑定ref,可获取到该元素 ---该方式获取到的是元素 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name:'Scroll',
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  data(){
    return {
      scroll:null
    }
  },
  mounted(){
    // document.querySelector('.scroll-wrapper'), 通过该方式获取不是准确
    //建议使用this.$ref.组件名
    //定义数据scroll，保存BScroll的实例，防止在挂载后实例被销毁，导致后续无法使用实例上的其他方法
    this.$nextTick(() => {
      if (!this.scroll) {
        // 1. 创建better-scroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
          //better-scroll 默认会阻止浏览器的原生 click 事件。当设置为 true，better-scroll 会派发一个 click 事件
          click:true,
          probeType:this.probeType,
          //当设置为 true 或者是一个 Object 的时候，可以开启上拉加载
          pullUpLoad:this.pullUpLoad
        })

        //监听滚动的位置,在probeType为2或3时才需监听
        if(this.probeType === 2 || this.probeType ===3){
          this.scroll.on('scroll',(position) => {
            //将监听的滚动事件传送出去
            this.$emit('scroll',position);
          })
        }
        
        //监听上拉事件--监听scroll滚动到底部
        if(this.pullUpLoad){
          this.scroll.on('pullingUp',() => {
            //将监听的上拉事件传送出去
            this.$emit('pullingUp');
          })
        }
      }
    })
  },
  methods:{
    //严谨做法
    //this.scroll在该scroll对象初始化完成里面有值时再进行操作，否则会易出现该对象为空，则会无法调取到scroll对象里的方法等
    //封装BScroll实例的scrollTo方法, 以便在外访问组件时可直接调用scrollTo方法
    scrollTo(x,y,time=500){
      this.scroll && this.scroll.scrollTo(x,y,time);
    },
    //当上拉加载数据加载完毕后，需要调用此方法告诉 better-scroll 数据已加载
    //否则再次上拉加载数据时，不能再次出发上拉事件
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp();
    },
    refresh(){
      this.scroll && this.scroll.refresh();
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0;
    }
  }
}
</script>

<style scoped>
  
</style>