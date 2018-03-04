<template>
    <Popup v-model="show" class="popup-order">
		<div class="popup-header">
			<Icon name="close" @click="close"/>
            <div class="close-line"></div>
            <h6>您目前有2个订单正在处理中</h6>
		</div>
		<div class="popup-content">
			<div class="order-item">
				<p class="date">您在2018.1.14 22：45:20下单</p>
				<p >星雅俊园 19栋1001室</p>
				<p class="price-info">
                    <span class="name">蓝剑矿泉水（15L）X 1</span>
                    <span class="price">￥12.00</span>
                </p>
				<p class="status">快递员正在路上，请稍后</p>
				<Button type="default" size="large" @click="notice">很不爽,催一下</Button>
                <Button class="cancel" type="default" size="large" @click="notice">取消订单</Button>
			</div>
            <div class="order-item">
				<p class="date">您在2018.1.14 22：45:20下单</p>
				<p >星雅俊园 19栋1001室</p>
				<p class="price-info">
                    <span class="name">蓝剑矿泉水（15L）X 1</span>
                    <span class="price">￥12.00</span>
                </p>
				<p class="status">快递员正在路上，请稍后</p>
				<Button type="default" size="large" @click="notice">很不爽,催一下</Button>
			</div>
		</div>
	</Popup>
</template>
<script>
import { Button, Icon, Popup } from "vant";
export default {
  name: "OrderPopup",
  components: {
    Popup,
    Icon,
    Button
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    showNotice() {
      console.log("showNotice");
      this.show = !this.show;
    },
    close() {
      this.show = !this.show;
    },
    notice() {
      alert("渴死了，送到哪儿了...");
    }
  }
};
</script>
<style lang="less">
.popup-order {
  position: relative;
  width: 85%;
  border-radius: 5px;
  .popup-header {
    text-align: center;
    padding: 18px;
    font-weight: 200;
    .van-icon-close {
      position: absolute;
      right: 10px;
      top: -41px;
      color: #fff;
      font-size: 23px;
    }
    .close-line {
      position: absolute;
      height: 18px;
      border-left: 1px solid #fff;
      top: -18px;
      right: 20px;
    }
    h6 {
      font-weight: 300;
      font-size: 18px;
    }
  }
  .popup-content {
    .order-item {
      padding: 0 20px 20px;
      p {
        padding: 4px 0;
        color: #191919;
        font-size: 15px;
      }
      .date {
        font-size: 13px;
        color: #7c7c7c;
      }
      .price-info {
        display: flex;
        justify-content: center;
        align-items: center;
        .name{
            flex: 1;
        }
        .price {
          color: red;
          width: 80px;
          text-align: center;
        }
      }
      .status{
          font-size: 12px;
      }
      .van-button{
          height: 30px;
          line-height: 30px;
          background-color: #00A0E9;
          border-color: #00A0E9;
          color: #fff;
          font-size: 14px;
      }
      .cancel{
          background-color: #fff;
          color:#00A0E9;
          margin-top: 10px;
      }
    }
  }
}
</style>
