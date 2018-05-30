<template>
  <div class="App-add-address">
    <div class="title">联系人</div>
    <CellGroup>
      <Field v-model="user.contactName" required :error-message="errorMsgshow.contactName" label="用户名 :" placeholder="请填写收货人姓名" @blur="validateCheck('contactName')"/>
      <Field v-model="user.contactPhone" required  :error-message="errorMsgshow.contactPhone" label="电话号码 :" placeholder="请填写收货人手机号码" @blur="validateCheck('contactPhone')"/>
    </CellGroup>
    <div class="title">收货地址</div>
    <CellGroup>
      <Field 
        v-model="user.addr" 
        required 
        type="textarea" 
        :error-message="errorMsgshow.addr" 
        label="小区/大厦/学校 :" 
        placeholder="例：中德英伦联邦" 
        rows="1"
        autosize
        @blur="validateCheck('addr')"
      />
      <Field 
        v-model="user.doorNum" 
        required 
        label="楼号-门牌号 :" 
        :error-message="errorMsgshow.doorNum"  
        placeholder="例：16号楼1001室" 
        rows="1"
        @blur="validateCheck('doorNum')"
        autosize
      />
    </CellGroup>
    <Button class="save" size="large" @click="save">保存</Button>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { Field, CellGroup, Button, Toast } from "vant";
import validate from "../../utils/validate";

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
    ...mapGetters(["qrCodeId", "userId"]),
    checkRules() {
      return [
        {
          el: this.user.contactName,
          alias: "contactName",
          rules: [{ rule: "isNoNull", msg: "用户名不能为空" }]
        },
        {
          el: this.user.contactPhone,
          alias: "contactPhone",
          rules: [
            { rule: "isNoNull", msg: "电话号码不能为空" },
            { rule: "isMobile", msg: "电话号码格式不正确" }
          ]
        },
        {
          el: this.user.addr,
          alias: "addr",
          rules: [
            { rule: "isNoNull", msg: "小区/大厦/学校不能为空" }
          ]
        },
        {
          el: this.user.doorNum,
          alias: "doorNum",
          rules: [
            { rule: "isNoNull", msg: "楼号-门牌号不能为空" }
          ]
        }
      ];
    }
  },
  methods: {
    validateCheck(fieldNmae) {
      const result = validate.check(
        this.checkRules.filter(item => {
          return item.alias === fieldNmae;
        })
      );
      this.errorMsgshow[fieldNmae] = result ? result : "";
    },
    save() {
      const result = validate.checkAll(this.checkRules);
      if (result) {
        result.forEach(item => {
          this.errorMsgshow[item.alias] = item.msg;
        });
      } else {
        this.user.userId = this.userId;
        this.user.qrCodeId = this.qrCodeId;
        this.user.isDefault = true;
        this.$apis.address.newAddr(this.user).then(r => {
          console.log({ r });
          if (r && r.code === "0000") {
            Toast(r.desc);
            setTimeout(() => {
              this.$router.go(-1)
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
    padding: 10px;
    color: #191919;
  }
  .save {
    background-color: #00a0e9;
    color: #fff;
    margin-top: 5px;
  }
}
</style>
