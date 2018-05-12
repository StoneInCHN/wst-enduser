const getBooleanItem = key => {
  const value = sessionStorage.getItem(key) || true;
  return value && value !== "false";
};

const getItem = key => {
  try {
    const value = sessionStorage.getItem(key);
    return JSON.parse(value);
  } catch (e) {
    return null;
  }
};

const state = {
  noticeFlag: getBooleanItem("noticeFlag"),
  orderNotice: false,
  commonPopup: true,
  token: sessionStorage.getItem("token") || "",
  count: 0,
  resultNum: 0,
  editAddress: {},
  userId: 0,
  qrCodeId: sessionStorage.getItem("qrCodeId") || "",
  cartItems: getItem("cartItems") || [],
  //cartItems:[],
  defaultAddress: getItem("defaultAddress") || {},
  addressLists: getItem("addressLists") || [],
  noticeOrders: [],
  shopInfo: getItem("shopInfo") || {},
  successOrder: getItem("successOrder") || {},
  historyOrders: getItem("historyOrders") || []
};

export default state;
