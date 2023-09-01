import { ObjectId } from 'mongodb'
import { UserMinimize } from './User.schema'
import Column from './Columns.schema'

export interface BoardInterface {
  _id?: ObjectId
  idWorkSpace?: ObjectId
  name?: string
  createdBy: UserMinimize
  members?: Array<UserMinimize>
  created_at?: Date
  visibility?: VisibilityType
  listColumnOrderIds?: Array<ObjectId>

  favoritesUser?: Array<ObjectId>
  background?: ObjectId
}

export enum VisibilityType {
  PUBLIC = 'Public',
  PRIVATE = 'Private',
  WORKSPACE = 'Workspace'
}

class Board {
  _id?: ObjectId
  name: string
  idWorkSpace?: ObjectId
  created_at: Date
  createdBy: UserMinimize
  members: Array<UserMinimize>
  visibility: VisibilityType
  listColumnOrderIds: Array<ObjectId>
  favoritesUser: Array<ObjectId>
  background?: ObjectId

  constructor({
    _id,
    name,
    idWorkSpace,
    background,
    created_at,
    visibility,
    listColumnOrderIds,
    createdBy,
    members,
    favoritesUser
  }: BoardInterface) {
    this._id = _id
    this.idWorkSpace = idWorkSpace
    this.name = name || 'Board name'
    this.created_at = created_at || new Date()
    this.visibility = visibility || VisibilityType.PUBLIC
    this.listColumnOrderIds = listColumnOrderIds || []
    this.createdBy = createdBy
    this.members = members || []
    this.favoritesUser = favoritesUser || []
    this.background = background
  }
}

export default Board
