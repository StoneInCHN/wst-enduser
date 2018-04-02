import Vue from "vue";
import axios from "axios";
import store from "../store/index";
import { Toast } from "vant";

Vue.use(Toast);
// 超时时间
axios.defaults.timeout = 5000;
//
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";

// http请求拦截器
axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.post["X-Auth-Token"] = `${store.state.token}`;
    }
    return config;
  },
  error => {
    Toast(error);
    return Promise.reject(error);
  }
);
// http响应拦截器
axios.interceptors.response.use(
  response => {
    console.log("response", response)
    if(response.status === 200){
      return response.data;
    }else{
      Toast.fail('请求连接异常，请稍后重试')
    }
  },
  error => {
    Toast(error);
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


export function lift(fn){
  
}