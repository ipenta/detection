/**
 * 单位信息VO
 */

export default class EntityVO {
  constructor(data) {
    data = data || {}
    this.name = data.name || ''
    this.owner = data.owner || ''
    this.constructor = data.constructor || ''
    this.supervisor = data.supervisor || ''
    this.designer = data.designer || ''
  }
}
