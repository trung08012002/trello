import { ObjectId } from 'mongodb'

class WorkSpaceType {
  public name: string
  public _id?: ObjectId
  constructor(name: string, _id?: ObjectId) {
    this.name = name
    this._id = _id
  }
}

export default WorkSpaceType
