<template>
	<div class="header">
		<van-button  :disabled="isCall" class="header-phone" @click="call">
			<van-icon name="phone"/>
		</van-button>
		<p>{{notification}}</p>
		<p>{{businessTime}}</p>
	</div>
</template>
<script>
import { Button, Icon} from 'vant'

export default{
	name: "Header",
	components:{
		vanButton: Button,
		vanIcon: Icon
	},
	data () {
		return{
			notification: "店家公告",
			businessTime: "9:00 -- 18:30"
		}
	},
	computed: {
		isCall(){
			return true
		}
	},
	methods: {
		call(){
			alert("店家已经休息了")
		}
	}
}
</script>
<style>
.header{
	padding:30px;
	background-color: #e5e5e5;
	position: relative;
}
.header-phone{
	position: absolute;
	top: 10px;
	right: 10px;
	background-color: #e5e5e5;
	border: none;
}
.header p{
	text-align: center;
}
</style>