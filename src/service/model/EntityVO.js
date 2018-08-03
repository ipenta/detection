/**
 * 单位信息VO
 */

export default class EntityVO {
  constructor(data) {
    data = data || {}
    this._id = data._id || ''
    this.name = data.name || ''
    this.type = data.type || ''
  }
}
