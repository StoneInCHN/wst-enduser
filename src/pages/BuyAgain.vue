<template>
  <div class="buy-again">
      <p>你上次购买了{{item.gCount}}桶</p>
      <h6>{{`${item.gName} X ${item.gCount} 价格:${item.gAmount}`}}</h6>
      <Button type="default" size="large" @click="buyAgain">再来一桶</Button>
      <Button class="cancel" type="default" size="large" @click="change">换个口味</Button>
  </div>
</template>

<script>
import { Button } from "vant";
export default {
  name: "BuyAgain",
  components: {
    Button
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    buyAgain() {
      console.log("buy again");
    },
    change() {
      console.log("change");
    }
  }
};
</script>
<style lang="less">
.buy-again {
  padding: 20px;
  p,
  h6 {
    text-align: center;
    margin: 10px auto;
  }
  .van-button {
    height: 30px;
    line-height: 30px;
    background-color: #00a0e9;
    border-color: #00a0e9;
    color: #fff;
    font-size: 14px;
  }
  .cancel {
    background-color: #fff;
    color: #00a0e9;
    margin-top: 10px;
  }
}
</style>
