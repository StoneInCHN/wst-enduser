<template>
     <section class="item-info" >
            <div class="item-img" :style="imgStyle"/>
            <p>{{item.gName}}</p>
            <p class="price-info">
                <span>X{{item.count}}</span>
                <span class="price">{{item.count * item.amount | formatPrice}}</span>
            </p>
        </section>
</template>

<script>
import { formatDate, toDecimal2, urlPre } from "../../utils";
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgStyle() {
      let style = {};
      if (this.item.gPic) {
        const url = urlPre(this.item.gPic);
        style = {
          backgroundImage: `url(${url})`
        };
      }
      return style;
    }
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    },
    formatPrice(val) {
      return toDecimal2(val);
    }
  }
};
</script>

<style>
</style>
