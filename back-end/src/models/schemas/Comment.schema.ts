import { ObjectId } from 'mongodb'

interface CommentInterface {
  _id?: ObjectId
  text: string
  author: ObjectId
  timestamp: Date
  replies?: Array<Comment>
}

class Comment {
  _id?: ObjectId
  text: string
  author: ObjectId
  timestamp: Date
  replies: Array<Comment>
  constructor({ _id, text, author, timestamp, replies }: CommentInterface) {
    this._id = _id
    this.text = text
    this.author = author
    this.timestamp = timestamp
    this.replies = replies || []
  }
}

export default Comment
