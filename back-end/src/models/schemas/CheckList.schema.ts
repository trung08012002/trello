import { ObjectId } from 'mongodb'
import CheckListItem from './CheckListItem.schema'

interface CheckListInterface {
  _id?: ObjectId
  title: string
  items?: Array<CheckListItem>
}
class CheckList {
  _id?: ObjectId
  title: string
  items: Array<CheckListItem>
  constructor({ _id, title, items }: CheckListInterface) {
    this._id = _id
    this.title = title
    this.items = items || []
  }
}

export default CheckList
