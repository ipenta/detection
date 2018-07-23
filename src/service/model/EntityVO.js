/**
 * 单位信息VO
 */

export default class EntityVO {
  constructor(data) {
    data = data || {}
    this.type = data.entity_type || ''
    this.name = data.entity_name || ''
  }
}
