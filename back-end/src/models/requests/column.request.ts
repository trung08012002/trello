import { ObjectId } from 'mongodb'
import Card from '../schemas/Card.schema'

interface ColumnRequest {
  name?: string

  idBoard?: ObjectId
  columnOrderIds?: Array<ObjectId>
  cardOrderIds?: Array<ObjectId>
  cards?: Array<Card>
}
export default ColumnRequest
