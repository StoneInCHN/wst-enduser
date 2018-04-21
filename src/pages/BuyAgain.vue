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
import { mapActions, mapGetters } from "vuex";
export default {
  name: "BuyAgain",
  components: {
    Button
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    close: {
      type: Function,
      required: true
    }
  },
  created(){
    const {item, close} = this
    console.log({item, close})
  },
  computed: {
    ...mapGetters(["commonPopup","cartItems"])
  },
  methods: {
    ...mapActions(["setCommonPopup","setCartItems"]),
    buyAgain() {
      console.log("buy again");
      //this.findItems("add")
    },
    change() {
      console.log("change");
      this.close()
      this.setCommonPopup(false)
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
      this.setCartItems({ cartItems: resultItems });
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
