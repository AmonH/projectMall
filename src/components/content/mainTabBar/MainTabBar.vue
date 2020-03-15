<template>
  <tab-bar>
    <tab-bar-item v-for="(item,index) in tabLists" :key="index" :path="item.path" :activeColor="item.activeColor">
      <img slot="item-icon" :src="item.iconSrc" />
      <img slot="item-icon-active" :src="item.iconActiveSrc" />
      <span slot="item-text">{{item.text}}</span>
    </tab-bar-item>
   </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name:'MainTabBar',
  data(){
    return {
      tabLists:[
        {
          'path':'/home',
          'activeColor':'#ea1341',
          'iconSrc':require('@/assets/img/tabbar/home.svg'),
          'iconActiveSrc':require('@/assets/img/tabbar/home_active.svg'),
          'text':'首页'
        },{
          'path':'/category',
          'activeColor':'#ea1341',
          'iconSrc':require('@/assets/img/tabbar/category.svg'),
          'iconActiveSrc':require('@/assets/img/tabbar/category_active.svg'),
          'text':'分类'
        },{
          'path':'/shopcart',
          'activeColor':'#ea1341',
          'iconSrc':require('@/assets/img/tabbar/shopcart.svg'),
          'iconActiveSrc':require('@/assets/img/tabbar/shopcart_active.svg'),
          'text':'购物车'
        },{
          'path':'/profile',
          'activeColor':'#ea1341',
          'iconSrc':require('@/assets/img/tabbar/profile.svg'),
          'iconActiveSrc':require('@/assets/img/tabbar/profile_active.svg'),
          'text':'我的'
        }
      ]
    }
  },
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>

</style>