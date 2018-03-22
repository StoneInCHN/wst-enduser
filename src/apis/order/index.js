import { fetch, post, patch, put } from "../config";

const order = {
  getPreInfo(params) {
    return post("/sorder/getPreInfo", params);
  },
  createSO(params) {
    return post("/sorder/createSO", params);
  },
  cancelSO(params) {
    return post("/sorder/cancelSO", params);
  },
  pageUserOrders(params) {
    return post("/sorder/pageUserOrders", params);
  }
};

export default order;
