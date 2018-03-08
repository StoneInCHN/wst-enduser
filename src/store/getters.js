const getters = {
	getCount: state => {
		return state.count 
	},
	getName: state => {
		return state.name
	},
	getResultNum: state => {
		return state.resultNum
	},
	getEditAddress: state => {
		return state.editAddress
	},
	cartItems: state =>{
		return state.cartItems
	}
}

export default getters;