import axios from 'axios';
import QS from 'qs';
import store from '@/store/index';
import router from '@/router/index';
import {
  //   ElNotification as Notification,
  //   ElLoading as Loading,
  ElMessage as Message,
} from 'element-plus';
import { closeLoading } from '../components/loading/index'

// 环境的切换
// if (process.env.NODE_ENV == 'development') {
//   axios.defaults.baseURL = 'http://localhost:9123';
// } else if (process.env.NODE_ENV == 'debug') {
//   axios.defaults.baseURL = 'http://localhost:9123';
// } else if (process.env.NODE_ENV == 'production') {
//   axios.defaults.baseURL = 'http://localhost:9123';
// }

axios.defaults.timeout = 10000;

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 每次发送请求之前判断vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.token;
    token && (config.headers.Authorization = 'Bearer ' + token);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      if (response.data.code == -100) {
        Message({ message: response.data.msg, type: 'error' });
        closeLoading()
        return Promise.reject(response);
      }
      return Promise.resolve(response);
    } else {
      closeLoading()
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.value.fullPath,
            },
          });
          break;

        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Message({ message: '登录过期，请重新登录', type: 'error' });
          // 清除token
          localStorage.removeItem('token');
          store.commit('loginSuccess', null);
          // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.value.fullPath,
              },
            });
          }, 1000);
          break;

        // 404请求不存在
        case 404:
          //   message.error("网络请求不存在", 1.5);
          Message({ message: '网络请求不存在', type: 'error' });
          break;
        // 其他错误，直接抛出错误提示
        default:
          //   message.error(error.response.data.message, 1.5);
          Message({ message: error.response.message, type: 'error' });
      }
      return Promise.reject(error.response);
    }
  }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url: string, params: Object): Promise<Response> {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      }).finally(() => {
        closeLoading()
      });
  });
}

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
 export function DELETE(url: string, params: Object): Promise<Response> {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params: params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      }).finally(() => {
        closeLoading()
      });
  });
}

/**
 * put
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url: string, params: Object): Promise<Response> {
  return new Promise((resolve, reject) => {
    axios
      .put(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      }).finally(() => {
        closeLoading()
      });
  });
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url: string, params: Object): Promise<Response> {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      }).finally(() => {
        closeLoading()
      });
  });
}
