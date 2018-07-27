/**
 * 单位信息VO
 */

export default class InspectionVO {
  constructor(data) {
    data = data || {}
    this.type = data.type || ''
    this.text = data.text || ''
    this.price = data.price || ''
    this.unit = data.unit || ''
    this.methods = data.methods || ''
    this._id = data._id || ''
  }
}
