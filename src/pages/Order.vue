<template>
	<div class="order">
    <div class="order-header">
      <Button v-if="hasDefaultAddress" class="add-address-btn" size="small" @click="addAddress">+新增收货地址</Button>
      <div class="order-address" v-if="!hasDefaultAddress">
        <h6>中德英伦联邦 16号楼1001室</h6>
				<p>
					<span>王先生</span>
					<span>123456789</span>
				</p>
				<Icon name="arrow" @click="selectAddress"/>
      </div>
    </div>
		<div class="order-details-list">
      <section>
        <h6>商品信息</h6>
        <ul>
          <order-item v-for="(item, index) in items" :item="item" :key="index"/>
        </ul>
        <div class="total-tips">
          共<span>{{count}}</span>件商品，合计: <span>￥12.00</span>
        </div>
      </section>
			<section>
        <h6>订单信息</h6>
			<CellGroup>
			  	<Cell title="订单金额" value="￥12.00" />
          <!--
			 	<Cell title="优惠金额" value="￥10.00" >
			 		<p solt class="sales-price">
						<Tag type="danger">大客户优惠</Tag>
						<span>
							￥10.00
						</span>
			 		</p>
			 	</Cell>
         -->
			 	<Cell title="需要付款" value="￥10.00" />
			</CellGroup>
      </section>
			<section>
        <h6>支付方式</h6>
        <CellGroup>
            <Cell title="水票支付" isLink @click="changePayMethod">
              <p class="pay-method" solt>
                {{payMethodName}}
              </p>
          </Cell>
          <Actionsheet v-model="showPayMethod" :actions="actions"  cancel-text="取消"/>
        </CellGroup>
      </section>
		</div>
		<div class="order-footer">
			<Button size="large" @click="submitHandler">提交订单</Button>
		</div>
	</div>
</template>
<script>
import {
  Button,
  Row,
  Icon,
  Col,
  Cell,
  CellGroup,
  Tag,
  Actionsheet
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
    OrderItem
  },
  data() {
    return {
      showPayMethod: false,
      hasDefaultAddress: true,
      payMethodName: "微信付款",
      items: [
        {
          title: "蓝剑矿泉水（15L）X 1"
        },
        {
          title: "蓝剑矿泉水（20L）X 1"
        }
      ],
      actions: [
        {
          key: 1,
          name: "微信支付",
          callback: this.onClick
        },
        {
          key: 2,
          name: "水票支付 （共2张 可用1张）",
          callback: this.onClick
        },
        {
          key: 3,
          name: "货到付款",
          callback: this.onClick
        }
      ]
    };
  },
  computed: {
    count() {
      return 5;
    }
  },
  methods: {
    addAddress() {
      console.log("addAddress");
      this.$router.push("/listAddress");
    },
    changePayMethod() {
      console.log("addAddress");
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
      this.$router.push("/orderSuccess");
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
  }
}
</style>
