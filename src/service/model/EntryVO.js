/**
 * 单位信息VO
 */
import InspectionVO from './InspectionVO'
export default class EntryVO {
  constructor(data) {
    data = data || {}
    this._id = data._id || ''
    this.recordId = data.recordId || ''
    this.inspection = data.inspection || new InspectionVO()
    this.manufacturer = data.manufacturer || ''
    this.number = data.number || 1
  }
}
