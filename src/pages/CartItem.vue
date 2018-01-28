<template>
	<li class="cart-item">
		<van-row>
			<van-col span="12" >{{item.title}}</van-col>
			<van-col span="12" >
				<div class="warp">
					<van-stepper v-model="item.count" :min="0" :default-value="0"/>
					<span>￥{{totalPrice}}</span>
				</div>
			</van-col>
		</van-row>					
	</li>
</template>
<script>
import { Button, Icon, Row, Col, Stepper } from 'vant'
import { numMul } from '../utils'

export default{
	name: "CartItem",
	props: ["item"],
	components:{
		vanButton: Button,
		vanRow: Row,
		vanCol: Col,
		vanStepper: Stepper
	},
	computed: {
		totalPrice(){
			return numMul(this.item.count, this.item.price)
		}
	}
}
</script>
<style>
.cart-item{
	padding: 5px;
}
.cart-item .warp span{
	color: red;
}
.cart-item .warp .van-stepper{
	float: right;
	width: 68px;
	margin-right: 30px;
}
.cart-item .warp .van-stepper__stepper{
	width: 20px;
	height: 20px;
	background-color: #fff;
	border-radius: 20px;
}
.cart-item .warp .van-stepper__input{
	background-color: #e5e5e5;
	border: none;
	width: 26px;
}
</style>