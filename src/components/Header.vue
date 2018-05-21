<template>
	<div class="header">
		<Button  :disabled="isCall" class="header-phone" @click="call">
			<Icon name="phone"/>
		</Button>
		<p>{{ shopInfo.shopName || ""}}</p>
		<p>{{`营业时间 ${shopInfo.bussBeginTime || ""} -- ${shopInfo.bussEndTime || ""}`}}</p>  
	</div>
</template>
<script>
import { Button, Icon, Toast } from "vant";
import { bg } from "@/assets/images";
import { mapGetters } from "vuex"
export default {
  name: "Header",
  components: {
    Button,
    Icon
  },
  data() {
    return {
      notification: "店家公告",
      businessTime: "9:00 -- 18:30"
    };
  },
  computed: {
    ...mapGetters(["shopInfo"]),
    isCall() {
      return false;
    }
  },
  methods: {
    call() {
      Toast("店家已经休息了");
    }
  }
};
</script>
<style>
.header {
  padding: 10px;
  background: #e5e5e5 url("../assets/images/banner.svg");
  background-size: cover;
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 2;
  height: 64px;
  box-sizing: border-box;
}
.header-phone {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #00a0e9;
  border: none;
  background: -webkit-gradient(linear, 0 0, 0 100%, from(#00a0e9), to(#00d6e9));
  background: -moz-linear-gradient(#00a0e9, #00d6e9);
  background: -o-linear-gradient(#00a0e9, #00d6e9);
  background: linear-gradient(top center, #00a0e9, #00d6e9);
  filter: alpha(
      opacity=100 finishopacity=50 style=1 startx=0,
      starty=0,
      finishx=0,
      finishy=130
    )
    progid:DXImageTransform.Microsoft.gradient(
      startcolorstr="#00A0E9",
      endcolorstr="#00D6E9",
      gradientType=0
    );
  -ms-filter: alpha(
      opacity=100 finishopacity=50 style=1 startx=0,
      starty=0,
      finishx=0,
      finishy=130
    )
    progid:DXImageTransform.Microsoft.gradient(
      startcolorstr="#00A0E9",
      endcolorstr="#00D6E9",
      gradientType=0
    );
}
.header p {
  text-align: center;
  color: #171717;
}
.header .van-button--default {
  color: #fff;
  line-height: 34px;
  height: 34px;
  padding: 0 10px;
}
</style>