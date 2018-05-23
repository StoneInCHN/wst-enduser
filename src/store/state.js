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
  isOpen: getBooleanItem("noticeFlag"), //是否是营业中
  token: sessionStorage.getItem("token") || "",
  count: 0,
  resultNum: 0,
  editAddress: {},
  userId: sessionStorage.getItem("userId"),
  entityId: sessionStorage.getItem("entityId"),
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
