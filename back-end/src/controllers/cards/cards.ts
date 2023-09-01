import { ObjectId } from 'mongodb'
import CardRequest from '~/models/requests/Card.request'
import { ParamsDictionary } from 'express-serve-static-core'
import Card from '~/models/schemas/Card.schema'

import { catchAsync } from '~/utils/catchAsync'
import { NextFunction, Request, Response } from 'express'
import cardService from '~/services/card.services'
import columnsServices from '~/services/columns.services'
import AppError from '~/utils/appError'
import databaseService from '~/services/database.services'

const UpdateCard = catchAsync(async (req: Request<ParamsDictionary, any, CardRequest>, res: Response) => {
  const cardId = new ObjectId(req.params.cardId)

  if (req.body.idColumn != undefined && req.body.oldIdColumn != undefined && req.body.positionCard != undefined) {
    Promise.all([
      databaseService.columns.updateOne(
        { _id: new ObjectId(req.body.oldIdColumn) },
        { $pull: { cardOrderIds: cardId } }
      ),
      databaseService.columns.updateOne(
        { _id: new ObjectId(req.body.idColumn) },
        { $push: { cardOrderIds: { $each: [cardId], $position: req.body.positionCard } } }
      )
    ])
  }
  const card = await cardService.updateCard(cardId, req.body)

  res.status(200).json(card)
})

const AddCard = catchAsync(async (req: Request<ParamsDictionary, CardRequest, any>, res: Response) => {
  const result = await cardService.addCard(req.body)
  const card = await databaseService.cards.findOne({ _id: result.insertedId })
  columnsServices.addCard(new ObjectId(req.params.columnId), new Card({ ...card }))
  res.status(200).json(card)
})
const deleteCard = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const cardId = new ObjectId(req.params.cardId)
  const card = await cardService.deleteCard(cardId)
  columnsServices.deleteCard(cardId)
  if (card.deletedCount == 1) res.status(200).json({ message: 'delete card successfully' })
  else next(new AppError('Delete card failed', 404))
})
export default {
  UpdateCard,
  AddCard,
  deleteCard
}
