<template>
	<div class="order">
		<van-row>
			<van-col span="12" offset="6">
				<van-button size="large" @click="addAddress">+新增收货地址</van-button>
			</van-col>
		</van-row>	
	</div>
</template>
<script>
import { Button, Row, Col } from "vant"
export default{
	name: "order",
	components: {
		vanButton: Button,
		vanRow: Row,
		vanCol: Col
	},
	methods:{
		addAddress(){
			console.log("addAddress")
			this.$router.push("/addressList")
		}
	}

}
</script>
<style>
.order{
	padding-top: 40px;
}	
</style>