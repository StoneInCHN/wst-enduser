import { fetch, post, patch, put } from "../config";

const common = {
  auth(params) {
    return post("/common/auth", params);
  }
};

export default common;
