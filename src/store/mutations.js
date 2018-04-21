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
  setCartItems(state, { cartItems }) {
    state.cartItems = cartItems;
  },
  setDefaultAddress(state, { defaultAddress }) {
    state.defaultAddress = defaultAddress;
  },
  setAddressLists(state, { addressLists }) {
    state.addressLists = addressLists;
  },
  [types.COM_SET_TOKEN](state, token) {
    state.token = token;
    sessionStorage.setItem("token",token)
  },
  [types.COM_SET_QRCODE_ID](state, qrCodeId) {
    state.qrCodeId = qrCodeId;
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
};

export default mutations;
