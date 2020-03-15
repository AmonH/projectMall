
// 首页的网络请求
import {request} from "./request"

//因为页面会不止一次请求home的数据，
//所以封装，再下次请求数据时直接面向getHomeMultiData函数开发即可
export function getHomeMultiData(){
  return request({
    url:'/home/multidata'
  })
}

//请求首页tab-control商品列表的数据
export function getHomeGoodsData(type,page){
  return request({
    url:'/home/data',
    params:{ //相当于query
      type,
      page
    }
  })
}