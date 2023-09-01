import { ObjectId } from 'mongodb'
import databaseService from './database.services'

class CheckList {
  async getAllCheckListById(ids: ObjectId[]) {
    const checkListCusor = databaseService.checkLists.find({ _id: { $in: ids } })
    const checkList = new Array<any>()
    for await (const checkListItem of checkListCusor) {
      checkList.push(checkListItem)
    }
  }
}

const checkList = new CheckList()

export default checkList
