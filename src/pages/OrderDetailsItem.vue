<template>
	<li class="order-details-list-item">
		<img src="../assset/images/water.svg" alt="桶装水">
		<p>
			{{item.title}}
		</p>
		<div class="price">
			<span>￥12.00</span>
			<span>￥13.00</span>
		</div>
	</li>
</template>
<script>
export default{
	name: "OrderDetailsItem",
	props: {
		item: {
			type: Object,
			required: true
		}
	}
}
</script>
<style>
.order-details-list-item {
	position: relative;
	padding: 0 64px;
	box-sizing: border-box;
}
.order-details-list-item img{
	position: absolute;
	left: 0;
	top: 0;
	bottom: 0;
	width: 64px;
	height: 64px;
}
.order-details-list-item p{
    line-height: 30px;
    padding: 17px 0;
    box-sizing: border-box;
}
.order-details-list-item .price{
	position: absolute;
	top:0;
	right: 0;
	bottom: 0;
	width: 70px;
	padding: 11px 0;
}
.order-details-list-item .price span:first-child{
	color:red;
}
.order-details-list-item .price span:last-child{
	text-decoration: line-through;
	font-size: 12px;
}
</style>