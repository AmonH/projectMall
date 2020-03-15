<template>
  <div class="tab-control">
    <div class="tab-control-item" 
         v-for="(item,index) in titleDatas" :key="index"
         :class="{active:index === currentIndex}"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name:'TabControl',
  props:{
    titleDatas:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data(){
    return {
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index;
      //将点击事件的接口传送出去
      this.$emit('tabClick',index);
    }
  }
}
</script>

<style scoped>
  .tab-control{
    display: flex;
    height:40px;
    line-height: 40px;
    text-align: center;
    font-size:15px;
    background-color: #fff;
  }
  .tab-control-item{
    flex:1;
    box-sizing: border-box;
  }
  .tab-control-item span{
    padding:5px;
  }
  .tab-control-item.active{
    color:var(--color-tint);
  }
  .tab-control-item.active span{
    border-bottom:2px solid var(--color-tint);
  }
</style>