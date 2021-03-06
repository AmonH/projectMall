import Vue from 'vue'
import VueRouter from 'vue-router'

// 组件的懒加载方式
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const ShopCart = () => import('../views/shopcart/ShopCart')
const Profile = () => import('../views/profile/Profile')

Vue.use(VueRouter)

//路由配置
const routes = [
  {
    path:'', 
    redirect:'/home' //默认路由
  },
  {
    path:'/home',
    component: Home
  },
  {
    path:'/category',
    component: Category
  },
  {
    path:'/shopcart',
    component: ShopCart
  },
  {
    path:'/profile',
    component: Profile
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
