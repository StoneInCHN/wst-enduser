<template>
  <div class="App-add-address">
    <div class="title">联系人</div>
    <CellGroup>
      <Field v-model="user.name" label="用户名" placeholder="请填写收货人姓名" />
      <Field v-model="user.phone" label="电话" placeholder="请填写收货手机号码" />
    </CellGroup>
    <div class="title">收货地址</div>
    <CellGroup>
      <Field v-model="user.address" type="textarea" label="小区/大厦/学校" placeholder="例：中德英伦联邦" />
      <Field v-model="user.houseNum" label="楼号-门牌号" placeholder="例：16号楼1001室" />
    </CellGroup>
    <Button class="save" size="large" @click="save">保存并设置默认地址</Button>
  </div>
</template>
<script>
import { Field, CellGroup, Button } from "vant";

export default {
  name: "AddAddress",
  components: {
    Field,
    CellGroup,
    Button
  },
  data() {
    return {
      user: {
        name: "",
        phone: "",
        address: "",
        houseNum: ""
      }
    };
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
.App-add-address {
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
    background-color: #00A0E9;
    color:#fff;
    margin-top: 5px;
  }
}
</style>
