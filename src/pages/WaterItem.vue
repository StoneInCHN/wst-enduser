<template>
	<li class="goods-item">
    <div class="goods-img" :style="imgStyle"></div>
		<div class="title">
			<p>{{fullName}}</p>
		</div>
		<div class="warp">
			<Stepper 
        :class="{hasValue: hasValue}" 
        v-model="count" 
        :min="0" 
        disable-input  
        :default-value="0" 
        @plus="add"
        @minus="minus"
      />
			<span>￥{{goods.distPrice}}</span>
      <span class="originPrice">￥{{goods.originPrice}}</span>
		</div>
	</li>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { numMul, urlPre } from "../utils";
import { Stepper } from "vant";

export default {
  name: "WaterItem",
  components: {
    Stepper
  },
  props: ["goods", "dropBall"],
  computed: {
    ...mapGetters(["cartItems"]),
    imgStyle() {
      let style = {};
      if (this.goods.picUrl) {
        style = {
          backgroundImage: `url(${urlPre(this.goods.picUrl)})`
        };
      }
      return style;
    },
    hasValue() {
      return !(this.count > 0);
    },
    fullName() {
      return `${this.goods.gName} (${this.goods.gSpec})`;
    },
    count: {
      get() {
        let count = 0;
        if (this.cartItems && this.cartItems.length > 0) {
          this.cartItems.forEach(item => {
            if (this.goods.id === item.id) {
              count = item.count;
            }
          });
        }
        return count;
      },
      set() {}
    }
  },
  methods: {
    ...mapActions(["setCartItems"]),
    add() {
      this.dropBall();
      this.findItems("add");
    },
    minus() {
      this.findItems("minus");
    },
    findItems(type) {
      // type add加 minus 减
      const cartItems = this.cartItems;
      let flag = false;
      let resultItems = [];
      if (cartItems && cartItems.length > 0) {
        cartItems.forEach(item => {
          if (item.id === this.goods.id) {
            if ("add" === type) {
              ++item.count;
              flag = true;
              resultItems.push(item);
            } else if ("minus" === type) {
              --item.count;
              if (item.count > 0) {
                resultItems.push(item);
              }
            }
          } else {
            resultItems.push(item);
          }
        });
      }

      //store中的cartItems中没有当前选择的商品
      if (!flag && "add" === type) {
        const item = {
          id: this.goods.id,
          picUrl: this.goods.picUrl,
          gName: this.goods.gName,
          originPrice: this.goods.originPrice,
          distPrice: this.goods.distPrice,
          gSpec: this.goods.gSpec,
          count: 1
        };
        resultItems.push(item);
      }
      this.setCartItems(resultItems);
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
  .goods-img {
    width: 74px;
    height: 74px;
    position: absolute;
    left: 0;
    top: 0;
    background: #f3f3f3 url("../assets/images/water.svg") no-repeat center;
    background-size: cover;
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
    .originPrice {
      font-size: 10px;
      margin-left: 10px;
      text-decoration: line-through;
      color: #7c7c7c;
      font-size: 12px;
    }
    .van-stepper {
      float: right;
      width: 68px;
      margin-right: 10px;
      .van-stepper__minus--disabled {
        border-color: #fff;
        background-color: #fff;
      }
      button{
        width: 20px;
        height: 20px;
        background-color: #00a0e9;
        border-radius: 20px;
      }
      button::after,
      button::before {
        background-color: #fff;
      }
      button::before {
        height: 2px;
      }
      button::after {
        width: 2px;
      }
      .van-stepper__input {
        background-color: #fff;
        border: none;
        width: 26px;
      }
    }    
    .hasValue {
      .van-stepper__input {
        color: #fff;
      }
    }
  }
}
</style>
