import { ObjectId } from 'mongodb'
import { VisibilityType } from '../schemas/Board.schema'
import { UserMinimize } from '../schemas/User.schema'
import Column from '../schemas/Columns.schema'

interface BoardRequest {
  name?: string

  members?: Array<UserMinimize>
  idWorkSpace?: ObjectId
  visibility?: VisibilityType
  favorites?: Array<ObjectId>
  background?: ObjectId
}
export interface BoardRequestExtend extends BoardRequest {
  listColumnOrderIds?: Array<ObjectId>
  columns?: Array<Column>
}
export default BoardRequest
