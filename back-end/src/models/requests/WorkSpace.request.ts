import { ObjectId } from 'mongodb'
import { UserMinimize } from '../schemas/User.schema'
import { Level, WorkSpaceVisibility } from '../schemas/WorkSpace.schema'

interface WorkSpaceRequest {
  name: string
  type: ObjectId
  description?: string
  createdBy: UserMinimize
  members: Array<UserMinimize>
  level?: Level
  backgroundImage?: string
}

interface WorkSpaceUpdateRequest {
  name?: string
  type?: ObjectId
  description?: string
  members?: Array<UserMinimize>
  visibility?: WorkSpaceVisibility
  level?: Level
  backgroundImage?: string
}

export { WorkSpaceRequest, WorkSpaceUpdateRequest }
