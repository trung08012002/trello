import { ObjectId } from 'mongodb'
interface IBackground {
  _id?: ObjectId
  type?: number
  url?: string
  backgroundColor?: string
}
class Background {
  _id?: ObjectId
  type: number
  url: string
  backgroundColor: string
  constructor({ _id, type, url, backgroundColor }: IBackground) {
    this._id = _id
    this.type = type || 0
    this.url = url || ''
    this.backgroundColor = backgroundColor || ''
  }
}

export default Background
