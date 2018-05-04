<template>
  <div class="app-order-success">
      <p>
        <Icon class="icon-success" name="certificate"/>
      </p>
      <p class="msg">购买成功</p>
      <h4>您购买的商品马上送到</h4>
      <p>货到后，你还需要支付 <span>￥{{successOrder.cobAmount}}</span></p>
      <p class="desc">您可以再次扫描二维码关注订单状态</p>
  </div>
</template>
<script>
import { Icon } from "vant";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "OrderSuccess",
  components: {
    Icon
  },
  computed: {
    ...mapGetters(["successOrder"])
  }
};
</script>
<style lang="less">
.app-order-success {
  text-align: center;
  padding-top: 160px;
  background-color: #fff;
  height: 100%;
  box-sizing: border-box;
  h4 {
    margin: 10px;
  }
  span {
    color: red;
  }
  p:last-child {
    margin-top: 50px;
  }
  .icon-success {
    font-size: 100px;
    color: #00a0e9;
  }
  .msg{
    color: #00a0e9;
  }
  .desc{
    font-size: 14px;
    color: #666;
  }
}
</style>


