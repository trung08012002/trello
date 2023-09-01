import { ObjectId } from 'mongodb'
import databaseService from './database.services'

class Attachment {
  async getAllAttachmentsByIds(attachmentIds: ObjectId[]) {
    const attachCursor = databaseService.attachments.find({ _id: { $in: attachmentIds } })
    const attachments = new Array<any>()
    for await (const attach of attachCursor) {
      attachments.push(attach)
    }
    return attachments
  }
}

const attachment = new Attachment()

export default attachment
