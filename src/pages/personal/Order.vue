<template>
  <div class="personal-order">
    <h4>我的订单</h4>
    <!--
    <Tabs :active="active" >
        <Tab v-for="index in 4" :key="index" :title="'选项 ' + index">
            内容 {{ index }}
        </Tab>
    </Tabs>
    -->
    <ul>
        <li class="order-item">
            <div class="date">
                <span>2018-03-20 12:23:12</span>
                <span class="status">已完成</span>
            </div> 
            <section class="item-info">
                <img src="../../assets/images/water.svg" alt="桶装水">
                <p>蓝剑矿泉水15L</p>
                <p class="price-info">
                    <span>X1</span>
                    <span class="price">12.00</span>
                </p>
            </section>
        </li>
        <li class="order-item">
            <div class="date">
                <span>2018-03-20 12:23:12</span>
                <span class="status">等待商家接单</span>
            </div> 
            <section class="item-info">
                <img src="../../assets/images/water.svg" alt="桶装水">
                <p>蓝剑矿泉水15L</p>
                <p class="price-info">
                    <span>X1</span>
                    <span class="price">12.00</span>
                </p>
            </section>
        </li>
        <li class="order-item">
            <div class="date">
                <span>2018-03-20 12:23:12</span>
                <span class="status">配送中</span>
            </div> 
            <section class="item-info">
                <img src="../../assets/images/water.svg" alt="桶装水">
                <p>蓝剑矿泉水15L</p>
                <p class="price-info">
                    <span>X1</span>
                    <span class="price">12.00</span>
                </p>
            </section>
        </li>
        <li class="order-item">
            <div class="date">
                <span>2018-03-20 12:23:12</span>
                <span class="status">已取消</span>
            </div> 
            <section class="item-info">
                <img src="../../assets/images/water.svg" alt="桶装水">
                <p>蓝剑矿泉水15L</p>
                <p class="price-info">
                    <span>X1</span>
                    <span class="price">12.00</span>
                </p>
            </section>
            <div class="item-footer">
                <Button size="small">取消</Button>
                <div class="line">|</div>
                <Button size="small">催促</Button>
            </div>
        </li>
    </ul>
  </div>
</template>
<script>
import { Tab, Tabs, Button } from "vant";
export default {
  name: "Order",
  components: {
    Tab,
    Tabs,
    Button
  },
  data() {
    return {
      active: 2
    };
  }
};
</script>
<style lang="less">
.personal-order {
  padding: 5px 0;
  h4 {
    font-size: 13px;
    color: #191919;
    padding: 10px;
  }
  .van-tabs__nav-bar {
    background-color: #00a0e9;
  }
  .van-tab--active {
    color: #00a0e9;
  }
  .order-item {
    padding: 5px 0;
    background-color: #fff;
    margin-bottom: 5px;
    box-sizing: border-box;
    .date {
      color: #7c7c7c;
      display: flex;
      padding: 0 23px;
      span {
        font-size: 12px;
      }
      span:first-child {
        flex: 1;
      }
      .status {
        text-align: right;
        width: 100px;
        color: #00a0e9;
      }
    }
    .item-info {
      position: relative;
      padding: 8px 25px 8px 83px;
      img {
        position: absolute;
        left: 25px;
        top: 8px;
        width: 45px;
        height: 45px;
        background-color: #ccc;
      }
      p {
        color: #191919;
        font-size: 15px;
      }
      .price-info {
        display: flex;
        span:first-child {
          flex: 1;
        }
        .price {
          text-align: right;
          width: 50px;
          font-size: 14px;
        }
      }
    }
    .item-footer {
      overflow: hidden;
      padding: 0 5px;
      .van-button {
        float: right;
        border: none;
        color: #46b91e;
        font-size: 14px;
      }
      .line {
        float: right;
        height: 30px;
        padding: 4px 0;
        color: #ccc;
      }
    }
  }
}
</style>
