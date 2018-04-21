import { fetch, post, patch, put, lift } from "../config";

const common = {
  auth(params) {
    return post("/common/auth", params);
  },
  bindUser(params) {
    return lift(post("/common/bindUser", params));
  }
};

export default common;
