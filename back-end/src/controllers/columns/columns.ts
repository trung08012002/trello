import { ObjectId } from 'mongodb'

import { catchAsync } from '~/utils/catchAsync'
import { NextFunction, Request, Response } from 'express'
import columnsServices from '~/services/columns.services'
import { ParamsDictionary } from 'express-serve-static-core'
import ColumnRequest from '~/models/requests/column.request'
import AppError from '~/utils/appError'
const addColumn = catchAsync(async (req: Request<ParamsDictionary, any, ColumnRequest>, res: Response) => {
  const boardId = new ObjectId(req.params.boardId)

  const insertedId = await columnsServices.addColumn(boardId, req.body)
  res.status(201).json({
    message: 'column successfully added',
    id: insertedId
  })
})

const deleteColumnById = catchAsync(async (req: Request, res: Response) => {
  const columnId = new ObjectId(req.params.id)
  await columnsServices.deleteColumnById(columnId)
  res.status(200).json({
    message: 'column successfully deleted'
  })
})
const updateColumn = catchAsync(
  async (req: Request<ParamsDictionary, any, ColumnRequest>, res: Response, next: NextFunction) => {
    const check = Object.keys(req.body).every((key) => ['name', 'position'].includes(key))
    if (!check) {
      return next(new AppError('field provide invalid', 400))
    }

    const columnUpdated = await columnsServices.updateColumn(new ObjectId(req.params.id), req.body)

    if (columnUpdated.value?._id) {
      res.status(200).json({
        message: 'column successfully updated'
      })
    } else {
      next(new AppError("Couldn't find column", 404))
    }
  }
)

export default { addColumn, deleteColumnById, updateColumn }
