/**
 * 单位信息VO
 */

export default class ResultVO {
  constructor(data) {
    data = data || {}
    this.status = data.status || ''
    this.data = data.data || ''
    this.msg = data.msg || ''
  }
}
