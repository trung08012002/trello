import WorkSpaceType from '~/models/schemas/WorkSpaceType.schema'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'

class WorkSpaceTypeServices {
  async createWorkSpaceType(name: string) {
    const result = await databaseService.workSpaceTypes.insertOne(new WorkSpaceType(name))
    return result
  }
  async updateWorkSpaceType(id: ObjectId, name: string) {
    const result = await databaseService.workSpaceTypes.updateOne({ _id: id }, { $set: { name } })
    return result
  }
  async deleteWorkSpaceType(id: ObjectId) {
    const result = await databaseService.workSpaceTypes.deleteOne({ _id: id })
    return result
  }
  async getAllWorkSpaceType() {
    const resultCusor = databaseService.workSpaceTypes.find({})
    const workSpaceTypes = new Array<WorkSpaceType>()
    for await (const workSpaceType of resultCusor) {
      workSpaceTypes.push(workSpaceType)
    }
    return workSpaceTypes
  }
}
const workSpaceTypeServices = new WorkSpaceTypeServices()

export default workSpaceTypeServices
