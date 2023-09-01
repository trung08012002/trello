import { ObjectId } from 'mongodb'

interface CheckListItemInterface {
  _id?: ObjectId
  text: string
  completed?: boolean
}
class CheckListItem {
  _id?: ObjectId
  text: string
  completed: boolean
  constructor({ _id, text, completed }: CheckListItemInterface) {
    this._id = _id
    this.text = text
    this.completed = completed || false
  }
}

export default CheckListItem
