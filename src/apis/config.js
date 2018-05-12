import Vue from "vue";
import axios from "axios";
import store from "../store/index";
import { Toast } from "vant";

Vue.use(Toast);
// 超时时间
axios.defaults.timeout = 10000;
//
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

//axios.defaults.baseURL = "/wst-customer/";

axios.defaults.baseURL =  "http://47.106.96.230:10001/wst-customer/"
//axios.defaults.baseURL =  "http://127.0.0.1:10001/wst-customer/"


// http请求拦截器
axios.interceptors.request.use(
  config => {
    const { token } = store.state;
    console.log({ store });
    Toast.loading({
      mask: true,
      message: '加载中...',
      duration: 10000
    });
    if (token) {
      config.headers.post["X-Auth-Token"] = `${token}`;
    }
    return config;
  },
  error => {
    Toast.fail("错误的传参");
    return Promise.reject(error);
  }
);

//返回状态判断
axios.interceptors.response.use(
  res => {
    Toast.clear()
    return Promise.resolve(res.data);
  },
  error => {
    Toast.fail("网络异常");
    return Promise.reject(error);
  }
);

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, params)
      .then(data => {
        return resolve(data);
      })
      .catch(err => {
        return reject(err);
      });
  });
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, params).then(
      data => {
        return resolve(data);
      },
      err => {
        return reject(err);
      }
    );
  });
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, params).then(
      data => {
        return resolve(data);
      },
      err => {
        return reject(err);
      }
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, params).then(
      data => {
        return resolve(data);
      },
      err => {
        return reject(err);
      }
    );
  });
}

export function lift(res) {
  return new Promise((resolve, reject) => {
    res.then(r => {
      const _CODE = "0000";
      if (r.code === _CODE) {
        Toast.clear()
        resolve(r.msg);
      } else {
        Toast.fail(r.desc);
        reject(r);
      }
    });
  });
}
