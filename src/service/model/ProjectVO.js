/**
 * 单位信息VO
 */

export default class EntityVO {
  constructor(data) {
    data = data || {}
    this.type = data.type || ''
    this.name = data.name || ''
  }
}
