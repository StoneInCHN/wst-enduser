import Mock from "mockjs";
import api from "./api";
import home from "./home";
import order from "./order"
import address from "./address"
import common from './common'

Mock.mock(/getUserInfo/, "get", api.getUserInfo);
Mock.mock(/getHpInfo/, "post", home.getHpInfo);
Mock.mock(/getWGList/, "post", home.getWGList);
Mock.mock(/getPreInfo/, "post", order.getPreInfo);
Mock.mock(/pageUserOrders/, "post", order.pageUserOrders);
Mock.mock(/getAddrs/, "post", address.getAddrs);
Mock.mock(/newAddr/, "post", address.newAddr);
Mock.mock(/cancelSO/, "post", order.cancelSO);
Mock.mock(/auth/, "post", common.auth);

export default Mock;
