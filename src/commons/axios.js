import axios from 'axios'
// import qs from 'qs'
// import auth from './auth'
import {
  getBaseUrl
} from '@/commons/utils'
import {
  Message
} from 'element-ui'

//  axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers['Accept'] = 'application/json'
// axios.defaults.baseURL = 'http:// localhost:8008';
axios.defaults.baseURL = getBaseUrl(window.location.href)
// axios.defaults.headers.common['authUid'] = auth.getUid()
// axios.defaults.headers.common['authSid'] = auth.getSid()

// POST传参序列化
// axios.interceptors.request.use((config) => {
//   if (config.method === 'post') {
//     config.data = qs.stringify(config.data)
//   }
//   return config
// }, (error) => {
//   return Promise.reject(error)
// })

axios.interceptors.response.use(data => {
  if (data.status && data.status === 200 && data.data.status === 'error') {
    Message.error({
      message: data.data.msg
    })
    return
  }
  return data
}, err => {
  console.log(err.response)
  // if (err.response.status === 504 || err.response.status === 404) {
  Message.error({
    message: '服务器被吃了⊙﹏⊙∥'
  })
  // } else if (err.response.status === 403) {
  //   Message.error({
  //     message: '权限不足,请联系管理员!'
  //   })
  // } else {
  //   Message.error({
  //     message: '未知错误!'
  //   })
  // }
  return Promise.resolve(err)
})

//  返回状态判断
// axios.interceptors.response.use(response => {
//   if (response.data && response.data.code) {
//     if (response.data.code === '2001') {
//       auth.logout()
//     }
//   }
//   return response
// }, error => {
//   if (error.response) {
//     // 全局ajax错误信息提示
//     //  MessageBox({ type: 'error', message: error.response.data, title: '温馨提示'});
//   }
//   // return Promise.reject(error);
// })

export function fetch(url, config = {
  method: 'get'
}) {
  return axios.request({...config, url})
  //  return new Promise((resolve, reject) => {
  //    axios.request({ ...config, url })
  //      .then(response => {
  //        resolve(response.data);
  //      }, err => {
  //        reject(err);
  //      })
  //      .catch((error) => {
  //        reject(error)
  //      })
  //  })
}

export default axios
