const getters = {
  token: state => state.token,
  key: state => state.key,
  userId: state => state.userId,
  entityId: state => state.entityId,
  noticeFlag: state => state.noticeFlag,
  count: state => state.count,
  name: state => state.name,
  resultNum: state => state.resultNum,
  editAddress: state => state.editAddress,
  addressLists: state => state.addressLists,
  cartItems: state => state.cartItems,
  defaultAddress: state => state.defaultAddress,
  qrCodeId: state => state.qrCodeId,
  orderNotice: state => state.orderNotice,
  noticeOrders: state => state.noticeOrders,
  commonPopup: state => state.commonPopup,
  shopInfo: state => state.shopInfo,
  successOrder: state => state.successOrder,
  historyOrders: state=> state.historyOrders
};

export default getters;
