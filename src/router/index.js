import Vue from "vue";
import Router from "vue-router";

const Home = () => import("@/pages/Home");
const Order = () => import("@/pages/Order");
const ListAddress = () => import("@/pages/address/ListAddress");
const AddAddress = () => import("@/pages/address/AddAddress");
const EditAddress = () => import("@/pages/address/editAddress");
const OrderSuccess = () => import("@/pages/OrderSuccess");
const WaterTickets = () => import("@/pages/WaterTickets");
const PersonalOrder = () => import("@/pages/mine/Order");
const Mine = () => import("@/pages/mine");
const MySerialNumber = () => import("@/pages/MySerialNumber");

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/order",
      name: "Order",
      component: Order
    },
    {
      path: "/listAddress",
      name: "ListAddress",
      component: ListAddress
    },
    {
      path: "/addAddress",
      name: "AddAddress",
      component: AddAddress
    },
    {
      path: "/editAddress",
      name: "EditAddress",
      component: EditAddress
    },
    {
      path: "/orderSuccess",
      name: "OrderSuccess",
      component: OrderSuccess
    },
    {
      path: "/waterTickets",
      name: "WaterTickets",
      component: WaterTickets
    },
    {
      path: "/personalOrder",
      name: "PersonalOrder",
      component: PersonalOrder
    },
    {
      path: "/mine",
      name: "mine",
      component: Mine
    },
    {
      path: "/mySerialNumber",
      name: "mySerialNumber",
      component: MySerialNumber
    }
  ]
});
