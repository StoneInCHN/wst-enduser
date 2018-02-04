const mutations = {
	increment(state, payload){
		state.count++
	},
	setResultNum(state, {resultNum}){
		state.resultNum = resultNum
	},
	setEditAddress(state, {editAddress}){
		state.editAddress = editAddress
	}
}

export default mutations;