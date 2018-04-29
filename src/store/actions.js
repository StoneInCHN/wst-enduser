import * as types from "./types";

const actions = {
  increment({ commit }) {
    commit("increment");
  },
  setResultNum({ commit }, payload) {
    commit("setResultNum", payload);
  },
  setEditAddress({ commit }, payload) {
    commit("setEditAddress", payload);
  },
  setCartItems({ commit }, cartItems) {
    commit(types.SHOPPING_CART_SET_ITEMS, cartItems);
  },
  setDefaultAddress({ commit }, defaultAddress) {
    commit(types.ADDRESS_SET_DEFAULT, defaultAddress);
  },
  setAddressLists({ commit }, addressLists) {
    commit(types.ADDRESS_SET_LIST, addressLists);
  },
  setToken({ commit }, token) {
    commit(types.COM_SET_TOKEN, token);
  },
  setQrCodeId({ commit }, qrCodeId) {
    commit(types.COM_SET_QRCODE_ID, qrCodeId);
  },
  setUserId({ commit }, userId) {
    commit(types.COM_SET_USER_ID, userId);
  },
  setOrderNotice({ commit }, orderNotice) {
    commit(types.COM_SET_ORDER_NOTICE, orderNotice);
  },
  setNoticeOrders({ commit }, noticeOrders) {
    commit(types.NOTICE_SET_ORDER, noticeOrders);
  },
  setCommonPopup({ commit }, commonPopup) {
    commit(types.COM_SET_COMMON_POPUP, commonPopup);
  },
  setShopInfo({ commit }, shopInfo) {
    commit(types.SHOP_SET_INFO, shopInfo);
  },
  setSuccessOrder({ commit }, successOrder) {
    commit(types.ORDER_SET_SUCCESS_ORDER, successOrder);
  },
  setHistoryOrders({ commit }, historyOrders) {
    commit(types.ORDER_SET_HISTORY_ORDER, historyOrders);
  },
  setNoticeFlag({ commit }, noticeFlag) {
    commit(types.COM_SET_NOTICE_FLAG, noticeFlag);
  }
};

export default actions;
