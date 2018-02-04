<template>
  <div class="app-order-success">
      <p>购买成功</p>
      <h4>您购买的商品马上送到</h4>
      <p>货到后，你还需要支付 <span>￥12.53 </span></p>
      <p>您可以再次扫描二维码关注订单状态</p>
  </div>
</template>
<script>
export default {
  name: "OrderSuccess"
}
</script>
<style>
.app-order-success{
    text-align: center;
    padding-top: 260px;
}
.app-order-success h4{
    margin: 40px 0 20px 0;
}
.app-order-success span{
    color: red;
}

.app-order-success p:last-child{
    margin-top: 50px;
}

</style>


