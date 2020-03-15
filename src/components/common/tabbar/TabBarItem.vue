<template>
 <div class="tab-bar-item" @click="itemClick">
   <div v-if="!isActive"><slot name="item-icon"></slot></div>
   <div v-else><slot name="item-icon-active"></slot></div>
   <div :style="activeStyle"><slot name="item-text"></slot></div>
 </div>
</template>

<script>
export default {
  name:'TabBarItem',
  props:{
    path:String,
    activeColor:{
      type:String,
      default:'#ea1341'
    }
  },
  computed:{
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle(){
      return this.isActive ? {color:this.activeColor} : {}
    }
  },
  methods:{
    itemClick(){
      //$router为VueRouter实例，想要导航到不同URL，则使用$router.push或replace方法
      //$route为当前router跳转对象，可以获取name、path、query、params等
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped>
.tab-bar-item{
    flex:1;
    text-align: center;
    height:49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width:24px;
    height:24px;
    margin:3px 0;
    /* 
    给img的css设置display: block;
    用来去除div下边莫名多出来的3px的像padding-bottom的东西。
    注:vertical-align: middle; 亦可
    */ 
    vertical-align: middle;
  }
  .tab-bar-item span{
    display: block;
  }
</style>