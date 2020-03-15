<template>
  <div class="back-top">
    <img src="~assets/img/common/arrow-top.png" />
  </div>
</template>

<script>
// 回到顶部组件封装
export default {
  name:'BackTop'
}
</script>

<style scoped>
  .back-top{
    width:45px;
    height:45px;
    border-radius: 50%;
    position: fixed;
    bottom:59px;
    right:10px;
    z-index: 10;

    /* 使图片在div内居中 */
    display: flex;
    justify-content: center;
    align-items: center;

    background-color:#fff;
    box-shadow: 0 0 15px rgba(0,0,0,0.5);
  }
  .back-top img{
    width:64%;
  }
</style>