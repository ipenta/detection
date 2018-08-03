/**
 * 单位信息VO
 */

export default class ProjectVO {
  constructor(data) {
    data = data || {}
    this._id = data._id || ''
    this.name = data.name || ''
    this.entities = data.entities || []
  }
}
