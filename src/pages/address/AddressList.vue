<template>
	<AddressList
	  v-model="chosenAddressId"
	  :list="list"
	  @add="onAdd"
	  @edit="onEdit"
	/>
</template>
<script>
import { AddressList } from 'vant';

export default{
	name: "AddressList",
	components: {
		AddressList
	},
	data() {
	    return {
	      chosenAddressId: '1',
	      list: [
	        {
	          id: '1',
	          name: '张三',
	          tel: '13000000000',
						address: '西湖区文三路 138 号东方通信大厦 ',
						houseNum: '7 楼 501 室'
	        },
	        {
	          id: '2',
	          name: '李四',
	          tel: '1310000000',
						address: '蜀都中心',
						houseNum: 'A座 1701 室'
	        }
	      ]
	    }
	},
	computed: {
		addressLists(){
			const lists = this.list.map((item)=>{
				const address = {
					id: item.id,
					tel: item.tel,
					name: item.name,
					address: item.address + item.houseNum
				}
				return address
			})
			console.log(lists)
			return lists
		}
	},
	methods: {
	    onAdd() {
	      this.$router.push("addAddress")
	    },
	    onEdit(item, index) {
				console.log(item, index)
				this.$store.dispatch('setEditAddress',{editAddress: item})
				this.$router.push("editAddress")
	    }
	}
}
</script>