<template>
	<div class="order">
		<Row>
			<Col v-if="hasDefaultAddress" span="12" offset="6">
				<van-button size="large" @click="addAddress">+新增收货地址</van-button>
			</Col>
			<Col v-else class="order-address" span="24">
				<h6>中德英伦联邦 16号楼1001室</h6>
				<p>
					<span>王先生</span>
					<span>123456789</span>
				</p>
				<Icon name="arrow" @click="selectAddress"/>
			</Col>
		</Row>
		<div class="order-details-list">
			<h2>商品信息</h2>
			<ul>
				<order-item v-for="(item, index) in items" :item="item" :key="index"/>
			</ul>
			<hr/>
			<p class="total-tips">
				共<span>{{count}}</span>件商品，合计: <span>￥12.00</span>
			</p>
			<h2>订单信息</h2>
			<CellGroup>
			  	<Cell title="订单金额" value="￥12.00" />
			 	<Cell title="优惠金额" value="￥10.00" >
			 		<p solt class="sales-price">
						<Tag type="danger">大客户优惠</Tag>
						<span>
							￥10.00
						</span>
			 		</p>
			 	</Cell>
			 	<Cell title="微信付款" value="￥10.00" />
			</CellGroup>
			<h2>支付方式</h2>
			<CellGroup>
			  	<Cell title="水票支付" isLink @click="changePayMethod">
			  		<p class="pay-method" solt>
			  			{{payMethodName}}
			  		</p>
				</Cell>
				<Actionsheet v-model="showPayMethod" :actions="actions"  cancel-text="取消"/>
			</CellGroup>
		</div>
		<Row>
			<Button size="large" @click="submitHandler">提交订单</Button>
		</Row>
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
      hasDefaultAddress: false,
      payMethodName: "微信付款",
      items: [
        {
          title: "蓝剑矿泉水（15L）X 1"
        },
        {
          title: "蓝剑矿泉水（20L）X 1"
        },
        {
          title: "蓝剑矿泉水（25L）X 1"
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
      this.$router.push("/addressList");
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
      this.$router.push("/addressList");
    },
    submitHandler() {
      this.$router.push("/orderSuccess");
    }
  }
};
</script>
<style>
.order {
  padding: 40px 0;
}
.order-address {
  position: relative;
}
.order-address h6,
.order-address p {
  text-align: center;
}
.order-address p > span {
  margin-left: 20px;
}
.order-address .van-icon {
  position: absolute;
  right: 20px;
  top: 25px;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  color: #999;
  font-size: 12px;
}
.order-details-list {
  padding: 10px;
}
.order-details-list h2 {
  font-weight: 200;
  padding: 10px 5px;
}
.order-details-list .total-tips {
  text-align: right;
}
.order-details-list .total-tips > span {
  color: red;
  padding: 0 5px;
}
.order-details-list .sales-price span {
  margin-left: 50px;
}
.order-details-list .pay-method {
  text-align: center;
  color: blue;
}
</style>
