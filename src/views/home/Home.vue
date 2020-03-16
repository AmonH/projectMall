<template>
  <div id="home">
    <!-- navbar -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <!-- 为了使tab-contrl做到吸顶效果，拷贝一份组件在该位置上 -->
    <tab-control :titleDatas="['流行','新款','精选']" 
                   @tabClick="tabClick" 
                   ref="tabControlFixed" 
                   class="tab-fixed"
                   v-show="isShowTabControl" />

    <!-- 首页滚动组件 -->
    <scroll class="content" ref="scroll" 
            :probe-type="3" 
            @scroll="homeScrollEvent"
            :pull-up-load="true"
            @pullingUp="homeLoadMore"> 
      <!-- banner -->
      <home-swiper :swiperLists="bannerDatas" @swiperImgLoad="swiperImgLoad" />
      <!-- 推荐 -->
      <recommend-view :recommends="recommendDatas" />
      <!-- 本周流行 -->
      <feature-view />
      <!-- tabcontrol -->
      <tab-control :titleDatas="['流行','新款','精选']" 
                   @tabClick="tabClick" 
                   ref="tabControl" />
      <goods-list :goodsListDatas="showGoodsList" />
    </scroll>

    <!-- back top 回到顶部 -->
    <back-top @click.native="backTopClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
//子组件
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

//公共组件
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goodsList/GoodsList'
import Scroll from 'components/common/scroll/Scroll' 
import BackTop from 'components/content/backTop/BackTop' 

//网络请求
import { getHomeMultiData,getHomeGoodsData } from 'network/home'

export default {
  name:'Home',
  components:{ 
    HomeSwiper, //轮播图
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data(){
    return {
      bannerDatas:[], //banner数据
      recommendDatas:[], //recommend数据
      goods:{ //tab-control商品列表数据
        'pop':{ page:0,list:[]},
        'new':{ page:0,list:[]},
        'sell':{ page:0,list:[]}
      },
      currentType:'pop', //商品列表当前的类型--pop相关数据
      isShowBackTop:false, //默认不显示回到顶部按钮
      tabOffsetTop:0, //记录tab-control的offsetTop值
      isShowTabControl:false, //是否显示顶部的tab-control组件
      saveScrollY:0 //记录home页面滚动的状态和位置
    }
  },
  created(){ //组件创建完成钩子函数
    //发送网络请求,请求多个数据--异步操作
    this.getHomeMultiInfos();

    this.getHomeGoodsInfos('pop'); 
    this.getHomeGoodsInfos('new'); 
    this.getHomeGoodsInfos('sell'); 
  },
  //挂载阶段，但图片不一定加载完成,该阶段获取的offsetTop数据不准确。所以需要监听图片是否加载完成，加载完成后再进行获取操作
  mounted(){ 
    //在created钩子函数里操作DOM或组件容易获取不到，因还没有初始化完HTML
    //所以在created里，获取DOM操作querySelector或获取组件的操作this.$refs等会无效
    //监听商品列表的图片是否加载完成，创建完组件后
    //刷新操作的防抖函数
    const refresh = this.debounce(this.$refs.scroll.refresh);
    this.$bus.$on('goodsImageLoad',()=>{
      //图片加载完成后，调用scroll的refresh()方法，以便更新BScroll的scrollerHeight
      refresh();
    })
  },
  activated(){ //组件处于激活状态时，进入该组件时
    //进入该组件时，回到之前已有的状态
    this.$refs.scroll.scrollTo(0,this.saveScrollY,0);
    this.$refs.scroll.refresh();
  },
  deactivated(){ //组件处于非激活状态时，离开该组件时
    //离开该组件时，记录该页面滚动的位置
    this.saveScrollY = this.$refs.scroll.getScrollY();
  },
  computed:{
    //tab-control对应的商品列表数据
    showGoodsList(){
      return this.goods[this.currentType].list;
    }
  },
  methods:{
    // 防抖动函数
    //针对商品列表加载数据时，在每一个图片加载完都会进行刷新时的防抖动处理。
    //初始化列表后会进行30次的刷新，这会造成服务器的压力。减少刷新的次数，减少服务器的压力
    debounce(func,delay=200){ //可将该函数放入到common/utils.js中作为公共函数
      let timer = null;
      return function(...args){ 
        if(timer){
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          func.apply(this,args)
        },delay)
      }
    },
    /* 事件监听相关方法 */
    //点击tab-control事件
    tabClick(index){
      let arrList = Object.keys(this.goods);
      this.currentType = arrList[index];

      //保持两个组件的点击状态一致
      this.$refs.tabControlFixed.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },
    //回到顶部点击事件
    backTopClick(){
      //回到顶部,this.$refs.scroll获取到scroll对象
      //调用的是scroll组件内封装的scrollTo方法，而非BScroll实例上的方法
      this.$refs.scroll.scrollTo(0,0);
    },
    //滚动事件
    homeScrollEvent(position){
      //滚动到位置1000时，显示back top按钮
      this.isShowBackTop = Math.abs(position.y) > 1000;
      //使tab-control做到吸顶效果
      this.isShowTabControl = Math.abs(position.y) > this.tabOffsetTop;
    },
    //上拉加载更多数据事件
    homeLoadMore(){
      this.getHomeGoodsInfos(this.currentType);
    },
    //监听轮播图的图片是否加载完成
    swiperImgLoad(){
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
    /* 网络请求相关方法 */
    //获取banner及recommend的数据
    getHomeMultiInfos(){ 
      getHomeMultiData().then(res=>{
        //将请求过来的数据保存起来
        if(res.returnCode == "SUCCESS"){
          if(res.data && Object.keys(res.data).length > 0){
            this.bannerDatas = res.data.banner.list; //banner数据
            this.recommendDatas = res.data.recommend.list; //recommend数据
          }
        }
      }).catch(err=>{
        console.log(err)
      })
    },
    //获取tab-control的商品列表数据
    getHomeGoodsInfos(type){
      const page = this.goods[type].page + 1;
      getHomeGoodsData(type,page).then(res=>{
        let arr = res.data.list;
        this.goods[type].list.push(...arr);
        this.goods[type].page++;

        //scroll默认只能加载一次，所以需调用finishPullUp方法
        //上拉加载数据加载完毕, 以便进行下一次上拉加载事件
        this.$refs.scroll.finishPullUp();
      })
    }
  }
}
</script>

<style scoped>
  #home{
    height:calc(100vh - 49px);
    position: relative;
  }
  .home-nav{
    position: absolute;
    top:0;
    right:0;
    left:0;
    background-color: var(--color-tint);
    color:#fff;
  }
  .content{
    position: absolute;
    top:44px;
    bottom:0;
    left:0;
    right:0; 
    overflow: hidden;
  }
  .tab-fixed{
    position: fixed;
    top:44px;
    left:0;
    right:0;
    z-index: 10;
  }
</style>