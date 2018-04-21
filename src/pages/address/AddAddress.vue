<template>
  <div class="App-add-address">
    <div class="title">联系人</div>
    <CellGroup>
      <Field v-model="user.contactName" required :error-message="errorMsgshow.contactName" label="用户名" placeholder="请填写收货人姓名" />
      <Field v-model="user.contactPhone" required  :error-message="errorMsgshow.contactPhone" label="电话号码" placeholder="请填写收货人电话号码" />
    </CellGroup>
    <div class="title">收货地址</div>
    <CellGroup>
      <Field 
        v-model="user.addr" 
        required 
        type="textarea" 
        :error-message="errorMsgshow.addr" 
        label="小区/大厦/学校" 
        placeholder="例：中德英伦联邦" 
        rows="1"
        autosize
      />
      <Field v-model="user.doorNum" required label="楼号-门牌号" :error-message="errorMsgshow.doorNum"  placeholder="例：16号楼1001室" rows="1"
        autosize/>
    </CellGroup>
    <Button class="save" size="large" @click="save">保存并设置默认地址</Button>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Field, CellGroup, Button, Toast } from "vant";

const errorMsg = {
  contactName: "用户名不能为空",
  contactPhone: "联系电话不能为空",
  addr: "小区/大厦/学校不能为空",
  doorNum: "楼号-门牌号不能为空"
};

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
      },
      errorMsgshow: {
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
      this.user.userId = this.userId;
      this.user.qrCodeId = this.qrCodeId;
      console.log(this.user);
      let validate = false;
      ["contactName", "contactPhone", "addr", "doorNum"].forEach(item => {
        const flag = this.showError(item);
        console.log({ flag });
        if (!validate && flag) {
          validate = true;
        }
      });

      console.log({ validate });
      if (!validate) {
        this.$apis.address.newAddr(this.user).then(r => {
          console.log({ r });
          if (r && r.code === "0000") {
            Toast(r.desc);
            setTimeout(() => {
              this.$router.push("listAddress");
            }, 500);
          } else {
            Toast.fail(r.desc);
          }
        });
      }
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
