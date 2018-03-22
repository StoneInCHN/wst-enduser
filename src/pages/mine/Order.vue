<template>
  <div class="mine-order">
    <h4>我的订单</h4>
    <!--
    <Tabs :active="active" >
        <Tab v-for="index in 4" :key="index" :title="'选项 ' + index">
            内容 {{ index }}
        </Tab>
    </Tabs>
    -->
    <ul>
      <OrderItem v-for="item in lists" :item="item" :key="item.id"/>
    </ul>
  </div>
</template>
<script>
import { Tab, Tabs, Button } from "vant";
import OrderItem from "./OrderItem";
import { mapGetters } from "vuex";
import { OrderStatusEnum } from "../../shared/consts";
export default {
  name: "Order",
  components: {
    Tab,
    Tabs,
    Button,
    OrderItem
  },
  data() {
    return {
      active: 2,
      lists: []
    };
  },
  mounted() {
    console.log({ OrderStatusEnum });
    const params = {
      qrCodeId: this.qrCodeId,
      pageSize: 10,
      pageNumber: 1
    };
    this.$apis.order.pageUserOrders(params).then(r => {
      console.log({ r });
      this.lists = r.msg;
    });
  },
  computed: {
    ...mapGetters(["qrCodeId", "userId"])
  },
  methods: {
    getStatic(key) {
      return OrderStatusEnum[key];
    }
  }
};
</script>
<style lang="less">
.mine-order {
  padding: 5px 0;
  h4 {
    font-size: 13px;
    color: #191919;
    padding: 10px;
  }
  .van-tabs__nav-bar {
    background-color: #00a0e9;
  }
  .van-tab--active {
    color: #00a0e9;
  }
  .order-item {
    padding: 5px 0 0;
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
      border-top: 1px dashed #dee4e5;
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
}
</style>
