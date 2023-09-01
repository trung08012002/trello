import { Request, Response, NextFunction } from 'express'
import { ObjectId } from 'mongodb'
import BoardRequest from '~/models/requests/Board.request'
import { UserMinimize } from '~/models/schemas/User.schema'
import boardService from '~/services/board.services'
import databaseService from '~/services/database.services'
import { catchAsync } from '~/utils/catchAsync'
import { ParamsDictionary } from 'express-serve-static-core'
const createBoardByIdWorkSpace = catchAsync(
  async (req: Request<ParamsDictionary, any, BoardRequest>, res: Response) => {
    const board = { ...req.body, createdBy: new UserMinimize(req.user!) }

    const boardId = await boardService.createBoard(board, new ObjectId(req.params.workSpaceId))
    res.status(200).json({
      status: 200,
      message: 'Board created successfully',
      data: boardId
    })
  }
)
const getBoardsByWorkSpaceId = catchAsync(async (req: Request<ParamsDictionary, any, BoardRequest>, res: Response) => {
  const boards = await boardService.getBoardsByWorkSpaceId(new ObjectId(req.params.workSpaceId))
  res.status(200).json({
    status: 200,
    message: 'Boards fetched successfully',
    data: boards
  })
})
const getMinimizeBoardsByWorkSpaceId = catchAsync(async (req: Request, res: Response) => {
  const boards = await boardService.getMinimizeBoardsByWorkSpaceId(new ObjectId(req.params.workSpaceId))
  res.status(200).json({
    status: 200,
    message: 'Boards fetched successfully',
    data: boards
  })
})

const getAllBoardMiniMizeByUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id

  const boards = await boardService.getAllBoardMiniMizeByUser(new ObjectId(userId))
  res.status(200).json({
    status: 200,
    message: 'Boards fetched successfully',
    data: boards
  })
})

const deleteBoardById = catchAsync(async (req: Request, res: Response) => {
  const board = req.itemsWithCreatedBy
  await boardService.deleteBoardsById(board)
  res.status(200).json({
    status: 200,
    message: 'Board deleted successfully'
  })
})
const getBoardInforById = catchAsync(async (req: Request, res: Response) => {
  const boardInfor = await boardService.getBoardInforById(req.user!._id as ObjectId, new ObjectId(req.params.boardId))

  res.status(200).json({
    status: 200,
    message: 'Board fetched successfully',
    data: boardInfor
  })
})

export default {
  createBoardByIdWorkSpace,
  deleteBoardById,
  getMinimizeBoardsByWorkSpaceId,
  getBoardInforById,
  getAllBoardMiniMizeByUser
}
