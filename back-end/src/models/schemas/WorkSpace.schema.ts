import { ObjectId } from 'mongodb'
import User, { UserMinimize } from './User.schema'
import Board from './Board.schema'
import WorkSpaceType from './WorkSpaceType.schema'
import randomColor from '~/utils/randomColor'

export enum Level {
  Basic,
  Premium
}

const workSpaceContent = new Map<string, string>([
  ['EngineeringIt', 'Engineering It'],
  ['SalesCRM', 'Sales CRM'],
  ['Operations', 'Operations'],
  ['Education', 'Education'],
  ['HumanResources', 'Human Resources'],
  ['Marketing', 'Marketing'],
  ['SmallBusiness', 'Small Business'],
  ['Other', 'Other']
])
class WorkSpaceTypeExtension {
  public static getContent(workSpaceType: WorkSpaceType) {
    workSpaceContent.get(workSpaceType.toString())
  }
}
// export enum WorkSpaceType {
//   EngineeringIt = 'Engineering It',
//   SalesCRM = 'Sales CRM',
//   Operations = 'Oper',
//   Education = 'Education',
//   HumanResources = 'Human Resources',
//   Marketing = 'Marketing',
//   SmallBusiness = 'Small Business',
//   Other = 'Other'
// }
export enum WorkSpaceVisibility {
  Public,
  Private
}
interface WorkSpaceInterface {
  _id?: ObjectId
  name?: string
  linkWorkSpace?: string
  level?: Level
  members?: Array<UserMinimize>
  createdAt?: Date
  updatedAt?: Date
  type?: ObjectId
  description?: string
  boards?: Array<ObjectId>
  createdBy?: UserMinimize
  visibility?: WorkSpaceVisibility
  backgroundImage?: string
}

class WorkSpace {
  _id?: ObjectId
  name: string
  linkWorkSpace?: string
  type: ObjectId
  createdBy?: UserMinimize
  members: Array<UserMinimize>
  level: Level
  createdAt: Date
  updatedAt: Date
  description?: string
  boards: Array<ObjectId>
  visibility?: WorkSpaceVisibility
  backgroundImage?: string
  constructor({
    _id,
    name,
    linkWorkSpace,
    members,
    level,
    createdAt,
    updatedAt,
    type,
    description,
    boards,
    createdBy,
    visibility,
    backgroundImage
  }: WorkSpaceInterface) {
    const date = new Date()
    this._id = _id
    this.name = name || ''
    this.linkWorkSpace = linkWorkSpace || ''
    this.members = members || []
    this.boards = boards || []
    this.type = type || new ObjectId()
    this.level = level || Level.Basic
    this.createdAt = createdAt || date
    this.updatedAt = updatedAt || date
    this.description = description || ''
    this.createdBy = createdBy
    this.visibility = visibility || WorkSpaceVisibility.Private
    this.backgroundImage = backgroundImage || randomColor()
  }
}

export default WorkSpace
