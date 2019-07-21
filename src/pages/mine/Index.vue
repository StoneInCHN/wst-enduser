<template>
  <div class="my-profile">
    <Header/>
    <CellGroup>
        <Cell title="我的编号" label="查看编号信息" is-link @click="showSerialNumber"/>
        <Cell title="我的订单" label="查看订单信息" is-link @click="showOrder"/>
        <Cell title="我的地址"  label="收货地址管理" is-link @click="showAddr"/>
    </CellGroup>
  </div>
</template>
<script>
import Header from "@/components/Header";
import { Cell, CellGroup } from "vant";
export default {
  name: "Index",
  components: {
    Header,
    Cell,
    CellGroup
  },
  methods: {
    showOrder() {
      this.$router.push("/personalOrder");
    },
    showAddr(){
      this.$router.push("/listAddress");
    },
    showSerialNumber(){
      this.$router.push("/mySerialNumber");
    }
  }
};
</script>
<style>
.my-profile {
  height: 100%;
  padding-top: 66px;
  box-sizing: border-box;
}
</style>

