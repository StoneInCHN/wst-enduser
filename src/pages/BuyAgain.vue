<template>
  <div class="buy-again">
      <p>你上次购买了{{item.gCount}}桶</p>
      <h6>{{`${item.gName} X ${item.gCount} 价格:${totalPrice}`}}</h6>
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
  created() {
    const { item, close } = this;
    console.log({ item, close });
    if (!item.gCount) {
      this.item.gCount = 1;
    }
  },
  computed: {
    ...mapGetters(["commonPopup", "cartItems", "qrCodeId", "userId"]),
    totalPrice() {
      const { gCount = 1, gDistPrice } = this.item;
      return gCount * gDistPrice;
    },
    items() {
      return this.cartItems.filter(item => item.count > 0);
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
    ...mapActions(["setCommonPopup", "setCartItems", "setDefaultAddress"]),
    buyAgain() {
      console.log("buy again");
      this.addItems();
      const params = {
        gIds: this.gIds,
        qrCodeId: this.qrCodeId,
        userId: this.userId
      };
      this.$apis.order.getPreInfo(params).then(res => {
        console.log("addrInfo", res.addrInfo);
        this.setDefaultAddress(res.addrInfo);
        this.$router.push("/order");
      });
    },
    change() {
      console.log("change");
      this.close();
      this.setCommonPopup(false);
    },
    addItems() {
      const cartItems = this.cartItems;
      const goods = this.item;
      console.log({ cartItems, goods });
      let flag = false;
      let resultItems = [];

      //检查购物车中是否已包含改商品
      if (cartItems && cartItems.length > 0) {
        cartItems.forEach(item => {
          if (item.id === goods.gId) {
            item.count += 1
            flag = true; 
          }
          resultItems.push(item);
        });
      }

      //store中的cartItems中没有当前选择的商品
      if (!flag) {
        const item = {
          id: goods.gId,
          picUrl: goods.gPic,
          gName: goods.gName,
          originPrice: goods.gOriginPrice,
          distPrice: goods.gDistPrice,
          gSpec: goods.gSpec || "",
          count: goods.gCount
        };
        console.log({item})
        resultItems.push(item);
      }
      this.setCartItems(resultItems);
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
