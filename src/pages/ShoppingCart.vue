<template>
	<div class="shopping-cart">	
		<van-row>
		  <van-col span="14" class="cart-left">
		  	<div class="cart-icon" @click="toggleDetails">
		  		<img src="../assset/images/cart.svg" alt="购物车">
		  		<span>{{totalCount}}</span>
		  	</div>
		  	<div class="cart-price">
		  		<span>￥{{totalPrice}}</span>
		  		<span>￥14.00</span>
		  	</div>
		  </van-col>
		  <van-col span="10">
		    <van-button type="default" size="large" @click="buy">购买</van-button>
		  </van-col>
		</van-row>
		<transition name="fade">
			<div class="goods-details" v-show="showDetails" transiton="fade">
				<div class="goods-details-title">
					<span>已选商品（{{totalCount}}）</span>
					<span class="close" @click="toggleDetails">X</span>
				</div>
				<ul>
					<cart-item v-for="(item, index) in cartItems" :item="item" :key="index"/>
				</ul>
			</div>
		</transition>
	</div>
</template>
<script>
import { Button, Icon, Row, Col } from 'vant'
import CartItem from "./CartItem"
import { numAdd, numMul } from '../utils'

export default{
	name: "ShoppingCart",
	components:{
		vanButton: Button,
		vanRow: Row,
		vanCol: Col,
		cartItem: CartItem
	},
	props: ["cartItems"],
	data () {
		return{
			showDetails: false
		}
	},
	computed: {
		items(){
			return this.cartItems.filter((item) => item.count > 0)
		},
		totalCount(){
			let count = 0
			this.cartItems.map((item) => {
				count = count + item.count
			})
			return count
		},
		totalPrice(){
			let price = 0
			this.cartItems.map((item) => {
				let total = numMul(item.price, item.count)
				price = numAdd(price, total)
			})
			return price
		}
	},
	methods: {
		buy(){
			console.log(this.items)
			this.$router.push("/order")
		},
		toggleDetails(){
			this.showDetails = !this.showDetails
		}
	}
}
</script>
<style>
.shopping-cart{
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 50px;
	background-color: #fff;
}
.cart-left{
	border-top: 1px solid #e5e5e5;
}
.shopping-cart .cart-icon{
	height: 50px;
	width: 60px;
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
}
.shopping-cart .cart-icon img{
	width: 50px;
	height: 50px;
}
.shopping-cart .cart-icon span{
	position: absolute;
    right: 9px;
    top: 0;
    border: 1px solid #b1b1b1;
    padding: 0 8px;
    border-radius: 9px;
    background-color: #fff;
}
.shopping-cart .cart-price{
	padding-left: 70px;
	padding-top: 13px;
}
.shopping-cart .cart-price span:last-child{
	font-size: 10px;
	margin-left: 10px;
	text-decoration: line-through;
}
.shopping-cart .goods-details{
    position: absolute;
    bottom: 50px;
    width: 100%;
    background-color: #e5e5e5;
}
.goods-details{
	padding:10px 20px;
}
.goods-details-title{
	padding: 10px;
}
.goods-details-title .close{
	float: right;
	margin-right: 30px;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity 1s
}
.fade-enter, .fade-leave-active {
    opacity: 0;
}

</style>




