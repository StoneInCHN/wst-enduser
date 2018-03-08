
import {fetch, post, patch, put} from '../config'

const baseUrl = "/"

const  home = {

  login (params) {
    return post('/login', params)
  },
  getUserInfo () {
    return fetch('/getUserInfo')
  },
  getHpInfo (params) {
    return post('/shop/getHpInfo', params)
  },
  /**
   * {
      "entityId": 1,
      "qrCodeId": 1
    }
   */
  getWGList (params) {
    return post('/shop/getWGList', params)
  }
  

}

export default home