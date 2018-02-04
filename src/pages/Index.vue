<style scoped>
.title {
  font-weight: 400;
  padding: 30px;
  text-align: center;
}
.container {
  display: flex;
  align-content: center;
  justify-content: space-around;
}
.item {
  flex: 1;
  padding: 10px 10px 10px 20px;
}
.item div {
  position: relative;
  height: 100px;
  background-color: #e5e5e5;
  box-sizing: border-box;
}
.item span {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -16px;
  margin-left: -32px;
}
.item  .bookWater {
  margin-left: -16px;
}
.popup-order{
	width: 80%;
}
.popup-header{
	text-align: right;
	padding: 10px;
}
.popup-order p{
	padding: 15px 10px;
}
.modal-order-item{
	padding: 5px 10px;
}
.modal-order-item-price{
	float: right;
	color: red;
}
</style>
<template>
	<div>
		<Header/>
		<h4 class="title">你的用户编号是 {{userNo}}</h4>
		<div class="container">
			<div class="item" @click="buyWater">
				<div>
					<span class="bookWater">订水</span>
				</div>
			</div>
			<div class="item" @click="buyTickets">
				<div>
					<span>购买水票</span>
				</div>			
			</div>
		</div>
		<Popup v-model="show" class="popup-order">
			<div class="popup-header">
				<Icon name="close" @click="buyTickets"/>
			</div>
			<div class=""popup-content>
				<p>您目前有2个订单正在处理中</p>
				<div class="modal-order-item">
					<p>您在2018.1.14 22：45:20下单</p>
					<p>星雅俊园 19栋1001室</p>
					<p>蓝剑矿泉水（15L）X 1 <span class="modal-order-item-price">￥12.00</span></p>
					<p>快递员正在路上，请稍后</p>
					<Button type="default" size="large" @click="notice">很不爽,催一下</Button>
				</div>
			</div>
		</Popup>
	</div>
</template>
<script>
import vue from "vue";
import { Button, Icon, Popup } from "vant";
import Header from "../components/Header";

export default {
  name: "Index",
  components: {
	Header,
	Popup,
	Icon,
	Button
  },
  data() {
    return {
      msg: "this is index page !",
	  userNo: 168,
	  show: false
    };
  },
  methods: {
    buyWater() {
      console.log("订水");
      this.$router.push("/buyWater");
    },
    buyTickets() {
	  console.log("买水票");
	  this.show = !this.show
	},
	notice() {
		alert("渴死了，送到哪儿了...")
	}
  }
};
</script>
