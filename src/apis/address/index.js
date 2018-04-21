import { fetch, post, patch, put, lift } from "../config";

const address = {
  getAddrs(params) {
    return lift(post("/endUser/getAddrs", params));
  },
  newAddr(params) {
    return post("/endUser/newAddr", params);
  }
};

export default address;
