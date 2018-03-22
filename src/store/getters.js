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
	addressLists: state =>{
		return state.addressLists
	},
	cartItems: state =>{
		return state.cartItems
	},
	defaultAddress: state =>{
		return state.defaultAddress
	},
	qrCodeId: state =>{
		return state.qrCodeId
	},
	userId: state=>{
		return state.userId
	}
}

export default getters;