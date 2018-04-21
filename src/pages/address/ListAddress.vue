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
      this.addrs = res.addrInfo;
      this.setAddressLists(res.addrInfo);
      this.setDefault();
    });
  },
  data() {
    return {
      chosenAddressId: 0,
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
    ...mapActions(["setAddressLists"]),
    setDefault() {
      if (this.addrs && this.addrs.length > 0) {
        this.addrs.forEach(item => {
          if (item.isDefault) {
            this.chosenAddressId = item.id || 0;
          }
        });
      }
    },
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
      let defaultAddr = {};
      const lists = this.addrs.forEach(addr => {
        if (addr.id === item.id) {
          addr.isDefault = true;
          defaultAddr = addr;
        } else {
          addr.isDefault = false;
        }
      });

      console.log({ defaultAddr });

      //this.$router.push("/order");
    }
  }
};
</script>