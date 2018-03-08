import Mock from "mockjs";
import api from "./api";
import home from "./home";

Mock.mock(/getUserInfo/, "get", api.getUserInfo);
Mock.mock(/getHpInfo/, "post", home.getHpInfo);
Mock.mock(/getWGList/, "post", home.getWGList);

export default Mock;
