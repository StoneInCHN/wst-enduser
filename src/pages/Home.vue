<template>
	<div class="goods-warp">
		<Header/>
    <NoticeBar 
      v-show="showShopNotice" 
      :text="shopInfo.notice"
    />
		<div class="water-conent" :style="contentStyle">
			<div class="sideBar">
				<Sidebar  :active-key="activeKey">
					<SidebarItem 
            v-for="brand in brands"  
            :key="brand.id" 
            :title="brand.brandName" 
            @click="clickBrand" 
          />
				</Sidebar>
				<div class="profile">
					<Button @click="mine">我的</Button>
				</div>
			</div>
			<ul class="goods">
				<WaterItem 
          v-for="item in items" 
          :goods="item" 
          :key="item.id" 
          :dropBall="dropBall"
        />		
			</ul>
		</div>
		<ShoppingCart :cartItems="items" ref="shopCart"/>
		<OrderPopup v-if="orderNotice" ref="orderPopup"/>
    <WstPopup v-if="rebuy">
      <BuyAgain slot="content" :item="wgInfo" :close="closeBuyAgain"/>
    </WstPopup>
    <Popup
      v-model="showQRCodeBinding"
      :close-on-click-overlay="false"
      class="binding-popup"
    >
      <h4>绑定用户编号</h4>
      <Field
        v-model="userNo"
        label="用户编号"
        required
        placeholder="请输入用户编号"
        @blur="checkUserNo"
        :error-message="errorMsgshow.userNo"
      />
      <p>二维码下方就有用户编号。 <span @click="showTips">没有?</span></p>
      <Button size="large" :loading="bindLoading" @click="onConfirm">确定</Button>
    </Popup>
	</div>
</template>
<script>
import vue from "vue";
import {
  Sidebar,
  SidebarItem,
  Button,
  Popup,
  Field,
  Toast,
  NoticeBar,
  Dialog
} from "vant";
import WaterItem from "./WaterItem";
import ShoppingCart from "./ShoppingCart";
import Header from "@/components/Header";
import OrderPopup from "@/components/OrderPopup";
import WstPopup from "@/components/WstPopup";
import BuyAgain from "./BuyAgain";
import { mapActions, mapGetters } from "vuex";
import validate from "../utils/validate";

export default {
  name: "BuyWater",
  components: {
    Header,
    Sidebar,
    SidebarItem,
    Button,
    WaterItem,
    ShoppingCart,
    OrderPopup,
    Popup,
    Field,
    Toast,
    WstPopup,
    BuyAgain,
    NoticeBar,
    Dialog
  },
  mounted() {
    this.initData();
  },
  data() {
    return {
      activeKey: 0,
      rebuy: false,
      gList: [],
      wgInfo: {},
      items: [],
      itemsBuy: [],
      showQRCodeBinding: false,
      userNo: "",
      errorMsgshow: {
        userNo: ""
      },
      bindLoading: false
    };
  },
  computed: {
    ...mapGetters([
      "userId",
      "entityId",
      "qrCodeId",
      "orderNotice",
      "shopInfo",
      "noticeFlag",
      "isOpen"
    ]),
    brands() {
      let brands = [];
      if (this.gList.length > 0) {
        this.gList.forEach(item => {
          const brand = {
            id: item.brandId,
            brandName: item.brandName
          };
          brands.push(brand);
        });
      }
      return brands;
    },
    showShopNotice() {
      return this.shopInfo.notice && this.shopInfo.notice.length > 0;
    },
    contentStyle() {
      const paddingTop = this.showShopNotice ? "100px" : "64px";
      return { paddingTop };
    },
    checkRules() {
      return [
        {
          el: this.userNo,
          alias: "userNo",
          rules: [
            { rule: "isNoNull", msg: "用户编号不能为空" },
            { rule: "notSpecialChat", msg: "用户编号只能为数字或字母" }
          ]
        }
      ];
    }
  },
  methods: {
    ...mapActions([
      "setToken",
      "setUserId",
      "setEntityId",
      "setQrCodeId",
      "setOrderNotice",
      "setNoticeOrders",
      "setShopInfo",
      "setNoticeFlag",
      "setIsOpen"
    ]),
    clickBrand(key) {
      this.activeKey = key;
      this.items = this.gList[key].gInfo;
    },
    dropBall(e) {
      e = e || window.event;
      this.$refs.shopCart.drop(e.target);
    },
    mine() {
      this.$router.push("mine");
    },
    showNotice() {
      this.$refs.orderPopup.showNotice();
    },
    closeBuyAgain() {
      this.rebuy = false;
    },
    onConfirm() {
      const result = validate.checkAll(this.checkRules);
      if (result) {
        result.forEach(item => {
          this.errorMsgshow[item.alias] = item.msg;
        });
      } else {
        this.bindLoading = true;
        const userNum = this.userNo;
        this.$apis.common
          .bindUser({
            qrCodeId: this.qrCodeId,
            userNum
          })
          .then(r => {
            if (r && r.code === "0000") {
              Toast("绑定成功");
              this.bindLoading = false;
              this.showQRCodeBinding = false;
              this.initData();
            } else {
              Toast.fail(r.desc);
              this.bindLoading = false;
            }
          });
      }
    },
    checkUserNo() {
      const result = validate.check(
        this.checkRules.filter(item => {
          return item.alias === "userNo";
        })
      );
      this.errorMsgshow.userNo = result ? result : "";
    },
    initData() {
      const qrCodeId = location.hash.split("#/?id=")[1];
      if (!qrCodeId) {
        Toast("无效参数");
      }
      this.setQrCodeId(qrCodeId);
      this.$apis.common
        .auth({ qrCodeId: this.qrCodeId })
        .then(res => {
          const _CODE = "0000";
          if (res.code == "0000") {
            this.setToken(res.msg.token);
            this.setUserId(res.msg.seriUserId);
            return this.$apis.home.getHpInfo({
              qrCodeId: this.qrCodeId,
              userId: this.userId
            });
          } else if (res.code == "1000") {
            Toast.fail(res.desc);
          } else if (res.code == "1001") {
            //未绑定
            //Toast.fail(res.desc);
            this.showQRCodeBinding = true;
          }
          return Promise.reject(res);
        })
        .then(res => {
          //无成功或处理中的订单  - 无弹出页面
          const {
            bussBeginTime,
            bussEndTime,
            id,
            mobilePhoneNum,
            notice,
            shopName
          } = res;

          const shop = {
            bussBeginTime,
            bussEndTime,
            id,
            mobilePhoneNum,
            notice,
            shopName
          };
          this.setShopInfo(shop);
          this.setEntityId(id);
          if (this.noticeFlag && res.flag === 1) {
            this.setOrderNotice(true);
            this.setNoticeOrders(res.orderInfo);
            this.setNoticeFlag(false);
          } else if (this.noticeFlag && res.flag === 2) {
            this.rebuy = true;
            this.wgInfo = res.wgInfo;
            this.setNoticeFlag(false);
          }
          const qrCodeId = this.qrCodeId;
          //获取当前店铺的商品列表
          return this.$apis.home.getWGList({
            entityId: this.entityId,
            qrCodeId
          });
        })
        .then(res => {
          if (res.code === "0000") {
            this.setIsOpen(true);
          } else if (res.code === "1000") {
            this.setIsOpen(false);
            Dialog.alert({
              message: res.desc
            }).then(() => {
              // on close
            });
          }
          this.gList = res.msg.gList;
          this.items = this.gList[0].gInfo;
        })
        .catch(e => {
          console.log(e);
        });
    },
    showTips() {
      Dialog.alert({
        message:
          "未找到用户编号, 可以拨打二维码上方的送水电话, 联系水站查询你的编号。"
      }).then(() => {
        // on close
      });
    }
  }
};
</script>
<style lang="less">
.goods-warp {
  height: 100%;
  position: relative;
  .van-notice-bar {
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .water-conent {
    position: relative;
    padding-top: 64px;
    padding-bottom: 50px;
    height: 100%;
    box-sizing: border-box;
    background-color: #fff;
    display: flex;
    .sideBar {
      width: 102px;
      background-color: #f3f3f3;
      padding-bottom: 60px;
      .van-badge-group {
        overflow-x: hidden;
        overflow-y: auto;
        height: 100%;
        .van-badge {
          padding: 13px 0 10px 9px;
        }
        .van-badge--select {
          border-color: #00a0e9;
        }
        .van-badge--select::after {
          border-right: none;
        }
      }
    }
    .goods {
      position: relative;
      padding: 10px 0 0 10px;
      width: 100%;
      box-sizing: border-box;
      overflow-y: auto;
    }
  }
  .profile {
    position: absolute;
    bottom: 60px;
    left: 10px;
    .van-button {
      background-color: #00a0e9;
      border: none;
      background: -webkit-gradient(
        linear,
        0 0,
        0 100%,
        from(#00a0e9),
        to(#00d6e9)
      );
      background: linear-gradient(top center, #00a0e9, #00d6e9);
    }
  }
  .binding-popup {
    width: 80vw;
    padding: 1rem;
    box-sizing: border-box;
    h4 {
      text-align: center;
      padding: 0.5rem 0;
    }
    .van-field{
      font-size: 18px;
    }
    .van-button--default {
      margin-top: 0.5rem;
      background-color: #00a0e9;
      color: #fff;
    }
    p {
      padding: 10px 5px;
      font-size: 14px;
      color: darkorange;
      span {
        color: green;
      }
    }
  }
}
</style>


