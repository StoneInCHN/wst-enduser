<template>
	<li class="goods-item">
		<img src="../assset/images/water.svg" alt="桶装水">
		<div class="title">
			<p>{{goods.title}}</p>
		</div>
		<div class="warp">
			<van-stepper v-model="goods.count" :min="0" :default-value="0"/>
			<span>￥{{totalPrice}}</span>
		</div>
	</li>
</template>
<script>
import { numMul } from '../utils'
import { Stepper } from 'vant'

export default{
	name: 'WaterItem',
	components: {
		vanStepper: Stepper
	},
	props: ["goods"],
	computed: {
		totalPrice(){
			return numMul(this.goods.count, this.goods.price)
		}
	}

}
</script>

<style >
.goods-item{
	position: relative;
	height: 100px;
	padding-left: 100px;
}
.goods-item img{
	width: 100px;
	height: 100px;
	position: absolute;
	left: 0;
	top: 0;
}
.goods-item .title{
	height: 70px;
}
.goods-item .title p{
	font-size: 14px;
	padding: 15px 0;
}
.goods-item .desc{
	font-size: 12px;
}

.goods-item .warp span{
	color: red;
}
.goods-item .warp .van-stepper{
	float: right;
	width: 68px;
	margin-right: 10px;
}
.goods-item .warp .van-stepper__stepper{
	width: 20px;
	height: 20px;
	background-color: #ececeb;
	border-radius: 20px;
}
.goods-item .warp .van-stepper__input{
	background-color: #fff;
	border: none;
	width: 26px;
}
</style>
