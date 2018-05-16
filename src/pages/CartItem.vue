<template>
	<li class="cart-item">
		<Row>
			<van-col span="12" >{{this.fullName}} </van-col>
			<van-col span="12" >
				<div class="warp">
					<Stepper 
            v-model="count" 
            :min="0" 
            :default-value="0"
            disable-input  
            @plus="add"
            @minus="minus"
          />
					<span>￥{{totalPrice}}</span>
				</div>
			</van-col>
		</Row>					
	</li>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
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
    ...mapGetters([
      "cartItems"
    ]),
    totalPrice() {
      if(this.item.count, this.item.originPrice){
        return numMul(this.item.count, this.item.originPrice);
      }else{
        return 0
      }
    },
    fullName(){
      return `${this.item.gName} (${this.item.gSpec})`
    },
    count: {
      get() {
        let count = 0;
        if (this.cartItems && this.cartItems.length > 0) {
          this.cartItems.forEach(item => {
            if (this.item.id === item.id) {
              count = item.count;
            }
          });
        }
        return count;
      },
      set() {}
    }
  },
  methods:{
    ...mapActions([
      "setCartItems"
    ]),
    add() {
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
          if (item.id === this.item.id) {
            if ("add" === type) {
              ++item.count ;
              flag = true;
              resultItems.push(item);
            } else if ("minus" === type) {
              --item.count ;
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
          id: this.item.id,
          gName: this.item.gName,
          originPrice: this.item.originPrice,
          gSpec: this.item.gSpec,
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