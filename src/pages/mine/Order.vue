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
    <ul class="order-warp">
      <OrderItem v-for="item in lists" :item="item" :key="item.id"/>
    </ul>
  </div>
</template>
<script>
import { Tab, Tabs, Button } from "vant";
import OrderItem from "./OrderItem";
import { mapGetters, mapActions } from "vuex";
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
      active: 2
    };
  },
  mounted() {
    const params = {
      userId: this.userId,
      qrCodeId: this.qrCodeId,
      pageSize: 20,
      pageNumber: 1
    };
    this.$apis.order.pageUserOrders(params).then(r => {
      this.setHistoryOrders(r.msg || []);
    });
  },
  computed: {
    ...mapGetters(["qrCodeId", "userId", "historyOrders"]),
    lists() {
      return this.historyOrders || [];
    }
  },
  methods: {
    ...mapActions(["setHistoryOrders"]),
    getStatic(key) {
      return OrderStatusEnum[key];
    }
  }
};
</script>
<style lang="less">
.mine-order {
  padding: 5px 0;

  .order-warp {
    background-color: #dee4e5;
  }

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
}
</style>
