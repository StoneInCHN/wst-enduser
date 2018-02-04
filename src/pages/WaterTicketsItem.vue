<template>
   <div class="water-ticket-item">
          <img src="../assset/images/water.svg" alt="桶装水">
          <p class="water-ticket-item-title">{{item.title}}</p>
          <span>{{item.count}}张</span>
          <p class="water-ticket-item-desc">当前可用订单0张</p>
      </div>
</template>
<script>
export default {
  name: "WaterTicketsItem",
   props: {
      item: {
          requires: true,
          type: Object
      }
  }
}
</script>
<style>
.water-ticket-item{
    position: relative;
    text-align: center;
    border-bottom: 1px solid #b1b1b1;
}
.water-ticket-item img{
    position: absolute;
    left: 0;
    top:0;
    bottom:0;
    display: inline-block;
    width: 50px;
}
.water-ticket-item p{
    height: 50px;
    line-height: 50px;
}
.water-ticket-item-title{
    padding: 5px 50px;
}
.water-ticket-item span{
    position: absolute;
    top: 20px;
    right:20px;
    bottom:0;
}
.water-ticket-item p.water-ticket-item-desc{
    text-align: right;
    padding-right: 30px;
    line-height: 30px;
    height: 30px;
    font-size: 12px;
}
</style>

