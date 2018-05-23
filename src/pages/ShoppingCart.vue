<template>
	<div class="shopping-cart">	
		<Row>
		  <van-col span="15" class="cart-left">
		  	<div class="cart-icon" @click="toggleDetails">
		  		<img src="../assets/images/cart.svg" alt="购物车">
		  		<span>{{totalCount}}</span>
		  	</div>
		  	<div class="cart-price">
		  		<span>￥{{totalPrice}}</span>
		  		<span v-if="showDiscount" class="discount">￥{{originTotalPrice}}</span>
		  	</div>
		  </van-col>
		  <van-col span="9">
		    <Button type="default" :disabled="!canBuy" size="large" @click="buy">购买</Button>
		  </van-col>
		</Row>
		<transition name="fade">
			<div class="goods-details" v-show="showDetails" transiton="fade">
				<div class="title">
					<span>已选商品（{{totalCount}}）</span>
					<span class="close" @click="clearCart">
						<Icon name="delete"/>清空购物车
					</span>
				</div>
				<ul>
					<CartItem v-for="item in cartItems" :item="item" :key="item.id"/>
				</ul>
			</div>
		</transition>
		<div></div>
		<div class="ball-container" >
			<div v-for="(ball, index) in balls" :key="index">
				<!--用了两种方式的动画,css和js钩子-->
				<transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
				<!--外层动画-->
				<div class="ball" v-show="ball.show">
				<!--内层动画-->
					<div class="inner inner-hook"></div>
				</div>
				</transition>
			</div>
		</div>
	</div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { Button, Row, Col, Icon, Dialog } from "vant";
import CartItem from "./CartItem";
import { numAdd, numMul } from "../utils";

export default {
  name: "ShoppingCart",
  components: {
    Button,
    Row,
    vanCol: Col,
    CartItem,
    Icon
  },
  data() {
    return {
      showDetails: false,
      showDiscount: true,
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ],
      dropBalls: []
    };
  },
  computed: {
    ...mapGetters(["qrCodeId", "userId" , "shopInfo", "isOpen"]),
    items() {
      return this.cartItems.filter(item => item.count > 0);
    },
    totalCount() {
      let count = 0;
      if (this.cartItems && this.cartItems.length > 0) {
        this.cartItems.map(item => {
          count = count + item.count;
        });
      }
      return count;
    },
    disabled() {
      return this.totalCount === 0;
    },
    totalPrice() {
      let price = 0;
      if (this.cartItems && this.cartItems.length > 0) {
        this.cartItems.forEach(item => {
          let total = numMul(item.distPrice, item.count);
          price = numAdd(price, total);
        });
      }
      return price;
    },
    originTotalPrice(){
      let price = 0;
      if (this.cartItems && this.cartItems.length > 0) {
        this.cartItems.forEach(item => {
          let total = numMul(item.originPrice, item.count);
          price = numAdd(price, total);
        });
      }
      return price;
    },
    cartItems() {
      return this.$store.state.cartItems;
    },
    canBuy(){
      return this.isOpen && this.cartItems.length > 0 
    },
    gIds() {
      let gIds = {};
      if (this.items && this.items.length > 0) {
        this.items.forEach(item => {
          gIds[item.id] = item.count;
        });
      }
      return gIds;
    }
  },
  methods: {
    ...mapActions(["setDefaultAddress", "setCartItems"]),
    buy() {
      const params = {
        gIds: this.gIds,
        qrCodeId: this.qrCodeId,
        userId: this.userId
      };
      this.$apis.order.getPreInfo(params).then(res => {
        this.setDefaultAddress(res.addrInfo);
        this.$router.push("/order");
      });
      
    },
    toggleDetails() {
      this.showDetails = !this.showDetails;
    },
    clearCart() {
      Dialog.confirm({
        title: "清空购物车",
        message: "确认要清空购物车吗?"
      })
        .then(() => {
          //this.$store.dispatch("setCartItems", { cartItems: [] });
          this.setCartItems([])
        })
        .catch(() => {});
    },
    drop(el) {
      //触发一次事件就会将所有小球进行遍历
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (!ball.show) {
          //将false的小球放到dropBalls
          ball.show = true;
          ball.el = el; //设置小球的el属性为一个dom对象
          this.dropBalls.push(ball);
          return;
        }
      }
    },

    beforeDrop(el) {
      //这个方法的执行是因为这是一个vue的监听事件
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect(); //获取小球的相对于视口的位移(小球高度)
          let x = rect.left - 32;
          let y = -(window.innerHeight - rect.top - 22); //负数,因为是从左上角往下的的方向
          el.style.display = ""; //清空display
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          //处理内层动画
          let inner = el.getElementsByClassName("inner-hook")[0]; //使用inner-hook类来单纯被js操作
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },

    dropping(el, done) {
      //这个方法的执行是因为这是一个vue的监听事件
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight; //触发重绘html
      this.$nextTick(() => {
        //让动画效果异步执行,提高性能
        el.style.webkitTransform = "translate3d(0,0,0)";
        el.style.transform = "translate3d(0,0,0)";
        //处理内层动画
        let inner = el.getElementsByClassName("inner-hook")[0]; //使用inner-hook类来单纯被js操作
        inner.style.webkitTransform = "translate3d(0,0,0)";
        inner.style.transform = "translate3d(0,0,0)";
        el.addEventListener("transitionend", done); //Vue为了知道过渡的完成，必须设置相应的事件监听器。
      });
    },

    afterDrop(el) {
      //这个方法的执行是因为这是一个vue的监听事件
      let ball = this.dropBalls.shift(); //完成一次动画就删除一个dropBalls的小球
      if (ball) {
        ball.show = false;
        el.style.display = "none"; //隐藏小球
      }
    }
  }
};
</script>
<style lang="less">
.shopping-cart {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #fff;

  .van-button--default {
    color: #fff;
    background-color: #00a0e9;
    border: 1px solid #00a0e9;
  }
  .van-button--disabled {
    color: #999;
    background-color: #eee;
    border: 1px solid #e5e5e5;
  }

  .cart-left {
    border-top: 1px solid #e5e5e5;
    .cart-icon {
      height: 50px;
      width: 50px;
      position: absolute;
      left: 15px;
      top: 10px;
      bottom: 0;
      img {
        width: 50px;
        height: 32px;
      }
      span {
        position: absolute;
        right: 3px;
        top: -7px;
        padding: 0;
        border-radius: 10px;
        background-color: #ff2d2d;
        color: #fff;
        height: 20px;
        width: 20px;
        text-align: center;
        font-size: 12px;
      }
    }
    .cart-price {
      padding-left: 70px;
      padding-top: 13px;

      span {
        color: #212121;
        font-size: 17px;
      }

      span.discount {
        font-size: 10px;
        margin-left: 10px;
        text-decoration: line-through;
        color: #7c7c7c;
        font-size: 12px;
      }
    }
  }
  .goods-details {
    position: absolute;
    bottom: 50px;
    width: 100%;
    background-color: #f4f7fd;
    .title {
      padding: 10px;
      font-size: 13px;
      .close {
        float: right;
        margin-right: 10px;
        font-size: 13px;
        .van-icon {
          margin-right: 3px;
        }
      }
    }
  }

  .ball-container {
    .ball {
      position: fixed; //小球动画必须脱离html布局流
      left: 32px;
      bottom: 22px;
      z-index: 200;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      .inner {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: rgb(0, 160, 220);
        transition: all 0.4s linear;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
