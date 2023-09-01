import { ObjectId } from 'mongodb'
import CheckList from './CheckList.schema'
import Attachment from './Attachment.schema'
import Comment from './Comment.schema'
import Label from './Label.schema'

export interface CardInterface {
  _id?: ObjectId
  title?: string
  description?: string
  checkLists?: Array<CheckList>
  comments?: Array<Comment>
  labels?: Array<Label>
  attachments?: Array<Attachment>
  cover?: string
  members?: Array<ObjectId>
  watcher?: Array<ObjectId>
  dueDate?: Date
  startDate?: Date
  acrhived?: boolean
}

class Card {
  _id?: ObjectId
  title: string
  description: string
  checkLists: Array<CheckList>
  comments: Array<Comment>
  labels: Array<Label>
  attachments: Array<Attachment>
  members: Array<ObjectId>
  watcher: Array<ObjectId>
  dueDate: Date
  cover: string
  startDate: Date
  acrhived: boolean
  constructor({
    _id,
    title,
    description,
    checkLists,
    comments,
    labels,
    attachments,
    dueDate,
    startDate,
    acrhived,
    members,
    cover,
    watcher
  }: CardInterface) {
    const date = new Date()
    this._id = _id
    this.title = title || ''
    this.description = description || ''
    this.checkLists = checkLists || []
    this.comments = comments || []
    this.labels = labels || []
    this.attachments = attachments || []
    this.members = members || []
    this.dueDate = dueDate || date
    this.startDate = startDate || date
    this.acrhived = acrhived || false
    this.cover = cover || ''
    this.watcher = watcher || []
  }
}

export default Card
