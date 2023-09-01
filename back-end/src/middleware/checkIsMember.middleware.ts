import { Request, Response, NextFunction } from 'express'
import { Collection, ObjectId } from 'mongodb'
import databaseService from '~/services/database.services'
import AppError from '~/utils/appError'

const CheckIsMember = <T>(database: T extends Collection ? any : any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const itemsWithCreatedBy = await database.findOne({
        _id: new ObjectId(req.params.id)
      })

      if (itemsWithCreatedBy == null) {
        next(new AppError('No item found', 404))
      }

      if (
        !itemsWithCreatedBy.createdBy._id.equals(req.user?._id) ||
        !itemsWithCreatedBy.members.contains(req.user?._id)
      ) {
        next(new AppError('You are not allowed to perform this action.', 403))
      }
      req.itemsWithCreatedBy = itemsWithCreatedBy
      return next()
    } catch (error) {
      next(error)
    }
  }
}
export default CheckIsMember
