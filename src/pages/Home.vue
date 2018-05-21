<template>
	<div class="goods-warp">
		<Header/>
    <NoticeBar 
      v-show="showShopNotice" 
      :text="shopInfo.notice"
    />
		<div class="water-conent" :style="contentStyle">
			<div class="sideBar">
				<BadgeGroup  :active-key="activeKey">
					<Badge 
            v-for="brand in brands"  
            :key="brand.id" 
            :title="brand.brandName" 
            @click="clickBrand" 
          />
				</BadgeGroup>
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
    <Dialog 
      v-if="showQRCodeBinding" 
      show-cancel-button
      :before-close="beforeClose"
      >
      <Field
        v-model="qrCodeId"
        label="用户编号"
        placeholder="请输入用户编号"
      />
    </Dialog>
	</div>
</template>
<script>
import vue from "vue";
import {
  BadgeGroup,
  Badge,
  Button,
  Dialog,
  Field,
  Toast,
  NoticeBar
} from "vant";
import WaterItem from "./WaterItem";
import ShoppingCart from "./ShoppingCart";
import Header from "@/components/Header";
import OrderPopup from "@/components/OrderPopup";
import WstPopup from "@/components/WstPopup";
import BuyAgain from "./BuyAgain";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BuyWater",
  components: {
    Header,
    Badge,
    BadgeGroup,
    Button,
    WaterItem,
    ShoppingCart,
    OrderPopup,
    Dialog,
    Field,
    Toast,
    WstPopup,
    BuyAgain,
    NoticeBar
  },
  mounted() {
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
          //this.showQRCodeBinding = true

          return this.$apis.home.getHpInfo({
            qrCodeId: this.qrCodeId,
            userId: this.userId
          });
        } else if (res.code == "1000") {
          Toast.fail(res.desc);
        } else if (res.code == "1001") {
          //未绑定
          Toast.fail(res.desc);
        }
        return Promise.reject(res);
      })
      .then(res => {
        //无成功或处理中的订单  - 无弹出页面
        console.log("11111");
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
        this.gList = res.msg.gList;
        this.items = this.gList[0].gInfo;
      })
      .catch(e => {
        console.log(e);
      });
  },
  data() {
    return {
      activeKey: 0,
      rebuy: false,
      gList: [],
      wgInfo: {},
      items: [],
      itemsBuy: [],
      showQRCodeBinding: false
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
      "shopInfo"
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
      const style = { paddingTop };
      console.log({ style });
      return style;
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
      "setNoticeFlag"
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
    onConfirm() {
      console.log("绑定二维码");
    },
    closeBuyAgain() {
      this.rebuy = false;
    },
    beforeClose(action, done) {
      console.log({ action, done });
      if (action === "confirm") {
        setTimeout(done, 1000);
      } else {
        done();
      }
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
}
</style>


