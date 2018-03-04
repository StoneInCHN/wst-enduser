<template>
	<AddressList
  v-model="chosenAddressId"
  :list="list"
  @add="onAdd"
  @edit="onEdit"
/>
</template>
<script>
import { AddressList, Toast } from "vant";

export default {
	components:{
		AddressList,
		Toast
	},
  data() {
    return {
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室'
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号'
        }
      ]
    }
  },

  methods: {
    onAdd() {
      this.$router.push("addAddress")
    },
    onEdit(item, index) {
      Toast('编辑收货地址:' + index);
      this.$router.push("editAddress")
    }
  }
}
</script>