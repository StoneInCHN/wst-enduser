import * as types from "./types";

const mutations = {
  increment(state, payload) {
    state.count++;
  },
  setResultNum(state, { resultNum }) {
    state.resultNum = resultNum;
  },
  setEditAddress(state, { editAddress }) {
    state.editAddress = editAddress;
  },
  [types.SHOPPING_CART_SET_ITEMS](state, cartItems) {
    state.cartItems = cartItems;
    console.log({cartItems})
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  },
  [types.ADDRESS_SET_DEFAULT](state, defaultAddress) {
    state.defaultAddress = defaultAddress;
    sessionStorage.setItem("defaultAddress", JSON.stringify(defaultAddress));
  },
  [types.ADDRESS_SET_LIST](state, addressLists) {
    state.addressLists = addressLists;
    sessionStorage.setItem("addressLists", JSON.stringify(addressLists));
  },
  [types.COM_SET_TOKEN](state, token) {
    state.token = token;
    sessionStorage.setItem("token", token);
  },
  [types.COM_SET_QRCODE_ID](state, qrCodeId) {
    state.qrCodeId = qrCodeId;
    sessionStorage.setItem("qrCodeId", qrCodeId);
  },
  [types.COM_SET_USER_ID](state, userId) {
    state.userId = userId;
  },
  [types.COM_SET_ORDER_NOTICE](state, orderNotice) {
    state.orderNotice = orderNotice;
  },
  [types.NOTICE_SET_ORDER](state, noticeOrders) {
    state.noticeOrders = noticeOrders;
  },
  [types.COM_SET_COMMON_POPUP](state, commonPopup) {
    state.commonPopup = commonPopup;
  },
  [types.SHOP_SET_INFO](state, shopInfo) {
    state.shopInfo = shopInfo;
    sessionStorage.setItem("shopInfo", JSON.stringify(shopInfo));
  },
  [types.ORDER_SET_SUCCESS_ORDER](state, successOrder) {
    state.successOrder = successOrder;
    sessionStorage.setItem("successOrder", JSON.stringify(successOrder));
  },
  [types.ORDER_SET_HISTORY_ORDER](state, historyOrders) {
    save(state, "historyOrders", historyOrders)
  }
};

function save(state, key, value){
  state[key] = value;
  sessionStorage.setItem(`${key}`, JSON.stringify(value));
}


export default mutations;
