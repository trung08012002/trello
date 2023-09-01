import { catchAsync } from '~/utils/catchAsync'

import { Request, Response, NextFunction } from 'express'

import { ParamsDictionary } from 'express-serve-static-core'
import { WorkSpaceRequest, WorkSpaceUpdateRequest } from '~/models/requests/WorkSpace.request'
import workSpaceServices from '~/services/workSpace.services'
import { ObjectId } from 'mongodb'

import AppError from '~/utils/appError'
import { UserMinimize } from '~/models/schemas/User.schema'
const getWorkSpacesByIdUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const idUser = req.user?._id
  const workSpaces = await workSpaceServices.getWorkSpaceByIdUser(idUser!)
  res.status(200).json(workSpaces)
})

const createWorkSpace = catchAsync(
  async (req: Request<ParamsDictionary, WorkSpaceRequest, any>, res: Response, next: NextFunction) => {
    const userMinimize = new UserMinimize(req.user!)
    console.log(req.body)
    const workSpace = await workSpaceServices.createWorkSpace(req.body, userMinimize)
    res.status(200).json({
      message: 'create workSpace successfully',
      idWorkSpace: workSpace.insertedId
    })
  }
)
const getWorkSpacesById = catchAsync(async (req: Request<ParamsDictionary, WorkSpaceRequest, any>, res: Response) => {
  const workSpace = await workSpaceServices.getWorkSpaceById(new ObjectId(req.params.id))
  res.status(200).json(workSpace)
})
const deleteWorkSpace = catchAsync(
  async (req: Request<ParamsDictionary, any, any>, res: Response, next: NextFunction) => {
    const idWorkSpace = new ObjectId(req.params.id)

    const workSpace = req.itemsWithCreatedBy
    if (!workSpace) throw new AppError('WorkSpace not found', 404)

    const idBoards = workSpace.boards ?? []

    const result = await workSpaceServices.deleteWorkSpace(idWorkSpace, idBoards)
    if (result === true) {
      res.status(200).json({
        message: 'delete workSpace successfully'
      })
    } else {
      throw new AppError('delete workSpace fail ', 404)
    }
  }
)
const updateWorkSpace = catchAsync(
  async (req: Request<ParamsDictionary, WorkSpaceUpdateRequest, any>, res: Response) => {
    const result = await workSpaceServices.updateWorkSpace(req.itemsWithCreatedBy._id, req.body)
    if (result.modifiedCount > 0)
      res.status(200).json({
        message: 'update workSpace successfully'
      })
    else throw new AppError('update workSpace fail', 404)
  }
)
export default {
  getWorkSpacesByIdUser,
  createWorkSpace,
  deleteWorkSpace,
  getWorkSpacesById,
  updateWorkSpace
}
