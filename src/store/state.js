const state = {
  orderNotice: false,
  commonPopup: true,
  token: sessionStorage.getItem("token") || "",
  count: 0,
  resultNum: 0,
  editAddress: {},
  userId: 1,
  qrCodeId: sessionStorage.getItem("qrCodeId") || "",
  cartItems: getItem("cartItems") || [],
  //cartItems:[],
  defaultAddress: getItem("defaultAddress") || {},
  addressLists: getItem("addressLists") || [],
  noticeOrders: [],
  shopInfo: getItem("shopInfo") || {}
};

function getItem(key) {
  try {
    const value = sessionStorage.getItem(key);
    console.log({ key, value });
    return JSON.parse(value);
  } catch (e) {
    console.log(e.message);
    return null;
  }
}

export default state;
