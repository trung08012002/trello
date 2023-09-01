import { ObjectId } from 'mongodb'
import databaseService from './database.services'

class Comments {
  async getAllCommentsById(IdComments: ObjectId[]) {
    const commentCursor = databaseService.comments.find({ _id: { $in: IdComments } })
    const comments = new Array<any>()
    for await (const comment of commentCursor) {
      comments.push(comment)
    }
    return comments
  }
}

const comments = new Comments()

export default comments
