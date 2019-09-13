<template>
    <div class="my-serial-number">
      <NavBar title="我的编号" :left-text="leftText" :right-text="rightText" @click-right="clickRight" @click-left="clickLeft" />
      <Field disabled v-model="serialNo" label="用户编号:" placeholder="请输入用户名" />
      <Field class="no-border" :disabled="disabled"  v-model="cellPhoneNum" label="编号成员:" placeholder="请输入用户名" type="textarea"  
       autosize :error-message="errorMessage"/>
      <p class="tips"><span class="color-red">*</span>添加家庭成员电话，成员订水免报/免填地址, 最多只能绑定3个号码</p>
    </div>
</template>


<script>
import { Field, Toast, NavBar } from "vant";
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MySerialNumber",
  components: {
    Field,
    NavBar
  },
  data() {
    return {
      serialNo: "",
      cellPhoneNum:"",
      isEdit: false,
      leftText: "",
      rightText: "编辑编号",
      errorMessage: ""
    };
  },
  mounted() {
    const params = {
      userId: this.userId,
      qrCodeId: this.qrCodeId
    };
    this.$apis.common.getSeriUserInfo(params).then(r => {
      if ("0000" === r.code) {
        if (r.msg) {
          this.serialNo = r.msg.serialNo;
          let phoneStr = r.msg.contactPhone
          if(r.msg.contactPhone2){
            phoneStr = phoneStr + `,${r.msg.contactPhone2}`
          }
          if(r.msg.contactPhone3){
            phoneStr = phoneStr + `,${r.msg.contactPhone3}`
          }
          this.cellPhoneNum = phoneStr
        }
      } else {
        Toast.fail(r.msg);
      }
    });
  },
  computed: {
    ...mapGetters(["qrCodeId", "userId"]),
    disabled() {
      return !this.isEdit;
    }
  },
  methods: {
    clickRight() {
      //编辑状态下 点击触发保存功能
      if (this.isEdit) {
        //保存
        const success = this.save();
        //保存成功修改文案
        if (success) {
          this.leftText = "";
          this.rightText = "编辑编号";
          this.isEdit = false;
        } else {
          console.log("保存失败");
        }
      } else {
        //进入编辑模式
        this.leftText = "取消";
        this.rightText = "保存";
        this.isEdit = true;
      }
    },
    clickLeft() {
      if (this.isEdit) {
        this.leftText = "";
        this.rightText = "编辑编号";
        this.isEdit = false;
        this.errorMessage = null;
      }
    },
    save() {
      const mobileRegExp = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))((,|，)((0\d{2,3}-\d{7,8})|(1[3584]\d{9})))*$/;
      if (mobileRegExp.test(this.cellPhoneNum)) {
        const params = {
          userId: this.userId,
          qrCodeId: this.qrCodeId,
          cellPhoneNum: this.cellPhoneNum
        };
        this.$apis.common.editSeriUserInfo(params).then(r => {
          if ("0000" === r.code) {
            Toast("修改成功");
            this.leftText = "";
            this.rightText = "编辑编号";
            this.isEdit = false;
            return true;
          } else {
            Toast(r.desc);
            return false;
          }
        });
        this.errorMessage = null;
      } else {
        this.errorMessage =
          "编号成员格式不正确, 只能填写手机号或座机号，多个号码间用逗号隔开";
        return false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.my-serial-number {
  background: #fff;
  padding-bottom: 30px;
  .tips {
    padding-left: 20px;
    font-size: 12px;
  }
  .no-border.van-cell:not(:last-child)::after {
    border: none;
  }
  .color-red {
    color: red;
    margin-right: 5px;
  }
}
</style>
<style lang="less">
.my-serial-number{
  .van-cell__value{
    color: #000;
  }
  .van-field__control:disabled{
    color: #000;
  }
}
</style>


