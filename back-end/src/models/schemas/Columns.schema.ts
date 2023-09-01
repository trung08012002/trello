import { ObjectId } from 'mongodb'
import Card from './Card.schema'

interface ColumnInterface {
  _id?: ObjectId
  idBoard?: ObjectId
  name?: string
  cardOrderIds?: Array<ObjectId>
}

class Column {
  _id?: ObjectId
  name: string
  idBoard?: ObjectId
  cardOrderIds: Array<ObjectId>

  constructor({ _id, name, cardOrderIds, idBoard }: ColumnInterface) {
    this._id = _id
    this.name = name || ''
    this.idBoard = idBoard
    this.cardOrderIds = cardOrderIds || []
  }
}
export default Column
