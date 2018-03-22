<template>
  <li class="order-item">
        <div class="date">
            <span>{{item.createDate}}</span>
            <span class="status">{{getStatic(item.oStatus)}}</span>
        </div> 
        <section class="item-info" v-for="subItem in item.orderItems" :key="subItem.id">
            <img src="../../assets/images/water.svg" :alt="subItem.gName">
            <p>{{subItem.gName}}</p>
            <p class="price-info">
                <span>X{{subItem.count}}</span>
                <span class="price">{{subItem.count * subItem.amount}}</span>
            </p>
        </section>
        <!--
        <div class="total-price">
            <span>总价: {{item.amount}}</span>
        </div>
        -->
        <div class="item-footer" v-if="'PENDING' === item.oStatus">
                <Button size="small" @click="cancel">取消</Button>
                <div class="line">|</div>
                <Button size="small" @click="press">催促</Button>
        </div>
        <div class="item-footer" v-else-if="'PROCESSING' === item.oStatus">
                <Button size="small" @click="press">催促</Button>
        </div>
  </li>
</template>
<script>
import { Button, Dialog, Toast } from "vant";
import { OrderStatusEnum } from "../../shared/consts";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "OrderItem",
  components: {
    Button,
    Dialog,
    Toast
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  mounted() {
    console.log("item", this.item);
  },
  computed: {
    ...mapGetters(["qrCodeId"])
  },
  methods: {
    getStatic(key) {
      return OrderStatusEnum[key];
    },
    cancel() {
      Dialog.confirm({
        message: "是否需要取消订单?"
      })
        .then(() => {
          const params = {
            qrCodeId: this.qrCodeId,
            entityId: this.item.id
          };
          this.$apis.order.cancelSO(params).then(r => {
            console.log({ r });
          });
        })
        .catch(() => {});
    },
    press() {
      Toast("已催促商家!");
    }
  }
};
</script>
<style lang="less">
.order-item {
  padding: 5px 0;
  background-color: #fff;
  margin-bottom: 5px;
  box-sizing: border-box;
  .date {
    color: #7c7c7c;
    display: flex;
    padding: 0 23px;
    span {
      font-size: 12px;
    }
    span:first-child {
      flex: 1;
    }
    .status {
      text-align: right;
      width: 100px;
      color: #00a0e9;
    }
  }
  .item-info {
    position: relative;
    padding: 8px 25px 8px 83px;
    img {
      position: absolute;
      left: 25px;
      top: 8px;
      width: 45px;
      height: 45px;
      background-color: #ccc;
    }
    p {
      color: #191919;
      font-size: 15px;
    }
    .price-info {
      display: flex;
      span:first-child {
        flex: 1;
      }
      .price {
        text-align: right;
        width: 50px;
        font-size: 14px;
      }
    }
  }
  .total-price {
    text-align: right;
    font-size: 14px;
    padding-right: 22px;
  }
  .item-footer {
    overflow: hidden;
    padding: 0 5px;
    .van-button {
      float: right;
      border: none;
      color: #46b91e;
      font-size: 14px;
    }
    .line {
      float: right;
      height: 30px;
      padding: 4px 0;
      color: #ccc;
    }
  }
}
.van-dialog__message {
  text-align: center;
}
</style>
