import { fetch, post, patch, put, lift } from "../config";

const order = {
  getPreInfo(params) {
    return lift(post("/sorder/getPreInfo", params));
  },
  createSO(params) {
    return lift(post("/sorder/createSO", params));
  },
  cancelSO(params) {
    return post("/sorder/cancelSO", params);
  },
  pageUserOrders(params) {
    return post("/sorder/pageUserOrders", params);
  }
};

export default order;
