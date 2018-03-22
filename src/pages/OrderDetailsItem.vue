<template>
	<li class="order-details-list-item">
		<img :src="item.picUrl" :alt="fullName">
		<p>
			{{fullName}} <span> X {{item.count}}</span>
		</p>
		<div class="price">
			<span>￥{{totalOriginPrice}}</span>
			<span>￥{{totalDistPrice}}</span>
		</div>
	</li>
</template>
<script>
import {numMul} from "../utils"
export default {
  name: "OrderDetailsItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed:{
    fullName(){
      return `${this.item.gName} (${this.item.gSpec})`
    },
    totalOriginPrice() {
      return numMul(this.item.originPrice, this.item.count);
    },
    totalDistPrice() {
      return numMul(this.item.distPrice, this.item.count);
    }
  }
};
</script>
<style lang="less">
.order-details-list-item {
  position: relative;
  padding: 0 80px;
  box-sizing: border-box;
  border-top:1px solid #DDDDDD;
  display: flex;
  align-items: center;
  height: 65px;
  img {
    position: absolute;
    left: 22px;
    top: 4px;
    width: 56px;
	height: 56px;
	background-color: #D1D1D1;
  }
  p {
	box-sizing: border-box;
    font-size: 13px;
    flex: 1;
  }
  .price {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 70px;
    padding: 11px 0;
    span:first-child {
      text-decoration: line-through;
	  font-size: 12px;
    }
    span:last-child {
      font-size: 15px;
	  color: red;
    }
  }
}
</style>