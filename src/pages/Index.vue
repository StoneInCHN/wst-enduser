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
		<OrderPopup ref="orderPopup"/>
	</div>
</template>
<script>
import vue from "vue";
import { Button, Icon } from "vant";
import Header from "../components/Header";
import OrderPopup from "../components/OrderPopup";
export default {
  name: "Index",
  components: {
    Header,
    Icon,
    Button,
    OrderPopup
  },
  data() {
    return {
      msg: "this is index page !",
      userNo: "168",
      show: "ture"
    }
  },
  methods: {
    buyWater() {
      //console.log("订水");
      this.$router.push("/buyWater");
    },
    buyTickets() {
			this.$refs.orderPopup.showNotice()
		}
  }
};
</script>
<style lang="less">
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
.item .bookWater {
  margin-left: -16px;
}

</style>
