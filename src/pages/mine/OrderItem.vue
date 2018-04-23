<template>
  <li class="order-item">
        <div class="date">
            <span>{{item.createDate | formatDate}}</span>
            <span class="status">{{getStatic(item.oStatus)}}</span>
        </div> 
        <section class="item-info" v-for="subItem in item.orderItems" :key="subItem.id">
            <div class="item-img" :style="imgStyle"/>
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
import { formatDate } from "../../utils"
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
  computed: {
    ...mapGetters(["qrCodeId", "historyOrders"]),
    imgStyle(){
      let style = {}
      if(this.item.picUrl){
        style ={
          backgroundImage: `url(${this.item.picUrl})`
        }
      }
      return style;
    }
  },
  methods: {
    ...mapActions(["setHistoryOrders"]),
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
            const lists = this.historyOrders.map(order=>{
                if(order.id === this.item.id){
                  order.oStatus = "CANCEL"
                }
                return order
            })
          });
        })
    },
    press() {
      Toast.loading({
        mask: true,
        message: '催促中...'
      });
      setTimeout(()=>{
        Toast("已催促商家!");
      },1000)
    }
  },
  filters:{
    formatDate (time) {
      let date = new Date(time)
      return formatDate(date, 'yyyy-MM-dd hh:mm')
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
    .item-img {
      position: absolute;
      left: 25px;
      top: 8px;
      width: 45px;
      height: 45px;
      background: #f3f3f3 url("../../assets/images/water.svg") no-repeat center ;
      background-size: cover;
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
