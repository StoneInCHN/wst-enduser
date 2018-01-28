<template>
	<van-address-edit
	  :area-list="areaList"
	  show-postal
	  show-set-default
	  show-search-result
	  :search-result="searchResult"
	  @save="onSave"
	  @delete="onDelete"
	  @change-detail="onChangeDetail"
	/>
</template>
<script>
import { AddressEdit, Toast } from 'vant';

export default {
  name: "AddAddress",
  components: {
		vanAddressEdit: AddressEdit,
		toast: Toast
  },
  data() {
    return {
      areaList: {},
      searchResult: []
    }
  },

  methods: {
    onSave() {
      toast('save');
    },
    onDelete() {
      toast('delete');
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [{
          name: '黄龙万科中心',
          address: '杭州市西湖区'
        }];
      } else {
        this.searchResult = [];
      }
    }
  }
}
</script>