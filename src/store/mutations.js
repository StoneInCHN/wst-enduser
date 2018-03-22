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
  setQrCodeId(state, { qrCodeId }) {
    state.qrCodeId = qrCodeId;
  },
  setUserId(state, { userId }) {
    state.userId = userId;
  },
  setAddressLists(state, { addressLists }) {
    state.addressLists = addressLists;
  }
};

export default mutations;
