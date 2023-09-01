import { ObjectId } from 'mongodb'
import Board, { BoardInterface } from '~/models/schemas/Board.schema'
import databaseService from './database.services'
import AppError from '~/utils/appError'
import { BoardRequestExtend } from '~/models/requests/Board.request'
import Column from '~/models/schemas/Columns.schema'
import columnsServices from './columns.services'
import { UserMinimize } from '~/models/schemas/User.schema'

class BoardService {
  createBoard = async (board: BoardInterface, workSpaceId: ObjectId) => {
    const workSpace = await databaseService.workSpaces.findOne({ _id: workSpaceId })
    if (workSpace) {
      board.idWorkSpace = workSpaceId
      const { insertedId } = await databaseService.boards.insertOne(new Board(board))
      databaseService.workSpaces.updateOne({ _id: workSpace._id }, { $push: { boards: insertedId } })
      return insertedId
    } else {
      throw new AppError('workSpace not found', 404)
    }
  }
  updateBoard = async (board: BoardRequestExtend, boardId: ObjectId) => {
    const boardUpdated = await databaseService.boards.updateOne({ _id: boardId }, { $set: { ...board } })
    return boardUpdated
  }
  getBoardInforById = async (userId: ObjectId, boardId: ObjectId) => {
    const board = await databaseService.boards.findOne({ _id: boardId })
    if (board) {
      const visibility = board.visibility
      const members = board.members

      const background = await databaseService.background.findOne({ _id: board.background })
      const mapColumn = new Map<string | undefined, any>()
      const columnInforOrder = new Array<any>()
      const columns = await columnsServices.getColumnsInforById(userId, board.listColumnOrderIds)
      columns.forEach((column) => {
        mapColumn.set(column._id.toString(), column)
      })

      for (const columnId of board.listColumnOrderIds) {
        const tempColumn = mapColumn.get(columnId.toString())

        if (tempColumn !== undefined) {
          columnInforOrder.push(tempColumn)
        }
      }
      return {
        columnInfor: columnInforOrder,
        visibility,
        members,
        favorite: board.favoritesUser.includes(userId),
        background
      }
    }
    return null
  }
  getBoardsByWorkSpaceId = async (workSpaceId: ObjectId) => {
    const workSpace = await databaseService.workSpaces.findOne({ _id: workSpaceId })
    const boards = Array<Board>()

    const boardsCursor = databaseService.boards.find({ _id: { $in: workSpace?.boards } })
    for await (const board of boardsCursor) {
      boards.push(board)
    }
    return boards
  }

  getMinimizeBoardsByWorkSpaceId = async (workSpaceId: ObjectId) => {
    const workSpace = await databaseService.workSpaces.findOne({ _id: workSpaceId })
    const boards = Array<any>()
    const boardsCursor = databaseService.boards.find({ _id: { $in: workSpace?.boards } }).project({ _id: 1, name: 1 })
    for await (const board of boardsCursor) {
      boards.push(board)
    }
    return boards
  }
  getAllBoardMiniMizeByUser = async (userId: ObjectId) => {
    const boardsCursor = databaseService.boards.find({
      $or: [{ 'createdBy._id': userId }, { members: { $elemMatch: { _id: userId } } }]
    })
    const boards = new Array<any>()
    for await (const board of boardsCursor) {
      boards.push({
        _id: board._id,
        name: board.name,
        favorite: board.favoritesUser.includes(userId)
      })
    }

    return boards
  }
  deleteColumn = async (columnId: ObjectId) => {
    databaseService.boards.updateOne(
      { listColumnOrderIds: { $in: [columnId] } },
      { $pull: { listColumnOrderIds: columnId } }
    )
    return
  }
  deleteBoardsById = async (board: Board) => {
    const idListColumn = board.listColumnOrderIds
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
        // const labels: Array<string> = new Array<string>()
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
        //   doc.checkLists.forEach((el) => (el._id != undefined ? checkLists.push(el._id) : null))
        //   doc.attachments.forEach((el) => (el._id != undefined ? attachments.push(el._id) : null))
        //   doc.labels.forEach((el) => labels.push(el))
        //   doc.comments.forEach((el) => (el._id != undefined ? comments.push(el._id) : null))
        // }
        // databaseService.cards.deleteMany({ _id: { $in: idCards } })
        // databaseService.checkLists.deleteMany({ _id: { $in: checkLists } })
        // databaseService.comments.deleteMany({ _id: { $in: comments } })
        // databaseService.attachments.deleteMany({ _id: { $in: attachments } })
        databaseService.cards.deleteMany({ _id: { $in: idCards } })
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
        // }
      }
    }
    await databaseService.workSpaces.updateOne({ boards: { $in: [board._id!] } }, { $pull: { boards: board._id } })
    await databaseService.boards.deleteOne({ _id: board._id })
  }
}
const boardService = new BoardService()

export default boardService
