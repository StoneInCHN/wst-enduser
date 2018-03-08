import  imgUrl from '../../assets/images/water.svg'

const hpInfo = {
  code: "0000",
  desc: "操作成功",
  msg: {
    orderInfo: [
      {
        item: [
          {
            gName: "蓝剑怡宝(15L)",
            amount: 22,
            count: 1
          },
          {
            gName: "冰川时代(10L）",
            amount: 40,
            count: 2
          }
        ],
        oStatus: "PENDING",
        id: 1,
        addrDetail: "金南园1202",
        createDate: 1517208229000
      }
    ],
    bussBeginTime: "09:00", //营业开始时间
    shopName: "红魔曼联",
    id: 1, //店铺ID
    bussEndTime: "18:00", //营业结束时间
    mobilePhoneNum: "15863254259",
    wgInfo: {
      //上次成功购水信息
      gName: "喃减aaaaa",
      gId: 1,
      gCount: 1,
      gPic: "url"
    },
    flag: 2, //判断用户是否有过购买行为
    notice: "涨价了" //店铺公告
  }
};

const getWGList = {
  code: "0000",
  desc: "操作成功",
  msg: {
    gList: [
      {
        brandName: "蓝剑",
        brandId: "1",
        gInfo: [
          {
            gSpec: "10L",
            wtPurAmount: 200, //水票单位数量金额
            distPrice: 15, //水优惠价,即实际售价
            picUrl: imgUrl,
            gName: "冰川时代",
            wtPurCount: 10, //购买水票单位数量
            brandId: 1,
            id: 1,
            originPrice: 10, //水原价
            wtGiftCount: 1 //购买水票后赠送数量
          },
          {
            gSpec: "15L",
            wtPurAmount: 320, //水票单位数量金额
            distPrice: 15, //水优惠价,即实际售价
            picUrl: imgUrl,
            gName: "冰川时代",
            wtPurCount: 10, //购买水票单位数量
            brandId: 1,
            id: 2,
            originPrice: 13, //水原价
            wtGiftCount: 1 //购买水票后赠送数量
          },
          {
            gSpec: "20L",
            wtPurAmount: 400, //水票单位数量金额
            distPrice: 15, //水优惠价,即实际售价
            picUrl: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=357772990,2120764766&fm=27&gp=0.jpg",
            gName: "冰川时代",
            wtPurCount: 10, //购买水票单位数量
            brandId: 1,
            id: 3,
            originPrice: 15, //水原价
            wtGiftCount: 1 //购买水票后赠送数量
          }
        ]
      },
      {
        brandName: "乐百氏",
        brandId: "2",
        gInfo: [
          {
            gSpec: "10L",
            wtPurAmount: 500,
            distPrice: 10,
            picUrl: "http://www.robust-gd.com/Public/images/2.png",
            gName: "乐百氏",
            wtPurCount: 30,
            brandId: 2,
            id: 10,
            originPrice: 10,
            wtGiftCount: 10
          }
        ]
      }
    ]
  }
};

export default {
  getHpInfo: config => {
    return hpInfo;
  },
  getWGList: config => {
    return getWGList;
  }
};
