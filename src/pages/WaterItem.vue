<template>
	<li class="goods-item">
		<img src="../assets/images/water.svg" alt="桶装水">
		<div class="title">
			<p>{{goods.title}}</p>
		</div>
		<div class="warp">
			<Stepper :class="{hasValue: hasValue}" v-model="goods.count" :min="0" disable-input  :default-value="0" @plus="add"/>
			<span>￥{{goods.price}}</span>
		</div>
	</li>
</template>
<script>
import { numMul } from "../utils";
import { Stepper } from "vant";

export default {
  name: "WaterItem",
  components: {
    Stepper
  },
  props: ["goods", "dropBall"],
  computed: {
    totalPrice() {
      return numMul(this.goods.count, this.goods.price);
	},
	hasValue() {
		return !(this.goods.count >0 )
	}
  },
  methods: {
    add() {
	  this.dropBall()
    }
  }
};
</script>

<style lang="less">
.goods-item {
  position: relative;
  height: 74px;
  padding: 0 0 0 74px;
  margin-bottom: 10px;
  img {
    width: 74px;
    height: 74px;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #f3f3f3;
  }
  .title {
    height: 44px;
    padding-left: 10px;
    p {
      font-size: 14px;
    }
  }
  .desc {
    font-size: 12px;
  }
  .warp {
    padding-left: 10px;
    span {
      color: #e64242;
    }
    .van-stepper {
      float: right;
      width: 68px;
      margin-right: 10px;
      .van-stepper__minus--disabled {
        border-color: #fff;
        background-color: #fff;
      }
    }
    .van-stepper__stepper {
      width: 20px;
      height: 20px;
      background-color: #00a0e9;
      border-radius: 20px;
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
    .van-stepper__input {
      background-color: #fff;
      border: none;
      width: 26px;
	}
	.hasValue {
		.van-stepper__input{
			color: #fff;
		}
	}
  }
}
</style>
