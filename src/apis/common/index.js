import { fetch, post, patch, put, lift } from "../config";

const common = {
  auth(params) {
    return post("/common/auth", params);
  },
  bindUser(params) {
    return post("/common/bindUser", params);
  },
  getSeriUserInfo(params) {
    return post("/shopUser/getSeriUserInfo", params);
  },
  editSeriUserInfo(params) {
    return post("/shopUser/editSeriUserInfo", params);
  }
};

export default common;
