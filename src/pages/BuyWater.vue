<template>
	<div class="goods-warp">
		<Header/>
		<div class="water-conent">
			<div class="sideBar">
				<BadgeGroup  :active-key="activeKey">
					<Badge title="乐百氏" @click="onClick" />
					<Badge title="蓝剑" @click="onClick" />
					<Badge title="蓝光" @click="onClick" />
					<Badge title="农夫山泉" @click="onClick" />
					<Badge title="恒大冰泉" @click="onClick" />
					<Badge title="怡宝" @click="onClick" />
				</BadgeGroup>
				<div class="profile">
					<Button @click="personalOrder">我的</Button>
				</div>
			</div>
			<ul class="goods">
				<WaterItem v-for="(item, index) in items" :goods="item" :key="index" :dropBall="dropBall"/>		
			</ul>
		</div>
		<ShoppingCart :cartItems="items" ref="shopCart"/>
		<OrderPopup ref="orderPopup2"/>
	</div>
</template>
<script>
import vue from "vue";
import { BadgeGroup, Badge, Button } from "vant";
import WaterItem from "./WaterItem";
import ShoppingCart from "./ShoppingCart";
import Header from "../components/Header";
import OrderPopup from "../components/OrderPopup";

export default {
  name: "BuyWater",
  components: {
    Header,
    Badge,
    BadgeGroup,
    Button,
    WaterItem,
    ShoppingCart,
    OrderPopup
  },
  mounted() {
    console.log("mounted");
  },
  data() {
    return {
      activeKey: 0,
      items: [
        {
          title: "蓝剑矿泉水(15L)",
          count: 1,
          price: "12.00"
        },
        {
          title: "蓝剑矿泉水(10L)",
          count: 3,
          price: "8.00"
        },
        {
          title: "蓝剑矿泉水(20L)",
          count: 0,
          price: "15.00"
        }
      ]
    };
  },
  methods: {
    onClick(key) {
      this.activeKey = key;
    },
    dropBall(e) {
      e = e || window.event;
      this.$refs.shopCart.drop(e.target);
	},
	personalOrder(){
		this.$router.push("personalOrder")
	}
  }
};
</script>
<style lang="less">
.goods-warp {
  height: 100%;
  position: relative;
  .water-conent {
    position: relative;
    padding-top: 64px;
    padding-bottom: 50px;
    height: 100%;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    .sideBar {
      width: 102px;
      background-color: #f3f3f3;
      padding-bottom: 60px;
      .van-badge-group {
        overflow-x: hidden;
        overflow-y: auto;
        height: 100%;
        .van-badge {
          padding: 13px 0 10px 9px;
        }
        .van-badge--select {
          border-color: #00a0e9;
        }
        .van-badge--select::after {
          border-right: none;
        }
      }
    }
    .goods {
      position: relative;
      padding: 10px 0 0 10px;
      width: 100%;
      box-sizing: border-box;
      overflow-y: auto;
    }
  }
  .profile {
    position: absolute;
    bottom: 60px;
    left: 10px;
    .van-button {
      background-color: #00a0e9;
      border: none;
      background: -webkit-gradient(
        linear,
        0 0,
        0 100%,
        from(#00a0e9),
        to(#00d6e9)
      );
      background: linear-gradient(top center, #00a0e9, #00d6e9);
    }
  }
}
</style>


