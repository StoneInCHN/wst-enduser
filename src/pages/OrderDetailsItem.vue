<template>
	<li class="order-details-list-item">
    <div class="item-img" :style="imgStyle"></div>
		<div>
			<p>{{fullName}}</p>
      <p>
        <span> X {{item.count}}</span>
        <span class="preferential" v-if="hasPreferential">大客服优惠</span>
      </p>
		</div>
		<div class="price">
			<span>￥{{totalDistPrice | formatPrice}}</span>
      <span>￥{{totalOriginPrice | formatPrice}}</span>
		</div>
	</li>
</template>
<script>
import { numMul , urlPre, toDecimal2} from "../utils";
export default {
  name: "OrderDetailsItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    fullName() {
      return `${this.item.gName} (${this.item.gSpec})`;
    },
    totalOriginPrice() {
      return numMul(this.item.originPrice, this.item.count);
    },
    totalDistPrice() {
      let price = this.item.distPrice
      //获取优惠价
      if(this.$route.query && this.$route.query[this.item.id]){
        price = this.$route.query[this.item.id] 
      }
      return numMul(price, this.item.count);
    },
    imgStyle() {
      let style = {};
      if (this.item.picUrl) {
        style = {
          backgroundImage: `url(${urlPre(this.item.picUrl)})`
        };
      }
      return style;
    },
    hasPreferential(){
      return this.$route.query && this.$route.query[this.item.id]
    }
  },
  filters:{
    formatPrice (val) {
      return toDecimal2(val)
    }
  }
};
</script>
<style lang="less">
.order-details-list-item {
  position: relative;
  padding: 0 80px;
  box-sizing: border-box;
  border-top: 1px solid #dddddd;
  display: flex;
  align-items: center;
  height: 65px;
  .item-img {
    position: absolute;
    left: 22px;
    top: 4px;
    width: 56px;
    height: 56px;
    background: #f3f3f3 url("../assets/images/water.svg") no-repeat center;
    background-size: cover;
  }
  p {
    box-sizing: border-box;
    font-size: 13px;
    flex: 1;
    padding-left: 20px;
    span.preferential{
      margin-left: 10px;
      background: #00a0e9;
      color: #fff;
      font-size: 10px;
      padding: 1px 4px;
      border-radius: 5px;
    }
  }
  .price {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 150px;
    padding: 11px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    span:last-child {
      text-decoration: line-through;
      font-size: 12px;
      padding: 0 5px;
    }
    span:first-child {
      font-size: 15px;
      color: red;
      padding: 0 5px;
    }
  }
}
</style>