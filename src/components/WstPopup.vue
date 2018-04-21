<template>
    <Popup v-model="show" class="wst-popup">
		<div class="popup-header">
			<Icon name="close" @click="close"/>
      <div class="close-line"/>
      <slot name="title"/>
		</div>
		<div class="popup-content">
      <slot name="content"></slot>
    </div>
	</Popup>
</template>
<script>
import { Icon, Popup } from "vant";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "OrderPopup",
  components: {
    Popup,
    Icon
  },
  data() {
    return {
      show: false
    };
  },
  created() {
    this.show = this.commonPopup;
  },
  computed: {
    ...mapGetters(["commonPopup"])
  },
  methods: {
    ...mapActions(["setCommonPopup"]),
    showNotice() {
      this.show = true;
      this.setOrderNotice(true);
    },
    close() {
      this.show = false;
      this.setCommonPopup(false);
    }
  }
};
</script>
<style lang="less">
.wst-popup {
  position: fixed;
  width: 80vw;
  max-height: 80vh;
  border-radius: 5px;
  .popup-header {
    text-align: center;
    .van-icon-close {
      position: absolute;
      right: 10px;
      top: -41px;
      color: #fff;
      font-size: 23px;
    }
    .close-line {
      position: absolute;
      height: 18px;
      border-left: 1px solid #fff;
      top: -18px;
      right: 20px;
    }
  }
  .popup-content {
    max-height: calc(~"80vh - 61px");
    overflow: auto;
  }
}
</style>
