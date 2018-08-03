/**
 * 单位信息VO
 */

import ProjectVO from './ProjectVO'
import EntityVO from './EntityVO'
import PrincipalVO from './PrincipalVO'

export default class RecordVO {
  constructor(data) {
    data = data || {}
    this.uid = data.uid || ''
    this._id = data._id || ''
    this.title = data.title || ''
    this.project = data.project || new ProjectVO()
    this.entity = data.entity || new EntityVO()
    this.principal = data.principal || new PrincipalVO()
  }
}
