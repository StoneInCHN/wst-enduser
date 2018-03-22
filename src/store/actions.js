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
  setQrCodeId({commit}, payload){
	commit("setQrCodeId", { qrCodeId: payload });
  },
  setUserId({commit}, payload){
	commit("setUserId", { userId: payload });
  },
  setAddressLists({commit}, payload){
	commit("setAddressLists", { addressLists: payload });
  }
};

export default actions;
