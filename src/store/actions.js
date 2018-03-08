const actions = {
	increment({commit}){
		commit("increment")
	},
	setResultNum({commit}, payload){
		commit("setResultNum", payload)
	},
	setEditAddress({commit}, payload){
		commit("setEditAddress", payload)
	},
	setCartItems({commit}, payload){
		commit("setCartItems", payload)
	}
}

export default actions;