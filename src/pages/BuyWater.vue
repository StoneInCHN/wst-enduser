<template>
	<div class="goods-warp">
		<Header/>
		<div class="water-conent">
			<van-badge-group class="sideBar" :active-key="activeKey">
			  <van-badge title="乐百氏" @click="onClick" />
			  <van-badge title="蓝剑" @click="onClick" />
			  <van-badge title="蓝光" @click="onClick" />
			  <van-badge title="农夫山泉" @click="onClick" />
			</van-badge-group>
			<ul class="goods">
				<waterItem v-for="(item, index) in items" :goods="item" :key="index"/>		
			</ul>
		</div>
		<shopping-cart :cartItems="items" />
	</div>
</template>
<script>

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
		Header: Header,
		vanBadge: Badge,
		vanBadgeGroup: BadgeGroup,
		waterItem: WaterItem,
		shoppingCart: ShoppingCart
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
}
.water-conent ul{
	padding-left: 85px;
}
.goods{
	position: relative;
}
</style>


