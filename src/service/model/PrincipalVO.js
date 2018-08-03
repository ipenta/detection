/**
 * 单位信息VO
 */

export default class PrincipalVO {
  constructor(data) {
    data = data || {}
    this._id = data._id || ''
    this.phonenum = data.phonenum || ''
    this.name = data.name || ''
  }
}
