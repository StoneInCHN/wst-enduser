<template>
	<AddressList
  v-model="chosenAddressId"
  :list="lists"
  @add="onAdd"
  @edit="onEdit"
  @select="select"
/>
</template>
<script>
import { AddressList, Toast } from "vant";
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    AddressList,
    Toast
  },
  mounted() {
    Toast.clear();
    const params = {
      qrCodeId: this.qrCodeId
    };
    this.$apis.address.getAddrs(params).then(res => {
      this.addrs = res.msg.addrInfo;
      this.setAddressLists(res.msg.addrInfo)
    });
  },
  data() {
    return {
      chosenAddressId: 1,
      addrs: []
    };
  },
  computed: {
    ...mapGetters(["qrCodeId"]),
    lists() {
      let lists = [];
      if (this.addrs && this.addrs.length > 0) {
        this.addrs.forEach(addrItem => {
          const item = {
            id: addrItem.id,
            name: addrItem.contactName,
            tel: addrItem.contactPhone,
            address: `${addrItem.addr} ${addrItem.doorNum}`
          };
          lists.push(item);
        });
      }
      return lists;
    }
  },
  methods: {
    ...mapActions([
      "setAddressLists"
    ]),
    onAdd() {
      this.$router.push("addAddress");
    },
    onEdit(item, index) {
      Toast("编辑收货地址:" + index);
      this.$router.push({
        path: "editAddress",
        query: {
          id: item.id
        }
      });
    },
    select(item, index) {
      console.log({ item, index });
      this.chosenAddressId = item.id;
    }
  }
};
</script>