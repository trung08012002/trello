import { ObjectId } from 'mongodb'
import CheckList from '../schemas/CheckList.schema'
import Attachment from '../schemas/Attachment.schema'
import Comment from '../schemas/Comment.schema'
import Label from '../schemas/Label.schema'
type CardRequest = {
  title?: string
  description?: string
  checkLists?: Array<CheckList>
  comments?: Array<Comment>
  labels?: Array<Label>
  attachments?: Array<Attachment>
  cardOrderIds?: Array<ObjectId>
  positionCard?: number
  oldIdColumn?: ObjectId
  idColumn?: ObjectId
  members?: Array<ObjectId>
  watcher?: ObjectId
  dueDate?: Date
  startDate?: Date
  acrhived?: boolean
  cover?: string
}

export default CardRequest
