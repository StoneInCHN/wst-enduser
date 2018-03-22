<template>
  <div class="App-edit-address">
    <div class="title">联系人</div>
    <CellGroup>
      <Field v-model="user.contactName" label="用户名" placeholder="请填写收货人姓名" />
      <Field v-model="user.contactPhone" label="电话" placeholder="请填写收货手机号码" />
    </CellGroup>
    <div class="title">收货地址</div>
    <CellGroup>
      <Field v-model="user.addr" type="textarea" label="小区/大厦/学校" placeholder="例：中德英伦联邦" />
      <Field v-model="user.doorNum" label="楼号-门牌号" placeholder="例：16号楼1001室" />
    </CellGroup>
    <Button class="save" size="large" @click="save">保存</Button>
  </div>
</template>
<script>
import { Field, CellGroup, Button } from "vant";
import { mapGetters } from "vuex";

export default {
  name: "editAddress",
  components: {
    Field,
    CellGroup,
    Button
  },
  mounted() {
    console.log("params", this.$route.query);
  },
  computed: {
    ...mapGetters(["addressLists", "qrCodeId", "userId"]),
    user() {
      let item = {};
      const { addressLists } = this;
      const id = this.$route.query.id || "-1";
      if (addressLists && addressLists.length > 0) {
        addressLists.forEach(address => {
          if (id === address.id) {
            item = address;
          }
        });
      }
      return item;
    }
  },
  methods: {
    save() {
      console.log(this.user);
      this.$router.push("listAddress");
    }
  }
};
</script>
<style lang="less">
.App-edit-address {
  padding: 2px 0;
  position: relative;
  h4 {
    text-align: center;
  }
  .title {
    margin: 2px 0 2px 15px;
    color: #191919;
    font-size: 12px;
  }
  .save {
    background-color: #00a0e9;
    color: #fff;
    margin-top: 5px;
  }
}
</style>
