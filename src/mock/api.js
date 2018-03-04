const jsapiConfig = {
  'code': '0000',
  'desc': null,
  'token': null,
  'msg': {
    'jsapi_ticket': 'HoagFKDcsGMVCIY2vOjf9rjPzPK2e0iS8xnzfwrN32K6yoY6eTLYQ1ortIxir9oylnkJuIuqH_-Wrsv0KIC0dQ',
    'signature': 'c645651095476acdb4dea8718e6d6542053abd26',
    'url': 'http://test.ybjcq.com/shelfH5/index.html?1s11d2',
    'nonceStr': '40d8d9b6-64cf-4fdf-af91-74810646dd68',
    'timestamp': '1506756190'
  }
}

const paywx = {
  'code': '0000',
  'desc': null,
  'token': null,
  'msg': {
    'timeStamp': '1506599870',
    'out_trade_no': '2017092811817',
    'package': 'prepay_id=wx20170928195750df4b35a6a30133945258',
    'paySign': 'EB8698E9CFCCB6C70A51B1EEB468A8CF',
    'appId': 'wx3598eb401cb80f00',
    'signType': 'MD5',
    'nonceStr': 'CF3A196E85604CD5999A6C2F6623E491'
  }
}
/**
const payzfb = {
  'code': '0000',
  'desc': null,
  'token': null,
  'msg': {
    'a_page': '<form name=\"punchout_form\" method=\"post\" action=\"https://openapi.alipay.com/gateway.do?charset=UTF-8&method=alipay.trade.wap.pay&sign=LuLZajTZlVQ3%2FUH3Hsvu2B9%2FuEk64YfRuL%2BF9fEJ7cvmIZ0K6Pwnk6qWONDW6IAnaRBKpPrqUd7xa5dG%2F7Vd1lGGcBS2zDSdl0FU8G3XuhC7%2Fe1jLyEkzhAOF5mAifaONWKUM%2BBmBwE0TgpaiBxwbmofcP1T%2FHBIbU3Eyiw0STY%3D&return_url=http%3A%2F%2Ftest.ybjcq.com%2Fh5%2Fshelf%2Findex.html&notify_url=http%3A%2F%2Ftest.ybjcq.com%2Fh5%2Fshelf%2Fpay%2Fnotify_alipay&version=1.0&app_id=2017061707509713&sign_type=RSA&timestamp=2017-09-29+17%3A51%3A50&alipay_sdk=alipay-sdk-java-dynamicVersionNo&format=json\">\n<input type=\"hidden\" name=\"biz_content\" value=\"{ &quot;out_trade_no&quot;:2017092914039, &quot;total_amount&quot;:247.00, &quot;subject&quot;:%E5%85%A8%E7%A8%8B%E9%A6%96%E4%BD%8D, &quot;product_code&quot;:&quot;QUICK_WAP_PAY&quot; }\">\n<input type=\"submit\" value=\"立即支付\" style=\"display:none\" >\n</form>\n<script>document.forms[0].submit();</script>'
  }
}
*/

const userInfo = {
    name: "张山",
    tel: 123456789,
    address_detail: "成都市天府新区华府大道一段",
    postal_code: '511023',
    is_default: true
}


export default {
  getUserInfo: config => {
    return userInfo
  }
}