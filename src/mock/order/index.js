const preInfo = {
  code: "0000",
  desc: "操作成功",
  msg: {
    addrInfo: {
      //为null表示未添加地址
      doorNum: "1111",
      contactName: "五先森",
      id: 2,
      contactPhone: "56464456454",
      addr: "金南园"
    },
    gDist: {
      "1": 12, //商品ID: 优惠价
      "2": 15
    },
    payType: [
      "COB" //货到付款
    ]
  }
};

const createSO = {
  code: "0000",
  desc: "操作成功",
  msg: {
    payType: "WATER_TICKET", //返回的支付方式(水票-WATER_TICKET;货到付款-COB;水票部分抵扣混合-TICKET_COB)
    cobAmount: 0, //仍需货到付款金额(支付方式返回混合支付TICKET_COB时显示)
    id: 20,
    sn: "408995783115800576" //订单号
  }
};

const pageUserOrders = {
  code: "0000",
  desc: "操作成功",
  msg: [
    {
      amount: 35, //订单总金额
      distAmount: null, //优惠金额(为null不显示)
      oStatus: "PENDING", //订单状态
      id: 20,
      orderItems: [
        {
          gName: "蓝剑10L",
          count: 2,
          amount: 20
        }
      ],
      createDate: 1517553794000 //下单时间
    },
    {
      amount: 30,
      distAmount: null,
      oStatus: "PROCESSING",
      id: 13,
      orderItems: [
        {
          gName: "冰川时代15L",
          count: 2,
          amount: 30
        }
      ],
      createDate: 1517552828000
    },
    {
      amount: 35,
      distAmount: null,
      oStatus: "COMPLETE",
      id: 6,
      orderItems: [
        {
          gName: "冰川时代15L",
          count: 1,
          amount: 15
        }
      ],
      createDate: 1517542880000
    },
    {
      amount: 35,
      distAmount: null,
      oStatus: "CANCEL",
      id: 7,
      orderItems: [
        {
          gName: "冰川时代25L",
          count: 1,
          amount: 15
        }
      ],
      createDate: 1517542880000
    }
  ]
};

const cancelSO = {
  code: "0000",
  desc: "操作成功",
  msg: null
};

export default {
  getPreInfo: config => {
    return preInfo;
  },
  createSO: config => {
    return createSO;
  },
  cancelSO: config => {
    return cancelSO;
  },
  pageUserOrders: config => {
    return pageUserOrders;
  }
};
