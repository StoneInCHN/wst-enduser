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
  setCartItems({ commit }, payload) {
    commit("setCartItems", payload);
  },
  setDefaultAddress({ commit }, payload) {
    commit("setDefaultAddress", { defaultAddress: payload });
  },
  setAddressLists({ commit }, payload) {
    commit("setAddressLists", { addressLists: payload });
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
  }
};

export default actions;
