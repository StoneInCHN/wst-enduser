const getAddrs = {
  code: "0000",
  desc: "操作成功",
  msg: {
    addrInfo: [
      {
        doorNum: "1202",
        isDefault: false,
        contactName: "李先森",
        id: 1,
        contactPhone: "12345678901",
        addr: "金南园"
      },
      {
        doorNum: "1111",
        isDefault: true,
        contactName: "五先森",
        id: 2,
        contactPhone: "56464456454",
        addr: "金南园"
      }
    ]
  }
};

const newAddr = {
  code: "0000",
  desc: "操作成功",
  msg: null
};

export default {
  getAddrs: config => {
    return getAddrs;
  },
  newAddr: config => {
    return newAddr;
  }
};
