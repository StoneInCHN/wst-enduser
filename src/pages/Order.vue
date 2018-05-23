<template>
	<div class="order">
    <div class="order-header">
      <Button v-if="!hasDefaultAddress" class="add-address-btn" size="small" @click="addAddress">+新增收货地址</Button>
      <div class="order-address" v-if="hasDefaultAddress">
        <h6>{{ `${defaultAddress.addr || ""} ${defaultAddress.doorNum || ""}`}}</h6>
				<p>
					<span>{{defaultAddress.contactName}}</span>
					<span>{{defaultAddress.contactPhone}}</span>
				</p>
				<Icon name="arrow" @click="selectAddress"/>
      </div>
    </div>
		<div class="order-details-list">
      <section>
        <h6>商品信息</h6>
        <ul>
          <OrderItem v-for="item in cartItems" :item="item" :key="item.id"/>
        </ul>
        <div class="total-tips">
          共<span>{{count}}</span>件商品，合计: <span>{{totalPrice}}</span>
        </div>
      </section>
			<section>
        <h6>订单信息</h6>
			<CellGroup>
			  	<Cell title="订单金额" :value="totalPrice" />
			 	<Cell title="需要付款" :value="totalPrice" />
			</CellGroup>
      </section>
			<section>
        <h6>支付方式</h6>
        <CellGroup>
            <Cell title="支付方式" isLink @click="changePayMethod">
              <p class="pay-method" solt>
                {{payMethodName}}
              </p>
          </Cell>
          <Actionsheet v-model="showPayMethod" :actions="actions"  cancel-text="取消"/>
        </CellGroup>
      </section>
		</div>
		<div class="order-footer">
			<Button size="large" :disabled="!isOpen" @click="submitHandler">提交订单</Button>
		</div>
	</div>
</template>
<script>
import { numAdd, numMul } from "../utils";
import { mapActions, mapGetters } from "vuex";
import {
  Button,
  Row,
  Icon,
  Col,
  Cell,
  CellGroup,
  Tag,
  Actionsheet,
  Toast
} from "vant";
import OrderItem from "./OrderDetailsItem";
export default {
  name: "order",
  components: {
    Button,
    Row,
    Icon,
    Col,
    Cell,
    CellGroup,
    Tag,
    Actionsheet,
    OrderItem,
    Toast
  },
  mounted() {
    console.log("mounted ", this.cartItems);
  },
  data() {
    return {
      showPayMethod: false,
      payMethodName: "货到付款",
      actions: [
        {
          key: "COB",
          name: "货到付款",
          callback: this.onClick
        }
      ]
    };
  },
  mounted() {
    console.log("defaultAddress", this.defaultAddress);
  },
  computed: {
    ...mapGetters(["cartItems", "defaultAddress", "userId", "qrCodeId","entityId", "isOpen"]),
    hasDefaultAddress() {
      return !!this.defaultAddress;
    },
    count: {
      get() {
        console.log("cartItems", this.cartItems);
        let count = 0;
        if (this.cartItems && this.cartItems.length > 0) {
          this.cartItems.forEach(item => {
            count += item.count;
          });
        }
        return count;
      },
      set() {}
    },
    totalPrice() {
      let price = 0;
      if (this.cartItems && this.cartItems.length > 0) {
        this.cartItems.forEach(item => {
          let total = numMul(item.distPrice, item.count);
          price = numAdd(price, total);
        });
      }
      return `￥${price}`;
    },
    gIds() {
      let gIds = {};
      if (this.cartItems && this.cartItems.length > 0)
        this.cartItems.forEach(item => {
          gIds[item.id] = item.count;
        });
      return gIds;
    },
    addrId() {
      return this.defaultAddress.id;
    }
  },
  methods: {
    ...mapActions(["setCartItems","setSuccessOrder"]),
    addAddress() {
      this.$router.push("/listAddress");
    },
    changePayMethod() {
      this.showPayMethod = !this.showPayMethod;
    },
    onClick(item) {
      this.payMethodName = item.name;
      this.showPayMethod = false;
    },
    selectAddress() {
      this.$router.push("/listAddress");
    },
    submitHandler() {
      const params = {
        qrCodeId: this.qrCodeId,
        addrId: this.addrId,
        userId: this.userId,
        payType: "COB",
        gIds: this.gIds,
        entityId: this.entityId
      };
      console.log({ params });
      this.$apis.order.createSO(params).then(r => {
        console.log({ r });
        Toast.success({
          message:"订单创建成功",
          mask: true,
          forbidClick: true,
          duration:1000
        })
        this.setSuccessOrder(r)
        this.setCartItems([])
        setTimeout(()=>{
          this.$router.replace("/orderSuccess");
        },500)
      });
    }
  }
};
</script>
<style lang="less">
.order {
  padding-bottom: 100px;
  .order-header {
    display: flex;
    justify-content: center;
    padding: 15px 0;
    background-color: #fff;
    .add-address-btn {
      width: 185px;
      border-radius: 30px;
      border-color: #7ecef4;
      color: #1295d3;
      display: inline-block;
    }
    .order-address {
      position: relative;
      flex: 1;
    }
    .order-address h6,
    .order-address p {
      text-align: center;
      color: #191919;
    }
    .order-address p > span {
      margin-left: 20px;
      color: #191919;
    }
    .order-address .van-icon {
      position: absolute;
      right: 20px;
      top: 25px;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
      color: #00a0e9;
      font-size: 12px;
    }
  }
  .order-details-list {
    section {
      margin-top: 10px;
      background-color: #fff;
      h6 {
        font-weight: 200;
        font-size: 12px;
        padding: 2px 22px;
      }
      .total-tips {
        text-align: right;
        border-top: 1px solid #d1d1d1;
        font-size: 13px;
        padding: 5px;
        span {
          color: red;
          padding: 0 5px;
        }
      }
    }
    .van-cell {
      margin-left: 6px;
      .sales-price span {
        margin-left: 50px;
      }
    }
    .pay-method {
      text-align: center;
      color: blue;
    }
  }
  .order-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    button {
      background-color: #00a0e9;
      color: #fff;
    }
    .van-button--disabled {
      color: #999;
      background-color: #eee;
      border: 1px solid #e5e5e5;
    }
  }
}
</style>
