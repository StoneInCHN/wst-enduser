<template>
    <Popup v-model="show" class="popup-order">
		<div class="popup-header">
			<Icon name="close" @click="close"/>
      <div class="close-line"/>
      <h6>{{`您目前有${orderNum}个订单正在处理中`}}</h6>
		</div>
		<div class="popup-content">
			<div class="order-item" v-for="order in noticeOrders" :key="order.id">
				<p class="date">您在{{order.createDate|formatDate}}下单</p>
				<p >{{order.addrDetail}}</p>
				<p class="price-info" v-for="(item, index) in order.item" :key="index">
            <span class="name">{{`${item.gName} X ${item.count}`}}</span>
            <span class="price">{{`￥${item.amount}`}}</span>
        </p>
				<p v-if="order.oStatus === 'PROCESSING'" class="status">快递员正在路上，请稍后</p>
				<Button type="default" size="large" @click="notice">很不爽,催一下</Button>
        <Button v-if="order.oStatus === 'PENDING'" class="cancel" type="default" size="large" @click="cancelOrder(order.id)">取消订单</Button>
			</div>
		</div>
	</Popup>
</template>
<script>
import { Button, Icon, Popup, Dialog, Toast } from "vant";
import { mapActions, mapGetters } from "vuex";
import { formatDate } from "@/utils";
export default {
  name: "OrderPopup",
  components: {
    Popup,
    Icon,
    Button,
    Dialog,
    Toast
  },
  data() {
    return {
      show: false
    };
  },
  created() {
    this.show = this.orderNotice;
  },
  computed: {
    ...mapGetters(["orderNotice", "noticeOrders", "qrCodeId"]),
    orderNum() {
      return this.noticeOrders.length || 0;
    }
  },
  methods: {
    ...mapActions(["setOrderNotice", "setNoticeOrders"]),
    showNotice() {
      this.show = true;
      this.setOrderNotice(true);
    },
    close() {
      this.show = false;
      this.setOrderNotice(false);
    },
    notice() {
      Toast("渴死了，老板快接单...");
    },
    cancelOrder(id) {
      Dialog.confirm({
        title: "取消订单",
        message: "确定要取消订单吗?"
      })
        .then(() => {
          const params = {
            qrCodeId: this.qrCodeId,
            entityId: id
          };
          console.log({ params });
          this.$apis.order.cancelSO(params).then(r => {
            Toast(r.desc);
          });
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  }
};
</script>
<style lang="less">
.popup-order {
  position: fixed;
  width: 80vw;
  max-height: 80vh;
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
      font-size: 1rem;
    }
  }
  .popup-content {
    max-height: calc(~"80vh - 61px");
    overflow: auto;
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
        font-size: 13px;
        color: #7c7c7c;
        .name {
          flex: 1;
        }
        .price {
          color: red;
          width: 80px;
          text-align: center;
        }
      }
      .status {
        font-size: 12px;
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
  }
}
</style>
