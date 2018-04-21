<template>
  <div class="App-edit-address">
    <div class="title">联系人</div>
    <CellGroup>
      <Field v-model="user.contactName" required :error-message="errorMsgshow.contactName" label="用户名" placeholder="请填写收货人姓名" />
      <Field v-model="user.contactPhone" required  :error-message="errorMsgshow.contactPhone" label="电话" placeholder="请填写收货手机号码" />
    </CellGroup>
    <div class="title">收货地址</div>
    <CellGroup>
      <Field v-model="user.addr" type="textarea" :error-message="errorMsgshow.addr"  label="小区/大厦/学校" placeholder="例：中德英伦联邦" rows="1"
        autosize/>
      <Field v-model="user.doorNum" required label="楼号-门牌号" :error-message="errorMsgshow.doorNum" placeholder="例：16号楼1001室" />
    </CellGroup>
    <Button class="save" size="large" @click="save">保存</Button>
  </div>
</template>
<script>
import { Field, CellGroup, Button } from "vant";
import { mapGetters } from "vuex";

const errorMsg = {
  contactName: "用户名不能为空",
  contactPhone: "联系电话不能为空",
  addr: "小区/大厦/学校不能为空",
  doorNum: "楼号-门牌号不能为空"
};

export default {
  name: "editAddress",
  components: {
    Field,
    CellGroup,
    Button
  },
  data() {
    return {
      errorMsgshow: {
        contactName: "",
        contactPhone: "",
        addr: "",
        doorNum: ""
      }
    };
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
    showError(key) {
      console.log(this.user[key]);
      if (!this.user[key]) {
        this.errorMsgshow[key] = errorMsg[key];
        return true;
      } else {
        this.errorMsgshow[key] = "";
        return false;
      }
    },
    save() {
      console.log(this.user);
      //this.user.userId = this.userId;
      //this.user.qrCodeId = this.qrCodeId;
      let validate = false;
      ["contactName", "contactPhone", "addr", "doorNum"].forEach(item => {
        const flag = this.showError(item);
        if (!validate && flag) {
          validate = true;
        }
      });
      console.log({ validate });
      if (!validate) {
      let lists = []
      this.addressLists.forEach(addr => {
        if (addr.id === this.user.id) {
          addr = this.user;
        } 
        lists.push(addr)
      });
        this.$router.push("listAddress");
      }
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
