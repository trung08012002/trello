import { Router } from 'express'
import { boardController } from '~/controllers'
import checkCreatedByMiddleware from '~/middleware/checkIsCreated.middleware'
import { protectRoute } from '~/middleware/users.middleware'
import databaseService from '~/services/database.services'
const boardRouter = Router()

boardRouter.get('/w/:workSpaceId', protectRoute, boardController.getMinimizeBoardsByWorkSpaceId)

boardRouter.get('/:boardId', protectRoute, boardController.getBoardInforById)

boardRouter.post(
  '/:workSpaceId',
  protectRoute,

  boardController.createBoardByIdWorkSpace
)
boardRouter.get('/', protectRoute, boardController.getAllBoardMiniMizeByUser)
boardRouter.delete(
  '/:id',
  protectRoute,
  checkCreatedByMiddleware(databaseService.boards),
  boardController.deleteBoardById
)
export default boardRouter
