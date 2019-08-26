<template>
  <div class="App-edit-address">
    <div class="title">联系人</div>
    <CellGroup>
      <Field v-model="user.contactName" required :error-message="errorMsgshow.contactName" label="用户名 :" placeholder="请填写收货人姓名" @blur="validateCheck('contactName')"/>
      <Field v-model="user.contactPhone" required  :error-message="errorMsgshow.contactPhone" label="手机号 :" placeholder="请填写收货手机号码" @blur="validateCheck('contactPhone')"/>
    </CellGroup>
    <div class="title">收货地址</div>
    <CellGroup>
      <Field v-model="user.addr" required type="textarea" :error-message="errorMsgshow.addr"  label="小区/大厦/学校 :" placeholder="例：中德英伦联邦" rows="1" @blur="validateCheck('addr')"
        autosize/>
      <Field v-model="user.doorNum" required label="楼号-门牌号 :" :error-message="errorMsgshow.doorNum" placeholder="例：16号楼1001室" @blur="validateCheck('doorNum')"/>
    </CellGroup>
    <CellGroup>
      <SwitchCell v-model="user.isDefault" title="是否设置为默认地址"/>
    </CellGroup>
    <Button class="save" size="large" @click="save">保存</Button>
    <Button class="delete" size="large" @click="onDelete">删除</Button>
  </div>
</template>
<script>
import { Field, CellGroup, Button, Toast, Dialog , SwitchCell} from "vant";
import { mapGetters, mapActions } from "vuex";
import validate from "../../utils/validate";

export default {
  name: "editAddress",
  components: {
    Field,
    CellGroup,
    Button,
    Toast,
    Dialog,
    SwitchCell
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
    },
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
    ...mapActions(["setAddressLists"]),
    onDelete() {
      Dialog.confirm({
        title: "删除地址",
        message: "确认要删除当前地址吗?"
      })
        .then(() => {
          // on confirm
          const params ={
            qrCodeId: this.qrCodeId,
            userId: this.userId,
            entityId: this.user.id,
          }
          this.$apis.address.delAddr(params).then(r=>{
              if (r && r.code === "0000") {
                Toast(r.desc);
                setTimeout(() => {
                  let lists = [];
                  this.addressLists.forEach(addr => {
                    if (addr.id !== this.user.id) {
                      lists.push(addr);
                    }
                  });
                  this.setAddressLists(lists);
                  this.$router.go(-1);
                }, 500);
              }else{
                Toast.fail(r.desc);
              }
          })
        })
        .catch(() => {
          // on cancel
        });
    },
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
        const { id, contactName, contactPhone, addr, doorNum, isDefault } = this.user;

        const params = {
          qrCodeId: this.qrCodeId,
          userId: this.userId,
          entityId: id,
          contactName,
          contactPhone,
          addr,
          doorNum,
          isDefault
        };
        this.$apis.address.newAddr(params).then(r => {
          if (r && r.code === "0000") {
            Toast(r.desc);
            setTimeout(() => {
              let lists = [];
              this.addressLists.forEach(addr => {
                if (addr.id === this.user.id) {
                  addr = this.user;
                }
                lists.push(addr);
              });
              this.setAddressLists(lists);
              this.$router.go(-1);
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
.App-edit-address {
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
  .delete {
    margin-top: 10px;
  }
}
</style>
