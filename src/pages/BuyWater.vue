<template>
	<div class="goods-warp">
		<Header/>
		<div class="water-conent">
			<BadgeGroup class="sideBar" :active-key="activeKey">
			  <Badge title="乐百氏" @click="onClick" />
			  <Badge title="蓝剑" @click="onClick" />
			  <Badge title="蓝光" @click="onClick" />
			  <Badge title="农夫山泉" @click="onClick" />
			</BadgeGroup>
			<ul class="goods">
				<WaterItem v-for="(item, index) in items" :goods="item" :key="index"/>		
			</ul>
		</div>
		<ShoppingCart :cartItems="items" />
	</div>
</template>
<script>
import vue from 'vue'
import { BadgeGroup, Badge } from "vant"
import WaterItem from './WaterItem'
import ShoppingCart from './ShoppingCart'
import Header from "../components/Header"

export default{
	name: "BuyWater",
	data () {
		return{
			activeKey: 0,
			items: [{
				title: '蓝剑矿泉水(15L)',
				count: 1,
				price: "12.00"
			},{
				title: '蓝剑矿泉水(10L)',
				count: 3,
				price: "8.00"
			},{
				title: '蓝剑矿泉水(20L)',
				count: 2,
				price: "15.00"
			}]
		}
	},
	components:{
		Header,
		Badge,
		BadgeGroup,
		WaterItem,
		ShoppingCart
	},
	methods: {
		onClick(key) {
	      this.activeKey = key;
	    }
	}
}
</script>
<style scpoed>
.goods-warp{
	height: 100%;
}
.water-conent{
	position: relative;
	padding-bottom: 50px;
}
.sideBar{
	position: absolute;
	left: 0;
	top: 0;
	z-index: 10000;
}
.water-conent ul{
	padding-left: 85px;
}
.goods{
	position: relative;
}
</style>


