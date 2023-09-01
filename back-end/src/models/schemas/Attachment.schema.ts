import { ObjectId } from 'mongodb'

interface AttachmentInterface {
  _id?: ObjectId
  filename: string
  url: string
  uploadedby: ObjectId
  createdat: Date
}

class Attachment {
  _id?: ObjectId
  filename: string
  url: string
  uploadedby: ObjectId
  createdat: Date
  constructor({ _id, filename, url, uploadedby, createdat }: AttachmentInterface) {
    this._id = _id
    this.filename = filename
    this.url = url
    this.uploadedby = uploadedby
    this.createdat = createdat
  }
}

export default Attachment
