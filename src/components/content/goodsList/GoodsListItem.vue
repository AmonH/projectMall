<template>
  <div class="goods-item">
    <div class="goods-img"><img :src="goodsItem.show.img" alt=""></div>
    <p class="goods-title">{{goodsItem.title}}</p>
    <p class="goods-info">
      <span class="price">{{goodsItem.price}}</span>
      <span class="fav-icon">☆</span>
      <span class="fav">{{goodsItem.cfav}}</span>
    </p>
  </div>
</template>

<script>
export default {
  name:'GoodsListItem',
  props:{
    goodsItem:{
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .goods-item{
    flex:1;
    width:48%;
    text-align: center;
    padding: 5px;
    box-sizing: border-box;
  }
  .goods-item .goods-img{
    width:100%;
    height:270px;
  }
  .goods-img img{
    width:100%;
  }
  .goods-title{
    /* 文字超出省略号显示，但只能对有设置宽度的块级元素有效，也就是block或者是inline-block元素有 */
    overflow:hidden;
    text-overflow:ellipsis; 
    white-space:nowrap; 
    padding:5px 0;
    font-size:14px;
  }
  .goods-info .price{
    color:var(--color-tint);
  }
  .goods-info .fav-icon{
    padding:5px;
  }
</style>