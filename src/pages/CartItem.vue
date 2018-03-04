<template>
	<li class="cart-item">
		<Row>
			<van-col span="12" >{{item.title}} </van-col>
			<van-col span="12" >
				<div class="warp">
					<Stepper v-model="item.count" :min="0" :default-value="0"/>
					<span>￥{{totalPrice}}</span>
				</div>
			</van-col>
		</Row>					
	</li>
</template>
<script>
import { Icon, Row, Col, Stepper } from "vant";
import { numMul } from "../utils";

export default {
  name: "CartItem",
  props: ["item"],
  components: {
    Icon,
    Row,
    vanCol: Col,
    Stepper
  },
  computed: {
    totalPrice() {
      return numMul(this.item.count, this.item.price);
    }
  }
};
</script>
<style lang="less">
.cart-item {
  padding: 6px 6px 6px  20px;
      padding: 6px 5px 6px 20px;
    background-color: #fff;
    height: 40px;
    box-sizing: border-box;
  .warp {
    span {
      color: #191919;
      font-size: 15px;
    }
    .van-stepper {
      float: right;
      width: 68px;
      margin-right: 10px;
    }
    .van-stepper__stepper::after,
    .van-stepper__stepper::before {
      background-color: #fff;
    }
    .van-stepper__stepper::before {
      height: 2px;
    }
    .van-stepper__stepper::after {
      width: 2px;
    }
    .van-stepper__stepper {
      width: 20px;
      height: 20px;
      background-color: #00a0e9;
      border-radius: 20px;
    }
    .van-stepper__input {
      background-color: #fff;
      border: none;
      width: 26px;
    }
  }
}
</style>