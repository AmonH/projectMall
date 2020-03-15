<template>
  <ul class="home-recommend">
    <li v-for="(item,index) in recommends" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <span class="title">{{item.title}}</span>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name:'RecommendView',
  props:{
    recommends:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
  .home-recommend{
    display: flex;
    justify-content: space-between;
    font-size:12px;
    text-align: center;
    padding:10px 0;
    margin-bottom:10px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
  .home-recommend li{
    flex:1;
  }
  .home-recommend li a{
    display: inline-block;
  }
  .home-recommend li img{
    width:70px;
    height:70px;
    margin:5px 0;
  }
  .home-recommend li .title{
    display: inline-block;
  }
</style>