import workSpaceTypeServices from '~/services/workSpaceType.service'
import { catchAsync } from '~/utils/catchAsync'
import { ParamsDictionary } from 'express-serve-static-core'
import { Request, Response } from 'express'
import AppError from '~/utils/appError'
import { ObjectId } from 'mongodb'
interface WorkSpaceTypeBody {
  name: string
}

const createWorkSpaceType = catchAsync(
  async (req: Request<ParamsDictionary, WorkSpaceTypeBody, any>, res: Response) => {
    const { name } = req.body
    const workSpaceType = await workSpaceTypeServices.createWorkSpaceType(name)
    if (workSpaceType.insertedId != undefined) {
      res.status(201).json({
        status: 201,
        id: workSpaceType.insertedId
      })
    } else {
      throw new AppError('workSpaceType creation failed', 402)
    }
  }
)

const deleteWorkSpaceType = catchAsync(async (req: Request<ParamsDictionary, any, any>, res: Response) => {
  const { id } = req.params
  const result = await workSpaceTypeServices.deleteWorkSpaceType(new ObjectId(id))
  if (result.deletedCount > 0) {
    res.status(200).json({
      status: 200,
      message: 'workSpaceType deleted successfully'
    })
  } else {
    throw new AppError('workSpaceType deletion failed', 402)
  }
})

const updateWorkSpaceType = catchAsync(
  async (req: Request<ParamsDictionary, WorkSpaceTypeBody, any>, res: Response) => {
    const { id } = req.params
    const { name } = req.body
    const result = await workSpaceTypeServices.updateWorkSpaceType(new ObjectId(id), name)
    if (result.modifiedCount > 0) {
      res.status(200).json({
        status: 200,
        message: 'workSpaceType updated successfully'
      })
    } else {
      throw new AppError('workSpaceType update failed', 402)
    }
  }
)
const getAllWorkSpaceType = catchAsync(async (req: Request, res: Response) => {
  const workSpaceTypes = await workSpaceTypeServices.getAllWorkSpaceType()
  res.status(200).json({
    status: 200,
    data: workSpaceTypes
  })
})

export default {
  createWorkSpaceType,
  deleteWorkSpaceType,
  updateWorkSpaceType,
  getAllWorkSpaceType
}
