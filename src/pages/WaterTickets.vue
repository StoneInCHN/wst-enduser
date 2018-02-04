<template>
  <div class="water-ticket">
      <h4>我的水票(2)</h4>
      <water-tickets-item v-for="(item, index) in items" :item="item" :key="index"/>
  </div>
</template>
<script>
import WaterTicketsItem from './WaterTicketsItem'
export default {
  name: "WaterTickets",
  components:{
      WaterTicketsItem
  },
  data () {
      return {
          items:[{
              id: 1,
              title: "蓝剑矿泉水15L",
              count: 1
          },{
              id: 2,
              title: "蓝剑矿泉水25L",
              count: 3
          }]
      }
  }
}
</script>
<style>
.water-ticket{
    padding: 40px 10px;
}
.water-ticket h4{
    text-align: center;
    padding-bottom: 30px;
}
</style>


