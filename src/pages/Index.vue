<style scoped>
.title{
	font-weight: 400;
	padding:30px;
	text-align: center;
}
.container{
	display: flex;
	align-content: center;
	justify-content: space-around;
}
.item{
	flex: 1;
	height: 100px;
	border: 1px solid #b1b2b3;
	position: relative;
}
.item span{
	position: absolute;
	left: 50%;
	top: 50%;
	margin-top: -16px; 
	margin-left: -32px;
}
.item span:first-child{
	margin-left: -16px;
}
</style>
<template>
	<div>
		<Header/>
		<h4 class="title">你的用户编号是 {{userNo}}</h4>
		<div class="container">
			<div class="item" @click="buyWater">
				<span>订水</span>
			</div>
			<div class="item" @click="buyTickets">
				<span>购买水漂</span>
			</div>
		</div>
	</div>
</template>
<script>
import vue from "vue"
import { Button, Icon, Row, Col } from 'vant'
import Header from "../components/Header"

vue.use(Button)
vue.use(Icon)
vue.use(Row)
vue.use(Col)

export default{
	name: 'Index',
	components: {
		Header
	},
	data () {
		return {
			msg: 'this is index page !',
			userNo: 168
		}
	},
	methods:{
		buyWater(){
			console.log('订水')
			this.$router.push("/buyWater")
		},
		buyTickets(){
			console.log("买水票")
		}
	}
}
</script>



