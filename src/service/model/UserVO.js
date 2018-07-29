/**
 * 单位信息VO
 */

export default class UserVO {
  constructor(data) {
    data = data || {}
    this.email = data.email || ''
    this.password = data.password || ''
    this.token = data.token || ''
  }
}
