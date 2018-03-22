import { fetch, post, patch, put } from "../config";

const address = {
  getAddrs(params) {
    return post("/endUser/getAddrs", params);
  },
  newAddr(params) {
    return post("/endUser/newAddr", params);
  }
};

export default address;
