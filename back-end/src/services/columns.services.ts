import { ObjectId } from 'mongodb'
import boardService from './board.services'
import databaseService from './database.services'
import cardService from './card.services'
import Column from '~/models/schemas/Columns.schema'
import AppError from '~/utils/appError'
import ColumnRequest from '~/models/requests/column.request'
import Card from '~/models/schemas/Card.schema'
class ColumnsServices {
  async deleteColumnById(columnId: ObjectId) {
    const column = await databaseService.columns.findOneAndDelete({ _id: columnId })

    const cardIds = column.value?.cardOrderIds
    if (cardIds) {
      Promise.all([cardService.deleteMultipleCards(cardIds), boardService.deleteColumn(column.value!._id)])
    }
    return
  }
  async getColumnsByIds(IdColumns: ObjectId[]) {
    const columnsCusor = databaseService.columns.find({ _id: { $in: IdColumns } })
    const columns = new Array<any>()
    for await (const column of columnsCusor) {
      columns.push(column)
    }
  }
  async getColumnsInforById(userId: ObjectId, IdColumns: ObjectId[]) {
    const columnsCusor = databaseService.columns.find({ _id: { $in: IdColumns } })
    const columns = new Array<any>()
    for await (const column of columnsCusor) {
      const cardsInfor = await cardService.getInforCardByIds(userId, column.cardOrderIds)

      const mapCard = new Map<string, any>()
      const cardsOrdered = new Array<any>()
      cardsInfor.forEach((card) => mapCard.set(card._id.toString(), card))
      column.cardOrderIds.forEach((id) => cardsOrdered.push(mapCard.get(id.toString())))
      columns.push({
        ...column,
        cards: cardsOrdered
      })
    }
    return columns
  }
  async updateColumn(columnId: ObjectId, columnRequest: ColumnRequest) {
    const column = await databaseService.columns.findOneAndUpdate({ _id: columnId }, { $set: columnRequest })
    if (columnRequest.columnOrderIds != undefined) {
      databaseService.boards.updateOne(
        { _id: column.value?._id },
        { $set: { listColumnOrderIds: columnRequest.columnOrderIds } }
      )
    }
    return column
  }
  async addColumn(boardId: ObjectId, columnRequest: ColumnRequest) {
    const board = await databaseService.boards.findOne({ _id: boardId })
    if (!board) {
      throw new AppError('could not found board', 404)
    }
    const { insertedId } = await databaseService.columns.insertOne(new Column({ ...columnRequest }))

    databaseService.boards.updateOne({ _id: boardId }, { $push: { listColumnOrderIds: insertedId } })
    return insertedId
  }
  async addCard(columnId: ObjectId, card: Card) {
    const columns = databaseService.columns.updateOne(
      { _id: columnId },
      { $push: { cardOrderIds: new ObjectId(card._id) } }
    )
    return columns
  }
  async deleteCard(cardId: ObjectId) {
    const column = await databaseService.columns.findOne(
      { cardOrderIds: { $in: [cardId] } },
      { projection: { _id: 1 } }
    )
    if (column) {
      const columnUpdate = databaseService.columns.updateOne({ _id: column._id }, { $pull: { cardOrderIds: cardId } })
      return columnUpdate
    }
    return null
  }
}

const columnsServices = new ColumnsServices()

export default columnsServices
