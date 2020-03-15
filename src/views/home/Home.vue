<template>
  <div id="home">
    <!-- navbar -->
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <!-- 首页滚动组件 -->
    <scroll class="content" ref="scroll" 
            :probe-type="3" 
            @scroll="homeScrollEvent"
            :pull-up-load="true"
            @pullingUp="homeLoadMore">
      <!-- banner -->
      <home-swiper :swiperLists="bannerDatas" />
      <!-- 推荐 -->
      <recommend-view :recommends="recommendDatas" />
      <!-- 本周流行 -->
      <feature-view />
      <!-- tabcontrol -->
      <tab-control class="home-tab-control" 
                  :titleDatas="['流行','新款','精选']" 
                  @tabClick="tabClick" />
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
      isShowBackTop:false //默认不显示回到顶部按钮
    }
  },
  created(){ //组件创建完成钩子函数
    //发送网络请求,请求多个数据--异步操作
    this.getHomeMultiInfos();

    this.getHomeGoodsInfos('pop'); 
    this.getHomeGoodsInfos('new'); 
    this.getHomeGoodsInfos('sell'); 
  },
  computed:{
    //tab-control对应的商品列表数据
    showGoodsList(){
      return this.goods[this.currentType].list;
    }
  },
  methods:{
    /* 事件监听相关方法 */
    //点击tab-control事件
    tabClick(index){
      let arrList = Object.keys(this.goods);
      this.currentType = arrList[index];
    },
    //回到顶部点击事件
    backTopClick(){
      //回到顶部,this.$refs.scroll获取到scroll对象
      //调用的是scroll组件内封装的scrollTo方法，而非BScroll实例上的方法
      this.$refs.scroll.scrollTo(0,0);
    },
    //滚动事件
    homeScrollEvent(position){
      this.isShowBackTop = Math.abs(position.y) > 1000;
    },
    //上拉加载更多数据事件
    homeLoadMore(){
      this.getHomeGoodsInfos(this.currentType);
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
  .home-tab-control{
    /*未达到设置的top时，该值是static；达到这个设置的值后则自动设为fixed */
    /* 移动端支持及其他浏览器支持，但IE不支持 */
    position: sticky;  
    top:0;
  } 
</style>