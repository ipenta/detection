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
        }
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
