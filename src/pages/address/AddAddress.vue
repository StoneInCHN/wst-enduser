<template>
  <div class="App-add-address">
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
    <Button class="save" size="large" @click="save">保存并设置默认地址</Button>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Field, CellGroup, Button, Toast } from "vant";

export default {
  name: "AddAddress",
  components: {
    Field,
    CellGroup,
    Button,
    Toast
  },
  data() {
    return {
      user: {
        contactName: "",
        contactPhone: "",
        addr: "",
        doorNum: ""
      }
    };
  },
  computed: {
    ...mapGetters(["qrCodeId", "userId"])
  },
  methods: {
    save() {
      this.user.userId = this.userId;
      this.user.qrCodeId = this.qrCodeId;
      console.log(this.user);
      this.$apis.address.newAddr(this.user).then(r => {
        console.log({r});
        if(r && r.code === "0000"){
          Toast(r.desc);
          setTimeout(()=>{
            this.$router.push("listAddress");
          },500)
        }else{
          Toast(r.desc);
        }
      });
      //
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
    background-color: #00a0e9;
    color: #fff;
    margin-top: 5px;
  }
}
</style>
