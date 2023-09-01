import WorkSpace from '~/models/schemas/WorkSpace.schema'
import databaseService from './database.services'
import { ObjectId } from 'mongodb'
import { WorkSpaceRequest, WorkSpaceUpdateRequest } from '~/models/requests/WorkSpace.request'
import { UserMinimize } from '~/models/schemas/User.schema'

class WorkSpaceServices {
  async getWorkSpaceByIdUser(IdUser: ObjectId) {
    const workSpaces = await databaseService.workSpaces
      .find({
        $or: [{ 'createdBy._id': IdUser }, { members: { $elemMatch: { _id: IdUser } } }]
      })
      .toArray()

    return workSpaces
  }
  async getWorkSpaceById(_id: ObjectId) {
    const workSpace: WorkSpace | null = await databaseService.workSpaces.findOne({ _id: _id })

    return workSpace
  }
  async updateWorkSpace(_id: ObjectId, workSpace: WorkSpaceUpdateRequest) {
    const updatedWorkSpace = await databaseService.workSpaces.updateOne({ _id: _id }, { $set: workSpace })
    return updatedWorkSpace
  }

  async createWorkSpace(workSpace: WorkSpaceRequest, user: UserMinimize) {
    workSpace.createdBy = user
    const newWorkSpace = await databaseService.workSpaces.insertOne(new WorkSpace(workSpace))
    return newWorkSpace
  }

  async deleteWorkSpace(IdWorkSpace: ObjectId, idBoards: ObjectId[]) {
    if (idBoards != undefined) {
      const listsColumnsCursor = databaseService.boards.find(
        { _id: { $in: idBoards } },
        { projection: { listColumnOrderIds: 1 } }
      )

      const idListColumn = new Array<ObjectId>()

      for (let doc = await listsColumnsCursor.next(); doc != null; doc = await listsColumnsCursor.next()) {
        doc.listColumnOrderIds.forEach((el) => idListColumn.push(el))
      }

      databaseService.boards.deleteMany({ _id: { $in: idBoards } })
      if (idListColumn.length > 0) {
        const idCardsCursor = databaseService.columns.find({ _id: { $in: idListColumn } }, { projection: { cards: 1 } })
        const idCards: Array<ObjectId> = new Array<ObjectId>()
        for (let doc = await idCardsCursor.next(); doc != null; doc = await idCardsCursor.next()) {
          doc.cardOrderIds.forEach((el) => idCards.push(el))
        }

        databaseService.columns.deleteMany({ _id: { $in: idListColumn } })
        if (idCards.length > 0) {
          // const checkLists: Array<ObjectId> = new Array<ObjectId>()
          // const comments: Array<ObjectId> = new Array<ObjectId>()

          // const attachments: Array<ObjectId> = new Array<ObjectId>()
          // const cards = databaseService.cards.find(
          //   { _id: { $in: idCards } },
          //   {
          //     projection: {
          //       checkLists: 1,
          //       comments: 1,
          //       labels: 1,
          //       attachments: 1
          //     }
          //   }
          // )

          // for (let doc = await cards.next(); doc != null; doc = await cards.next()) {
          //   databaseService.checkLists.deleteMany(doc.checkLists)
          //   databaseService.comments.deleteMany(doc.comments)
          //   databaseService.attachments.deleteMany(doc.attachments)
          // doc.checkLists.forEach((el) => (el._id != undefined ? checkLists.push(el._id) : null))
          // doc.attachments.forEach((el) => (el._id != undefined ? attachments.push(el._id) : null))
          // doc.comments.forEach((el) => (el._id != undefined ? comments.push(el._id) : null))
          // }
          // databaseService.checkLists.deleteMany({ _id: { $in: checkLists } })
          // databaseService.comments.deleteMany({ _id: { $in: comments } })

          // databaseService.attachments.deleteMany({ _id: { $in: attachments } })
          databaseService.cards.deleteMany({ _id: { $in: idCards } })
        }
      }
    }

    databaseService.workSpaces.deleteOne({ _id: IdWorkSpace })
    return true
  }
}

const workSpaceServices = new WorkSpaceServices()

export default workSpaceServices
