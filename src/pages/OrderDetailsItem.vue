<template>
	<li class="order-details-list-item">
    <div class="item-img" :style="imgStyle"/>
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
import { numMul , urlPre} from "../utils";
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
      return numMul(this.item.distPrice, this.item.count);
    },
    imgStyle() {
      let style = {};
      if (this.item.picUrl) {
        style = {
          backgroundImage: `url(${urlPre(this.item.picUrl)})`
        };
      }
      return style;
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