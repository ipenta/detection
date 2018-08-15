import axios from 'axios'
// import qs from 'qs'
// import auth from './auth'
import {
  Message
} from 'element-ui'

//  axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers['Accept'] = 'application/json'
// axios.defaults.baseURL = 'http:// localhost:8008';
axios.defaults.baseURL = 'http://127.0.0.1:9527/v1' // getBaseUrl(window.location.href)
axios.defaults.headers.Authorization = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoieWl5ZXJuIiwiaWF0IjoxNTM0MDU5NzA2fQ.SWnxGhmWm5vS1AHTV5j5Q5XY9m0kD2dcUsADEQLPZj8'
// axios.defaults.headers.common['authUid'] = auth.getUid()
// axios.defaults.headers.common['authSid'] = auth.getSid()

axios.interceptors.response.use(response => {
  if (response.status === 200 || response.status === 304) {
    if (response.data && response.data.nModified === 1) {
      Message.success({
        message: '更新成功'
      })
    }
    if (response.data && response.data.n === 1) {
      Message.success({
        message: '删除成功'
      })
    }
    return response
  } else if (response.status === 201) {
    Message.error({
      message: response.data.message
    })
    return response
  }
}, err => {
  if (err.response.status === 504 || err.response.status === 404) {
    Message.error({
      message: '没有找到数据'
    })
  } else if (err.response.status === 401) {
    Message.error({
      message: '访问未获得授权,请登录!'
    })
  } else {
    Message.error({
      message: '未知错误!'
    })
  }
  return Promise.resolve(err)
})

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
