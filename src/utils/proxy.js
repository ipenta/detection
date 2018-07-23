/**
 * 对http结果代理
 */
export function httpResultProxy(resultPromise, VO = null) {
  return new Promise((resolve, reject) => {
    resultPromise.then(res => {
      if (res && res.data) {
        let data = res.data
        if (data.data) {
          resolve(mapVO(VO, data.data))
        } else if (data.msg) {
          resolve({
            msg: data.msg
          })
        }
      } else {
        reject(new Error('服务器返回数据异常'))
      }
    }, (error) => {
      throw error
    }).catch(error => {
      if (error.response) {
        // throw new Error('服务器异常！')
        reject(new Error('服务器异常！'))
      } else {
        // throw new Error('系统异常！')
        reject(new Error('服务器异常！'))
      }
    })
  })
}

// 拷贝
function mapVO(VO, data) {
  if (VO) {
    if (Array.isArray(data)) {
      let arr = []
      for (let item of data) {
        arr.push(new VO(item))
      }
      return arr
    } else {
      return new VO(data)
    }
  } else {
    return data
  }
}
