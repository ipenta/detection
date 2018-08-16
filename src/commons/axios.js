import axios from 'axios'
import { Message } from 'element-ui'

//  axios 配置
axios.defaults.timeout = 5000
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers['Accept'] = 'application/json'
axios.defaults.baseURL = process.env.BASE_API
axios.defaults.headers.Authorization = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZGVudGlmaWVyIjoieWl5ZXJuIiwiaWF0IjoxNTM0MDU5NzA2fQ.SWnxGhmWm5vS1AHTV5j5Q5XY9m0kD2dcUsADEQLPZj8'

// // request interceptor
// axios.interceptors.request.use(config => {
//   // Do something before request is sent
//   if (store.getters.token) {
//     // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
//     config.headers['Authorization'] = getToken()
//   }
//   return config
// }, error => {
//   // Do something with request error
//   console.log(error) // for debug
//   Promise.reject(error)
// })

axios.interceptors.response.use(response => {
  if (response.status === 200 || response.status === 304) {
    if (response.data && response.data.nModified === 1) {
      Message.success({
        message: '更新成功'
      })
    }
  } else if (response.status === 201) {
    Message.warning({
      message: response.data.message
    })
  }
  return response
}, err => {
  console.log(err)
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

export default axios
