const state = {
  orderNotice:false,
  commonPopup: true,
  token: sessionStorage.getItem("token") || "",
  count: 0,
  resultNum: 0,
  editAddress: {},
  userId: 1,
  qrCodeId: "10000",
  cartItems: [],
  defaultAddress: {},
  addressLists: [],
  noticeOrders:[]
};

export default state;
