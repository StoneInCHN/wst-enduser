<template>
	<AddressList
  v-model="chosenAddressId"
  :list="lists"
  @add="onAdd"
  @edit="onEdit"
  @select="select"
  @click-item ="clickItem"
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
    console.log(this.$route.query);
    Toast.clear();
    const params = {
      qrCodeId: this.qrCodeId,
      userId: this.userId
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
    ...mapGetters(["qrCodeId", "userId"]),
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
    ...mapActions(["setAddressLists", "setDefaultAddress"]),
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
      this.$router.push({
        path: "editAddress",
        query: {
          id: item.id
        }
      });
    },
    clickItem(item, index) {
      console.log({ item, index });
    },
    select(item, index) {
      this.chosenAddressId = item.id;
      let defaultAddr = {};
      let lists = [];
      this.addrs.forEach(addr => {
        if (addr.id === item.id) {
          addr.isDefault = true;
          defaultAddr = addr;
        } else {
          addr.isDefault = false;
        }
        lists.push(addr);
      });
      this.setAddressLists(lists);
      this.setDefaultAddress(defaultAddr);
      this.resetDefaultAddress(defaultAddr);
    },
    resetDefaultAddress(params) {
      const { qrCodeId, userId } = this;
      const defaultParams = {
        isDefault: true,
        qrCodeId,
        userId,
        entityId: params.id
      };
      const p = Object.assign({}, params, defaultParams);
      delete p.id;
      this.$apis.address.newAddr(p).then(r => {
        if (r && r.code === "0000") {
          Toast.clear()
          const selectAdd = this.$route.query["selectAdd"];
          if (selectAdd) {
            setTimeout(() => {
              this.$router.go(-1);
            });
          }
        } else {
          Toast.fail(r.desc);
        }
      });
    }
  }
};
</script>