import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('@/pages/Index')
const BuyWater = () => import('@/pages/BuyWater')
const Order = () => import('@/pages/Order')
const AddressList = () => import('@/pages/AddressList')
const AddAddress = () => import('@/pages/AddAddress')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/buyWater',
      name: 'BuyWater',
      component: BuyWater
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/addressList',
      name: 'AddressList',
      component: AddressList
    },
    {
      path: '/addAddress',
      name: 'AddAddress',
      component: AddAddress
    }
  ]
})

